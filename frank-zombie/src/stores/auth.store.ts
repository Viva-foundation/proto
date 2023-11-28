import {defineStore} from "pinia";
import {computed, ref} from "vue";


export const useAuthStore = defineStore('auth', ()=>{

  const authToken = ref<string>('');
  const expiresAt = ref<number>(0);


  const lastExpire = parseInt(localStorage.getItem('expires-at')||'0');
  if(!isNaN(lastExpire) && lastExpire > Date.now()){
    authToken.value = localStorage.getItem('auth-token')||'';
    expiresAt.value = lastExpire;
  } else {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('expires-at');
  }

  const getIsAuth = computed(()=>!!authToken.value);

  const formatToken = ()=>{
    return {
      'Authorization': 'Bearer '+authToken.value,
    }
  }

  const getAuthToken = async ()=>{
    if(!getIsAuth.value) return '';
    if(expiresAt.value > Date.now()+60000) return formatToken();
    try {
      const request = await fetch(import.meta.env.VITE_SRV_BASE_URL + '/auth/renew', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...formatToken(),
        }
      });
      if(!request.ok) throw new Error('Refresh failed');
      const mData = await request.json();
      storeToken(mData.access_token);
      return formatToken();
    } catch (e) {
      console.error(e);
      return '';
    }
  }

  const makeLogin = async (email:string,password:string)=>{
    try {
      const request = await fetch(import.meta.env.VITE_SRV_BASE_URL + '/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if(!request.ok) throw new Error('Login failed');
      const mData = await request.json();
      storeToken(mData.access_token);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  const storeToken = (token:string)=>{
    authToken.value = token;
    const tokenParts = token.split('.');
    const tokenData = JSON.parse(atob(tokenParts[1]));
    expiresAt.value = tokenData.exp*1000;
    try{
      localStorage.setItem('auth-token',authToken.value);
      localStorage.setItem('expires-at',expiresAt.value.toString());
    } catch (e) {
      console.error(e);
    }
  }

  const changePassword = async (old_password:string, password:string)=>{
    try {
      const request = await fetch(import.meta.env.VITE_SRV_BASE_URL + '/auth/reset', {
        method: 'POST',
        body: JSON.stringify({
          old_password,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
          ...await getAuthToken(),
        }
      });
      if(!request.ok) throw new Error('Password change failed');
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  return {getIsAuth,makeLogin, getAuthToken, changePassword}
})
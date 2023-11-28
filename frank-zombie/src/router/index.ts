import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from "@/stores/auth.store";
import LoginView from "@/views/login-view.vue";
import DashView from "@/views/dash-view.vue";
import DistributeView from "@/views/dash/distribute-view.vue";
import HomeView from "@/views/dash/home-view.vue";
import SettingsView from "@/views/dash/settings-view.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      redirect: ()=>{
        const authStore = useAuthStore();
        if(authStore.getIsAuth){
          return '/dash';
        }
        return '/login';
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta:{
        protected:false,
      },
    },
    {
      path: '/dash',
      name: 'dash',
      component: DashView,
      redirect: '/dash/home',
      meta: {
        protected: true,
      },
      children: [
        {
          path: 'home',
          name: 'dash-home',
          component: HomeView,
        },
        {
          path: 'distribute',
          name: 'distribute',
          component: DistributeView,
        },
        {
          path: 'settings',
          name: 'settings',
          component: SettingsView,
        }
      ]
    }
  ]
})

router.beforeEach((to)=>{
  if(typeof to.meta.protected === 'undefined'){
    return void 0;
  }
  const authStore = useAuthStore();
  if(to.meta.protected && !authStore.getIsAuth){
    return '/login';
  }
  if(!to.meta.protected && authStore.getIsAuth){
    return '/dash/';
  }
})

export default router

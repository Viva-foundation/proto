import {defineStore} from "pinia";
import {useAuthStore} from "@/stores/auth.store";
import {ref} from "vue";

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  isActive:boolean
  blockReason?: string;
  isRemoved?:string;
  removeReason?:string;
}
export const usePatientStore = defineStore('patient', () => {

  const authStore = useAuthStore();
  const activePatient = ref<Patient|null>(null);
  const lastErrors = ref<string[]>([]);
  const searchPatient = async (passport: string, dob:string):Promise<boolean> => {
    try {
      const request = await fetch(import.meta.env.VITE_SRV_BASE_URL + '/patients/search', {
        method: 'POST',
        body: JSON.stringify({
          dob:new Date(dob).getTime(),
          passport,
        }),
        headers: {
          'Content-Type': 'application/json',
          ...await authStore.getAuthToken()
        }
      });
      if (!request.ok) {
        return false;
      }
      const mData = await request.json();
      console.log(mData,mData.result);
      if (mData.result) {
        activePatient.value = {
          id: mData.id,
          firstName: mData.firstName,
          lastName: mData.lastName,
          isRemoved: mData.isRemoved,
          isActive: mData.isActive,
          removeReason: mData.removeReason,
          blockReason: mData.blockReason,
        };
        return true;
      }
      return false;
    } catch (e){
      console.error(e);
      return false;
    }
  };
  const createPatient = async (firstName: string, lastName: string, passport: string, phone: string,sDob: string, email: string):Promise<boolean> => {
    const dob = new Date(sDob).getTime();
    try {
      const data:Record<string, any> = {
        firstName,
        lastName,
        passport,
        phone,
        dob
      };
      if(email){
        data.email = email;
      }
      const request = await fetch(import.meta.env.VITE_SRV_BASE_URL + '/patients/create', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          ...await authStore.getAuthToken()
        }
      });

      const mData = await request.json();
      if (!request.ok) {
        lastErrors.value = Array.isArray(mData.message)?mData.message:[mData.message];
        return false;
      }
      if (mData.result) {
        activePatient.value = {
          id: mData.id,
          firstName: mData.firstName,
          lastName: mData.lastName,
          isRemoved: mData.isRemoved,
          isActive: mData.isActive,
          removeReason: mData.removeReason,
          blockReason: mData.blockReason,
        };
        return true;
      }
      return false;
    } catch (e){
      console.error(e);
      return false;
    }
  };

  const clearPatient = () => {
    activePatient.value = null;
  }
  return {searchPatient, createPatient, clearPatient, activePatient,lastErrors}
});
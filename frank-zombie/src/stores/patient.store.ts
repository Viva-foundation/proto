import {defineStore} from "pinia";
import {useAuthStore} from "@/stores/auth.store";
import {ref} from "vue";

export interface Patient {
  id: string;
  isActive:boolean
  blockReason?: string;
  isRemoved?:string;
  removeReason?:string;
}
export const usePatientStore = defineStore('patient', () => {

  const authStore = useAuthStore();
  const activePatient = ref<Patient|null>(null);
  const searchPatient = async (firstName: string, lastName: string, passport: string):Promise<boolean> => {
    try {
      const request = await fetch(import.meta.env.VITE_SRV_BASE_URL + '/patients/search', {
        method: 'POST',
        body: JSON.stringify({
          firstName,
          lastName,
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
  const createPatient = async (firstName: string, lastName: string, passport: string, phoneNumber: string, email: string) => {

  };

  const clearPatient = () => {
    activePatient.value = null;
  }
  return {searchPatient, createPatient, clearPatient, activePatient}
});
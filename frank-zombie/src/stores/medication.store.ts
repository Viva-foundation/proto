import {defineStore} from "pinia";
import {ref} from "vue";
import {useAuthStore} from "@/stores/auth.store";


export interface MedicationHistoryPage {
  result: boolean;
  data?: {
    id: string;
    date: number;
    medication_id: string;
    medication_name: string;
    quantity: number;
    patient_id: string;
    user_id: string;
    user_name: string;
  }[];
  offset?: number;
  limit?: number;
  total?: number;
  from?: number;
  to?: number;
  patient_id?: string;
  medication_id?: string;
  user_id?: string;
}

export interface MedicationHistoryPageOptions {
  offset: number;
  limit: number;
  from:Date;
  to:Date;
  patient_id?: string;
  medication_id?: string;
  user_id?: string;
}

export const useMedicationStore = defineStore('medication', () => {

  const historyPage = ref<MedicationHistoryPage|null>(null);
  const isLoading = ref(false);
  const authStore = useAuthStore();
  const loadHistoryPage = async (query:MedicationHistoryPageOptions) => {
    isLoading.value = true;
    const body:Record<string, any> = {
      offset: query.offset,
      limit: query.limit,
      from: query.from.getTime(),
      to: query.to.getTime(),
    };
    if(query.patient_id){
      body.patient_id = query.patient_id;
    }
    if(query.medication_id){
      body.medication_id = query.medication_id;
    }
    if(query.user_id){
      body.user_id = query.user_id;
    }
    try {
      const request = await fetch(import.meta.env.VITE_SRV_BASE_URL + '/medication/report', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          ...await authStore.getAuthToken()
        }
      });
      const response = await request.json();
      historyPage.value = response;
    }catch (e) {
      historyPage.value = null;
    }finally {
      isLoading.value = false;
    }
  }

  const clearHistoryPage = async ()=>{
    historyPage.value = null;
  }

  const distributeMedication = async (patient?:string, items?:{medication: string; quantity: number}[]):Promise<boolean> =>{
    isLoading.value = true;
    if(!patient || !items){
      return false;
    }
    try {
      const request = await fetch(import.meta.env.VITE_SRV_BASE_URL + '/medication/give', {
        method: 'POST',
        body: JSON.stringify({
          patient,
          items
        }),
        headers: {
          'Content-Type': 'application/json',
          ...await authStore.getAuthToken()
        }
      });
      const response = await request.json();
      if(!response.result){
        return false;
      }
      return true;
    }catch (e) {
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  const searchMedications = async (query:string):Promise<{id:string, name:string, unit:string, pack_size:number}[]> => {
    isLoading.value = true;
    try {
      const request = await fetch(import.meta.env.VITE_SRV_BASE_URL + '/medication/search', {
        method: 'POST',
        body: JSON.stringify({
          query
        }),
        headers: {
          'Content-Type': 'application/json',
          ...await authStore.getAuthToken()
        }
      });
      const response = await request.json();
      if(!response.result){
        return [];
      }
      return response.data;
    }catch (e) {
      return [];
    }finally {
      isLoading.value = false;
    }
  }

  return { loadHistoryPage, historyPage, clearHistoryPage, isLoading, distributeMedication, searchMedications}
})

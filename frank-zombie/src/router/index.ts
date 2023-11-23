import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from "@/stores/auth.store";
import LoginView from "@/views/login-view.vue";
import DashView from "@/views/dash-view.vue";
import DistributeView from "@/views/dash/distribute-view.vue";
import DistributePatientView from "@/views/dash/distribute-patient-view.vue";

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
      meta: {
        protected: true,
      },
      children: [
        {
          path: 'distribute',
          name: 'distribute',
          component: DistributeView,
        },
        {
          path: 'distribute/:id',
          name: 'distribute-patient',
          component: DistributePatientView,
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

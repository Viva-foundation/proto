<script setup lang="ts">
import AppPreloader from "@/components/app-preloader.vue";
import {usePatientStore} from "@/stores/patient.store";
import {useI18n} from "vue-i18n";
import PatientInfo from "@/components/patient-info.vue";

const patientStore = usePatientStore();
const {t} = useI18n();
</script>

<template>
  <div class="row">
    <div class="col-3">
      <patient-info/>
    </div>
    <div class="col-9 " v-if="patientStore.activePatient">
      Here will be history and form to distribute goods
    </div>
  </div>
</template>

<style scoped>

</style>


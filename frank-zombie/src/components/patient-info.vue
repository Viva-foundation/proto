<script setup lang="ts">
import {computed, ref} from "vue";
import {type Patient, usePatientStore} from "@/stores/patient.store";
import {useI18n} from "vue-i18n";
import AppPreloader from "@/components/app-preloader.vue";

const firstName = ref<string>('');
const lastName = ref<string>('');
const passport = ref<string>('');
const phoneNumber = ref<string>('');
const dob = ref<string>('');
const email = ref<string>('');
const isLoading = ref<boolean>(false);

const patientStore = usePatientStore();
const {t} = useI18n();

const activePatient = computed<Patient | null>(() => (patientStore.activePatient));
const lastErrors = computed<string[]>(() => (patientStore.lastErrors));
const searchPatient = async () => {
  isLoading.value = true;
  const result = await patientStore.searchPatient(passport.value, dob.value);
  isClientRequested.value = true;
  console.log(result);
  isClientFound.value = result;
  isLoading.value = false;
}

const createPatient = async () => {
  isLoading.value = true;
  const result = await patientStore.createPatient(firstName.value, lastName.value, passport.value, phoneNumber.value, dob.value, email.value);
  isClientFound.value = result;
  isHasErrors.value = !result;
  isLoading.value = false;
}

const isHasErrors = ref<boolean>(false);
const isClientRequested = ref<boolean>(false);
const isClientFound = ref<boolean>(false);


const clearForm = () => {
  firstName.value = '';
  lastName.value = '';
  passport.value = '';
  phoneNumber.value = '';
  dob.value = '';
  email.value = '';
  isClientRequested.value = false;
  isClientFound.value = false;
  patientStore.clearPatient();
}
</script>

<template>
  <div class="mb-3" v-if="!isClientRequested">
    <h3>{{ t('search_header') }}</h3>
    <form @submit.prevent="searchPatient">
      <div class="mb-3">
        <label for="passportInput" class="form-label">{{ t('passport.label') }}</label>
        <input type="text" class="form-control" id="passportInput" :placeholder="t('passport.placeholder')"
               v-model="passport">
      </div>
      <div class="mb-3">
        <label for="dobInput" class="form-label">{{ t('dob.label') }}</label>
        <input type="date" class="form-control" id="dobInput" v-model="dob">
      </div>
      <div class="mb-3">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="submit" class="btn btn-primary">{{ t('search_button') }}</button>
          <button type="button" class="btn btn-outline-secondary" @click="clearForm">{{
              t('clear_button')
            }}
          </button>
        </div>
      </div>
    </form>
  </div>
  <div class="mb-3" v-if="isClientRequested && !isClientFound">
    <h3>{{ t('Create patient:') }}</h3>
    <form @submit.prevent="createPatient">
      <div class="mb-3">
        <label for="firstNameInput" class="form-label">{{ t('first_name.label') }}</label>
        <input type="text" class="form-control" id="firstNameInput" :placeholder="t('first_name.placeholder')"
               v-model="firstName">
      </div>
      <div class="mb-3">
        <label for="lastNameInput" class="form-label">{{ t('last_name.label') }}</label>
        <input type="text" class="form-control" id="lastNameInput" :placeholder="t('last_name.placeholder')"
               v-model="lastName">
      </div>
      <div class="mb-3">
        <label for="passportInput" class="form-label">{{ t('passport.label') }}</label>
        <input type="text" class="form-control" id="passportInput" :placeholder="t('passport.placeholder')"
               v-model="passport">
      </div>
      <div class="mb-3">
        <label for="phonetInput" class="form-label">{{ t('phone_number.label') }}</label>
        <input type="text" class="form-control" id="phonetInput" :placeholder="t('phone_number.placeholder')"
               v-model="phoneNumber">
      </div>
      <div class="mb-3">
        <label for="dobInput" class="form-label">{{ t('dob.label') }}</label>
        <input type="date" class="form-control" id="dobInput" v-model="dob">
      </div>
      <div class="mb-3">
        <label for="emailInput" class="form-label">{{ t('email.label') }}</label>
        <input type="email" class="form-control" id="emailInput" :placeholder="t('email.placeholder')"
               v-model="email">
      </div>
      <div class="mb-3" v-if="isHasErrors">
        <div class="alert alert-danger" role="alert">
          <ul>
            <li v-for="error of lastErrors" :key="error">{{ error }}</li>
          </ul>
        </div>
      </div>
      <div class="mb-3">
        <div class="btn-group" role="group">
          <button type="submit" class="btn btn-primary">Create</button>
          <button type="button" class="btn btn-outline-secondary" @click="clearForm">{{
              t('clear_button')
            }}
          </button>
        </div>
      </div>
    </form>
  </div>
  <div class="mb-3" v-if="isClientRequested && isClientFound && activePatient">
    <h3>{{ t('patient_header') }}</h3>
    <div class="mb-3" v-if="activePatient?.isRemoved || !activePatient?.isActive">
      <span class="badge rounded-pill text-bg-danger" v-if="activePatient?.isRemoved">{{ t('is_removed') }}</span>&nbsp;
      <span class="badge rounded-pill text-bg-danger" v-if="!activePatient?.isActive">{{ t('is_banned') }}</span>
    </div>
    <div class="mb-3">
      <h5>{{ activePatient?.firstName }} {{ activePatient?.lastName }}</h5>
      <h5>{{ activePatient?.id }}</h5>
    </div>
    <div class="mb-3" v-if="activePatient?.isRemoved">
      <h5>{{ t('remove_reason') }}</h5>
      {{ activePatient?.removeReason }}
    </div>
    <div class="mb-3" v-if="!activePatient?.isActive">
      <h5>{{ t('ban_reason') }}</h5>
      {{ activePatient?.blockReason }}
    </div>
    <div class="mb-12">
      <button type="button" class="btn btn-warning" @click="clearForm">{{ t('close_patient') }}</button>
    </div>
  </div>
  <app-preloader v-if="isLoading"></app-preloader>
</template>

<style scoped>

</style>

<i18n>
{
  "en": {
    "search_header": "Search:",
    "first_name": {
      "label": "First name",
      "placeholder": "First name"
    },
    "last_name": {
      "label": "Last name",
      "placeholder": "Last name"
    },
    "passport": {
      "label": "Passport/ID",
      "placeholder": "Passport/ID"
    },
    "search_button": "Search",
    "clear_button": "Clear",
    "create_header": "Create patient:",
    "phone_number": {
      "label": "Phone number",
      "placeholder": "+37400000000"
    },
    "dob": {
      "label": "Date of birth"
    },
    "email": {
      "label": "Email",
      "placeholder": "Optional email"
    },
    "patient_header": "Patient:",
    "create_button": "Create",
    "is_removed": "Removed",
    "is_banned": "Banned",
    "remove_reason": "Remove reason",
    "ban_reason": "Ban reason",
    "close_patient": "Close patient"
  },
  "am": {
    "search_header": "Որոնում",
    "first_name": {
      "label": "Անուն",
      "placeholder": "Անուն"
    },
    "last_name": {
      "label": "Ազգանուն",
      "placeholder": "Ազգանուն"
    },
    "passport": {
      "label": "Հավասարականի/ID",
      "placeholder": "Հավասարականի/ID"
    },
    "search_button": "Որոնել",
    "clear_button": "Մաքրել",
    "create_header": "Ստեղծել հիվանդին:",
    "phone_number": {
      "label": "Հեռախոսահամար",
      "placeholder": "+37400000000"
    },
    "dob": {
      "label": "Ծննդյան ամսաթիվ"
    },
    "email": {
      "label": "Էլ․ հասցե",
      "placeholder": "Ընտրելանալը ընտրած չէ"
    },
    "patient_header": "Հիվանդ:",
    "create_button": "Ստեղծել",
    "is_removed": "Հեռացված",
    "is_banned": "Արգելված",
    "remove_reason": "Փակել հիվանդին",
    "ban_reason": "Արգելել հիվանդին",
    "close_patient": "Փակել հիվանդին"
  }
}
</i18n>
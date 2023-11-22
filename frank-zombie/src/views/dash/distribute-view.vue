<script setup lang="ts">

import AppHeader from "@/components/app-header.vue";
import {computed, ref} from "vue";
import AppPrepoader from "@/components/app-prepoader.vue";
import {type Patient, usePatientStore} from "@/stores/patient.store";

const firstName = ref<string>('');
const lastName = ref<string>('');
const passport = ref<string>('');
const phoneNumber = ref<string>('');
const dob = ref<string>('');
const email = ref<string>('');
const isLoading = ref<boolean>(false);

const patientStore = usePatientStore();

const activePatient = computed<Patient>(()=>(patientStore.activePatient));
const lastErrors = computed<string[]>(()=>(patientStore.lastErrors));
const searchPatient = async ()=>{
  isLoading.value = true;
  const result = await patientStore.searchPatient(firstName.value, lastName.value, passport.value);
  isClientRequested.value = true;
  console.log(result);
  isClientFound.value = result;
  isLoading.value = false;
}

const createPatient = async ()=>{
  isLoading.value = true;
  const result = await patientStore.createPatient(firstName.value, lastName.value, passport.value, phoneNumber.value, dob.value, email.value);
  isClientFound.value = result;
  isHasErrors.value = !result;
  isLoading.value = false;
}

const isHasErrors = ref<boolean>(false);
const isClientRequested = ref<boolean>(false);
const isClientFound = ref<boolean>(false);


const clearForm = ()=>{
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
  <app-header></app-header>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3" v-if="!isClientRequested">
        <h3>Search</h3>
        <form @submit.prevent="searchPatient">
          <div class="mb-3">
            <label for="firstNameInput" class="form-label">First name</label>
            <input type="text" class="form-control" id="firstNameInput" placeholder="First name" v-model="firstName">
          </div>
          <div class="mb-3">
            <label for="lastNameInput" class="form-label">Last name</label>
            <input type="text" class="form-control" id="lastNameInput" placeholder="Last name" v-model="lastName">
          </div>
          <div class="mb-3">
            <label for="passportInput" class="form-label">Passport/ID</label>
            <input type="text" class="form-control" id="passportInput" placeholder="Passport/ID" v-model="passport">
          </div>
          <div class="mb-3">
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
              <button type="submit" class="btn btn-primary">Search</button>
              <button type="button" class="btn btn-outline-secondary" @click="clearForm">Clear</button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-3" v-if="isClientRequested && !isClientFound">
        <h3>Create patient</h3>
        <form @submit.prevent="createPatient">
          <div class="mb-3">
            <label for="firstNameInput" class="form-label">First name</label>
            <input type="text" class="form-control" id="firstNameInput" placeholder="First name" v-model="firstName">
          </div>
          <div class="mb-3">
            <label for="lastNameInput" class="form-label">Last name</label>
            <input type="text" class="form-control" id="lastNameInput" placeholder="Last name" v-model="lastName">
          </div>
          <div class="mb-3">
            <label for="passportInput" class="form-label">Passport/ID</label>
            <input type="text" class="form-control" id="passportInput" placeholder="Passport/ID" v-model="passport">
          </div>
          <div class="mb-3">
            <label for="phonetInput" class="form-label">Phone number</label>
            <input type="text" class="form-control" id="phonetInput" placeholder="+37400000000" v-model="phoneNumber">
          </div>
          <div class="mb-3">
            <label for="dobInput" class="form-label">Email</label>
            <input type="date" class="form-control" id="dobInput" placeholder="Optional email" v-model="dob">
          </div>
          <div class="mb-3">
            <label for="emailInput" class="form-label">Email</label>
            <input type="email" class="form-control" id="emailInput" placeholder="Optional email" v-model="email">
          </div>
          <div class="mb-3" v-if="isHasErrors">
            <div class="alert alert-danger" role="alert">
              <ul>
                <li v-for="error of lastErrors">{{error}}</li>
              </ul>
            </div>
          </div>
          <div class="mb-3">
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
              <button type="submit" class="btn btn-primary">Create</button>
              <button type="button" class="btn btn-outline-secondary" @click="clearForm">Clear</button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-3" v-if="isClientRequested && isClientFound && activePatient">
        <h3>Patient:</h3>
        <div class="mb-3">
          <span class="badge rounded-pill text-bg-danger" v-if="activePatient.isRemoved">Removed</span>&nbsp;
          <span class="badge rounded-pill text-bg-danger" v-if="!activePatient.isActive">Banned</span>
        </div>
        <div class="mb-3">
          <h5>{{activePatient.id}}</h5>
        </div>
        <div class="mb-3" v-if="patientStore.activePatient.isRemoved">
          <h5>Remove reason</h5>
          {{activePatient.removeReason}}
        </div>
        <div class="mb-3" v-if="!patientStore.activePatient.isActive">
          <h5>Ban reason</h5>
          {{activePatient.banReason}}
        </div>
        <div class="mb-12">
          <button type="button" class="btn btn-warning" @click="clearForm">Close patient</button>
        </div>
      </div>
      <div class="col-9 " v-if="isClientRequested && isClientFound">
        Here will be history and form to distribute goods
      </div>
    </div>
  </div>
  <app-prepoader v-if="isLoading"></app-prepoader>
</template>

<style scoped>

</style>
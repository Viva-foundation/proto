<script setup lang="ts">

import MedicationDistributeHistory from "@/components/medication-distribute-history.vue";
import {computed, ref} from "vue";
import {usePatientStore} from "@/stores/patient.store";
import {useMedicationStore} from "@/stores/medication.store";
import AppPreloader from "@/components/app-preloader.vue";

const filterTo = ref<Date>(new Date());
const filterFrom = ref<Date>(new Date(filterTo.value.getTime()-24*180*60*60*1000));

const patientStore = usePatientStore();
const medicationStore = useMedicationStore();

const activeTab = ref<number>(0);
const tabTo = (tab:number)=>{
  activeTab.value = tab;
}


const activeSelect = ref<Map<string,{name:string,unit:string,count:number}>>(new Map())


const selectedTemplate = ref<string>('0');
const loadTemplate = ()=>{
  if(selectedTemplate.value==='1'){
    activeSelect.value.clear();
    activeSelect.value.set('cb420223-bbad-445e-970e-c5da2e12d7b7',{name:'Contour Plus',unit:'pack',count:1})
    activeSelect.value.set('ff5d430a-201c-479d-92cc-5ad4699e0ded',{name:'Strips (200 pc)', unit:'box',count:4})
    activeSelect.value.set('07ef0e90-3058-4154-9737-7845442e1423',{name:'Needles',unit:'item',count:800})
  }
  if(selectedTemplate.value==='2') {
    activeSelect.value.clear();
    activeSelect.value.set('ff5d430a-201c-479d-92cc-5ad4699e0ded', {name: 'Strips (200 pc)', unit: 'box', count: 4})
    activeSelect.value.set('07ef0e90-3058-4154-9737-7845442e1423', {name: 'Needles', unit: 'item', count: 800})
  }
}

const templateDescription = computed(()=>{
  if(selectedTemplate.value==='1'){
    return 'One ContourPlus + 4 box of Strips (800 in total) + 800 Needles'
  }
  if(selectedTemplate.value==='2'){
    return '4 box of Strips (800 in total) + 800 Needles'
  }
  return ''
});

const removeSelectedItem = (id:string)=>{
  activeSelect.value.delete(id);
}

const giveAllAndClear = async ()=>{
  const medications:{
    medication: string;
    quantity: number;
  }[] = [];

  activeSelect.value.forEach((value,key)=>{
    medications.push({
      medication: key,
      quantity: value.count
    })
  })
  await medicationStore.distributeMedication(patientStore.activePatient?.id, medications);
  selectedTemplate.value = '0';
  activeSelect.value.clear();
  tabTo(0);
}

const searchQuery = ref<string>('');
const searchResults = ref<{id:string, name:string, unit:string, pack_size:number}[]>([]);

const searchMedications = async ()=>{
  searchResults.value = await medicationStore.searchMedications(searchQuery.value);
}

const addSelect = (id:string, data:{name:string,unit:string,count:number})=>{
  activeSelect.value.set(id,data);
  searchResults.value = [];
  searchQuery.value = '';
}
</script>

<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a :class="{'nav-link':true,active:activeTab===0}" href="#" @click.prevent="tabTo(0)">History</a>
    </li>
    <li class="nav-item">
      <a :class="{'nav-link':true,active:activeTab===1}" href="#"  @click.prevent="tabTo(1)">Give medications</a>
    </li>
  </ul>
  <div class="container-fluid" v-if="activeTab===0">
    <div class="row">
      <div class="col12" v-if="patientStore.activePatient">
        <h3>180 days activity</h3>
        <medication-distribute-history :to="filterTo" :from="filterFrom" :patient-id="patientStore.activePatient?.id"/>
      </div>
    </div>
  </div>
  <div class="container-fluid" v-if="activeTab===1">
    <div class="row">
      <div class="col12">
        <h3>Give medications</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-7">
        <h5>Search</h5>
        <form @submit.prevent="searchMedications">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Search medication" v-model="searchQuery">
            <button class="btn btn-outline-secondary" type="submit">Search</button>
          </div>
        </form>
        <div class="list-group">
          <a href="#" class="list-group-item list-group-item-action" v-for="medication in searchResults" :key="medication.id">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{medication.name}}</h5>
              <small>{{medication.unit}}</small>
            </div>
            <p class="mb-1">Pack size: {{medication.pack_size}}</p>
            <button class="btn btn-primary" type="button" @click="addSelect(medication.id,{name:medication.name,unit:medication.unit,count:medication.pack_size})">Add</button>
          </a>
        </div>
      </div>
      <div class="col-5">
        <h5>Prepared sets {{selectedTemplate}}</h5>
        <form @submit.prevent="loadTemplate">
          <div class="input-group mb-3">
              <select class="form-select" v-model="selectedTemplate">
                <option value="0">Open this select menu</option>
                <option value="1">ContourPlus + Strips + Needles</option>
                <option value="2">Strips + Needles </option>
              </select>
              <button class="btn btn-outline-secondary" :disabled="selectedTemplate=='0'" type="submit">Load</button>
          </div>
        </form>
        <div class="alert alert-info" role="alert" v-if="templateDescription">
          {{templateDescription}}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <table class="table table-striped">
            <thead>
            <tr>
              <th>Medication</th>
              <th>unit</th>
              <th width="200">Amount</th>
              <th width="100">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="line in activeSelect" :key="line[0]">
              <td>{{line[1].name}}</td>
              <td>{{line[1].unit}}</td>
              <td>
                <input class="form-control" v-model="line[1].count">
              </td>
              <td>
                <button class="btn btn-danger" type="button" @click="removeSelectedItem(line[0])">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
    <div class="row">
      <div class="col-12 right">
        <button class="btn btn-primary" @click="giveAllAndClear">Give all medications</button>
      </div>
    </div>
  </div>

</template>

<style scoped>
.right{
  text-align: right;
}
</style>
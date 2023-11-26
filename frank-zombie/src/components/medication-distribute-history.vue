<script setup lang="ts">
import type {PropType} from "vue";
import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {type MedicationHistoryPage, type MedicationHistoryPageOptions, useMedicationStore} from "@/stores/medication.store";

const props = defineProps({
  from: {
    type: Object as PropType<Date>,
    required: true
  },
  to: {
    type: Object as PropType<Date>,
    required: true
  },
  patientId: {
    type: String,
    required: false
  },
  userId: {
    type: String,
    required: false
  },
  medicationId: {
    type: String,
    required: false
  }
})

const limit = ref<number>(50);
const offset = ref<number>(0);

const makeRequest = ():MedicationHistoryPageOptions=>{
  const options:MedicationHistoryPageOptions = {
    from: props.from,
    to: props.to,
    limit: limit.value,
    offset: offset.value
  }
  if(props.patientId){
    options.patient_id = props.patientId
  }
  if(props.userId){
    options.user_id = props.userId
  }
  if(props.medicationId){
    options.medication_id = props.medicationId
  }
  return options;
}

const medicationStore = useMedicationStore();

const historyPage = computed<MedicationHistoryPage|null>(() => (medicationStore.historyPage));

const dateView = (date_num:number):string=>{
  const date = new Date(date_num);
  return date.toLocaleDateString();
}

watch(props, async () => {
  await medicationStore.loadHistoryPage(makeRequest())
})

onMounted(async () => {
  await medicationStore.loadHistoryPage(makeRequest())
})

onBeforeUnmount(async ()=>{
  await medicationStore.clearHistoryPage()
})
</script>

<template>
  <table class="table table-striped" v-if="historyPage&&historyPage.total">
    <thead>
    <tr>
      <th>Date</th>
      <th v-if="!medicationId">Medication</th>
      <th>Quantity</th>
      <th v-if="!userId">Given by</th>
      <th v-if="!patientId">Given to</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="row in historyPage.data" :key="row.id">
        <td>{{dateView(row.date)}}</td>
        <td v-if="!medicationId">{{row.medication_name}}</td>
        <td>{{row.quantity}}</td>
        <td v-if="!userId">{{row.user_name}}</td>
        <td v-if="!patientId">{{row.patient_id}}</td>
      </tr>
    </tbody>
  </table>
  <div class="center" v-else> No data was found</div>
</template>

<style scoped>
.center{
  text-align: center;
  padding: 16px;
  box-sizing: border-box;
  font-size: 24px;
}
</style>
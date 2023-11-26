<script setup lang="ts">
import MedicationDistributeHistory from "@/components/medication-distribute-history.vue";
import {ref} from "vue";
const filterTo = ref<Date>(new Date());
const filterFrom = ref<Date>(new Date(filterTo.value.getTime()-24*180*60*60*1000));
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>Dashboard</h1>
        <medication-distribute-history :to="filterTo" :from="filterFrom"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
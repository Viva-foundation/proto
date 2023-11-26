<script setup lang="ts">
import AppHeader from "@/components/app-header.vue";
import GuardComponent from "@/components/guard-component.vue";
import AppPreloader from "@/components/app-preloader.vue";
import {useMedicationStore} from "@/stores/medication.store";

const medicationStore = useMedicationStore();
</script>

<template>
  <guard-component>
    <app-header></app-header>
    <div class="container-fluid">
      <RouterView></RouterView>
    </div>
  </guard-component>
  <app-preloader v-if="medicationStore.isLoading"></app-preloader>
</template>

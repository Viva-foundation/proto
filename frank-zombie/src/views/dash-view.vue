<script setup lang="ts">
import AppHeader from "@/components/app-header.vue";
import GuardComponent from "@/components/guard-component.vue";
</script>

<template>
  <guard-component>
    <app-header></app-header>
    <div class="container-fluid">
      <RouterView></RouterView>
    </div>
  </guard-component>
</template>

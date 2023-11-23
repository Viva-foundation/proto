<script setup lang="ts">
import {useAuthStore} from "@/stores/auth.store";

const authStore = useAuthStore();
</script>

<template>
<div class="guard-component" v-if="authStore.getIsAuth">
  <slot></slot>
</div>
<div class="guard-component no-login" v-else>
</div>
</template>

<style scoped>

</style>
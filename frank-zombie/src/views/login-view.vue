<script setup lang="ts">
import {ref} from "vue";
import {useAuthStore} from "@/stores/auth.store";
import {useRouter} from "vue-router";
import AppPrepoader from "@/components/app-prepoader.vue";

const login = ref<string>('');
const password = ref<string>('');
const isLoading = ref<boolean>(false);
const hasError = ref<boolean>(false);

const router = useRouter();

const authStore = useAuthStore();
const onLogin = async () => {
  isLoading.value = true;
  hasError.value = false;
  const loginResult = await authStore.makeLogin(login.value, password.value);
  if (loginResult) {
    await router.push({name: 'dash'});
    return
  }
  isLoading.value = false;
  hasError.value = true;
}
</script>

<template>
<div class="center-login">
  <form class="row g-3" @submit.prevent="onLogin">
    <div class="mb-3">
      <label for="formGroupExampleInput" class="form-label">Email</label>
      <input type="text" :class="{'form-control':true, 'is-invalid':hasError}" id="formGroupExampleInput" v-model="login">
    </div>
    <div class="mb-3">
      <label for="formGroupExampleInput2" class="form-label">Password</label>
      <input type="password" :class="{'form-control':true, 'is-invalid':hasError}" id="formGroupExampleInput2" v-model="password">
      <div class="invalid-feedback">
        Wrong user or password
      </div>
    </div>
    <div class="mb-3">
      <button type="submit" class="btn btn-primary">Login</button>
    </div>
  </form>
</div>
<app-prepoader v-if="isLoading"></app-prepoader>
</template>

<style scoped>
.center-login{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
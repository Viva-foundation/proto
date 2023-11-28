<script setup lang="ts">
import {ref} from "vue";
import {useAuthStore} from "@/stores/auth.store";

const oldPassword = ref<string>('');
const newPassword = ref<string>('');
const repeatPassword = ref<string>('');

const authStore = useAuthStore();
const changePassword = async () => {
  if (newPassword.value !== repeatPassword.value) {
    alert('Passwords are not equal');
    return;
  }
  const result = await authStore.changePassword(oldPassword.value, newPassword.value);
  if (result) {
    alert('Password changed');
  } else {
    alert('Password not changed');
  }
  oldPassword.value = '';
  newPassword.value = '';
  repeatPassword.value = '';
}
</script>

<template>
<div class="container-fluid">
  <div class="row">
    <div class="col-12">
      <h1>Settings</h1>
    </div>
  </div>
  <div class="row">
    <div class="col-3 mb-3">

      <form @submit.prevent="changePassword">
        <h4>Change password</h4>
        <div class="mb-3">
          <label for="oldPasswordInput" class="form-label">Old password</label>
          <input type="password" class="form-control" id="oldPasswordInput" v-model="oldPassword">
        </div>
        <div class="mb-3">
          <label for="newPasswordInput" class="form-label">New password</label>
          <input type="password" class="form-control" id="newPasswordInput" v-model="newPassword">
        </div>
        <div class="mb-3">
          <label for="repeatPasswordInput" class="form-label">Repeat password</label>
          <input type="password" class="form-control" id="repeatPasswordInput" v-model="repeatPassword">
        </div>
        <button type="submit" class="btn btn-primary">Change password</button>
      </form>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
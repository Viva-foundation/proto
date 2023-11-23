<script setup lang="ts">
import {ref} from "vue";
import {useAuthStore} from "@/stores/auth.store";
import {useRouter} from "vue-router";
import AppPrepoader from "@/components/app-preloader.vue";
import {useI18n} from "vue-i18n";

const login = ref<string>('');
const password = ref<string>('');
const isLoading = ref<boolean>(false);
const hasError = ref<boolean>(false);

const router = useRouter();

const { t } = useI18n();

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
      <label for="formGroupExampleInput" class="form-label">{{ t('email') }}</label>
      <input type="text" :class="{'form-control':true, 'is-invalid':hasError}" id="formGroupExampleInput" v-model="login">
    </div>
    <div class="mb-3">
      <label for="formGroupExampleInput2" class="form-label">{{ t('password')}}</label>
      <input type="password" :class="{'form-control':true, 'is-invalid':hasError}" id="formGroupExampleInput2" v-model="password">
      <div class="invalid-feedback">
        {{ t('wrong_user_or_password') }}
      </div>
    </div>
    <div class="mb-3">
      <button type="submit" class="btn btn-primary">{{ t('login_action') }}</button>
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

<i18n>
{
  "en": {
    "email": "Email",
    "password": "Password",
    "wrong_user_or_password": "Wrong user or password",
    "login_action": "Login"
  },
  "am": {
    "email": "Էլ․ հասցե",
    "password": "Գաղտնաբառ",
    "wrong_user_or_password": "Սխալ օգտվող կամ գաղտնաբառ",
    "login_action": "Մուտք"
  }
}
</i18n>
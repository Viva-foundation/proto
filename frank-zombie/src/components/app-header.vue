<script setup lang="ts">
import {useI18n} from "vue-i18n";
const { t } = useI18n();
</script>

<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">{{t('brand')}}</a>
    <button class="navbar-toggler"
            type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/dash">{{ t('home_page') }}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/dash/distribute">{{ t('search_page') }}</a>
        </li>

      </ul>
      <div>
        <a class="btn btn-outline-success" href="/dash/settings">Settings</a>
      </div>
    </div>
  </div>
</nav>
</template>

<style scoped>

</style>

<i18n>
{
  "en": {
    "brand": "Viva-med",
    "home_page": "Home",
    "search_page": "Search"
  },
  "am": {
    "brand": "Viva-med",
    "home_page": "Գլխավոր",
    "search_page": "Որոնում"
  }
}
</i18n>

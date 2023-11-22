<script setup lang="ts">

</script>

<template>
  <div class="preloader" >
    <div>Loading...</div>
  </div>
</template>

<style scoped>
.preloader{
  position: fixed;
  left: 0;
  right: 0;
  top:0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999999;
}
</style>
<template>
  <div class="wrapper">
    <GyGeader />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import GyGeader from './components/GyHeader.vue'
import {onMounted} from 'vue'
onMounted(() => {
})
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  background: rgb(250, 250, 250);
  border-left: 1px solid rgb(225, 225, 225);
  border-right: 1px solid rgb(225, 225, 225);
}
</style>

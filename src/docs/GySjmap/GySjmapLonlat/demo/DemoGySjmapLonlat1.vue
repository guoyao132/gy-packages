<template>
  <SjmapCon>
    <GySjmap-lonlat
    @getLonlat="getLonlat"/>
  </SjmapCon>
</template>
<script setup lang="ts">
import SjmapCon from '@/components/SjmapCon.vue'
const getLonlat = (lonlat:string) => {
  console.log(lonlat);
}
</script>

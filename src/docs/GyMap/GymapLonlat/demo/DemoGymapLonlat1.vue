<template>
  <MapCon>
    <Gymap-lonlat
    @getLonlat="getLonlat"/>
  </MapCon>
</template>
<script setup lang="ts">
import MapCon from '@/components/MapCon.vue'
const getLonlat = (lonlat:string) => {
  console.log(lonlat);
}
</script>

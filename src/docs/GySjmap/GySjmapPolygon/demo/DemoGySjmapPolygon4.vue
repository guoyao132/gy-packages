<template>
  <SjmapCon id="map4">
    <GymapLine
      :positionList="lineList"
      :animate="true"
      :loop="true"
      :step="0.001"
    />
  </SjmapCon>
</template>
<script setup lang="ts">
import SjmapCon from '@/components/SjmapCon.vue'
import {ref} from 'vue'
const lineList = ref([
  [116.400476,39.899306],
  [116.411226,39.899306],
  [116.411226,39.893075],
  [116.400476,39.893075],
  [116.400476,39.899306],
])
</script>

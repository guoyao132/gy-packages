<template>
  <SjmapCon id="map2">
    <GySjmapPolygon
      :positionList="positionList"
      imgSrc="/lineImg.png"
    />
  </SjmapCon>
</template>

<script setup lang="ts">
import SjmapCon from '@/components/SjmapCon.vue'
import {ref} from 'vue'
import type {Ref} from 'vue'
const positionList:Ref<number[][]> = ref([
  [116.400476,39.899306],
  [116.411226,39.899306],
  [116.411226,39.893075],
  [116.400476,39.893075],
  [116.400476,39.899306],
])
</script>

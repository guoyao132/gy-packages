<template>
  <SjmapCon id="map2">
    <GySjmapLine
      :positionList="lineList"
      :lineWidth="10"
      imgSrc="/lineImg.png"
    />
  </SjmapCon>
</template>

<script setup lang="ts">
import SjmapCon from '@/components/SjmapCon.vue'
import {ref} from 'vue'
import type {Ref} from 'vue'
const lineList:Ref<number[][]> = ref([
  [116.400476,39.899306],
  [116.411226,39.899306],
  [116.411226,39.893075],
  [116.400476,39.893075],
  [116.400476,39.899306],
])
</script>

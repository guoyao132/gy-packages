<template>
  <SjmapCon>
    <GySjmapHeat
      :heatData="positionList"
    />
  </SjmapCon>
</template>

<script setup lang="ts">
import SjmapCon from '@/components/SjmapCon.vue';
import {ref} from 'vue'
import type {Ref} from 'vue'
const positionList:Ref<number[][]> = ref([
  [116.400476,39.899306, 0.51],
  [116.411226,39.899306, 3],
  [116.411226,39.893075, 1],
  [116.400476,39.893075, 100],
])
</script>

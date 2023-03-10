<template>
  <SjmapCon>
    <GySjmapPolygon
      :positionList="positionList"
      fillColor="blue"
      @clickFun="clickFun"
    />
  </SjmapCon>
</template>

<script setup lang="ts">
import SjmapCon from '@/components/SjmapCon.vue'
import {ref} from 'vue'
import type {Ref} from 'vue'
const positionList:Ref<number[][]> = ref([
  [116.403322, 39.920255],
  [116.410703, 39.897555],
  [116.402292, 39.892353],
  [116.389846, 39.891365]
])
const clickFun  = () => {
  console.log(123);
}
</script>

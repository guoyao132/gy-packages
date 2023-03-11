<template>
  <SjmapCon id="map3">
    <GySjmapText
      :position="p"
      text="aaaaaAAAAA"
      @clickFun="clickFun"
      ref="textCon"
    />
  </SjmapCon>
</template>

<script setup lang="ts">
import SjmapCon from '@/components/SjmapCon.vue'
import {ref, onMounted, computed} from "vue"
const p = ref([116.40803281576643,39.893935171491535]);
const clickFun  = () => {
  console.log(123);
}
const textCon = ref(null)
onMounted(() => {
})

import {gySjMap} from "gy-sjmap";
import type {gySjmapType} from 'gy-sjmap'
import {watch} from "vue"
const gySjmapObj:Ref<UnwrapRef<gySjmapType>> | null = gySjMap('map2'); //mapId可不填， 当有多个地图是可以通过传入对应的ID，获取对应地图的实例。
const mapFinish:Ref<boolean> = computed(() => gySjmapObj.value && gySjmapObj.value.mapFinish);
watch(mapFinish, n => {
  //n === true
  //map filish
  const mapObj = gySjmapObj.value;
  mapObj.map.setZoom(18)
})
//或者使用computed获取
const mapObj = computed(() => gySjmapObj.value && gySjmapObj.value.map);
</script>

<template>
  <SjmapCon id="map2">
    <GySjmapImage
      :position="[116.40803281576643,39.893935171491535]"
      imgSrc="/logo.png"
      @clickFun="clickFun"
    />
  </SjmapCon>
</template>

<script setup lang="ts">
import SjmapCon from '@/components/SjmapCon.vue'
const clickFun  = () => {
  console.log(123);
}
</script>

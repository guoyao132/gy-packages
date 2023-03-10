<template>
  <SjmapCon>
    <GySjmapCircle
      :position="[116.40803281576643,39.893935171491535]"
      :circleOpacity="0.5"
      :circleRadius="20"
      @clickFun="clickFun"
    />

  </SjmapCon>
</template>

<script setup lang="ts">
import SjmapCon from '@/components/SjmapCon.vue'
const clickFun = () => {
  console.log(123)
}
</script>

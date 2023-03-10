<template>
  <div class="gy-map-con">
    <GySjmap
      :id="id"
      :mapOpt="mapOpt"
      :zoom="zoom"
      :center="center"
      :layerOpacity="layerOpacity"
      :bearing="bearing"
      :pitch="pitch"
    >
      <slot></slot>
    </GySjmap>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue'
const mapOpt = reactive({
  // extent: [
  //   [116.39556991989343,39.88100558616222],
  //   [116.42038561406821,39.905489158225635],
  // ],
  // minZoom: 14,
  // maxZoom: 16,
})
let center = ref([116.40803281576643,39.893935171491535]);
const zoom = ref(14);
const layerOpacity = ref(1);
const bearing = ref(0);
const pitch = ref(0);

defineProps({
  id: {
    type: String,
    default: 'map'
  }
})
</script>

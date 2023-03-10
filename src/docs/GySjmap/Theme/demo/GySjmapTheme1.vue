<template>
  <div class="gy-map-con">
    <GySjmap
      id="map"
      :mapOpt="mapOpt"
      :zoom="zoom"
      :center="center"
    >
      <slot></slot>
    </GySjmap>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue'
import theme from './theme'
const mapOpt = reactive({
  styleType: theme,
})
let center = ref([116.40803281576643,39.893935171491535]);
const zoom = ref(14);
</script>

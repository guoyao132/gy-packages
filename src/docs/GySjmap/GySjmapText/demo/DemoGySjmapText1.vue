<template>
  <SjmapCon>
    <GySjmapText
      :position="p"
      text="AAAA"
    />
  </SjmapCon>
</template>

<script setup lang="ts">
import SjmapCon from '@/components/SjmapCon.vue'
import {ref} from "vue"
const p = ref([116.40803281576643,39.893935171491535]);
</script>

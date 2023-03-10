<template>
  <SjmapCon>
    <GySjmap-html
      :position="position">
      <div class="con"></div>
    </GySjmap-html>
  </SjmapCon>
</template>

<script setup lang="ts">
import SjmapCon from '@/components/SjmapCon.vue'
import {ref} from 'vue'
const position = ref([116.40803281576643,39.893935171491535]);
</script>
<style>
.con{
  width: 100px;
  height: 100px;
  background: #f00;
}
</style>

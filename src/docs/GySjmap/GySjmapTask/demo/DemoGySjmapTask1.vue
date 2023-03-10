<template>
  <SjmapCon>
    <GySjmapTask
      :positionList="positionList"
      :step="0.01"
    >
      <GySjmapText
        :position="p"
        text="aaaaaAAAAA"
      />
    </GySjmapTask>
    <GySjmapTask
      :positionList="positionList"
      :step="0.001"
      :loop="true"
    >
      <GySjmap-html
        :position="p">
        <div class="con"></div>
      </GySjmap-html>
    </GySjmapTask>
  </SjmapCon>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import type {Ref} from 'vue'
const positionList:Ref<number[][]> = ref([
  [116.400476,39.899306],
  [116.411226,39.899306],
  [116.411226,39.893075],
  [116.400476,39.893075],
  [116.400476,39.899306],
])
const p = ref([116.40803281576643,39.893935171491535]);

</script>
<style lang="less">
.con{
  width: 100px;
  height: 100px;
  background: #fff;
}
</style>

<template></template>
<script lang="ts">
import {defineComponent, onMounted, onBeforeUnmount, getCurrentInstance, watch} from 'vue-demi'
import type {defineComponent as defineComponentOption} from 'vue-demi'
import CreateImageLayer ,{layerProps} from "../../../hooks/createLayer/CreateImageLayer";
export default defineComponent({
  name: 'GySjmapImage',
  props: {
    ...layerProps,
  },
  emits: ['clickFun'],
  setup(props, {emit}){
    const {proxy} = getCurrentInstance();
    const mapId:string = proxy.$parent.id;
    let layerObj:CreateImageLayer = null;
    onMounted(() => {
      layerObj = new CreateImageLayer(mapId, props, emit);
      watch(layerObj.finishDraw, () => {
        const runTask = proxy.$parent.runTask;
        if(runTask){
          runTask(layerObj, props)
        }
      })
    })
    const destory = () => {
      layerObj.destory();
      layerObj = null;
    }
    onBeforeUnmount(() => {
      destory();
      const destoryTask = proxy.$parent.destory;
      if(destoryTask){
        destoryTask()
      }
    })
  }
} as defineComponentOption)
</script>

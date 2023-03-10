<template></template>
<script lang="ts">
import {defineComponent, onMounted, onBeforeUnmount, getCurrentInstance, watch} from 'vue-demi'
import type {defineComponent as defineComponentOption} from 'vue-demi'
import CreateTextLayer ,{layerProps} from "../../../hooks/createLayer/CreateTextLayer";
export default defineComponent({
  name: 'GySjmapText',
  props: {
    ...layerProps,
  },
  emits: ['clickFun'],
  setup(props, {emit}){
    const {proxy} = getCurrentInstance();
    const mapId:string = proxy.$parent.id;
    let layerObj:CreateTextLayer = null;
    onMounted(() => {
      layerObj = new CreateTextLayer(mapId, props, '', emit);
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
    return {
      layerObj
    };
  }
} as defineComponentOption)
</script>

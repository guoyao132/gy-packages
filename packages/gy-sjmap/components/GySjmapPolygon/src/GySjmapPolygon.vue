<template></template>
<script lang="ts">
import {defineComponent, onMounted, onBeforeUnmount, getCurrentInstance} from 'vue-demi'
import type {defineComponent as defineComponentOption} from 'vue-demi'
import CreatePolygonLayer ,{layerProps} from "../../../hooks/createLayer/CreatePolygonLayer";
import CreateTextLayer from "../../../hooks/createLayer/CreateTextLayer";
import {TURF} from '../../../index'
export default defineComponent({
  name: 'GySjmapPolygon',
  props: {
    ...layerProps,
  },
  emits: ['clickFun'],
  setup(props, {emit}){
    const {proxy} = getCurrentInstance();
    const mapId:string = proxy.$parent.id;
    let layerObj:CreatePolygonLayer = null;
    let layerTextObj:CreateTextLayer = null;
    onMounted(() => {
      layerObj = new CreatePolygonLayer(mapId, props, emit);
      if(props.text){
        layerTextObj = new CreateTextLayer(mapId, {
          layout: props.layout,
          textSize: props.layout['text-size'] || 20,
          ...props.paint,
          text: props.text,
          position: props.textType === 'Polygon' ? [props.positionList] : props.positionList,
        }, props.textType);
      }
      const runTask = proxy.$parent.runTask;
      if(runTask){
        runTask(layerObj, props)
      }
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

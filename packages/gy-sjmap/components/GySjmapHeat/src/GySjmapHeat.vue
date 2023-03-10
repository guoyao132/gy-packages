<template></template>
<script lang="ts">
import {defineComponent, onMounted, onBeforeUnmount, getCurrentInstance, watch} from 'vue-demi'
import type {defineComponent as defineComponentOption} from 'vue-demi'
import CreateHeatLayer ,{layerProps} from "../../../hooks/createLayer/CreateHeatLayer";
export default defineComponent({
  name: 'GySjmapHeat',
  props: {
    ...layerProps,
  },
  setup(props){
    const {proxy} = getCurrentInstance();
    const mapId:string = proxy.$parent.id;
    let layerObj:CreateHeatLayer = null;
    onMounted(() => {
      layerObj = new CreateHeatLayer(mapId, props);
    })
    const destory = () => {
      layerObj.destory();
      layerObj = null;
    }
    onBeforeUnmount(() => {
      destory();
    })
    return {
      layerObj
    };
  }
} as defineComponentOption)
</script>

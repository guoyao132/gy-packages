<template>
  <div
    :id="id"
    class="map divMap"
    tabindex="0"
    @mouseenter="mouseenterFun">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, onBeforeUnmount} from 'vue-demi'
import type {PropType, UnwrapRef, defineComponent as defineComponentOption} from 'vue-demi'
import {gySjMap} from "../../../index.ts";
import type {gySjmapType, MapOptType} from '../../../index'

export default defineComponent({
  name: 'GySjmap',
  props: {
    id: {
      type: String,
      default: 'map',
    },
    center: {
      type: Array as PropType<number[][]>,
      default: () => ([])
    },
    // 默认缩放层级
    zoom: {
      type: Number,
      default: 0,
    },
    // 地图倾斜角  0 - 60
    pitch: {
      type: Number,
      default: 0,
    },
    // 地图旋转角度
    bearing: {
      type: Number,
      default: 0,
    },
    mapOpt: {
      type: Object as PropType<MapOptType>,
      default: () => ({})
    },
    animDuration: {
      type: Number,
      default: 1000,
    },
  },
  setup(props) {
    const gySjmapObj: UnwrapRef<gySjmapType> | null = gySjMap(props.id).value;
    onMounted(() => {
      gySjmapObj.init(props.id, {
        ...props.mapOpt,
        zoom: props.zoom,
        centerPoint: props.center,
        pitch: props.pitch,
        bearing: props.bearing,
      })
    })
    const mouseenterFun = () => {
      const contentIdDom: HTMLElement | null = document.getElementById(props.id);
      if (contentIdDom) {
        contentIdDom.focus();
      }
    }
    watch([
      () => props.zoom,
      () => props.center,
      () => props.pitch,
      () => props.bearing,
    ], () => {
      gySjmapObj && gySjmapObj.map && gySjmapObj.map.easeTo({
        zoom: props.zoom,
        center: props.center,
        pitch: props.pitch,
        bearing: props.bearing,
        easing(t) {
          return t;
        },
        duration: props.animDuration,
      });
    })
    onBeforeUnmount(() => {
      gySjmapObj && gySjmapObj.destory();
    })
    return {
      id: props.id,
      gySjmapObj,
      mouseenterFun
    }
  }
} as defineComponentOption)
</script>

<style lang='less' scoped>
.divMap {
  position: relative;
  width: 100%;
  height: 100%;
  outline: none;
  overflow: hidden;

  :deep(.sgmap-canvas){
    outline: none;
  }
}

</style>
<style lang="less">
.sgmap-control-container{
  display: none;
}
</style>

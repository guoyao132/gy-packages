<template>
  <div :class="'GymapHtml ' + className" ref="htmlDom" style="display: none">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, watch, onBeforeUnmount, computed, getCurrentInstance} from 'vue-demi'
import type {Ref, PropType, UnwrapRef, defineComponent as defineComponentOption} from 'vue-demi'
import {gySjMap, SGMap} from "../../../index";
import type {gySjmapType} from '../../../index'
export default defineComponent({
  name: 'GySjmapHtml',
  props: {
    //位置
    position: {
      type: Array as PropType<number[]>,
      default: () => ([])
    },
    className: {
      type: String,
      default: '',
    },
  },
  setup(props){
    const htmlDom:Ref<HTMLElement | null> = ref(null)
    const {proxy} = getCurrentInstance();
    const mapId:string = proxy.$parent.id;
    const gySjmapObj:Ref<UnwrapRef<gySjmapType>> | null = gySjMap(mapId);
    const mapFinish:Ref<boolean> = computed(() => gySjmapObj.value && gySjmapObj.value.mapFinish);
    let isDraw:boolean = false;
    watch(mapFinish, () => {
      drawDom()
    })
    let htmlMarker:any = null;
    const drawDom = () => {
      if(mapFinish.value && !isDraw){
        isDraw = true;
        htmlMarker = new SGMap.Marker(htmlDom.value, { anchor: 'bottom' })
          .setLngLat(props.position)
          .addTo(gySjmapObj.value.map);
        htmlDom.value.style.display = 'block'
        const runTask = proxy.$parent.runTask;
        if(runTask){
          runTask(htmlMarker, props)
        }
      }
    }
    onMounted(() => {
      drawDom()
    })
    watch(() => props.position, p => {
      htmlMarker && htmlMarker.setLngLat(p)
    })
    onBeforeUnmount(() => {
      htmlMarker && htmlMarker.remove();
      const destoryTask = proxy.$parent.destory;
      if(destoryTask){
        destoryTask()
      }
    })
    return {
      htmlDom,
      mapId,
      gySjmapObj,
      mapFinish,
    }
  }
} as defineComponentOption)
</script>

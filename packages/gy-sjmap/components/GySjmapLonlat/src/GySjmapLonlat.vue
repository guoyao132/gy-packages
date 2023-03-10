<template>
  <div v-show="showCon" :class="['GySjmapLonlat-con', className]">
    {{ lonlat }}
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  watch,
  computed,
  ref,
} from 'vue-demi'
import type {
  Ref,
  UnwrapRef,
} from 'vue-demi'
import type {defineComponent as defineComponentOption} from 'vue-demi'
import {gySjMap} from "../../../index";
import type {gySjmapType} from '../../../index'
export default defineComponent({
  name: 'GySjmapLonlat',
  props: {
    showCon: {
      type: Boolean,
      default: true,
    },
    className: {
      type: String,
      default: '',
    },
  },
  emits: ['getLonlat'],
  setup(props, {emit}){
    const {proxy} = getCurrentInstance();
    const mapId:string = proxy.$parent.id;
    const gySjmapObj:Ref<UnwrapRef<gySjmapType>> | null = gySjMap(mapId);
    const mapFinish:Ref<boolean> = computed(() => gySjmapObj.value && gySjmapObj.value.mapFinish);
    let isOn:boolean = false;
    const lonlat:Ref<string> = ref('')
    const getLonLat = (e) => {
      lonlat.value = `${e.lngLat.lng},${e.lngLat.lat}`;
      emit('getLonlat', lonlat.value);
    }
    const addEvent = () => {
      if(mapFinish.value && !isOn){
        gySjmapObj.value.map.on('click', getLonLat)
      }
    }
    watch(mapFinish, () => {
      addEvent();
    })
    onMounted(() => {
      addEvent();
    })
    const destory = () => {
      gySjmapObj.value.map && gySjmapObj.value.map.off('click', getLonLat)
    }
    onBeforeUnmount(() => {
      destory();
    })
    return {
      className: props.className,
      lonlat
    }
  }
} as defineComponentOption)
</script>
<style lang="less" scoped>
.GySjmapLonlat-con{
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1;
}
</style>

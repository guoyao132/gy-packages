<template>
  <div id="panel" v-show="0"></div>
  <div id="city-area"></div>
</template>
<script lang="ts">
import {defineComponent, onMounted, onBeforeUnmount, getCurrentInstance, watch, computed} from 'vue-demi'
import type {defineComponent as defineComponentOption} from 'vue-demi'
import {gySjMap, SGMap} from "../../../index";

export default defineComponent({
  name: 'GySjmapPlaceSearch',
  props: {
    keywords: {
      type: String,
      default: ''
    },

    size: {
      type: Number,
      default: 10
    },
  },
  emits: ['getData'],
  setup(props, {emit}) {
    const {proxy} = getCurrentInstance();
    const mapId: string = proxy.$parent.id;
    const gySjmapObj = gySjMap(mapId);
    const mapFinish: Ref<boolean> = computed(() => gySjmapObj.value && gySjmapObj.value.mapFinish);
    let mapObj: object = {}
    let _placeSearchPlusTask = {}

    watch(mapFinish, n => {
      mapObj = gySjmapObj.value.map;
      initMap()
    })
    const initMap = () => {

    }

    watch(
        () => props.keywords, n => {
          console.log(n);
          search()
        })

    const search = () => {
      console.log(mapObj);

      SGMap.plugin("SGMap.PlaceSearchPlusTask").then(function (res) {
        _placeSearchPlusTask = new SGMap.PlaceSearchPlusTask({
          type: "", //搜索类型，暂时不需要
          city: "010",
          pageSize: props.size,
          map: mapObj,
          panel: 'panel',
          autoFitView: false,
        });

        _placeSearchPlusTask.search({
          keywords: props.keywords
        }).then(res => {
          console.log('success');
          console.log(res);
          emit('getData', res);

        }).catch(e => {
          console.log('error');
          emit('getData', e);

        });

      });


    }


    onMounted(() => {

    })
    const destory = () => {

    }
    onBeforeUnmount(() => {
      destory();

    })

    return {
      // layerObj
    };
  }
} as defineComponentOption)


</script>

<style lang="less" scoped>

:deep(.sgmap-place-pages) {
  display: none!important;
}
</style>

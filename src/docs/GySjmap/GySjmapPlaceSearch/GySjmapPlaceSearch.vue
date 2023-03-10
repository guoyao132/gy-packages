<template>
  <div class="GySjmapLonlat">
    <gy-title>GySjmapLonlat</gy-title>
<!--    <p class="sub-title">-->
<!--      获取鼠标点击的经纬度-->
<!--    </p>-->
    <gy-demo-box title="基础" :code="GySjmapPlaceSearch_Code">
      <GySjmapPlaceSearch
      />
    </gy-demo-box>
<!--    <p>-->
<!--      在点击后会出发getLonlat事件，可获取经纬度。-->
<!--    </p>-->
    <br/>
    <gy-title>属性</gy-title>
    <GyTable :tableData="propsData"/>

    <gy-title>事件</gy-title>
    <GyTable :tableData="eventData"/>
  </div>
</template>

<script setup lang="ts">
import {
  GySjmapPlaceSearch,
  GySjmapPlaceSearch_Code,
} from './demo'
import {ref} from 'vue'
const propsData = ref([
  {
    shuxing: 'keywords',
    shuoming: '搜索关键字',
    leixing: 'string',
  }
] as Array<TableData>);

const eventData = ref([
  {
    shuxing: 'getData',
    shuoming: '回调函数' ,
    // params: `MapsEvent对象`,

  }
] as Array<TableData>);

// export const eventTable = [
//   {
//     name: '',
//     shuoming: `
//     点击事件
//     `,
//     params: `
//     MapsEvent对象`,
//   },
// ]
</script>

<style lang='less' scoped>
  .GySjmapHtml{

  }
</style>

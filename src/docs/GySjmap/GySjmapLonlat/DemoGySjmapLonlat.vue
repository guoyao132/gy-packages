<template>
  <div class="GySjmapLonlat">
    <gy-title>GySjmapLonlat</gy-title>
    <p class="sub-title">
      获取鼠标点击的经纬度
    </p>
    <gy-demo-box title="基础" :code="DemoGySjmapLonlat1_Code">
      <DemoGySjmapLonlat1/>
    </gy-demo-box>
    <p>
      在点击后会出发getLonlat事件，可获取经纬度。
    </p>
    <br/>
    <gy-title>GySjmapLonlat 属性</gy-title>
    <GyTable :tableData="propsData"/>
  </div>
</template>

<script setup lang="ts">
import {
  DemoGySjmapLonlat1,
  DemoGySjmapLonlat1_Code,
} from './demo'
import {ref} from 'vue'
const propsData = ref([
  {
    shuxing: 'showCon',
    shuoming: '是否显示经纬度容器。',
    leixing: 'boolean',
  },
  {
    shuxing: 'className',
    shuoming: '给经纬度添加class',
    leixing: 'string',
  },
] as Array<TableData>);
</script>

<style lang='less' scoped>
  .GySjmapHtml{

  }
</style>

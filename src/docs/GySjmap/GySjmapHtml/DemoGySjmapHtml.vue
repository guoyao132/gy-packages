<template>
  <div class="GySjmapHtml">
    <gy-title>GySjmapHtml</gy-title>
    <p class="sub-title">
      将HTML绘制到地图中
    </p>
    <gy-demo-box title="基础" :code="DemoGySjmapHtml1_Code">
      <DemoGySjmapHtml1/>
    </gy-demo-box>
    <br/>
    <gy-title>GySjmapHtml 属性</gy-title>
    <GyTable
      :tableData="propsData"
    />
  </div>
</template>

<script setup lang="ts">
import {
  DemoGySjmapHtml1,
  DemoGySjmapHtml1_Code,
} from './demo/index'
import GyTable from '@/components/GyTable.vue'
import {ref} from 'vue'
const propsData = ref([
  {
    shuxing: 'position',
    shuoming: 'HTML所在位置 值为 [lon, lat] 经纬度组成的数组',
    leixing: 'Arrray<number>',
  },
  {
    shuxing: 'className',
    shuoming: '给容器添加class',
    leixing: 'string',
  },
] as Array<TableData>);
</script>

<style lang='less' scoped>
  .GySjmapHtml{

  }

</style>

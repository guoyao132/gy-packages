<template>
  <div class="DemoInit">
    <gy-title>GySjMap</gy-title>
    <p class="sub-title">
      主容器
    </p>
    <gy-demo-box title="初始化" :code="DemoGySjmap1_code">
      <DemoGySjmap1/>
    </gy-demo-box>
    <gy-title>GySjMap 属性</gy-title>
    <GyTable :tableData="propsData"/>
    <br>
    <gy-title>mapOpt 属性</gy-title>
    <GyTable :tableData="propsData1"/>
  </div>
</template>

<script setup lang="ts">
import {DemoGySjmap1, DemoGySjmap1_code} from "./demo";
import GyTable from '@/components/GyTable.vue'
import {ref} from 'vue'
const propsData = ref([
  {
    shuxing: 'id',
    shuoming: '地图容器的ID',
    leixing: 'string',
  },
  {
    shuxing: 'center',
    shuoming: '地图中心点 值为 [lon, lat] 经纬度组成的数组',
    leixing: 'Array<number>',
  },
  {
    shuxing: 'zoom',
    shuoming: '地图显示层级 范围为 1 - 18',
    leixing: 'number',
    kexuan: '1 - 18',
  },
  {
    shuxing: 'pitch',
    shuoming: ' 地图倾斜角  0 - 60',
    leixing: 'number',
    kexuan: '0 - 60',
  },
  {
    shuxing: 'bearing',
    shuoming: ' 地图旋转角度',
    leixing: 'number',
  },
  {
    shuxing: 'mapOpt',
    shuoming: `地图相关属性配置 见下表`,
    leixing: 'Object',
  },
] as Array<TableData>);
const propsData1 = ref([
  {
    shuxing: 'key',
    shuoming: '申请的appKey',
    leixing: 'string',
  },
  {
    shuxing: 'sn',
    shuoming: '申请的appSecret',
    leixing: 'string',
  },
  {
    shuxing: 'minZoom',
    shuoming: '地图最小层级  默认为 1 最小为1',
    leixing: 'number',
  },
  {
    shuxing: 'maxZoom',
    shuoming: '地图最大增肌  默认为 18 最大为18',
    leixing: 'number',
  },
  {
    shuxing: 'styleType',
    shuoming: `
    地图图层主题  0 地图  1 卫星图
    <br>
    或使用颜色对象。
    `,
    leixing: 'number | Object',
  },
  {
    shuxing: 'extent',
    shuoming: `
    地图范围  左下角与右上角顶点坐标组成的数组，
    <br>
    [[leftBottomLon, leftBottomLat], [rightTopLon, rightTopLat]]
    `,
    leixing: 'number[][]',
  },
  {
    shuxing: 'scrollZoom',
    shuoming: '是否允许滚轮缩放',
    leixing: 'boolean',
    moren: true,
  },
  {
    shuxing: 'dragRotate',
    shuoming: '是否允许旋转',
    leixing: 'boolean',
    moren: false,
  },
  {
    shuxing: 'dragPan',
    shuoming: '是否允许平移',
    leixing: 'boolean',
    moren: true,
  },
  {
    shuxing: 'keyboard',
    shuoming: '是否允许键盘操作',
    leixing: 'boolean',
    moren: false,
  },
  {
    shuxing: 'doubleClickZoom',
    shuoming: '是否双击缩放地图',
    leixing: 'boolean',
    moren: true,
  },
  {
    shuxing: 'localIdeographFontFamily',
    shuoming: '地图默认字体',
    leixing: 'boolean',
    moren: 'Microsoft YoHei',
  },
] as Array<TableData>);
</script>

<style lang='less' scoped>
.DemoInit {

}

</style>

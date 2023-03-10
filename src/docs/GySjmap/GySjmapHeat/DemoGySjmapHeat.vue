<template>
  <div class="DemoGySjmapHeat">
    <gy-title>GySjmapHeat</gy-title>
    <p class="sub-title">
      热力图
    </p>
  </div>
  <gy-demo-box title="基础" :code="DemoGySjmapHeat1_code">
    <DemoGySjmapHeat1/>
  </gy-demo-box>

  <gy-title>GySjmapHeat 属性</gy-title>
  <GyTable :tableData="propsData"/>
</template>

<script setup lang="ts">
import {
  DemoGySjmapHeat1,
  DemoGySjmapHeat1_code,
} from './demo'

import {ref} from 'vue';
const propsData = ref([
  {
    shuxing: 'heatData',
    shuoming: `
    热力图数据
    <br>
    数据格式为：[[lon.lat,val], ...]
    `,
    leixing: 'Array',
  },
  {
    shuxing: 'heatmapColor',
    shuoming: `
    基于密度定义了每个像素的颜色。必须是以["heatmap-density"]为输入的表达式。
    `,
    leixing: 'Array',
    moren: `
    [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "rgba(255, 0, 0, 0)",
        0.1,
        "rgba(0, 30, 255, .6)",
        0.2,
        "rgba(7, 208, 255, .6)",
        0.3,
        "#2cc946",
        0.4,
        "#d5fb0c",
        0.8,
        "#e04e4e",
        1,
        "#f33900",
      ]
    `
  },
  {
    shuxing: 'heatmapWeight',
    shuoming: `
    衡量一个点对整个热力图的贡献度。在同一个位置上，weight=10的一个点相当于weight=1的十个点的影响力。结合聚类图时，该属性很有用。
    <br>
    默认值为插值表达式，输入是点geojson的properties的mag，输出随mag线性增大
    `,
    leixing: 'Number | Array',
    moren: `
    [
        "interpolate",
        ["linear"],
        ["get", "value"],
        0,
        0,
        10,
        8
      ]
    `
  },
  {
    shuxing: 'heatmapIntensity',
    shuoming: `
    类似于 heatmap-weight，但表示全局的量。当希望从缩放层级的基础上去调节热力图时，优先使用该属性。
    <br>
    例：
    <br>
    下述为插值表达式，输出随zoom线性变化，zoom为0时值为1，zoom为12时值为3
    <br>
     [
      "interpolate",
      ["linear"],
      ["zoom"],
      0,
      1,
      17,
      1
    ]
    `,
    leixing: 'Number | Array',
    moren: '1'
  },
  {
    shuxing: 'heatmapRadius',
    shuoming:`
    热力图上一个像素点的影响范围。该值越大，热力图越平滑，信息越不详细。
    <br>
    例：
    <br>
    下述为插值表达式，输出随zoom线性变化，zoom为0时值为1，zoom为12时值为3
    <br>
     [
      "interpolate",
      ["linear"],
      ["zoom"],
      0,
      1,
      17,
      1
    ]
    `,
    leixing: 'Number | Array',
    moren: '100'
  },
  {
    shuxing: 'heatmapOpacity',
    shuoming: `
    热力图全局的不透明度。
    <br>
    例：
    <br>
    下述为插值表达式，输出随zoom线性变化，zoom为5时值为0.8，zoom为12时值为0.4
    <br>
    [
      "interpolate",
      ["linear"],
      ["zoom"],
      5,
      0.8,
      17,
      0.8
    ]
    `,
    leixing: 'Number | Array',
    moren: '1'
  },
] as Array<TableData>);
</script>

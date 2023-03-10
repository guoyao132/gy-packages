<template>
  <div class="GySjmapCircle">
    <gy-title>GySjmapCircle</gy-title>
    <p class="sub-title">
      绘制圆
    </p>
    <gy-demo-box title="基础" :code="DemoGySjmapCircle1_code">
      <DemoGySjmapCircle1/>
    </gy-demo-box>
    <br>
    <gy-title>GySjmapCircle 属性</gy-title>
    <GyTable :tableData="propsData"/>
    <br>
    <gy-title>GySjmapLine 事件</gy-title>
    <GyTable :tableHeader="eventTableHeader" :tableData="eventTable"/>
    <br>
    <gy-title>layout 属性</gy-title>
    <p>
      更多属性详见
      <a target="_blank" class="goOtherPage" href="https://map.sgcc.com.cn/products/js-sdk/v3/style.html#layers-circle">思极地图API</a>
    </p>
    <br>
    <GyTable :tableData="propsData1"/>
  </div>
</template>

<script setup lang="ts">
import {
  DemoGySjmapCircle1,
  DemoGySjmapCircle1_code,
} from './demo'
import propsSjmapTableData, {eventTableHeader, eventTable} from "@/components/propsSjmapTableData";
import {ref} from 'vue';
const propsData = ref([
  {
    shuxing: 'position',
    shuoming: `
      由经纬度组成的数组
      <br/>
      [lon,lat]
      `,
    leixing: 'number[]',
  },
  {
    shuxing: 'circleRadius',
    shuoming: '圆的半径',
    leixing: 'number',
    moren: '5',
  },
  {
    shuxing: 'circleColor',
    shuoming: '圆的填充颜色',
    leixing: 'string',
  },
  {
    shuxing: 'circleBlur',
    shuoming: '圆虚化的程度。',
    leixing: 'number',
    moren: '0'
  },
  {
    shuxing: 'circleOpacity',
    shuoming: '绘制圆的不透明度。',
    leixing: 'number',
    moren: '1'
  },
  {
    shuxing: 'circleTranslate',
    shuoming: '几何要素的偏移量。以 [x, y] 形式设置，负值表示向左和上偏移',
    leixing: 'array',
    moren: '[0, 0]'
  },
  {
    shuxing: 'circleTranslateAnchor',
    shuoming: `
    控制偏移的参考点。
    <br>
    map: 相对于地图偏移。
    <br>
    viewport: 相对于视窗偏移。
    `,
    leixing: 'string',
    moren: 'map',
    kexuan: 'map \ viewport',
  },
  {
    shuxing: 'circlePitchScale',
    shuoming: `
    当地图倾斜时，控制圆的缩放行为.
    <br>
    map: 圆根据与相机的视距离进行缩放。
    <br>
    viewport: 圆不进行缩放。
    `,
    leixing: 'string',
    moren: 'map',
    kexuan: 'map \ viewport',
  },
  {
    shuxing: 'circlePitchAlignment',
    shuoming: `
    当地图倾斜时圆的方向。
    <br>
    map:  圆与地图平面对齐。
    <br>
    viewport: 圆与视窗平面对齐。
    `,
    leixing: 'string',
    moren: 'map',
    kexuan: 'map \ viewport',
  },
  {
    shuxing: 'circleStrokeWidth',
    shuoming: '圆外轮廓的宽度。轮廓放置在 circle-radius之外。',
    leixing: 'number',
    moren: 0,
  },
  {
    shuxing: 'circleStrokeColor',
    shuoming: '圆的轮廓颜色。',
    leixing: 'string',
  },
  {
    shuxing: 'circleStrokeOpacity',
    shuoming: '圆的轮廓不透明度。',
    leixing: 'number',
    moren: 1,
  },
  ...propsSjmapTableData,
  {
    shuxing: 'layout',
    shuoming: '图层的默认绘制属性',
    leixing: 'Object',
  },
] as Array<TableData>);
const propsData1 = ref([
  {
    shuxing: 'visibility',
    shuoming: `
    图层是否显示
    `,
    leixing: 'string',
    kexuan: 'none / visible',
    moren: 'visible'
  },
] as Array<TableData>);

</script>

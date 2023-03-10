<template>
  <div class="DemoGySjmapPolygon">
    <gy-title>GySjmapPolygon</gy-title>
    <p class="sub-title">
      绘制一条线
    </p>
    <gy-demo-box title="基础" :code="DemoGySjmapPolygon1_code">
      <DemoGySjmapPolygon1/>
    </gy-demo-box>
    <gy-demo-box title="使用图片填充" :code="DemoGySjmapPolygon2_code">
      <DemoGySjmapPolygon2/>
    </gy-demo-box>
    <gy-demo-box title="添加文字" :code="DemoGySjmapPolygon3_code">
      <DemoGySjmapPolygon3/>
    </gy-demo-box>
    <gy-title>GySjmapPolygon 属性</gy-title>
    <GyTable :tableData="propsData"/>
    <br>
    <gy-title>GySjmapPolygon 事件</gy-title>
    <GyTable :tableHeader="eventTableHeader" :tableData="eventTable"/>
    <br>
  </div>
</template>

<script setup lang="ts">
import {
  DemoGySjmapPolygon1,
  DemoGySjmapPolygon1_code,
  DemoGySjmapPolygon2,
  DemoGySjmapPolygon2_code,
  DemoGySjmapPolygon3,
  DemoGySjmapPolygon3_code,
} from './demo/index'
import propsSjmapTableData, {eventTableHeader, eventTable} from "@/components/propsSjmapTableData";
import {ref} from 'vue'
const propsData = ref([
  {
    shuxing: 'positionList',
    shuoming: `
      线的坐标数组 格式为：[[lon,lat],...]
      `,
    leixing: 'Array<number[]>',
  },
  {
    shuxing: 'fillColor',
    shuoming: '此图层填充部分的颜色。该颜色可以用包括 alpha 通道的 rgba 方式指定，并且颜色的不透明度将不会影响到周围 1 px的描边。。',
    leixing: 'string',
    moren: '#f00',
  },
  {
    shuxing: 'fillOpacity',
    shuoming: '多边形填充的不透明度。与fill-color不同的是，当有描边时，这个值也会影响到多边形填充作为 1px 的描边。。',
    leixing: 'number',
    moren: '1',
  },
  {
    shuxing: 'fillAntialias',
    shuoming: '多边形填充是否需要反锯齿。',
    leixing: 'boolean',
    moren: 'true',
  },
  {
    shuxing: 'fillOutlineColor',
    shuoming: '多边形填充的轮廓颜色。如果未指定，与 fill-color 一致。',
    leixing: 'string',
    moren: '',
  },
  {
    shuxing: 'fillTranslate',
    shuoming: '几何要素的偏移量。以 [x, y] 形式设置，负值表示向左和上偏移。。',
    leixing: 'Array',
    moren: '[0, 0]',
  },
  {
    shuxing: 'fillTranslateAnchor',
    shuoming: `
    控制偏移的参考点。
   <br>
    map: 相对于地图偏移。
    <br>
    viewport: 相对于视窗偏移。
    `,
    leixing: 'string',
    moren: 'map',
    kexuan: 'map \ viewport'
  },
  {
    shuxing: 'text',
    shuoming: '多边形填充的文字',
    leixing: 'string',
  },
  {
    shuxing: 'textType',
    shuoming: `
    文字所在位置
    <br>
    LineString 文字在多边形边线上
    <br>
    Polygon 文字在多边形内
    `,
    leixing: 'string',
  },
  {
    shuxing: 'imgSrc',
    shuoming: '图片路径，用来做多边形的填充样式。',
    leixing: 'string',
    moren: '',
  },
  ...propsSjmapTableData,
  {
    shuxing: 'layout',
    shuoming: '其他图层的布局属性(可参考文本，设置文本属性)',
    leixing: 'string',
    moren: '',
  },
  {
    shuxing: 'paint',
    shuoming: '其他图层的默认绘制属性(可参考文本，设置文本属性)',
    leixing: 'string',
    moren: '',
  },
] as Array<TableData>);
</script>

<style lang='less' scoped>
  .DemoGySjmapPolygon{

  }

</style>

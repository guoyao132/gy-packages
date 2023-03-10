<template>
  <div class="GySjmapImage">
    <gy-title>GySjmapImage</gy-title>
    <p class="sub-title">
      绘制图片
    </p>
    <gy-demo-box title="基础" :code="DemoGySjmapImage1_code">
      <DemoGySjmapImage1/>
    </gy-demo-box>
    <br>
    <gy-demo-box title="点击事件" :code="DemoGySjmapImage2_code">
      <DemoGySjmapImage2/>
    </gy-demo-box>
    <br>
    <gy-title>GySjmapImage 属性</gy-title>
    <GyTable :tableData="propsData"/>
    <br>
    <gy-title>GySjmapImage 事件</gy-title>
    <GyTable :tableHeader="eventTableHeader" :tableData="eventTable"/>
    <br>
    <gy-title>layout 属性</gy-title>
    <p>
      更多属性详见
      <a target="_blank" class="goOtherPage" href="https://map.sgcc.com.cn/products/js-sdk/v3/style.html#layers-icon-allow-overlap">思极地图API</a>
    </p>
    <br>
    <GyTable :tableData="propsData1"/>
  </div>
</template>

<script setup lang="ts">
import {
  DemoGySjmapImage1,
  DemoGySjmapImage1_code,
  DemoGySjmapImage2,
  DemoGySjmapImage2_code,
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
    shuxing: 'imgSrc',
    shuoming: ' 图片的url地址，图片格式必须是png, webp, 或者 jpg格式',
    leixing: 'string',
  },
  {
    shuxing: 'iconSize',
    shuoming: '图标的放大倍数',
    leixing: 'number',
    moren: '1',
  },
  {
    shuxing: 'iconColor',
    shuoming: '图标的颜色。仅对 sdf 格式的图标有效',
    leixing: 'string',
  },
  {
    shuxing: 'iconRotate',
    shuoming: '按顺时针方向旋转图标',
    leixing: 'number',
    moren: '0',
  },
  {
    shuxing: 'iconHaloColor',
    shuoming: '图标的光晕颜色。仅对 sdf 格式的图标有效',
    leixing: 'number',
    moren: '1'
  },
  {
    shuxing: 'iconHaloWidth',
    shuoming: '光晕到图标轮廓的距离。',
    leixing: 'number',
  },
  {
    shuxing: 'iconHaloBlur',
    shuoming: '光晕向外渐变的宽度',
    leixing: 'number',
  },
  {
    shuxing: 'iconTranslate',
    shuoming: '图标锚点偏离原始位置的距离。正数表示向右和下偏移，负数表示向左和上偏移。',
    leixing: 'Array',
    moren: '[0, 0]'
  },
  {
    shuxing: 'iconTranslateAnchor',
    shuoming: `
    控制偏移的参考点
    <br>
    map: 相对于地图偏移。
    <br>
    viewport: 相对于视窗偏移。

    `,
    leixing: 'Array',
    moren: 'map',
    kexuan: 'map \ viewport',
  },
  ...propsSjmapTableData,
  {
    shuxing: 'layout',
    shuoming: '图层的布局属性,详见下表。',
    leixing: 'Object',
  },
] as Array<TableData>);
const propsData1 = ref([
  {
    shuxing: 'icon-allow-overlap',
    shuoming: `
    设置为 true 时，图标符号即使碰撞到其他绘制的注记也会显示。
    `,
    leixing: 'boolean',
    moren: 'true'
  },
  {
    shuxing: 'icon-ignore-placement',
    shuoming: `
    设置为 true 时，其他注记即使碰撞到此图标符号也会显示。
    `,
    leixing: 'boolean',
    moren: 'true'
  },
  {
    shuxing: 'icon-optional',
    shuoming: `
    设置为 true 时，当此注记的图标与其他注记碰撞而文本未碰撞时，仅显示此注记的文本而不显示图标。
    `,
    leixing: 'boolean',
    moren: 'false'
  },
  {
    shuxing: 'icon-rotation-alignment',
    shuoming: `
    与 symbol-placement组合使用，决定旋转时图标的行为。
    <br>
    map: 当symbol-placement 设置为point时, 将图标与东西方向对齐。当 symbol-placement 设置为 line时，将图标的 x 轴与线对齐。
    <br>
    viewport: 将图标的 x 轴与视窗的 x 轴对齐，无论 symbol-placement设置为哪个值。
    <br>
    auto: 当symbol-placement 设置为point时，与 viewport行为一致。当symbol-placement 设置为 line时, 与map行为一致。
    `,
    leixing: 'strimg',
    moren: 'auto',
  },
] as Array<TableData>);

</script>

<template>
  <div class="GymapText">
    <gy-title>GySjmapText</gy-title>
    <p class="sub-title">
      绘制文本
    </p>
    <gy-demo-box title="基础" :code="DemoGySjmapText1_code">
      <DemoGySjmapText1/>
    </gy-demo-box>
    <gy-demo-box title="带背景的文字" :code="DemoGySjmapText2_code">
      <DemoGySjmapText2/>
    </gy-demo-box>
    <gy-demo-box title="事件" :code="DemoGySjmapText3_code">
      <DemoGySjmapText3/>
    </gy-demo-box>
    <br>
    <gy-title>GySjmapText 属性</gy-title>
    <GyTable :tableData="propsData"/>
    <br>
    <gy-title>GySjmapText 事件</gy-title>
    <GyTable :tableHeader="eventTableHeader" :tableData="eventTable"/>
    <br>
    <gy-title>layout 属性</gy-title>
    <p>
      更多属性详见
      <a target="_blank" class="goOtherPage" href="https://map.sgcc.com.cn/products/js-sdk/v3/style.html#layers-text-pitch-alignment">思极地图API</a>
    </p>
    <br>
    <GyTable :tableData="propsData1"/>
  </div>
</template>

<script setup lang="ts">
import {
  DemoGySjmapText1,
  DemoGySjmapText1_code,
  DemoGySjmapText2,
  DemoGySjmapText2_code,
  DemoGySjmapText3,
  DemoGySjmapText3_code,
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
    shuxing: 'text',
    shuoming: '文本内容',
    leixing: 'string',
  },
  {
    shuxing: 'textColor',
    shuoming: '文本颜色',
    leixing: 'string',
  },
  {
    shuxing: 'textOpacity',
    shuoming: '绘制文本的不透明度',
    leixing: 'number',
    moren: '1'
  },
  {
    shuxing: 'textHaloColor',
    shuoming: '文本光晕的颜色，用于区别于背景。色值',
    leixing: 'string',
  },
  {
    shuxing: 'textHaloWidth',
    shuoming: '光晕离字体轮廓线的距离。最大值为字体大小的 1/4',
    leixing: 'number',
  },
  {
    shuxing: 'textHaloBlur',
    shuoming: '光晕向外渐变的宽度',
    leixing: 'number',
  },
  {
    shuxing: 'textTranslate',
    shuoming: '文字锚点偏离原始位置的距离.',
    leixing: 'Array',
    moren: '[0, 0]'
  },
  {
    shuxing: 'textTranslateAnchor',
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
    shuxing: 'text-field',
    shuoming: `
    文本标注的字段
    `,
    leixing: 'string',
    moren: 'text'
  },
  {
    shuxing: 'text-font',
    shuoming: `
    文字字体
    `,
    leixing: 'Array',
    moren: "['Microsoft YaHei Regular']",
  },
  {
    shuxing: 'text-size',
    shuoming: `
    字体大小
    `,
    leixing: 'number',
  },
  {
    shuxing: 'text-max-width',
    shuoming: `
    文本换行最大宽度
    `,
    leixing: 'number',
  },
  {
    shuxing: 'text-line-height',
    shuoming: `
    多行文本的行高
    `,
    leixing: 'number',
  },
  {
    shuxing: 'text-letter-spacing',
    shuoming: `
    字符间距
    `,
    leixing: 'number',
  },
  {
    shuxing: 'text-line-height',
    shuoming: `
    多行文本的行高
    `,
    leixing: 'number',
  },
  {
    shuxing: 'text-justify',
    shuoming: `
    文本对齐方式
    `,
    leixing: 'string',
    kexuan: 'left \ center \ right',
  },
  {
    shuxing: 'textAnchor',
    shuoming: `
    文本停靠到锚点的部分
    <br>
    center: 文本中心停靠到锚点。
    <br>
    left: 文本左边停靠到锚点。
    <br>
    right: 文本右边停靠到锚点。
    <br>
    top: 文本顶部停靠到锚点。
    <br>
    bottom: 文本底部停靠到锚点。
    <br>
    top-left: 文本的左上角停靠到锚点。
    <br>
    top-right: 文本的右上角停靠到锚点。
    <br>
    bottom-left: 文本的左下角停靠到锚点。
    <br>
    bottom-right: 文本的右下角停靠到锚点。
    `,
    leixing: 'string',
    kexuan: 'center \ left \ right \ top \ bottom \ top-left \ top-right \ bottom-left \ bottom-right',
    moren: 'center'
  },
  {
    shuxing: 'text-rotate',
    shuoming: `
    顺时针旋转文本的角度。
    `,
    leixing: 'number',
    moren: 0
  },
  {
    shuxing: 'text-padding',
    shuoming: `
    文本框四周的额外空间，用以检测注记碰撞
    `,
    leixing: 'number',
  },
  {
    shuxing: 'text-transform',
    shuoming: `
    设置文本的大小写，类似于 CSS 的text-transform 属性。
    none: 文本保持不变。
    uppercase: 强制使所有的字符大写。
    lowercase: 强制使所有的字符小写。
    `,
    leixing: 'string',
    moren: 'none',
    kexuan: 'none \ uppercase \ lowercase'
  },
  {
    shuxing: 'text-offset',
    shuoming: `
    文本与其锚点的偏移量
    `,
    leixing: 'number[]',
    moren: [0, 0]
  },
  {
    shuxing: 'text-allow-overlap',
    shuoming: `
    设置为 true 时，文本标注即使碰撞到其他绘制的注记也会显示。
    `,
    leixing: 'boolean',
  },
  {
    shuxing: 'text-ignore-placement',
    shuoming: `
    设置为 true 时，其他注记即使碰撞到此文本标注也会显示。
    `,
    leixing: 'boolean',
  },
  {
    shuxing: 'text-optional',
    shuoming: `
    设置为 true 时，其他注记即使碰撞到此文本标注也会显示。
    `,
    leixing: 'boolean',
  },
  {
    shuxing: 'text-rotation-alignment',
    shuoming: `
    当地图旋转时文本的方向。
    <br>
    map: 将文本与东西方向对齐。
    <br>
    viewport: 将字型的 x 轴与视窗的 x 轴对齐。
    <br>
    auto: 与viewport行为一致。
    `,
    leixing: 'string',
    kexuan: 'map \ viewport \ auto',
    moren: 'auto'
  },
  {
    shuxing: 'text-pitch-alignment',
    shuoming: `
    当地图倾斜时文本的方向。
    <br>
    map: 文本与地图平面对齐。
    <br>
    viewport: 文本与视窗平面对齐。
    <br>
    auto: 自动地与 text-rotation-alignment设置相匹配。
    `,
    leixing: 'string',
    kexuan: 'map \ viewport \ auto',
    moren: 'auto'
  },
] as Array<TableData>);

</script>

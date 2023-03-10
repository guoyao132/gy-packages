<template>
  <div class="DemoGySjmapLine">
    <gy-title>GySjmapLine</gy-title>
    <p class="sub-title">
      绘制一条线
    </p>
    <gy-demo-box title="基础" :code="DemoGySjmapLine1_code">
      <DemoGySjmapLine1/>
    </gy-demo-box>
    <gy-demo-box title="用图片填充线" :code="DemoGySjmapLine2_code">
      <DemoGySjmapLine2/>
    </gy-demo-box>
    <gy-demo-box title="线上添加文字" :code="DemoGySjmapLine3_code">
      <DemoGySjmapLine3/>
    </gy-demo-box>
    <gy-title>GySjmapLine 属性</gy-title>
    <GyTable :tableData="propsData"/>
    <br>
    <gy-title>GySjmapLine 事件</gy-title>
    <GyTable :tableHeader="eventTableHeader" :tableData="eventTable"/>
    <br>
  </div>
</template>

<script setup lang="ts">
import {
  DemoGySjmapLine1,
  DemoGySjmapLine1_code,
  DemoGySjmapLine2,
  DemoGySjmapLine2_code,
  DemoGySjmapLine3,
  DemoGySjmapLine3_code,
} from './demo/index'
import {ref} from 'vue'
import propsSjmapTableData, {eventTableHeader, eventTable} from "@/components/propsSjmapTableData";
const propsData = ref([
  {
    shuxing: 'positionList',
    shuoming: `
      线的坐标数组 格式为：[[lon,lat],...]
      `,
    leixing: 'Array<number[]>',
  },
  {
    shuxing: 'lineWidth',
    shuoming: '线宽。',
    leixing: 'number',
    moren: '5',
  },
  {
    shuxing: 'lineColor',
    shuoming: '绘制线的颜色。',
    leixing: 'string',
    moren: '#000',
  },
  {
    shuxing: 'lineOpacity',
    shuoming: '绘制线的不透明度。',
    leixing: 'number',
    moren: '1',
  },
  {
    shuxing: 'lineOffset',
    shuoming: '线的偏移。对于线状要素，正值表示相对于线走向的右边偏移。对于多边形要素，正值表示内缩（inset），负值表示外突（outset）。',
    leixing: 'number',
    moren: '0',
  },
  {
    shuxing: 'lineBlur',
    shuoming: '线虚化的像素值。',
    leixing: 'number',
    moren: '0',
  },
  {
    shuxing: 'text',
    shuoming: '线上文字。',
    leixing: 'string',
  },
  {
    shuxing: 'lineCap',
    shuoming: `
    线末端的显示样式。
    <br>
    butt: 方型末端，仅绘制到直线端点。
    <br>
    round: 圆型末端，以线宽的 1/2 为半径，以线端点为圆心，超出线端点绘制。
    <br>
    square: 方型末端，以线宽的 1/2 长度超出线端点绘制。
    `,
    leixing: 'string',
    moren: 'butt',
    kexuan: 'butt \ round \ square'
  },
  {
    shuxing: 'lineJoin',
    shuoming: `
    线交叉时的显示样式。
    <br>
    bevel: 方型交点，以线宽的 1/2 长度超出交点绘制。
    <br>
    round: 圆型交点，以线宽的 1/2 为半径，以交点为圆心绘制，超出交点绘制。
    <br>
    miter: 尖型交角，以两线段外沿相交，超出交点绘制
    `,
    leixing: 'string',
    moren: 'miter',
    kexuan: 'bevel \ round \ miter',
  },
  {
    shuxing: 'lineMiterLimit',
    shuoming: '用于将锐利的尖型交角自动地转换为方型交角。 要求line-join = miter',
    leixing: 'number',
    moren: '2',
  },
  {
    shuxing: 'lineRoundLimit',
    shuoming: '用来将平浅的圆型交角自动地转换为尖型交角。要求 line-join = round',
    leixing: 'number',
    moren: '1.05',
  },
  {
    shuxing: 'visibility',
    shuoming: `
    图层是否显示
    <br>
    visible: 图层可见。
    <br>
    none: 图层不可见。`,
    leixing: 'string',
    kexuan: 'visible / none',
    moren: 'visible',
  },
  {
    shuxing: 'lineTranslate',
    shuoming: '几何要素的偏移量。以 [x, y] 形式设置，负值表示向左和上偏移。。',
    leixing: 'Array',
    moren: '[0, 0]',
  },
  {
    shuxing: 'lineTranslateAnchor',
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
    shuxing: 'lineGapWidth',
    shuoming: '在线的实际路径外部绘制线套。设置的值表示内间距。',
    leixing: 'number',
    moren: '0',
  },
  {
    shuxing: 'lineDasharray',
    shuoming: '指定生成虚线的实部和虚部长度。设置的长度会随着线宽进行缩放。将长度乘以当前线宽即为虚线的实际像素数。',
    leixing: 'Array',
    moren: '[]',
  },
  {
    shuxing: 'imgSrc',
    shuoming: '图片路径，用来做线的填充样式。为了无缝填充，图案的宽和高必须是 2 的整数倍如 (2, 4, 8, ..., 512)。',
    leixing: 'string',
    moren: '',
  },
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
  .DemoGySjmapLine{

  }

</style>

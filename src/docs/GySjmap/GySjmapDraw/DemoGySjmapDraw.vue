<template>
  <div class="DemoGySjmapDraw">
    <gy-title>GySjmapDraw</gy-title>
    <p class="sub-title">
      Draw绘画
    </p>
    <gy-demo-box title="基础" :code="DemoGySjmapDraw1_code">
      <DemoGySjmapDraw1/>
    </gy-demo-box>
    <p>注：已经绘制的点不可删除！</p>
    <br>
    <p>注：在绘制点时，在绘制最后一个点时需要双击作为结束！否则将不可退出新增状态，将不可进行绘制完成获取切换绘制类型的操作！</p>
    <br>
    <gy-title>GySjmapDraw 属性</gy-title>
    <GyTable :tableData="propsData"/>
    <br>
    <gy-title>GySjmapDraw 事件</gy-title>
    <GyTable :tableHeader="eventTableHeader" :tableData="eventTable"/>
  </div>
</template>

<script setup lang="ts">
import {
  DemoGySjmapDraw1,
  DemoGySjmapDraw1_code,
} from './demo'
import {eventTableHeader} from "@/components/propsSjmapTableData";
import {ref} from 'vue'
const propsData = ref([
  {
    shuxing: 'drawTypeList',
    shuoming: `
    绘制的类型数组
    `,
    leixing: 'Array',
    kexuan: 'Point(点) / Line(线) / Circle(圆) / Rect(矩形) / Polygon(多边形)',
    moren: '[Point, LineString, Circle, Rect, Polygon]'
  },
  {
    shuxing: 'drawTypeCnameList',
    shuoming: `
    绘制的类型数组对应的名称
    `,
    leixing: 'Array',
    moren: '[点, 线, 圆, 矩形, 多边形]'
  },
  {
    shuxing: 'btnBackground',
    shuoming: `
    按钮背景颜色
    `,
    leixing: 'String',
    moren: 'rgb(102, 102, 102)'
  },
  {
    shuxing: 'btnColor',
    shuoming: `
    按钮文字颜色
    `,
    leixing: 'String',
    moren: '#fff'
  },
  {
    shuxing: 'btnActiveBackground',
    shuoming: `
    按钮高亮背景颜色
    `,
    leixing: 'String',
    moren: 'rgb(142, 142, 142)'
  },
  {
    shuxing: 'btnActiveColor',
    shuoming: `
    按钮高亮文字颜色
    `,
    leixing: 'String',
    moren: '#fff'
  },
  {
    shuxing: 'isShowBtns',
    shuoming: `
    是否显示按钮
    `,
    leixing: 'Boolean',
    moren: true
  },
  {
    shuxing: 'oldDataList',
    shuoming: `
    旧的需要编辑的数据。注意，数据格式需要：
    <br>
    例：
    [
    <br>
    点
    {
      type: "Point",
      "coordinates": [
        116.40520089155274,
        39.896063172644915
      ],
    }
    <br>
    线
    {
      type: "Line",
      "coordinates": [
        [
          116.40520089155274,
          39.896063172644915
        ], ...
      ],
    }
    <br>
    圆
    {
      type: "Circle",
      "coordinates": [
        116.40520089155274,
        39.896063172644915
      ],
      "radius": 256.6288825470188,
      "geometry": "geometry对象"
    }
    <br>
    矩形
    {
      type: "Rect",
      "coordinates": [
        [
          [
            116.41919129377447,
            39.8961619477177
          ],  ...
        ]
      ],
    }
    <br>
    多边形
    {
      type: "Polygon",
      "coordinates": [
        [
          [
            116.41919129377447,
            39.8961619477177
          ],  ...
        ]
      ],
    }
    <br>
    ]
    `,
    leixing: 'Array',
    moren: '[]'
  },
] as Array<TableData>);
const eventTable = [
  {
    name: 'drawFinish',
    shuoming: `
    绘制完成事件，点击绘制完成触发。或者再绘制完成状态下，编辑绘图触发。
    `,
    params: `
      返回数据格式为数组。
      <br>
      每个数据包包含"type"、"coordinates"以及data。
      <br>
      type为绘制图形类型（'Point' | 'Line' | 'Circle' | 'Rect' | 'Polygon'）。
      <br>
      coordinates为坐标数据。
      <br>
      Circle类型还包含radius属性，为圆的半径。
      Circle类型还包含geometry属性，作为圆的geometry属性，在编辑回显时，需要将其传入。
    `,
  },
  {
    name: 'startDrawFun',
    shuoming: `
    点击开始绘制触发的回调
    `,
    params: `
      ——
    `,
  },
]
</script>

<style lang='less' scoped>
  .DemoGySjmapDraw{

  }

</style>

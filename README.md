# gy-sjmap

使用vue3.0+vite+ts封装的地图组件

该组件支持VUE2.0以及VUE3.0。

# 安装

使用 npm 安装。

```javascript
npm install gy-sjmap --save
```

# 引入

## 全局引入 在main.js中引入

```javascript
import {gySjmap} from 'gy-sjmap';
import 'gy-sjmap/style.css'
app.use(gySjmap);
```

## 按需引入，在相应的页面中引入

```
import {GySjmap, GySjmapHtml} from 'gy-sjmap'
<GySjmap
  :mapOpt="mapOpt"
  :zoom="zoom"
  :center="p"
>
  <GySjmapHtml
    :position="p"
  ></GySjmapHtml>
</GySjmap>
```

# 判断map加载完成

在其他页面中判断map是否加载完成
```javascript
import {gySjMap} from "gy-sjmap";
import type {gySjmapType} from 'gy-sjmap'
import {watch} from "vue"
const gySjmapObj:Ref<UnwrapRef<gySjmapType>> | null = gySjMap(mapId); //mapId可不填， 当有多个地图是可以通过传入对应的ID，获取对应地图的实例。
const mapFinish:Ref<boolean> = computed(() => gySjmapObj.value && gySjmapObj.value.mapFinish);
watch(mapFinish, n => {
  //n === true
  //map filish
})
```
# 获取当前地图map实例
```
import {gySjMap} from "gy-sjmap";
import type {gySjmapType} from 'gy-sjmap'
import {watch} from "vue"
const gySjmapObj:Ref<UnwrapRef<gySjmapType>> | null = gySjMap(mapId); //mapId可不填， 当有多个地图是可以通过传入对应的ID，获取对应地图的实例。
const mapFinish:Ref<boolean> = computed(() => gySjmapObj.value && gySjmapObj.value.mapFinish);
watch(mapFinish, n => {
  //n === true
  //map filish
  const mapObj = gySjmapObj.value.map;
})
//或者使用computed获取
const mapObj = computed(() => gySjmapObj.value && gySjmapObj.value.map);
```
# 给当前地图map绑定交互事件以及方法
```
import {gySjMap} from "gy-sjmap";
import type {gySjmapType} from 'gy-sjmap'
import {watch, onBeforeUnmount} from "vue"
const gySjmapObj:Ref<UnwrapRef<gySjmapType>> | null = gySjMap(mapId); //mapId可不填， 当有多个地图是可以通过传入对应的ID，获取对应地图的实例。
const mapFinish:Ref<boolean> = computed(() => gySjmapObj.value && gySjmapObj.value.mapFinish);
const mapObj = null;
watch(mapFinish, n => {
  //n === true
  //map filish
  mapObj = gySjmapObj.value.map;
  //添加click事件
  mapObj.on('click', clickFun)
})

const clickFun = (e) => {

}
onBeforeUnmount(() => {
  //接触绑定click事件
  mapObj && mapObj.off('click', clickFun)
})
```

# GySjmap

主容器

```
<template>
  <div class="gy-map-con">
    <GySjmap
      id="map"
      :zoom="zoom"
      :center="center"
    >
      <slot></slot>
    </GySjmap>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue'
let center = ref([116.40803281576643,39.893935171491535]);
const zoom = ref(14);
</script>

```
<table>
  <tbody>
    <tr>
        <th>属性名</th>
        <th>说明</th>
        <th>类型</th>
        <th>可选值</th>
        <th>默认值</th>
    </tr>
    <tr class="el-table__row">
      <td class="el-table_4_column_14 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">id</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_15 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">地图容器的ID</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_16 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">string</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_17 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">——</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_18 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">——</span><!--          <span>{{row}}</span>--></div></td>
    </tr>
    <tr class="el-table__row el-table__row--striped">
      <td class="el-table_4_column_14 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">center</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_15 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">地图中心点 值为 [lon, lat] 经纬度组成的数组</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_16 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">Array&lt;number&gt;</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_17 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">——</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_18 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">——</span><!--          <span>{{row}}</span>--></div></td>
    </tr>
    <tr class="el-table__row">
      <td class="el-table_4_column_14 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">zoom</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_15 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">地图显示层级 范围为 1 - 18</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_16 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">number</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_17 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">1 - 18</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_18 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">——</span><!--          <span>{{row}}</span>--></div></td>
    </tr>
    <tr class="el-table__row el-table__row--striped">
      <td class="el-table_4_column_14 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">mapOpt</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_15 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">地图相关属性配置
      <br>
      - minZoom number 地图最小层级  默认为 1 最小为1
      <br>
      - maxZoom number 地图最大增肌  默认为 18 最大为18
      <br>
      - mapUrlList string[] | string 地图瓦片 只有一个时直接设置为瓦片地址，多个瓦片时传入一个Array;
      <br>例:BASTURL + '/map/gaodeMap/ccMap/{z}/{x}/{y}.jpg'
      <br>extent 地图范围  值为对角的两个顶点坐标组成的数组，[[leftTopLon, leftTopLat], [rightBottomLon, rightBottomLat]].
      </span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_16 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">Object</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_17 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">——</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_18 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">——</span><!--          <span>{{row}}</span>--></div></td>
    </tr>
    <tr class="el-table__row">
      <td class="el-table_4_column_14 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">maplayerIndex</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_15 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">地图当前瓦片显示下标</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_16 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">number</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_17 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">——</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_18 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">0</span><!--          <span>{{row}}</span>--></div></td>
    </tr>
    <tr class="el-table__row el-table__row--striped">
      <td class="el-table_4_column_14 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">layerOpacity</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_15 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">地图当前瓦片的透明度</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_16 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">number</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_17 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">0-1</span><!--          <span>{{row}}</span>--></div></td>
      <td class="el-table_4_column_18 el-table__cell" rowspan="1" colspan="1"><div class="cell"><!----><span data-v-70b48d9f="">1</span><!--          <span>{{row}}</span>--></div></td>
    </tr>
  </tbody>
</table>

# 其他组件
- GySjmapText
  绘制文本
- GySjmapCircle
  绘制一个圆
- GySjmapImage
  绘制图片
- GySjmapHtml
  将HTML绘制到地图中
- GySjmapPolygon
  多边形
- GySjmapLine
  绘制一条线
- GySjmapHeat
  热力图
- GySjmapLonlat
  获取鼠标点击的经纬度
- GySjmapDraw
  Draw绘画
- GySjmapTask
  动画任务

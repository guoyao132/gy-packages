<template>
  <div class="guide-wrapper">
    <gy-title>引入</gy-title>
    <p>引入思极地图文件，需要再index.html中引入。</p>
    <p>https://map.sgcc.com.cn/maps?v=3.0.0</p>
    <p>https://map.sgcc.com.cn/products/js-sdk/v3/assets/js/turf.min.js</p>
    <p>注：首先需要申请对应的你申请的appKey与你申请的appSecret，配置在相应的mapOpt中！</p>
    <gy-title>安装</gy-title>
    <p>使用 npm 安装。</p>
    <ShowCode code="npm install gy-sjmap --save"/>
    <p>
      gy-sjmap 支持 Vue3，以及Vue2。
    </p>
    <gy-title>引入</gy-title>
    <p>
      全局引入 在main.js中引入
    </p>
    <ShowCode :code="code1"/>
    <p>按需引入，在相应的页面中引入</p>
    <ShowCode :code="code2"/>
    <br/>
    <gy-title>获取思极全局对象实例</gy-title>
    <p>获取地图全局对象，方便加载地图组件。</p>
    <ShowCode :code="code6"/>
    <br/>
    <gy-title>判断map加载完成</gy-title>
    <p>在其他页面中判断map是否加载完成</p>
    <ShowCode :code="code4"/>
    <br/>
    <gy-title>获取当前地图map实例</gy-title>
    <p>需要在map加载完成后才可以获取到实例。</p>
    <ShowCode :code="code3"/>
    <br/>
    <gy-title>给当前地图map绑定交互事件以及方法</gy-title>
    <p>在获取到地图实例后，给地图实例添加或接触绑定事件。</p>
    <ShowCode :code="code5"/>
    <br/>
    <gy-title>map 绑定事件</gy-title>
    <br/>
    <GyTable :tableHeader="tableHeaderEvent" :tableData="tableData"/>
  </div>
</template>

<script setup lang="ts">
import ShowCode from '@/components/ShowCode.vue'

const code1 =
  `import {gySjmap} from 'gy-sjmap';
import 'gy-sjmap/style.css'
app.use(gySjmap);`;
const code2 =
  `import {GySjmap, GySjmapHtml} from 'gy-map'
<GySjmap
  :mapOpt="mapOpt"
  :zoom="zoom"
  :center="p"
>
  <GySjmapHtml
    :position="p"
  ></GySjmapHtml>
</GySjmap>`
const code3 =
  `
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
`
const code4 =
  `
import {gySjMap} from "gy-sjmap";
import type {gySjmapType} from 'gy-sjmap'
import {watch} from "vue"
const gySjmapObj:Ref<UnwrapRef<gySjmapType>> | null = gySjMap(mapId); //mapId可不填， 当有多个地图是可以通过传入对应的ID，获取对应地图的实例。
const mapFinish:Ref<boolean> = computed(() => gySjmapObj.value && gySjmapObj.value.mapFinish);
watch(mapFinish, n => {
  //n === true
  //map filish
})
`

const code5 =
  `
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
`;
const code6 =
`import {SGMap} from "gy-sjmap";
//引入组件
SGMap.plugin([SGMap.type]).then((data) => {
});
`
const tableHeaderEvent = [
  {
    label: '事件名',
    prop: 'shuxing',
    minWidth: 20,
  },
  {
    label: '说明',
    prop: 'shuoming',
    minWidth: 20,
  },
]
const tableData = [
  {
    shuxing: "click",
    shuoming: "当在地图上的同一点按下并释放鼠标时触发",
  },
  {
    shuxing: "styleimagemissing",
    shuoming: "当样式所需的图标或图案丢失时触发。可以在此事件侦听器回调中使用Map#addImage添加丢失的图像，以防止图像被跳过。 此事件可用于动态生成图标和模式。",
  },
  {
    shuxing: "sourcedataloading",
    shuoming: "地图源之一开始异步加载或更改时触发。所有sourcedataloading事件后都有sourcedata或error事件",
  },
  {
    shuxing: "styledataloading",
    shuoming: "地图样式开始异步加载或更改时触发。所有styledataloading事件后都有一个styledata或error事件",
  },
  {
    shuxing: "dataloading",
    shuoming: "当任何地图数据（样式，源，图块等）开始异步加载或更改时触发。所有数据加载事件后都有一个data或error事件",
  },
  {
    shuxing: "sourcedata",
    shuoming: "当地图来源之一加载或更改（包括属于某来源的图块加载或更改）时触发",
  },
  {
    shuxing: "styledata",
    shuoming: "加载或更改地图样式时触发",
  },
  {
    shuxing: "data",
    shuoming: "加载或更改任何地图数据时触发",
  },
  {
    shuxing: "error",
    shuoming: "发生错误时触发",
  },
  {
    shuxing: "idle",
    shuoming: "在地图进入“空闲”状态之前渲染的最后一帧之后触发",
  },
  {
    shuxing: "render",
    shuoming: "下述条件将触发： 地图位置，缩放，俯仰或方位的更改； 更改地图样式； 对GeoJSON源的更改； 矢量图块，GeoJSON文件，字形或雪碧图的加载；",
  },
  {
    shuxing: "load",
    shuoming: "在下载了所有必需的资源并进行了第一个视觉上完整的地图渲染之后，立即触发",
  },
  {
    shuxing: "pitchend",
    shuoming: "由于用户交互或诸如Map#flyTo之类的方法而导致地图的俯仰（倾斜）完成更改后立即触发",
  },
  {
    shuxing: "pitch",
    shuoming: "每当地图的俯仰（倾斜）改变为时就会触发。用户交互或诸如Map#flyTo之类的方法的结果",
  },
  {
    shuxing: "pitchstart",
    shuoming: "每当地图的俯仰（倾斜）由于用户交互或诸如Map#flyTo之类的方法而开始发生变化时就会触发",
  },
  {
    shuxing: "zoomend",
    shuoming: "由于用户互动或诸如Map#flyTo之类的方法，地图在完成从一个缩放级别到另一个缩放级别的转换后立即触发",
  },
  {
    shuxing: "zoom",
    shuoming: "由于用户交互或诸如Map#flyTo之类的方法的结果，在从一个缩放级别到另一个缩放级别的动画过渡期间反复触发",
  },
  {
    shuxing: "zoomstart",
    shuoming: "由于用户互动或诸如Map#flyTo之类的方法而在地图开始从一个缩放级别过渡到另一个缩放级别之前触发",
  },
  {
    shuxing: "moveend",
    shuoming: "由于用户交互或诸如Map#jumpTo之类的方法，地图在完成从一个视图到另一个视图的转换后立即触发",
  },
  {
    shuxing: "move",
    shuoming: "由于用户交互或诸如Map#flyTo之类的方法的结果，在从一个视图到另一个视图的动画过渡期间反复触发",
  },
  {
    shuxing: "movestart",
    shuoming: "由于用户互动或诸如Map#jumpTo之类的方法而在地图开始从一个视图过渡到另一个视图之前触发",
  },
  {
    shuxing: "touchcancel",
    shuoming: "地图中发生touchcancel事件时触发",
  },
  {
    shuxing: "touchmove",
    shuoming: "地图中发生touchmove事件时触发",
  },
  {
    shuxing: "touchend",
    shuoming: "地图中发生touchend事件时触发",
  },
  {
    shuxing: "touchstart",
    shuoming: "地图中发生touchstart事件时触发",
  },
  {
    shuxing: "wheel",
    shuoming: "在地图内发生转轮事件时触发",
  },
  {
    shuxing: "contextmenu",
    shuoming: "当单击鼠标右键或在地图中按下上下文菜单键时触发",
  },
  {
    shuxing: "mouseout",
    shuoming: "当鼠标离开地图画布时触发",
  },
  {
    shuxing: "resize",
    shuoming: "调整地图大小后立即触发",
  },
  {
    shuxing: "remove",
    shuoming: "使用地图对象map的remove()删除地图后立即触发",
  },
  {
    shuxing: "mousedown",
    shuoming: "在地图内按下鼠标时触发",
  },
  {
    shuxing: "mouseup",
    shuoming: "在地图内释放鼠标时触发",
  },
  {
    shuxing: "mousemove",
    shuoming: "当鼠标在地图内移动时触发",
  },
  {
    shuxing: "mouseleave",
    shuoming: "当鼠标离开指定图层的可见部分或离开地图画布时触发。只能通过Map#on的三参数版本监听此事件，其中第二个参数指定所需的图层",
  },
  {
    shuxing: "dblclick",
    shuoming: "当在地图上的同一点单击鼠标两次时触发",
  },
  {
    shuxing: "mouseenter",
    shuoming: "当鼠标从该图层的外部或地图画布的外部进入指定图层的可见部分时触发。只能通过Map#on的三参数版本监听此事件，其中第二个参数指定所需的图层",
  },
];
</script>

<style lang='less' scoped>
.DemoInit {

}

</style>

<template>
  <div class="DemoInit">
    <gy-title>GySjMap</gy-title>
    <p class="sub-title">
      主容器
    </p>
    <gy-demo-box title="初始化" :code="GySjmapTheme1_code">
      <GySjmapTheme1/>
    </gy-demo-box>
    <gy-title>Theme 配置文件</gy-title>
    <p>地图主题设置，是需要将mapOpt中的styleType设置为所需要的主题。</p>
    <p>其中，将styleType设置为0表示默认主题，将styleType设置为1则为卫星图。</p>
    <p>需要自定义颜色时，需要将styleType设置为包含主题颜色的theme对象。theme具体格式如下：</p>
    <p>
      （
      注：如果需要隐藏某个地块颜色，需要在对应的属性中设置{"visibility": 'none'}或{"line-opacity": 0}，
      其中属性中包含line-color则添加{"line-opacity": 0}，
      属性中包含fill-color或text-color则添加{"visibility": 'none'}
      ）
    </p>
    <br>
    <ShowCode :code="theme_code" />
  </div>
</template>

<script setup lang="ts">
import {GySjmapTheme1, GySjmapTheme1_code} from "./demo";
import theme_code from './demo/theme.ts?raw'
import ShowCode from '@/components/ShowCode.vue'
</script>

<style lang='less' scoped>
.DemoInit {

}

</style>

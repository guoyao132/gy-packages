<template>
  <GyPage :group="group"></GyPage>
</template>
<script setup lang="ts">
import GyPage from '@/components/GyPage.vue'

console.log(GyPage);
import {ref} from 'vue';
import type {Ref} from 'vue';

let group:Ref<LeftMenuGroup[]> = ref([]);
group.value = [
  {
    title: '安装',
    items: [
      {
        name: 'GySjmap',
        path: '/GySjmap/Install',
      },
    ],
  },
  {
    title: '使用',
    items: [
      {
        name: '初始化',
        path: '/GySjmap/Init'
      },
      {
        name: '地图主题',
        path: '/GySjmap/Theme'
      },
    ]
  },
  {
    title: '覆盖物组件',
    items: [
      {
        name: 'GySjmapText',
        path: '/GySjmap/GySjmapText'
      },
      {
        name: 'GySjmapCircle',
        path: '/GySjmap/GySjmapCircle'
      },
      {
        name: 'GySjmapImage',
        path: '/GySjmap/GySjmapImage'
      },
      {
        name: 'GySjmapHtml',
        path: '/GySjmap/GySjmapHtml'
      },
      {
        name: 'GySjmapLine',
        path: '/GySjmap/GySjmapLine'
      },
      {
        name: 'GySjmapPolygon',
        path: '/GySjmap/GySjmapPolygon'
      },
      {
        name: 'GySjmapHeat',
        path: '/GySjmap/GySjmapHeat'
      },
      {
        name: 'GySjmapPlaceSearch',
        path: '/GySjmap/GySjmapPlaceSearch'
      },
    ]
  },
  {
    title: '控件',
    items: [
      {
        name: 'GySjmapLonlat',
        path: '/GySjmap/GySjmapLonlat'
      },
      {
        name: 'GySjmapTask',
        path: '/GySjmap/GySjmapTask'
      },
      {
        name: 'GySjmapDraw',
        path: '/GySjmap/GySjmapDraw'
      },
    ]
  },
];
</script>

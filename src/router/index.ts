import { createRouter, createWebHashHistory } from 'vue-router'
import {
  GyMapRouter,
} from '../docs'
import GyMap from '@/views/GyMap.vue';
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: {name: 'GyMap'},
    },
    {
      path: '/gy-map',
      name: 'GyMap',
      redirect: {name: 'U-Gy-GyMap-Install'},
      component: GyMap,
      children: GyMapRouter,
    },
  ]
})

export default router

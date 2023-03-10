import { createRouter, createWebHashHistory } from 'vue-router'
import {
  GySjmapRouter,
} from '../docs'
import GySjmap from '@/views/GySjmap.vue';
const router = [
  {
    path: '/',
    name: 'home',
    redirect: {name: 'GySjmap'},
  },
  {
    path: '/gy-sjmap',
    name: 'GySjmap',
    redirect: {name: 'U-Gy-GySjmap-Install'},
    component: GySjmap,
    children: GySjmapRouter,
  },
]
// const router = createRouter({
//   history: createWebHashHistory(),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       redirect: {name: 'GySjmap'},
//     },
//     {
//       path: '/gy-sjmap',
//       name: 'GySjmap',
//       redirect: {name: 'U-Gy-GySjmap-Install'},
//       component: () => import('@/views/GySjmap.vue'),
//       children: GySjmapRouter,
//     },
//   ]
// })

export default router

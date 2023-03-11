import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/GyHome.vue'),
    },
    // {
    //   path: '/gy-sjmap/:chapters*',
    //   component: ChildrenCon,
    // },
    ,
    {
      // 因为主应用为history路由，appname-vite子应用是hash路由，这里配置略微不同
      // 已解决带参数时页面丢失的问题
      path: '/gy-sjmap/:page*',
      name: 'gy-sjmap',
      component: () => import('@/views/ChildGySjmap.vue'),
    },
  ]
})

export default router

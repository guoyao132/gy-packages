// import './public-path'
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.less'
import hljs from 'vue3-hljs'
import "highlight.js/styles/dark.css"
import gySjmap from 'gy-sjmap'
import gyUi from 'gy-ui'

let app: any = null;
app = createApp(App);
app.use(router);
app.use(hljs);
app.use(gySjmap);
app.use(gyUi);
app.mount('#gy-sjmap');

window.addEventListener('unmount-gy-sjmap', () => {
  if (app) {
    app?.unmount();
    app = null;
    window.eventCenterForAppNameVite?.clearDataListener()
  }
})

/****************
 import { createRouter, createWebHashHistory } from 'vue-router'
 let app:any = null;
 let router = null;
 function mount () {
  app = createApp(App);
  router = createRouter({
    history: createWebHashHistory(),
    routes,
  })
  app.use(router);
  app.use(hljs);
  app.use(gySjmap);
  app.use(gyUi);
  app.mount('#gy-sjmap');
}

 function unmount () {
  app?.unmount();
  router = null;
  // 卸载所有数据监听函数
  window.eventCenterForAppNameVite?.clearDataListener()
  app = null
}

 // window.addEventListener('unmount-gy-sjmap', () => {
  // if(app){
  //   app?.unmount();
  //   app = null;
  //   window.eventCenterForAppNameVite?.clearDataListener()
  // }
// })
 // 微前端环境下，注册mount和unmount方法
 console.log(window.__MICRO_APP_BASE_APPLICATION__);
 if (window.__MICRO_APP_BASE_APPLICATION__) {
  // @ts-ignore
  window['micro-app-gy-sjmap'] = { mount, unmount }
  console.log(window['micro-app-gy-sjmap']);
} else {
  // 非微前端环境直接渲染
  mount()
}

 **********************/

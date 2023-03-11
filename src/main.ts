import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './assets/main.less'
import hljs from 'vue3-hljs'
import "highlight.js/styles/dark.css"

import gyMap from 'gy-map'
import gyUi from 'gy-ui'

let app = createApp(App)

app.use(router)
app.use(hljs)
app.use(gyMap)
app.use(gyUi)

app.mount('#gy-map')

window.addEventListener('unmount-gy-map', () => {
  if (app) {
    app?.unmount();
    app = null;
    window.eventCenterForAppNameVite?.clearDataListener()
  }
})

import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.less'
import microApp from '@micro-zoe/micro-app'

microApp.start({
  plugins: {
    modules: {
      // appName即应用的name值
      'gy-sjmap': [{
        loader(code) {
          if (process.env.NODE_ENV === 'development') {
            // 这里 basename 需要和子应用vite.config.js中base的配置保持一致
            code = code.replace(/(from|import)(\s*['"])(\/gy-sjmap\/)/g, all => {
              return all.replace('/gy-sjmap/', 'http://127.0.0.1:5173/gy-sjmap/')
            })
          }

          return code
        }
      }]
    }
  }
});

const app = createApp(App)
// app.use(createPinia())
app.use(router)
app.mount('#app')

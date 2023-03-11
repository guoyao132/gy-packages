import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import type {ConfigEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const AutoImport = require('unplugin-auto-import/vite')
const Components = require('unplugin-vue-components/vite')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')

import html from '@rollup/plugin-html';
import htmlTemplate from './htmlTemplate.min'

const resolve = (str: string) => {
  return path.resolve(__dirname, str)
}
// https://vitejs.dev/config/
export default defineConfig(({mode}: ConfigEnv) => {
  return {
    server: {
      port: 5174,
      proxy: {
      }
    },
    base: `${process.env.NODE_ENV === 'production' ? '' : ''}/gy-map/`,
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      html({
        template: htmlTemplate,
      })
    ],
    resolve: {
      alias: {
        'gy-ui': resolve('packages/gy-ui'),
        'gy-map': resolve('packages/gy-map'),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    },
    build:{
      outDir: 'gy-map',
      lib: {
        name: 'gy-map',
        entry: 'src/main.ts',
        formats: ['umd'],
      },
      // minify: 'terser',
      // chunkSizeWarningLimit: 2000,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    optimizeDeps: {
      exclude: ['vue-demi']
    },
    define: {
      'process.env': {},
    }
  }
})

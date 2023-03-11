import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import type {ConfigEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path, {join} from 'path'
import html from '@rollup/plugin-html';
import htmlTemplate from './htmlTemplate.min'
import {writeFileSync} from 'fs'
import compressPlugin from 'vite-plugin-compression';

const useDevMode = true;

const AutoImport = require('unplugin-auto-import/vite')
const Components = require('unplugin-vue-components/vite')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')
const resolve = (str: string) => {
  return path.resolve(__dirname, str)
}
// https://vitejs.dev/config/
export default defineConfig(({mode}: ConfigEnv) => {
  return {
    server: {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      proxy: {
        '/ccmodel': {
          target: 'http://172.18.8.146',
          changeOrigin: true
        },
        '/gyModel': {
          target: 'http://172.18.8.146',
          changeOrigin: true
        },
      }
    },
    base: `${process.env.NODE_ENV === 'production' ? 'http://172.18.8.146' : ''}/gy-sjmap/`,
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      // 自定义插件
      // (function () {
      //   let basePath = ''
      //   return {
      //     name: "gy-sjmap",
      //     apply: 'build',
      //     configResolved(config) {
      //       basePath = `${config.base}${config.build.assetsDir}/`
      //     },
      //     writeBundle (options, bundle) {
      //       for (const chunkName in bundle) {
      //         if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
      //           const chunk = bundle[chunkName]
      //           if (chunk.fileName && chunk.fileName.endsWith('.js')) {
      //             chunk.code = chunk.code.replace(/(from|import\()(\s*['"])(\.\.?\/)/g, (all, $1, $2, $3) => {
      //               return all.replace($3, new URL($3, basePath))
      //             })
      //             const fullPath = join(options.dir, chunk.fileName)
      //             writeFileSync(fullPath, chunk.code)
      //           }
      //         }
      //       }
      //     },
      //   }
      // })() as any,

      html({
        template: htmlTemplate,
      })
    ],
    resolve: {
      alias: {
        'gy-ui': resolve('packages/gy-ui'),
        'gy-sjmap': resolve('packages/gy-sjmap'),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    },
    build:{
      outDir: 'gy-sjmap',
      lib: {
        name: 'gy-sjmap',
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

import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import type {ConfigEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
const resolve = (str: string) => {
  return path.resolve(__dirname, str)
}
const modeSetter = {
  sjmap: {
    outDir: 'pakSjMap/lib/v3',
    entry: resolve('./packages/gy-sjmap/index.ts'),
    name: 'gy-sjmap',
  },
  model: {
    outDir: 'pakModel/lib/v3',
    entry: resolve('./packages/gy-model/index.ts'),
    name: 'gy-model',
  }
}
// @ts-ignore
export default defineConfig(({mode}: ConfigEnv) => {
  let outDir = 'pakMap/lib/v3';
  let name = 'gy-map';
  let entry = resolve('./packages/gy-map/index.ts');
  if(mode){
    // @ts-ignore
    outDir = modeSetter[mode].outDir;
    // @ts-ignore
    entry = modeSetter[mode].entry
    // @ts-ignore
    name = modeSetter[mode].name
  }
  return {
    base: './',
    publicDir: mode === 'model' ? false : 'public',
    plugins: [
      vue(),
    ],
    resolve: {
      resolve: {
        alias: {
          '@': resolve(__dirname)
        }
      },
    },
    build:{
      outDir: outDir,
      lib: {
        entry: entry,
        name: name,
        fileName: (format) => `${name}.${format}.js`,
        formats: ['es', 'cjs', 'umd']
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          //生产环境移除console
          drop_console: true,
          drop_debugger: true,
        }
      },
      rollupOptions: {
        external: ['vue', 'vue-demi'],
        output: {
          globals: {
            vue: 'Vue',
            'vue-demi': 'VueDemi'
          }
        }
      },
    },
    optimizeDeps: {
      exclude: ['vue-demi']
    },
  }
})

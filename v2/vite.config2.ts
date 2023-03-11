import {defineConfig} from 'vite'
import type {ConfigEnv} from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

import path from 'path'
const resolve = (str: string) => {
  return path.resolve(__dirname, str)
}
const modeSetter = {
  sjmap: {
    outDir: '../pakSjMap/lib/v2',
    entry: resolve('../packages/gy-sjmap/index.ts'),
    name: 'gy-sjmap',
  },
  model: {
    outDir: '../pakModel/lib/v2',
    entry: resolve('../packages/gy-model/index.ts'),
    name: 'gy-model',
  }
}
export default defineConfig(({mode}: ConfigEnv) => {
  let outDir = '../pakMap/lib/v2';
  let name = 'gy-map';
  let entry = resolve('../packages/gy-map/index.ts');
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
    plugins: [
      createVuePlugin(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname)
      }
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
      globals: {
        vue: 'Vue',
        'vue-demi': 'VueDemi'
      },
      rollupOptions: {
        external: ['vue', 'vue-demi'],
        output: {
          exports: 'auto',
        }
      },
    },
  }
})

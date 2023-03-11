import {fileURLToPath, URL} from 'node:url'

import {defineConfig, searchForWorkspaceRoot} from 'vite'
import type {ConfigEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import compressPlugin from 'vite-plugin-compression';

const resolve = (str: string) => {
  return path.resolve(__dirname, str)
}
export default defineConfig(({mode}: ConfigEnv) => {
  return {
    server: {
      port: 8001,
      proxy: {
      },
      // fs: {
      //   allow: [
      //     searchForWorkspaceRoot(process.cwd()),
      //     '/mygit/micro-zoe/micro-app/'
      //   ]
      // }
    },
    base: './',
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: tag => /^micro-app/.test(tag)
          }
        }
      }),
      // compressPlugin({
      //   ext: '.gz',
      //   deleteOriginFile: false, // 是否删除原始文件
      // })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    },
    build:{
      outDir: 'npm-main',
      minify: 'terser',
      chunkSizeWarningLimit: 2000,
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true,
      //   },
      // },
    },
  }
})

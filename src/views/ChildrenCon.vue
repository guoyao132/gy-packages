<template>
  <div class="ChildrenCon">
    <micro-app
      name='gy-sjmap'
      :url='`${VITE_SJMAP_URL}`'
      inline
      disablesandbox
      @created='handleCreate'
      @beforemount='handleBeforeMount'
      @mounted='handleMount'
      @unmount='handleUnmount'
      @error='handleError'
      @datachange='handleDataChange'
    ></micro-app>
  </div>
</template>

<script setup lang="ts">
const VITE_SJMAP_URL = import.meta.env.VITE_SJMAP_URL
const handleCreate = (): void => {
  console.log('child-vite 创建了')
}

const handleBeforeMount = (): void => {
  console.log('child-vite 即将被渲染')
}

const handleMount = (): void => {
  console.log('child-vite 已经渲染完成')
}

const handleUnmount = (): void => {
  console.log('child-vite 卸载了')
}

const handleError = (): void => {
  console.log('child-vite 加载出错了')
}

const handleDataChange = (e: CustomEvent): void => {
  console.log('来自子应用 child-vite 的数据:', e.detail.data)
}
</script>

<style lang='less' scoped>
.ChildrenCon {
  height: 100%;
}
</style>

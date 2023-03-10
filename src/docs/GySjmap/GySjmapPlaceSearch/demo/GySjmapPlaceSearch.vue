<template>

  <SjmapCon>
    <input class="input-key" v-model="inputValue">
    <button class="btn-key" @click="getDataBykeywords"> 查询</button>
    <GySjmapPlaceSearch :keywords="keywords" :size="10" @getData="getData"/>
    <div class="panel">
      <div class="panel-list" v-for="(item,key) in List" @click="itemClick(item)">
        <div class="label"><span class="icon">{{key+1}}</span></div>
        <div class="name">{{ item.name }}</div>
        <div class="address">{{ item.address }}</div>
      </div>
    </div>


  </SjmapCon>

</template>
<script setup lang="ts">
import SjmapCon from '@/components/SjmapCon.vue'
import {ref} from 'vue'
import type {Ref} from 'vue'
import {gySjMap} from "gy-sjmap";
const keywords: Ref<string> = ref('')
const inputValue: Ref<string> = ref('')
// const List:Ref<array> =ref([])
let List = ref([])


const getData = (res: object) => {
  List.value = res.poiList.pois

}
const itemClick = (item: object) => {
  console.log(item);

}
const getDataBykeywords = () => {
  keywords.value = inputValue.value
}

</script>

<style lang="less">
.btn-key, .input-key {
  border: 1px solid #aaa;
  height: 40px;
  position: absolute;
  padding-left: 4px;
  z-index: 2;

  &.btn-key {
    cursor: pointer;
    left: 162px;

  }
}

.panel {
  background: #fff;
  height: 340px;
  position: absolute;
  z-index: 22;
  overflow: auto;
  top: 40px;

  .panel-list {
    position: relative;
    padding: 8px 8px 8px 40px;
    line-height: 20px;
    cursor: pointer;

    .name{
      font-size: 14px;
      font-weight: bold;
    }
    .label{
      width: 20px;
      height: 40px;
      text-align: center;
      position: absolute;
      left: 10px;
      top: 10px;
      font: 12px arial,simsun,sans-serif;
      color: #fff;
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAfCAYAAAAFkva3AAACd0lEQVR42qWU3UuTYRjG34iiw+gk6CAp2XRqsyazWRuz8c656UF/QV8URhQSNaMP5kzRudQ5Zy3zD+i0gygiZ44oogjDJJBqjMTS1Gxzm1s17+4rYmBzbXt38OPhue/r+jEG7yMQURoWZ2QHY2XGmBkm8ff0Y479er01F3N3eBPTzsQs7gQ1eJPUOETUOMzwiTvm2COH/LqyekdoK+Mz98ep4Q4XhzODPXKcH2W2rZGZupY2MiP17hWycDBXkOfec2ZzSlbXuWg39UXJPER5gx76BJmxY347EzPx/1HHy3xBD314BLF97qLYs0zG26uSQZ89VsHQ9mVUHFgh0ZuUDPrwCIfsM3OGmz/I4P0lGfTZMyvU2qaTtbd+UqHAI+ivBZf1gwnSs10q6LMnLOiuBsZ1rgjpeCCZ/gix542gvfLerXXM00FPXDJaxwKxxyMcuDSlqbEFSeNZkQz68Pz5Ampa3o3t75yl6oFY3qCHfupz0lgnS5i42hUmtTuaM8ijh35KBqovTLSp7Z+oqj+aM8ijl/YEqc+Pb2ECqq6vtM8VyQpyyKOXJgNVza8Pqy5PkbJvOSvIIZ/xpQWqcy9HKvnnV/SGM4I953zI/1e29+wLJZMs7w1RJrBHLqsMVJ55drfCFiBFz/c0MMceuZxkytNPy5hV+Y0l+hfMsc9ZBvY0+e+VtgZJ5vyWAnfMsc9LVn7qiahofkXFzsUUuGOet6zspG8D87G44zPt7l4gnLhjnrcMKE48tsmsb6mIXwWcfG/FXJKs9PijUnmTn3byE4UTd8kyUHLs4Yei69OEE/eCZPKjDwZ3tUwSzoJlsiP3RSbEGLNlfwPf80fNP6DL+QAAAABJRU5ErkJggg==") center top no-repeat;
      background-size:100%;
      .icon{
        line-height: 24px;

      }
    }
  }

}
</style>

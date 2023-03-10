<template>
  <SjmapCon>
    <GySjmapDraw
      :oldDataList="oldDataList"
      @drawFinish="drawFinish"
      :drawTypeList="drawTypeList"
      :drawTypeCnameList="drawTypeCnameList"
    ></GySjmapDraw>
  </SjmapCon>
  <input type="number" v-model="index">
  <br>
  <input type="number" v-model="index1">
  <button @click="deleteCoor">删除</button>

  <div v-for="(list, i) in oldDataList" :key="'a' + i">
    <div v-for="(coor, i1) in list.coordinates" :key="'b' + i1">
      {{coor}}
    </div>
  </div>
</template>

<script setup lang="ts">
import SjmapCon from '@/components/SjmapCon.vue';
import {ref} from "vue"
import type {Ref} from "vue"

let a = true
const drawFinish = (data: any) => {
  console.log(data);
  if(a){
    // a = false;
    oldDataList.value= data;
  }
}
const drawTypeList = [
  'Line',
]
const drawTypeCnameList = [
  '线',
]
const index = ref(0);
const index1 = ref(3);
interface dataObj {
  type: string,
  coordinates: number[][]
}
const oldDataList:Ref<Array<dataObj>> = ref([])
const deleteCoor = () => {
  oldDataList.value[index.value].coordinates.splice(index1.value, 1);
}
</script>

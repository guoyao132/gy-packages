<template>
  <MapCon>
    <GymapText
      :position="[116.40531, 39.896884]"
      text="GymapText 内容"
      fillColor="#fff"
      font="20px sans-serif"
      strokeColor="red"
      @clickFun="clickFun"
    />
    <GymapText
      :position="[116.40531, 39.897884]"
      text="GymapText 内容"
      fillColor="#fff"
      font="20px sans-serif"
      strokeColor="red"
      @clickFun="clickFun1"
    />
  </MapCon>
</template>

<script setup lang="ts">
import MapCon from '@/components/MapCon.vue'
const clickFun = (e:any) =>{
  console.log(1);
}
const clickFun1 = (e:any) =>{
  console.log(2);
}
</script>

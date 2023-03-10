<template>
  <div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import {defineComponent, onMounted, watch, onBeforeMount,onBeforeUnmount, computed, getCurrentInstance} from 'vue-demi'
import type {Ref, PropType, defineComponent as defineComponentOption} from 'vue-demi'
import {SGMap} from "../../../index";
import {TURF} from '../../../index'
type TaskStatus = 'play' | 'stop' | 'pause' | '';
export default defineComponent({
  name: 'GySjmapTask',
  props: {
    positionList: {
      type: Array as PropType<number[][]>,
      default: () => ([]),
    },
    loop: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 0.001,
    },
    taskStatus: {
      type: String as PropType<TaskStatus>,
      default: 'play',
    },
    delay: {
      type: Number,
      default: 3000,
    },
  },
  emits: ['animate'],
  setup(props, {emit}){
    const {proxy} = getCurrentInstance();
    const mapId:string = proxy.$parent.id;
    let canPlay = true;
    let noComponents = false;
    let childrenWatch = null;
    let layer = null;
    let timer:Number | undefined = undefined;
    const runTask = (childLayerObj?:any, childProps?:any) => {
      if(!canPlay){
        return
      }
      if(!noComponents){
        if(!childrenWatch){
          childrenWatch = watch(() => childProps.position, () => {
            animIndex = 0;
            destory();
          })
        }
        layer = childLayerObj;
      }
      if(props.taskStatus === 'play'){
        startTask();
      }
      if(props.delay !== 0){
        timer = setTimeout(() => {
          startTask();
        }, props.delay)
      }
    }
    watch(() => props.taskStatus, (n:TaskStatus) => {
      if(n === 'play'){
        startTask();
      }else if(n === 'stop'){
        animIndex = 0;
        stopTask();
      }else if(n === 'pause'){
        stopTask();
      }
    })
    const getAllLonlat = (positions:number[][]): any => {
      let linestring = TURF.lineString(positions);
      let step = Math.min(props.step, 0.5);
      let chunk = TURF.lineChunk(linestring, step, {
        units: 'kilometers',
      });
      let positionsList = chunk.features.map(v => {
        return v.geometry.coordinates[0];
      })
      positionsList.push(chunk.features.slice(-1)[0].geometry.coordinates[0])
      return positionsList;
    }
    let lineGeometry:any = null;
    const startTask = () => {
      if(timer){
        clearTimeout(timer);
        timer = null;
      }
      if(noComponents ? false : !layer){
        return;
      }
      if(aId){
        return;
      }
      if(!lineGeometry){
        lineGeometry = getAllLonlat(props.positionList);
      }
      animate();
    }
    let animIndex = 0;
    let aId = null;
    let i = 0;
    const animate = () => {
      let coordinate = lineGeometry[animIndex];
      if(!noComponents) {
        if(layer instanceof SGMap.Marker){
          layer && layer.setLngLat(coordinate)
        }else{
          layer.nextPosition.value = coordinate;
        }

        // if(layer.geometry){
        //   layer.geometry.setCoordinates(coordinate)
        // }else{
        //   layer.setPosition(coordinate)
        // }
      }
      emit('animate', coordinate, animIndex);
      if(animIndex >= lineGeometry.length - 1){
        stopTask();
        if(props.loop){
          animIndex = 0;
          animate();
        }
        return
      }
      let step = props.step;
      animIndex++;
      aId = window.requestAnimationFrame(animate)
    }
    const stopTask = () => {
      childrenWatch && childrenWatch();
      aId && window.cancelAnimationFrame(aId)
      aId = null;
    }
    const destory = () => {
      if(timer){
        clearTimeout(timer);
        timer = null;
      }
      stopTask();
    }
    onBeforeMount(() => {
      let defaultStr = proxy.$slots.default;
      if(defaultStr){
        let children = proxy.$slots.default();
        let len = 0;
        for(let i = 0; i < children.length; i++){
          let child = children[i];
          if(typeof child.type !== 'symbol'){
            len++;
            if(len > 1){
              canPlay = false;
              console.error('GymapTask组件中只允许存在一个需要执行动画的组件。');
              break;
            }
          }
        }
      }else if(!defaultStr){
        noComponents = true;
        runTask();
      }
    })
    onMounted(() => {
      if(noComponents){
        runTask();
      }
    })
    return {
      id: mapId,
      runTask: runTask,
      destory: destory,
    }
  }
} as defineComponentOption)
</script>

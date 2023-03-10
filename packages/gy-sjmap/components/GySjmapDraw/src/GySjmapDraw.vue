<template>
  <div class="draw-btns-list" v-show="isShowBtns && mapFinish" ref="drawCon">
    <div class="draw-start draw-btn" v-show="!status || status === 'end'" @click="startDrawClick">开始绘制</div>
    <div class="draw-type draw-btn draw-type-select" @mouseenter="mouseenterSelect" @mouseleave="mouseleaveSelect" v-show="status && status !== 'end'">
      绘制类型
      <div class="draw-type-select-con" :style="{'height': !isHover ? 0 : drawTypeList.length * 20 + 16 + 'px'}">
        <div v-for="(item, index) in drawTypeList" :key="'type' + index"
             :class="['draw-type-option', {'active': drawType === item}]"
             @click="changeDrawType(item)">
          {{ drawTypeCnameList[index] || '待定' }}
        </div>
      </div>
    </div>
    <div class="draw-end draw-btn" v-show="status !== 'end' && drawStatus === 'drawEnd'" @click="goOnstartDraw">
      继续添加
    </div>
    <div class="draw-end draw-btn" v-show="status && status !== 'end'" @click="endDraw(true)">绘制完成</div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, onMounted, onBeforeUnmount, computed, getCurrentInstance, watch} from 'vue-demi'
import type {Ref, UnwrapRef, ComputedRef, defineComponent as defineComponentOption} from 'vue-demo'
import {gySjMap, SGMap} from "../../../index";
import type {gySjmapType} from '../../../index'

export default defineComponent({
  name: 'GySjmapDraw',
  props: {
    isShowBtns: {
      type: Boolean,
      default: true,
    },
    oldDataList: {
      type: Array,
      default: () => ([])
    },
    drawTypeList: {
      type: Array,
      default: () => {
        return [
          'Point',
          'Line',
          'Circle',
          'Rect',
          'Polygon',
        ]
      }
    },
    drawTypeCnameList: {
      type: Array,
      default: () => {
        return [
          '点',
          '线',
          '圆',
          '矩形',
          '多边形',
        ]
      }
    },
    btnBackground: {
      type: String,
      default: 'rgb(102, 102, 102)',
    },
    btnColor: {
      type: String,
      default: '#fff',
    },
    btnActiveBackground: {
      type: String,
      default: 'rgb(142, 142, 142)',
    },
    btnActiveColor: {
      type: String,
      default: '#fff',
    },
  },
  emits: ['drawFinish', 'startDrawFun'],
  setup(props, {emit}) {
    const drawCon: Ref<HTMLElement | null> = ref(null);
    const {proxy} = getCurrentInstance();
    const mapId: string = proxy.$parent.id;
    const gySjmapObj: Ref<UnwrapRef<gySjmapType>> = gySjMap(mapId);
    const mapFinish: ComputedRef<boolean> = computed(() => gySjmapObj.value && gySjmapObj.value.mapFinish);
    let drawObj: Ref<any> = ref(null);
    let first = true;
    let isInit: boolean = false;
    const drawType: Ref<any> = ref('');
    const status = ref('');
    const drawListObj = reactive({
      Point: null,
      LineString: null,
      Circle: null,
      Polygon: null,
    });
    let pluginObj = {
      "Point": "DrawPointHandler",
      "Line": "DrawPolylineHandler",
      "Circle": "DrawCircleHandler",
      "Rect": "DrawRectangleHandler",
      "Polygon": "DrawPolygonHandler",
    };
    let hasPluginList:Array<string> = [];
    const drawStatus: Ref<string> = ref('');
    const addDrawPlugin = (typeStr?: string) => {
      return new Promise((resolve) => {
        let type = pluginObj[typeStr || drawType.value];
        if(hasPluginList.includes(type)){
          resolve(typeStr);
        }else{
          SGMap.plugin([`SGMap.${type}`]).then((data) => {
            let k = Object.keys(pluginObj)[Object.values(pluginObj).findIndex(v => v === type)];
            hasPluginList.push(k);
            resolve(typeStr);
          });
        }
      })
    }
    const startDrawClick = () => {
      emit('startDrawFun');
      startDraw();
    }
    const startDraw = async () => {
      if(first){
        first = false;
        gySjmapObj.value.map.doubleClickZoom.disable();
      }
      if (status.value === 'start') {
        return;
      }
      status.value = 'start';
      if (drawType.value && drawListObj[drawType.value]) {
        drawObj.value = drawListObj[drawType.value];
      } else {
        if(drawType.value){
          await addDrawPlugin();
          let type = pluginObj[drawType.value];
          drawObj.value = new SGMap[type]({
            drawColor: 'rgb(0, 153, 255)',
            editColor: 'rgb(255, 204, 51)',
            map: gySjmapObj.value.map,
            // 开启编辑功能
            enableEdit: true,
            // 编辑数据
            featuresList: []
          });
          drawListObj[drawType.value] = drawObj.value;
          addDrawEvent();
        }
      }
      if(drawType.value) {
        drawObj.value.startDraw();
      }
    }
    let editTimer = null;
    const addDrawEvent = (drawTypeStr?:string) => {
      let drawTypeObj = {
        "Point": "point",
        "Line": "polyline",
        "Circle": "circle",
        "Rect": "rectangle",
        "Polygon": "polygon",
      }
      drawTypeStr = drawTypeStr || drawType.value;
      let type = drawTypeObj[drawTypeStr];
      // 编辑结束
      drawListObj[drawTypeStr].on(`draw.${type}.start`, function (data) {
        // 返回point
        drawStatus.value = 'drawStart'
      });
      drawListObj[drawTypeStr].on(`draw.${type}.end`, function (data) {
        // 返回point
        drawStatus.value = 'drawEnd'
      });
      drawListObj[drawTypeStr].on(`edit.${type}.start`, function (data) {
        // 返回point
        drawStatus.value = 'drawEdit'
      });
      drawListObj[drawTypeStr].on(`edit.${type}.end`, function (data) {
        // 返回point
        drawStatus.value = 'editEnd'
        if(status.value === 'end'){
          submitData();
        }
      });
    }
    const goOnstartDraw = () => {
      drawObj.value.exitEdit();
      drawStatus.value = 'drawStart';
      drawObj.value.startDraw();
    }
    const deleteDraw = () => {
      if (status.value === 'start') {
        endDraw();
      }
      status.value = 'delete';
    }
    const changeDrawType = (type: any) => {
      if (drawStatus.value === 'drawStart') {
        return
      }
      drawType.value = type;
      if (status.value !== 'end') {
        endDraw();
        startDraw();
      }
    }
    const endDraw = (finish?: boolean) => {
      if (status.value !== 'end') {
        if(finish){
          submitData();
        }else{
          status.value = 'end';
          drawStatus.value = '';
          drawObj.value && drawObj.value.endDraw();
        }
      }
    }
    const submitData = () => {
      if (drawStatus.value === 'drawStart') {
        return
      }
      drawStatus.value = '';
      drawType.value = '';
      status.value = 'end';
      drawObj.value && drawObj.value.endDraw();
      let data = [];
      let keys = Object.keys(drawListObj);
      keys.forEach(v => {
        if (drawListObj[v]) {
          drawListObj[v].exitEdit();
          let features = drawListObj[v].getFeatures();
          features.forEach(val => {
            if(val){
              let coordinates = val.geometry.coordinates;
              switch (v) {
                case 'Circle':
                  coordinates = val.properties.centerPoint;
                  break;
                case 'Point':
                  coordinates = coordinates;
                  break;
                case 'Polygon':
                  coordinates = coordinates[0];
                  break;
              }
              let obj = {
                type: v,
                coordinates: coordinates,
              }
              if (v === 'Circle') {
                let radius = val.properties.radius;
                obj.radius = radius;
                obj.geometry = val.geometry;
              }
              data.push(obj);
            }
          })
        }
      })
      emit('drawFinish', data);
    }
    const destory = () => {
    }
    const mapClick = () => {
      if (status.value === 'start' && drawObj.value._status !== 'drawStart') {
        drawObj.value.startDraw();
      }
    }
    let isInitData = false;
    const initOldData = () => {
      if (mapFinish.value && !isInitData) {
        let oldDataList = props.oldDataList;
        if (oldDataList.length === 0) {
          return;
        }
        // isInitData = true;
        let typeArr = [...new Set(oldDataList.map(v => {
          return v.type
        }))];
        let typePluginArr = [];
        typeArr.forEach(v => {
          if(!hasPluginList.includes(v)){
            hasPluginList.push(v);
            typePluginArr.push('SGMap.' + pluginObj[v])
          }
        })
        let needClearPliginData = hasPluginList.filter(v => !typeArr.includes(v));
        if(needClearPliginData.length !== 0){
          needClearPliginData.forEach(v =>{
            drawListObj[v] && drawListObj[v].clearData();
          })
        }
        if(typePluginArr.length === 0){
          drawOldData(typeArr, true);
        }else{
          SGMap.plugin(typePluginArr).then(() => {
            drawOldData(typeArr, true);
          });
        }
      }
    }
    const drawOldData = (typeArr:string[], addEvent?:boolean) => {
      let oldDataList = props.oldDataList;
      typeArr.forEach(type => {
        if(drawListObj[type]){
          drawListObj[type] && drawListObj[type].clearData();
          drawListObj[type] = null;
        }
        if (props.drawTypeList.includes(type)) {
          let pointArr = oldDataList.filter(v => v.type === type);
          let featuresList = [];
          pointArr.forEach((v, i) => {
            let coordinates = JSON.parse(JSON.stringify(v.coordinates))
            let obj = {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: coordinates,
              },
              properties: {
                id: `drawPointId_${type}_${i}`
              }
            };
            switch (type) {
              case "Line":
                obj.geometry.type = 'LineString';
                break;
              case "Circle":
                if (v.geometry) {
                  obj.geometry = v.geometry;
                  obj.properties.centerPoint = coordinates;
                  obj.properties.radius = v.radius;
                }
                break;
              case "Polygon":
                let coor = [coordinates] as number[][][];
                obj.geometry = {
                  type: "Polygon",
                  coordinates: coor,
                }
                break;
              case "Rect":
                let coor1 = [coordinates] as number[][][];
                obj.geometry = {
                  type: "Polygon",
                  coordinates: coor1,
                }
                break;
            }
            if (obj) {
              featuresList.push(obj)
            }
          })
          let pluginType = pluginObj[type];
          drawListObj[type] = new SGMap[pluginType]({
            drawColor: 'rgb(0, 153, 255)',
            editColor: 'rgb(255, 204, 51)',
            map: gySjmapObj.value.map,
            enableEdit: true,
            featuresList: featuresList
          });
          if(addEvent){
            addDrawEvent(type);
          }
        } else {
          console.error(type + ' 类型不正确')
        }
      })
    }
    watch(() => props.oldDataList, (n, o) => {
      initOldData();
    }, {
      deep: true
    })
    watch(mapFinish, () => {
      initOldData();
    })
    onMounted(() => {
      initOldData();
      drawCon.value.style.setProperty('--btnBackground', props.btnBackground);
      drawCon.value.style.setProperty('--btnColor', props.btnColor);
      drawCon.value.style.setProperty('--deleteActiveBackground', props.deleteActiveBackground);
      drawCon.value.style.setProperty('--deleteActiveColor', props.deleteActiveColor);
      drawCon.value.style.setProperty('--btnActiveBackground', props.btnActiveBackground);
      drawCon.value.style.setProperty('--btnActiveColor', props.btnActiveColor);
    })
    onBeforeUnmount(() => {
      destory();
    })

    const isHover:Ref<boolean> = ref(false);
    const mouseenterSelect = () => {
      isHover.value = true;
    }
    const mouseleaveSelect = () => {
      isHover.value = false;
    }
    return {
      drawListObj,
      drawStatus,
      drawCon,
      drawType,
      status,
      gySjmapObj,
      mapFinish,
      startDraw,
      startDrawClick,
      goOnstartDraw,
      deleteDraw,
      changeDrawType,
      endDraw,
      submitData,
      destory,
      mouseenterSelect,
      mouseleaveSelect,
      isHover,
    }
  }
} as defineComponentOption)

</script>

<style lang='less' scoped>
.draw-btns-list {
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 2;
  color: #fff;
  display: flex;
  --btnBackground: rgb(102, 102, 102);
  --btnColor: #fff;
  --btnActiveBackground: rgb(142, 142, 142);
  --btnActiveColor: #fff;
  --deleteActiveBackground: rgb(28 137 189);
  --deleteActiveColor: #fff;
}

.draw-btn {
  background: var(--btnBackground);
  color: var(--btnColor);
  font-size: 0.8rem;
  padding: 3px 5px;
  margin-right: 1rem;
  border-radius: 5px;
  cursor: pointer;

  &.active {
    background: var(--deleteActiveBackground);
    color: var(--deleteActiveColor);
  }
}

.draw-type-select {
  position: relative;

  &:hover {
    .draw-type-select-con {
      height: 113px;
      padding: 6px 0 10px;
    }
  }
}

.draw-type-select-con {
  position: absolute;
  left: 0;
  top: 80%;
  background: var(--btnBackground);
  width: 100%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-sizing: border-box;
  height: 0;
  overflow: hidden;
  transition: all .3s linear;

  .draw-type-option {
    padding: 0 5px;
  }

  .active {
    background: var(--btnActiveBackground);
    color: var(--btnActiveColor);
  }
}

</style>

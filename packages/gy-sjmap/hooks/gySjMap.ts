// @ts-ignore
const SGMap = window.SGMap;
// @ts-ignore
const TURF = window.turf;
import type {Ref, UnwrapRef} from 'vue-demi'
import {reactive, ref, markRaw} from 'vue-demi';
import streets from './Streets.json'

const BASTURL:string = 'http://172.18.8.146:30000'

interface mapObj {
  contentId:string;
  map: Ref<any>,
  mapFinish: Ref<boolean>,
  layerIndex: Ref<number>,
  [propName:string]: any,
}

interface GyMapResultObj {
  [propName: string]: Ref<UnwrapRef<mapObj>>
}
interface MapOpt {
  key: string,
  sn: string,
  minZoom: number,
  maxZoom: number,
  zoom: number,
  scrollZoom: boolean,
  centerPoint: Array<number>,
  extent: number[][] | undefined,
  dragRotate: boolean,
  dragPan: boolean,
  keyboard: boolean,
  doubleClickZoom: boolean,
  bearing: number,
  pitch: number,
  styleType: any,
  localIdeographFontFamily: string,
}

let gyMapResultObj:GyMapResultObj = {};


const gySjmapInit = (type:string): Ref<UnwrapRef<mapObj>> => {
  type = type || '';
  if(type && gyMapResultObj[type]){
    return gyMapResultObj[type];
  }
  /****************************************/
  //获取在最大最小值内的zoom
  const getRightZoom = (zoom:number| string):number => {
    return Math.max(mapOpt.minZoom, Math.min(Number(zoom || 0), mapOpt.maxZoom))
  }
  //格式化mapOpt
  const formatOpt = ():void => {
    mapOpt.minZoom = Math.max(1, mapOpt.minZoom)
    mapOpt.maxZoom = Math.min(18, mapOpt.maxZoom)
    mapOpt.zoom = getRightZoom(mapOpt.zoom);
  }
  /**************************************/
  let map:Ref<any> = ref(null);
  let mapOpt:MapOpt = {
    key: 'b7b4b226a65935d7962beb4076a16f39',
    sn: '4ecbe00d61a13986bf7a8e1f6c6217e4',
    centerPoint: [116.40531, 39.896884],
    minZoom: 1,
    maxZoom: 20,
    zoom: 16,
    //左下角  右上角
    extent: [],
    scrollZoom: true,
    dragRotate: false,
    dragPan: true,
    keyboard: false,
    doubleClickZoom: true,
    bearing: 0,
    pitch: 0,
    styleType: 0,
    localIdeographFontFamily: "Microsoft YoHei",
  }
  let contentId:string = '';
  let mapFinish:Ref<boolean> = ref(false);
  /****************************************/
  //初始化
  const init = (id:string, opt: any) => {
    if(!id){
      console.error(`not find ${id}`);
      return;
    }
    initOptions(id, opt);
    initMap();
  }
  //初始化配置
  let initOptions = (id:string, opt:any) => {
    contentId = id;
    mapOpt = Object.assign({}, mapOpt, opt);
    formatOpt();

    let extent = mapOpt.extent || undefined;
    if(extent){
      let lonlat1 = extent[0];
      let lonlat2 = extent[1];
      if(lonlat1 && lonlat2){
        mapOpt.extent = new SGMap.LngLatBounds(lonlat1, lonlat2);
      }else{
        mapOpt.extent = undefined;
      }
    }

  }
  const getStyleType = () => {
    if(typeof mapOpt.styleType === 'object'){
      let keys = Object.keys(mapOpt.styleType);
      keys.forEach(key => {
        let obj:any = streets.layers.find(v => v.id === key);
        if(obj){
          obj.paint = Object.assign(obj.paint, mapOpt.styleType[key]);
          if(obj.paint.visibility){
            obj.layout = {
              "visibility": obj.paint.visibility
            }
            delete obj.paint.visibility;
          }
        }
      })
      return streets;
    }else{
      let styleArr = [
        'aegis://styles/aegis/Streets',
        'aegis://styles/aegis/Satellite512',
      ]
      return styleArr[mapOpt.styleType] || 'aegis://styles/aegis/Streets';
    }
  }
  //初始化地图
  const initMap = () => {
    if(!(mapOpt.key && mapOpt.sn)){
      alert('请添加地图你申请的appKey与你申请的appSecret！');
      return
    }
    // 申请的key和sn
    SGMap.tokenTask
      .login(mapOpt.key, mapOpt.sn)
      .then(function () {
        map.value = new SGMap.Map({
          // 地图绑定的DOM元素ID
          container: contentId,
          // 地图样式
          style: getStyleType(),
          // 地图倾斜角  0 - 60
          pitch: mapOpt.pitch,
          // 地图旋转角度
          bearing: mapOpt.bearing,
          // 默认缩放层级
          zoom: mapOpt.zoom,
          minZoom: mapOpt.minZoom,
          maxZoom: mapOpt.maxZoom,
          // 地图中心点
          center: mapOpt.centerPoint,
          // 地图默认字体
          localIdeographFontFamily: mapOpt.localIdeographFontFamily,
          // 地图范围控制
          maxBounds: mapOpt.extent,
          // 是否允许鼠标缩放
          scrollZoom: mapOpt.scrollZoom,
          // 是否允许旋转
          // dragRotate: mapOpt.dragRotate,
          // 是否允许平移
          dragPan: mapOpt.dragPan,
          // 是否允许键盘操作
          keyboard: mapOpt.keyboard,
          // 是否允许双击放大地图
          doubleClickZoom: mapOpt.doubleClickZoom,
        });
        map.value.on("load", function () {
          mapFinish.value = true;
        });
      });
  }
  const addLayerIndex = () => {
    layerIndex.value = layerIndex.value + 1;

  }
  const setMapMediaArr = (src:string) => {
    mapMediaArr.value.push(src);
  }

  const destory = ():void => {
    map.value && map.value.remove();
    map.value = null;
    delete gyMapResultObj[type]
  }
  const layerIndex = ref(0);
  const mapMediaArr:Ref<string[]> = ref([]);
  let result: Ref<UnwrapRef<mapObj>> = ref({
    contentId: type,
    map,
    mapFinish,
    init,
    layerIndex,
    getStyleType,
    addLayerIndex,
    mapMediaArr,
    setMapMediaArr,
    destory,
  });
  gyMapResultObj[type] = result;
  return result
}

const gySjmap = (type:string):Ref<UnwrapRef<mapObj>> => {
  if( gyMapResultObj[type]){
    return  gyMapResultObj[type];
  }
  return gySjmapInit.call(this, type);
};

export default gySjmap;

export {
  SGMap,
  TURF,
}

export type gySjmapType = mapObj
export type MapOptType = MapOpt

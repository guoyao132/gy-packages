import type {ComputedRef, UnwrapRef, Ref} from 'vue-demi'
import {computed, watch, ref} from 'vue-demi'
import type {gySjmapType} from '../../index';
import {gySjMap} from '../../index';

class createOlLayer {
  position: ComputedRef<number[]>;
  layout: any;
  paint: any;
  feature: any;
  mapId: string;
  layerType: string;
  source: any;
  layer: any;
  layerObj: any;
  minZoom: ComputedRef<number>;
  maxZoom: ComputedRef<number>;
  opacity: ComputedRef<number>;
  zIndex: number | undefined;
  propsObj: any;
  gySjmapObj: Ref<UnwrapRef<gySjmapType>>;
  mapFinish: ComputedRef<boolean>;
  isDraw: boolean;
  finishDraw: Ref<boolean>;
  needLoad: boolean;
  mediaNameStr: string;
  mediaSrc: string;
  mediaName: string;
  nextPosition: Ref<number[] | null>;
  emit: any;
  layerId: string;

  constructor(id: string, layerType: string,propsObj: any, emit?: any) {
    this.layout = null;
    this.paint = null;
    this.feature = null;
    this.mapId = '';
    this.source = null;
    this.layer = null;
    this.layerObj = null;
    this.layerType = layerType || 'symbol';
    this.minZoom = computed(() => propsObj.minZoom)
    this.maxZoom = computed(() => propsObj.maxZoom)
    this.opacity = computed(() => propsObj.opacity)
    this.nextPosition  = ref(null);
    this.position = computed(() => this.nextPosition.value || propsObj.position)
    this.propsObj = propsObj;
    this.zIndex = undefined;
    this.gySjmapObj = gySjMap(id);
    this.mapFinish = computed(() => this.gySjmapObj.value && this.gySjmapObj.value.mapFinish);
    this.isDraw = false;
    this.needLoad = false;
    this.finishDraw = ref(false);
    this.mediaNameStr = 'mediaNameStr';
    this.mediaSrc = '';
    this.mediaName = '';
    this.emit = emit || null;
    this.layerId = '';
  }

  init() {

  }

  draw() {
    if(!this.needLoad){
      this.addFeature();
      this.setStyle();
      this.addSource();
      this.addLayer()
    }
    this.addWatchFun()
    this.addLayerToMap()
  }

  addFeature() {
    this.feature = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: this.position.value
      },
      properties: {
        text: "测试点"
      }
    }
  }

  addSource() {
    this.source = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [this.feature,]
      }
    }
  }

  addLayer() {
    this.layerId = `myLayer${this.gySjmapObj.value.layerIndex}`;
    this.layer = {
      id: this.layerId,
      //必选 enum。可选的值有fill，line，symbol，circle，heatmap，fill-extrusion，raster，hillshade，background，esymbol。
      type: this.layerType,
      //图层的数据源名称
      source: this.source,
      //图层的默认绘制属性。
      paint: this.paint,
      layout: this.layout,

      minzoom: this.minZoom.value || 1,
      maxzoom: this.maxZoom.value || 18,
      // opacity: this.opacity.value,
    };
    this.gySjmapObj.value.addLayerIndex();
  }

  addLayerToMap() {
    if (!this.isDraw && this.mapFinish.value) {
      this.isDraw = true;
      if(this.needLoad){
        this.loadMediaAddLayer()
      }else{
        this.addLayerSuccess();
      }
    }
  }

  loadMedia() {
    return new Promise((resolve) => {
      this.gySjmapObj.value.map.loadImage(this.mediaSrc, (error: any, image: any) => {
        this.gySjmapObj.value.setMapMediaArr(this.mediaSrc);
        let index = this.gySjmapObj.value.mapMediaArr.length;
        let mediaName = this.mediaNameStr + index;
        const bool = this.gySjmapObj.value.map.hasImage(mediaName);
        if (!bool) {
          this.gySjmapObj.value.map.addImage(mediaName, image);
        }
        resolve(mediaName)
      })
    })
  }

  loadMediaAddLayer(){
    if(!this.mediaSrc){
      return;
    }
    let index:number = this.gySjmapObj.value.mapMediaArr.findIndex((v:string) => v === this.mediaSrc);
    if(index === -1){
      this.loadMedia().then((mediaName) => {
        this.loadMediaSuccess(mediaName as string)
      })
    }else{
      let mediaName:string = this.mediaNameStr + index;
      this.loadMediaSuccess(mediaName)
    }
  }

  loadMediaSuccess(mediaName:string){
    this.mediaName = mediaName;
    this.addFeature();
    this.setStyle();
    this.addSource();
    this.addLayer();
    this.addLayerSuccess();
  }

  addLayerSuccess(){
    this.gySjmapObj.value?.map?.addLayer(this.layer)
    this.layerObj = this.gySjmapObj.value?.map?.getLayer(this.layer.id);
    this.finishDraw.value = true;
    this.addLayerEvents();
  }

  addWatchFun() {
    watch(this.mapFinish, (n) => {
      this.addLayerToMap();
    })
    this.addLayerWatch();
  }

  addLayerWatch() {
    watch(this.position, (n) => {
      this.setGeoPosition();
    })
    // watch(this.minZoom, (n) => {
    //   this.layer?.setMinZoom(n);
    // })
    // watch(this.maxZoom, (n) => {
    //   this.layer?.setMaxZoom(n);
    // })
    // watch(this.opacity, (n) => {
    //   this.layer?.setOpacity(n);
    // })
  }

  setGeoPosition(){
    this.addFeature();
    this.addSource();
    this.gySjmapObj.value?.map?.getSource(this.layer.id)?.setData(this.source.data);
  }

  setStyle() {
    this.layout = {}
    this.paint = {}
  }

  destory() {
    this.gySjmapObj.value?.map?.removeLayer(this.layer.id);
    this.layer = null;
    this.isDraw = false;
  }

  addLayerEvents(){
    this.gySjmapObj.value?.map?.on("click", this.layerId, (e: any) => {
      this.onLayerClick(e);
    });
  }

  onLayerClick(e:any){
    if(this.emit){
      this.emit('clickFun', e);
    }
  }
}

export default createOlLayer;
const layerProps = {
  minZoom: {
    type: Number,
    default: 1,
  },
  maxZoom: {
    type: Number,
    default: 20,
  },
}
export {
  layerProps as sjMapLayerProps,
}

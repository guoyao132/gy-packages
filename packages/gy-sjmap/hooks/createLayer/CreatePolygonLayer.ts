import CreateLayer, {sjMapLayerProps} from './CreateLayer'
import type {PropType, ComputedRef} from 'vue-demi';
import {computed, watch} from 'vue-demi'
class CreateLineLayer extends CreateLayer{
  positionList: ComputedRef<number[][]>;
  text: ComputedRef<string>;
  constructor(id:string, propsObj : any, emit?: any) {
    super(id, 'fill', propsObj, emit);
    this.positionList = computed(() => propsObj.positionList);
    this.text = computed(() => propsObj.text);
    if(this.propsObj.imgSrc){
      this.mediaSrc = propsObj.imgSrc;
      this.needLoad = true;
      this.draw();
    }
    this.draw();
  }

  addFeature() {
    this.feature = {
      type: "Feature",
      geometry: {
        'type':'LineString',
        'coordinates': this.positionList.value,
      },
      properties: {
        text: this.text.value
      }
    }
  }

  addLayerWatch() {
    watch(this.positionList, (n) => {
      this.setGeoPosition();
    })
  }

  setStyle():any{
    this.layout = {
    }
    let obj = {
      "fill-color": this.propsObj.fillColor,
      "fill-antialias": this.propsObj.fillAntialias,
      "fill-opacity": this.propsObj.fillOpacity,
      "fill-translate": this.propsObj.fillTranslate,
      "fill-translate-anchor": this.propsObj.fillTranslateAnchor,
    };
    if(this.propsObj.imgSrc){
      // @ts-ignore
      obj['fill-pattern'] = this.mediaName;
    }
    if(this.propsObj.fillOutlineColor){
      // @ts-ignore
      obj['fill-outline-color'] = this.propsObj.fillOutlineColor;
    }
    this.paint = obj;
    // "line-gradient": lineGradient,
  }
}

export default CreateLineLayer;
const layerProps = {
  ...sjMapLayerProps,
  //位置
  positionList: {
    type: Array as PropType<number[][]>,
    default: () => ([])
  },
  text: { //fill-color
    type: String,
    default: '',
  },
  textType: { //fill-translate-anchor
    type: String,
    default: 'Polygon',
  },
  fillColor: { //fill-color
    type: String,
    default: '#f00',
  },
  fillAntialias: { //fill-antialias
    type: Boolean,
    default: true,
  },
  fillOpacity: { //fill-opacity
    type: Number,
    default: 1,
  },
  fillOutlineColor: { //fill-outline-color
    type: String,
    default: '',
  },
  fillTranslate: { //fill-translate
    type: Array,
    default: () => ([0,0]),
  },
  fillTranslateAnchor: { //fill-translate-anchor
    type: String,
    default: 'map',
  },
  imgSrc: { //fill-pattern
    type: String,
    default: '',
  },
  layout: {
    type: Object,
    default: () => ({
    }),
  },
  paint: {
    type: Object,
    default: () => ({
      textColor: '#000'
    }),
  },
}
export {
  layerProps,
}


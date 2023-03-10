import CreateLayer, {sjMapLayerProps} from './CreateLayer'
import type {PropType, ComputedRef} from 'vue-demi';
import {computed, watch} from 'vue-demi'
class CreateLineLayer extends CreateLayer{
  positionList: ComputedRef<number[][]>;
  text: ComputedRef<string>;
  constructor(id:string, propsObj : any, emit?:any) {
    super(id, 'line', propsObj, emit);
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
    }, {
      deep: true
    })
  }

  setStyle():any{
    this.layout = {
      "line-cap": this.propsObj.lineCap,
      "line-join": this.propsObj.lineJoin,
      "line-miter-limit": this.propsObj.lineMiterLimit,
      "line-round-limit": this.propsObj.lineRoundLimit,
      "visibility": this.propsObj.visibility,
    }
    let obj = {
      "line-opacity": this.propsObj.lineOpacity,
      "line-color": this.propsObj.lineColor,
      "line-width": this.propsObj.lineWidth,
      "line-translate": this.propsObj.lineTranslate,
      "line-translate-anchor": this.propsObj.lineTranslateAnchor,
      "line-gap-width": this.propsObj.lineGapWidth,
      "line-offset": this.propsObj.lineOffset,
      "line-blur": this.propsObj.lineBlur,
      "line-dasharray": this.propsObj.lineDasharray,
    };
    if(this.propsObj.imgSrc){
      // @ts-ignore
      obj['line-pattern'] = this.mediaName;
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
  lineCap: { //line-cap
    type: String,
    default: 'round',
  },
  lineJoin: { //line-join
    type: String,
    default: 'miter',
  },
  lineMiterLimit: { //line-miter-limit
    type: Number,
    default: 2,
  },
  lineRoundLimit: { //line-round-limit
    type: Number,
    default: 1.05,
  },
  visibility: { //visibility
    type: String,
    default: 'visible',
  },

  lineOpacity: { //line-opacity
    type: Number,
    default: 1,
  },
  lineColor: { //line-color
    type: String,
    default: '#000',
  },
  lineTranslate: { //line-translate
    type: Array,
    default: () => ([0,0]),
  },
  lineTranslateAnchor: { //line-translate-anchor
    type: String,
    default: 'map',
  },
  lineWidth: { //line-width
    type: Number,
    default: 5,
  },
  lineGapWidth: { //line-gap-width
    type: Number,
    default: 0,
  },
  lineOffset: { //line-offset
    type: Number,
    default: 0,
  },
  lineBlur: { //line-blur
    type: Number,
    default: 0,
  },
  lineDasharray: { //line-dasharray
    type: Array,
    default: () => ([]),
  },
  imgSrc: {
    type: String,
    default: '',
  },
  lineGradient: { //line-gradient
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  layout: { //line-gradient
    type: Object,
    default: () => ({}),
  },
  paint: { //line-gradient
    type: Object,
    default: () => ({}),
  },
}
export {
  layerProps,
}

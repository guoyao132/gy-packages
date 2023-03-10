import CreateLayer, {sjMapLayerProps} from './CreateLayer'
import type {PropType, ComputedRef} from 'vue-demi';
import {computed} from 'vue-demi'
class CreateTextLayer extends CreateLayer{
  constructor(id:string, propsObj : any, emit?:any) {
    super(id, 'circle', propsObj, emit);
    this.draw();
  }

  addFeature() {
    this.feature = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: this.position.value
      },
    }
  }

  setStyle():any{
    this.layout = {
      ...this.propsObj.layout,
    }
    this.paint = {
      "circle-radius": this.propsObj.circleRadius,
      "circle-color": this.propsObj.circleColor,
      "circle-blur": this.propsObj.circleBlur,
      "circle-opacity": this.propsObj.circleOpacity,
      "circle-translate": this.propsObj.circleTranslate,
      "circle-translate-anchor": this.propsObj.circleTranslateAnchor,
      "circle-pitch-scale": this.propsObj.circlePitchScale,
      "circle-pitch-alignment": this.propsObj.circlePitchAlignment,
      "circle-stroke-width": this.propsObj.circleStrokeWidth,
      "circle-stroke-color": this.propsObj.circleStrokeColor,
      "circle-stroke-opacity": this.propsObj.circleStrokeOpacity,
    }
  }
}

export default CreateTextLayer;
const layerProps = {
  ...sjMapLayerProps,
  position: {
    type: Array as PropType<number[]>,
    default: () => ([])
  },
  circleRadius: { //circle-radius
    type: Number,
    default: 10,
  },
  circleColor: { //circle-color
    type: String,
    default: '#000',
  },
  circleBlur: {  //circle-blur
    type: Number,
    default: 0,
  },
  circleOpacity: { //circle-opacity
    type: Number,
    default: 1,
  },
  circleTranslate: { //circle-translate
    type: Array,
    default: () => ([0, 0]),
  },
  circleTranslateAnchor: { //circle-translate-anchor
    type: String,
    default: 'map',
  },
  circlePitchScale: {  //circle-pitch-scale
    type: String,
    default: 'map',
  },
  circlePitchAlignment: { //circle-pitch-alignment
    type: String,
    default: 'map',
  },
  circleStrokeWidth: {  //circle-stroke-width
    type: Number,
    default: 0,
  },
  circleStrokeColor: {  //circle-stroke-color
    type: String,
    default: '#000',
  },
  circleStrokeOpacity: {  //circle-stroke-opacity
    type: Number,
    default: 1,
  },
  layout: {
    type: Object,
    default: () => ({}),
  },
}
export {
  layerProps,
}

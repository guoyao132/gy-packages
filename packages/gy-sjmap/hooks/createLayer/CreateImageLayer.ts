import CreateLayer, {sjMapLayerProps} from './CreateLayer'
import type {PropType, ComputedRef} from 'vue-demi';
import {computed} from 'vue-demi'

class CreateImageLayer extends CreateLayer {
  constructor(id: string, propsObj: any, emit?: any) {
    super(id, 'symbol', propsObj, emit);
    this.mediaSrc = propsObj.imgSrc;
    this.needLoad = true;
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

  setStyle(): any {
    this.layout = {
      ...this.propsObj.layout,
      'icon-image': this.mediaName,
      'icon-size': this.propsObj.iconSize,
      'icon-rotate': this.propsObj.iconRotate,
    }
    this.paint = {
      "icon-opacity": this.propsObj.iconOpacity,
      "icon-color": this.propsObj.iconColor,
      "icon-halo-color": this.propsObj.iconHaloColor,
      "icon-halo-width": this.propsObj.iconHaloWidth,
      "icon-halo-blur": this.propsObj.iconHaloBlur,
      "icon-translate": this.propsObj.iconTranslate,
      "icon-translate-anchor": this.propsObj.iconTranslateAnchor,
    }
  }
}

export default CreateImageLayer;
const layerProps = {
  ...sjMapLayerProps,
  position: {
    type: Array as PropType<number[]>,
    default: () => ([])
  },
  imgSrc: {
    type: String,
    default: '',
  },
  iconOpacity: { //icon-opacity
    type: Number,
    default: 1,
  },
  iconColor: { //icon-color
    type: String,
    default: '#000',
  },
  iconSize: { //icon-color
    type: Number,
    default: 1,
  },
  iconRotate: { //icon-rotate
    type: Number,
    default: 0,
  },
  iconHaloColor: { //icon-halo-color
    type: String,
    default: '#000',
  },
  iconHaloWidth: { //icon-halo-width
    type: Number,
    default: 0
  },
  iconHaloBlur: { //icon-halo-blur
    type: Number,
    default: 0,
  },
  iconTranslate: { //icon-translate
    type: Array,
    default: () => ([0, 0]),
  },
  iconTranslateAnchor: { //icon-translate-anchor
    type: String,
    default: 'map',
  },
  layout: {
    type: Object,
    default: () => ({
      "icon-allow-overlap": true,
    }),
  },
}
export {
  layerProps,
}

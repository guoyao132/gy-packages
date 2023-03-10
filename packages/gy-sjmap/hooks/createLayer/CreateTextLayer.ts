import CreateLayer, {sjMapLayerProps} from './CreateLayer'
import type {PropType, ComputedRef} from 'vue-demi';
import {computed} from 'vue-demi'
class CreateTextLayer extends CreateLayer{
  text: ComputedRef<string>;
  symbolPlacement: string;
  constructor(id:string, propsObj : any, symbolPlacement = 'Point', emit?:any) {
    super(id, 'symbol', propsObj, emit);
    this.text = computed(() => propsObj.text);
    this.symbolPlacement = symbolPlacement;
    this.draw();
  }

  addFeature() {
    let symbolPlacementArr = [
      'Point',
      'LineString',
      'Polygon',
    ];
    let i = symbolPlacementArr.includes(this.symbolPlacement)
    this.feature = {
      type: "Feature",
      geometry: {
        type: i ? this.symbolPlacement : 'Point',
        coordinates: this.position.value
      },
      properties: {
        text: this.text.value
      }
    }
  }

  setStyle():any{
    this.layout = {
      'text-font': ['Microsoft YaHei Regular'],
      'symbol-placement': this.symbolPlacement === 'LineString' ? 'line' : 'point',
      "text-allow-overlap": true,
      "text-ignore-placement": true,
      ...this.propsObj.layout,
      'text-field': '{text}',
      'text-size': this.propsObj.textSize,
    }
    this.paint = {
      "text-color": this.propsObj.textColor || '#f00',
      "text-opacity": this.propsObj.textOpacity || 1,
      "text-halo-color": this.propsObj.textHaloColor || 'rgba(0, 0, 0, 1)',
      "text-halo-width": this.propsObj.textHaloWidth || 0,
      "text-halo-blur": this.propsObj.textHaloBlur || 0,
      "text-translate": this.propsObj.textTranslate || [0, 0],
      "text-translate-anchor": this.propsObj.textTranslateAnchor || 'map',
    }
  }
}

export default CreateTextLayer;
const layerProps = {
  position: {
    type: Array as PropType<number[]>,
    default: () => ([])
  },
  text: {
    type: String,
    default: '',
  },
  textSize: {
    type: Number,
    default: 20,
  },
  textColor: {
    type: String,
    default: '#ff0000',
  },
  textOpacity: {
    type: Number,
    default: 1,
  },
  textHaloColor: {
    type: String,
    default: 'rgba(0, 0, 0, 1)'
  },
  textHaloWidth: {
    type: Number,
    default: 0,
  },
  textHaloBlur: {
    type: Number,
    default: 0,
  },
  textTranslate: {
    type: Array,
    default: () => ([0, 0]),
  },
  textTranslateAnchor: {
    type: String,
    default: 'map',
  },
  layout: {
    type: Object,
    default: () => ({}),
  },
  ...sjMapLayerProps,
}
export {
  layerProps,
}

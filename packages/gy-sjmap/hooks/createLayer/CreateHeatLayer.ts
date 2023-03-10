import CreateLayer, {sjMapLayerProps} from './CreateLayer'
import type {PropType, ComputedRef} from 'vue-demi';
import {computed, watch} from 'vue-demi'
class CreateHeatLayer extends CreateLayer{
  heatData: ComputedRef<number[][]>;
  constructor(id:string, propsObj : any, emit?: any) {
    super(id, 'heatmap', propsObj, emit);
    this.heatData = computed(() => propsObj.heatData)
    this.draw();
  }

  addSource() {
    this.source = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: this.feature
      }
    }
  }

  addFeature() {
    let feature:any[] = [];
    this.heatData.value.forEach(d => {
      if(d.length === 3){
        feature.push({
          type: "Feature",
          geometry: {
            type: 'Point',
            coordinates: [d[0], d[1]],
          },
          properties: {
            value: d[2],
          }
        })
      }
    })
    this.feature = feature;
  }

  setStyle():any{
    this.layout = {
    }
    this.paint = {
      /**
       * 数据点的影响力，weight=10的点相当于十个weight=1的点
       * 下述为插值表达式，输入是点geojson的properties的mag，输出随mag线性增大
       */
      "heatmap-weight": this.propsObj.heatmapWeight,
      /**
       * 热力图强度，类似heatmap-weight
       * 下述为插值表达式，输出随zoom线性变化，zoom为0时值为1，zoom为12时值为3
       */
      "heatmap-intensity": this.propsObj.heatmapIntensity,
      /**
       * 像素的颜色，必须以heatmap-density（热力图像素的密度）为输入
       * 下述为插值表达式，输出随heatmap-density变化而变化
       */
      "heatmap-color": this.propsObj.heatmapColor,
      /**
       * 该值越大，热力图越平滑，信息越不详细。
       * 下述为插值表达式，输出随zoom线性变化，zoom为0时值为8，zoom为9时值为20
       */
      "heatmap-radius": this.propsObj.heatmapRadius,
      /**
       * 透明度，输出为1则不透明
       * 下述为插值表达式，输出随zoom线性变化，zoom为5时值为0.8，zoom为12时值为0.4
       */
      "heatmap-opacity": this.propsObj.heatmapOpacity
    }
  }

  addLayerWatch() {
    watch(this.heatData, () => {
      this.setGeoPosition();
    })
  }
}

export default CreateHeatLayer;
const layerProps = {
  heatData: {
    type: Array,
    default: () => ([])
  },
  heatmapColor: {
    type: Array,
    default: () => {
      return [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "rgba(255, 0, 0, 0)",
        0.1,
        "rgba(0, 30, 255, .6)",
        0.2,
        "rgba(7, 208, 255, .6)",
        0.3,
        "#2cc946",
        0.4,
        "#d5fb0c",
        0.8,
        "#e04e4e",
        1,
        "#f33900",
      ]
    },
  },
  heatmapWeight: {
    type: [Number, Array],
    default: () => {
      return [
        "interpolate",
        ["linear"],
        ["get", "value"],
        0,
        0,
        10,
        8
      ];
    },
  },
  heatmapIntensity: {
    type: [Number, Array],
    default: 1,
  },
  heatmapRadius: {
    type: [Number, Array],
    default: 100,
  },
  heatmapOpacity: {
    type: [Number, Array],
    default: 1,
  },
  ...sjMapLayerProps,
}
export {
  layerProps,
}

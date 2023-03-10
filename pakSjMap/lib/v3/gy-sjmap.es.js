var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { defineComponent, onMounted, watch, onBeforeUnmount, computed, ref, getCurrentInstance, onBeforeMount, reactive } from "vue-demi";
import { openBlock, createElementBlock, renderSlot, normalizeClass, withDirectives, createElementVNode, vShow, createTextVNode, normalizeStyle, Fragment, renderList, toDisplayString } from "vue";
const _sfc_main$a = defineComponent({
  name: "GySjmap",
  props: {
    id: {
      type: String,
      default: "map"
    },
    center: {
      type: Array,
      default: () => []
    },
    zoom: {
      type: Number,
      default: 0
    },
    pitch: {
      type: Number,
      default: 0
    },
    bearing: {
      type: Number,
      default: 0
    },
    mapOpt: {
      type: Object,
      default: () => ({})
    },
    animDuration: {
      type: Number,
      default: 1e3
    }
  },
  setup(props) {
    const gySjmapObj = gySjMap(props.id).value;
    onMounted(() => {
      gySjmapObj.init(props.id, {
        ...props.mapOpt,
        zoom: props.zoom,
        centerPoint: props.center,
        pitch: props.pitch,
        bearing: props.bearing
      });
    });
    const mouseenterFun = () => {
      const contentIdDom = document.getElementById(props.id);
      if (contentIdDom) {
        contentIdDom.focus();
      }
    };
    watch([
      () => props.zoom,
      () => props.center,
      () => props.pitch,
      () => props.bearing
    ], () => {
      gySjmapObj && gySjmapObj.map && gySjmapObj.map.easeTo({
        zoom: props.zoom,
        center: props.center,
        pitch: props.pitch,
        bearing: props.bearing,
        easing(t) {
          return t;
        },
        duration: props.animDuration
      });
    });
    onBeforeUnmount(() => {
      gySjmapObj && gySjmapObj.destory();
    });
    return {
      id: props.id,
      gySjmapObj,
      mouseenterFun
    };
  }
});
const GySjmap_vue_vue_type_style_index_0_scoped_f67e076f_lang = "";
const GySjmap_vue_vue_type_style_index_1_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1$1 = ["id"];
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    id: _ctx.id,
    class: "map divMap",
    tabindex: "0",
    onMouseenter: _cache[0] || (_cache[0] = (...args) => _ctx.mouseenterFun && _ctx.mouseenterFun(...args))
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 40, _hoisted_1$1);
}
const GySjmap = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__scopeId", "data-v-f67e076f"], ["__file", "D:/project/gy-map/packages/gy-sjmap/components/GySjmap/src/GySjmap.vue"]]);
class createOlLayer {
  constructor(id2, layerType, propsObj, emit) {
    __publicField(this, "position");
    __publicField(this, "layout");
    __publicField(this, "paint");
    __publicField(this, "feature");
    __publicField(this, "mapId");
    __publicField(this, "layerType");
    __publicField(this, "source");
    __publicField(this, "layer");
    __publicField(this, "layerObj");
    __publicField(this, "minZoom");
    __publicField(this, "maxZoom");
    __publicField(this, "opacity");
    __publicField(this, "zIndex");
    __publicField(this, "propsObj");
    __publicField(this, "gySjmapObj");
    __publicField(this, "mapFinish");
    __publicField(this, "isDraw");
    __publicField(this, "finishDraw");
    __publicField(this, "needLoad");
    __publicField(this, "mediaNameStr");
    __publicField(this, "mediaSrc");
    __publicField(this, "mediaName");
    __publicField(this, "nextPosition");
    __publicField(this, "emit");
    __publicField(this, "layerId");
    this.layout = null;
    this.paint = null;
    this.feature = null;
    this.mapId = "";
    this.source = null;
    this.layer = null;
    this.layerObj = null;
    this.layerType = layerType || "symbol";
    this.minZoom = computed(() => propsObj.minZoom);
    this.maxZoom = computed(() => propsObj.maxZoom);
    this.opacity = computed(() => propsObj.opacity);
    this.nextPosition = ref(null);
    this.position = computed(() => this.nextPosition.value || propsObj.position);
    this.propsObj = propsObj;
    this.zIndex = void 0;
    this.gySjmapObj = gySjMap(id2);
    this.mapFinish = computed(() => this.gySjmapObj.value && this.gySjmapObj.value.mapFinish);
    this.isDraw = false;
    this.needLoad = false;
    this.finishDraw = ref(false);
    this.mediaNameStr = "mediaNameStr";
    this.mediaSrc = "";
    this.mediaName = "";
    this.emit = emit || null;
    this.layerId = "";
  }
  init() {
  }
  draw() {
    if (!this.needLoad) {
      this.addFeature();
      this.setStyle();
      this.addSource();
      this.addLayer();
    }
    this.addWatchFun();
    this.addLayerToMap();
  }
  addFeature() {
    this.feature = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: this.position.value
      },
      properties: {
        text: "\u6D4B\u8BD5\u70B9"
      }
    };
  }
  addSource() {
    this.source = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [this.feature]
      }
    };
  }
  addLayer() {
    this.layerId = `myLayer${this.gySjmapObj.value.layerIndex}`;
    this.layer = {
      id: this.layerId,
      type: this.layerType,
      source: this.source,
      paint: this.paint,
      layout: this.layout,
      minzoom: this.minZoom.value || 1,
      maxzoom: this.maxZoom.value || 18
    };
    this.gySjmapObj.value.addLayerIndex();
  }
  addLayerToMap() {
    if (!this.isDraw && this.mapFinish.value) {
      this.isDraw = true;
      if (this.needLoad) {
        this.loadMediaAddLayer();
      } else {
        this.addLayerSuccess();
      }
    }
  }
  loadMedia() {
    return new Promise((resolve) => {
      this.gySjmapObj.value.map.loadImage(this.mediaSrc, (error, image) => {
        this.gySjmapObj.value.setMapMediaArr(this.mediaSrc);
        let index2 = this.gySjmapObj.value.mapMediaArr.length;
        let mediaName = this.mediaNameStr + index2;
        const bool = this.gySjmapObj.value.map.hasImage(mediaName);
        if (!bool) {
          this.gySjmapObj.value.map.addImage(mediaName, image);
        }
        resolve(mediaName);
      });
    });
  }
  loadMediaAddLayer() {
    if (!this.mediaSrc) {
      return;
    }
    let index2 = this.gySjmapObj.value.mapMediaArr.findIndex((v) => v === this.mediaSrc);
    if (index2 === -1) {
      this.loadMedia().then((mediaName) => {
        this.loadMediaSuccess(mediaName);
      });
    } else {
      let mediaName = this.mediaNameStr + index2;
      this.loadMediaSuccess(mediaName);
    }
  }
  loadMediaSuccess(mediaName) {
    this.mediaName = mediaName;
    this.addFeature();
    this.setStyle();
    this.addSource();
    this.addLayer();
    this.addLayerSuccess();
  }
  addLayerSuccess() {
    var _a, _b, _c, _d;
    (_b = (_a = this.gySjmapObj.value) == null ? void 0 : _a.map) == null ? void 0 : _b.addLayer(this.layer);
    this.layerObj = (_d = (_c = this.gySjmapObj.value) == null ? void 0 : _c.map) == null ? void 0 : _d.getLayer(this.layer.id);
    this.finishDraw.value = true;
    this.addLayerEvents();
  }
  addWatchFun() {
    watch(this.mapFinish, (n) => {
      this.addLayerToMap();
    });
    this.addLayerWatch();
  }
  addLayerWatch() {
    watch(this.position, (n) => {
      this.setGeoPosition();
    });
  }
  setGeoPosition() {
    var _a, _b, _c;
    this.addFeature();
    this.addSource();
    (_c = (_b = (_a = this.gySjmapObj.value) == null ? void 0 : _a.map) == null ? void 0 : _b.getSource(this.layer.id)) == null ? void 0 : _c.setData(this.source.data);
  }
  setStyle() {
    this.layout = {};
    this.paint = {};
  }
  destory() {
    var _a, _b;
    (_b = (_a = this.gySjmapObj.value) == null ? void 0 : _a.map) == null ? void 0 : _b.removeLayer(this.layer.id);
    this.layer = null;
    this.isDraw = false;
  }
  addLayerEvents() {
    var _a, _b;
    (_b = (_a = this.gySjmapObj.value) == null ? void 0 : _a.map) == null ? void 0 : _b.on("click", this.layerId, (e) => {
      this.onLayerClick(e);
    });
  }
  onLayerClick(e) {
    if (this.emit) {
      this.emit("clickFun", e);
    }
  }
}
const layerProps$6 = {
  minZoom: {
    type: Number,
    default: 1
  },
  maxZoom: {
    type: Number,
    default: 20
  }
};
class CreateTextLayer$1 extends createOlLayer {
  constructor(id2, propsObj, symbolPlacement = "Point", emit) {
    super(id2, "symbol", propsObj, emit);
    __publicField(this, "text");
    __publicField(this, "symbolPlacement");
    this.text = computed(() => propsObj.text);
    this.symbolPlacement = symbolPlacement;
    this.draw();
  }
  addFeature() {
    let symbolPlacementArr = [
      "Point",
      "LineString",
      "Polygon"
    ];
    let i = symbolPlacementArr.includes(this.symbolPlacement);
    this.feature = {
      type: "Feature",
      geometry: {
        type: i ? this.symbolPlacement : "Point",
        coordinates: this.position.value
      },
      properties: {
        text: this.text.value
      }
    };
  }
  setStyle() {
    this.layout = {
      "text-font": ["Microsoft YaHei Regular"],
      "symbol-placement": this.symbolPlacement === "LineString" ? "line" : "point",
      "text-allow-overlap": true,
      "text-ignore-placement": true,
      ...this.propsObj.layout,
      "text-field": "{text}",
      "text-size": this.propsObj.textSize
    };
    this.paint = {
      "text-color": this.propsObj.textColor || "#f00",
      "text-opacity": this.propsObj.textOpacity || 1,
      "text-halo-color": this.propsObj.textHaloColor || "rgba(0, 0, 0, 1)",
      "text-halo-width": this.propsObj.textHaloWidth || 0,
      "text-halo-blur": this.propsObj.textHaloBlur || 0,
      "text-translate": this.propsObj.textTranslate || [0, 0],
      "text-translate-anchor": this.propsObj.textTranslateAnchor || "map"
    };
  }
}
const layerProps$5 = {
  position: {
    type: Array,
    default: () => []
  },
  text: {
    type: String,
    default: ""
  },
  textSize: {
    type: Number,
    default: 20
  },
  textColor: {
    type: String,
    default: "#ff0000"
  },
  textOpacity: {
    type: Number,
    default: 1
  },
  textHaloColor: {
    type: String,
    default: "rgba(0, 0, 0, 1)"
  },
  textHaloWidth: {
    type: Number,
    default: 0
  },
  textHaloBlur: {
    type: Number,
    default: 0
  },
  textTranslate: {
    type: Array,
    default: () => [0, 0]
  },
  textTranslateAnchor: {
    type: String,
    default: "map"
  },
  layout: {
    type: Object,
    default: () => ({})
  },
  ...layerProps$6
};
const _sfc_main$9 = defineComponent({
  name: "GySjmapText",
  props: {
    ...layerProps$5
  },
  emits: ["clickFun"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const mapId = proxy.$parent.id;
    let layerObj = null;
    onMounted(() => {
      layerObj = new CreateTextLayer$1(mapId, props, "", emit);
      watch(layerObj.finishDraw, () => {
        const runTask = proxy.$parent.runTask;
        if (runTask) {
          runTask(layerObj, props);
        }
      });
    });
    const destory = () => {
      layerObj.destory();
      layerObj = null;
    };
    onBeforeUnmount(() => {
      destory();
      const destoryTask = proxy.$parent.destory;
      if (destoryTask) {
        destoryTask();
      }
    });
    return {
      layerObj
    };
  }
});
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return null;
}
const GySjmapText = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__file", "D:/project/gy-map/packages/gy-sjmap/components/GySjmapText/src/GySjmapText.vue"]]);
class CreateTextLayer extends createOlLayer {
  constructor(id2, propsObj, emit) {
    super(id2, "circle", propsObj, emit);
    this.draw();
  }
  addFeature() {
    this.feature = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: this.position.value
      }
    };
  }
  setStyle() {
    this.layout = {
      ...this.propsObj.layout
    };
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
      "circle-stroke-opacity": this.propsObj.circleStrokeOpacity
    };
  }
}
const layerProps$4 = {
  ...layerProps$6,
  position: {
    type: Array,
    default: () => []
  },
  circleRadius: {
    type: Number,
    default: 10
  },
  circleColor: {
    type: String,
    default: "#000"
  },
  circleBlur: {
    type: Number,
    default: 0
  },
  circleOpacity: {
    type: Number,
    default: 1
  },
  circleTranslate: {
    type: Array,
    default: () => [0, 0]
  },
  circleTranslateAnchor: {
    type: String,
    default: "map"
  },
  circlePitchScale: {
    type: String,
    default: "map"
  },
  circlePitchAlignment: {
    type: String,
    default: "map"
  },
  circleStrokeWidth: {
    type: Number,
    default: 0
  },
  circleStrokeColor: {
    type: String,
    default: "#000"
  },
  circleStrokeOpacity: {
    type: Number,
    default: 1
  },
  layout: {
    type: Object,
    default: () => ({})
  }
};
const _sfc_main$8 = defineComponent({
  name: "GySjmapCircle",
  props: {
    ...layerProps$4
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const mapId = proxy.$parent.id;
    let layerObj = null;
    onMounted(() => {
      layerObj = new CreateTextLayer(mapId, props, emit);
      watch(layerObj.finishDraw, () => {
        const runTask = proxy.$parent.runTask;
        if (runTask) {
          runTask(layerObj, props);
        }
      });
    });
    const destory = () => {
      layerObj.destory();
      layerObj = null;
    };
    onBeforeUnmount(() => {
      destory();
      const destoryTask = proxy.$parent.destory;
      if (destoryTask) {
        destoryTask();
      }
    });
  }
});
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return null;
}
const GySjmapCircle = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__file", "D:/project/gy-map/packages/gy-sjmap/components/GySjmapCircle/src/GySjmapCircle.vue"]]);
class CreateImageLayer extends createOlLayer {
  constructor(id2, propsObj, emit) {
    super(id2, "symbol", propsObj, emit);
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
      }
    };
  }
  setStyle() {
    this.layout = {
      ...this.propsObj.layout,
      "icon-image": this.mediaName,
      "icon-size": this.propsObj.iconSize,
      "icon-rotate": this.propsObj.iconRotate
    };
    this.paint = {
      "icon-opacity": this.propsObj.iconOpacity,
      "icon-color": this.propsObj.iconColor,
      "icon-halo-color": this.propsObj.iconHaloColor,
      "icon-halo-width": this.propsObj.iconHaloWidth,
      "icon-halo-blur": this.propsObj.iconHaloBlur,
      "icon-translate": this.propsObj.iconTranslate,
      "icon-translate-anchor": this.propsObj.iconTranslateAnchor
    };
  }
}
const layerProps$3 = {
  ...layerProps$6,
  position: {
    type: Array,
    default: () => []
  },
  imgSrc: {
    type: String,
    default: ""
  },
  iconOpacity: {
    type: Number,
    default: 1
  },
  iconColor: {
    type: String,
    default: "#000"
  },
  iconSize: {
    type: Number,
    default: 1
  },
  iconRotate: {
    type: Number,
    default: 0
  },
  iconHaloColor: {
    type: String,
    default: "#000"
  },
  iconHaloWidth: {
    type: Number,
    default: 0
  },
  iconHaloBlur: {
    type: Number,
    default: 0
  },
  iconTranslate: {
    type: Array,
    default: () => [0, 0]
  },
  iconTranslateAnchor: {
    type: String,
    default: "map"
  },
  layout: {
    type: Object,
    default: () => ({
      "icon-allow-overlap": true
    })
  }
};
const _sfc_main$7 = defineComponent({
  name: "GySjmapImage",
  props: {
    ...layerProps$3
  },
  emits: ["clickFun"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const mapId = proxy.$parent.id;
    let layerObj = null;
    onMounted(() => {
      layerObj = new CreateImageLayer(mapId, props, emit);
      watch(layerObj.finishDraw, () => {
        const runTask = proxy.$parent.runTask;
        if (runTask) {
          runTask(layerObj, props);
        }
      });
    });
    const destory = () => {
      layerObj.destory();
      layerObj = null;
    };
    onBeforeUnmount(() => {
      destory();
      const destoryTask = proxy.$parent.destory;
      if (destoryTask) {
        destoryTask();
      }
    });
  }
});
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return null;
}
const GySjmapImage = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__file", "D:/project/gy-map/packages/gy-sjmap/components/GySjmapImage/src/GySjmapImage.vue"]]);
const _sfc_main$6 = defineComponent({
  name: "GySjmapHtml",
  props: {
    position: {
      type: Array,
      default: () => []
    },
    className: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const htmlDom = ref(null);
    const { proxy } = getCurrentInstance();
    const mapId = proxy.$parent.id;
    const gySjmapObj = gySjMap(mapId);
    const mapFinish = computed(() => gySjmapObj.value && gySjmapObj.value.mapFinish);
    let isDraw = false;
    watch(mapFinish, () => {
      drawDom();
    });
    let htmlMarker = null;
    const drawDom = () => {
      if (mapFinish.value && !isDraw) {
        isDraw = true;
        htmlMarker = new SGMap.Marker(htmlDom.value, { anchor: "bottom" }).setLngLat(props.position).addTo(gySjmapObj.value.map);
        htmlDom.value.style.display = "block";
        const runTask = proxy.$parent.runTask;
        if (runTask) {
          runTask(htmlMarker, props);
        }
      }
    };
    onMounted(() => {
      drawDom();
    });
    watch(() => props.position, (p) => {
      htmlMarker && htmlMarker.setLngLat(p);
    });
    onBeforeUnmount(() => {
      htmlMarker && htmlMarker.remove();
      const destoryTask = proxy.$parent.destory;
      if (destoryTask) {
        destoryTask();
      }
    });
    return {
      htmlDom,
      mapId,
      gySjmapObj,
      mapFinish
    };
  }
});
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass("GymapHtml " + _ctx.className),
    ref: "htmlDom",
    style: { "display": "none" }
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
const GySjmapHtml = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__file", "D:/project/gy-map/packages/gy-sjmap/components/GySjmapHtml/src/GySjmapHtml.vue"]]);
class CreateLineLayer$1 extends createOlLayer {
  constructor(id2, propsObj, emit) {
    super(id2, "line", propsObj, emit);
    __publicField(this, "positionList");
    __publicField(this, "text");
    this.positionList = computed(() => propsObj.positionList);
    this.text = computed(() => propsObj.text);
    if (this.propsObj.imgSrc) {
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
        "type": "LineString",
        "coordinates": this.positionList.value
      },
      properties: {
        text: this.text.value
      }
    };
  }
  addLayerWatch() {
    watch(this.positionList, (n) => {
      this.setGeoPosition();
    }, {
      deep: true
    });
  }
  setStyle() {
    this.layout = {
      "line-cap": this.propsObj.lineCap,
      "line-join": this.propsObj.lineJoin,
      "line-miter-limit": this.propsObj.lineMiterLimit,
      "line-round-limit": this.propsObj.lineRoundLimit,
      "visibility": this.propsObj.visibility
    };
    let obj = {
      "line-opacity": this.propsObj.lineOpacity,
      "line-color": this.propsObj.lineColor,
      "line-width": this.propsObj.lineWidth,
      "line-translate": this.propsObj.lineTranslate,
      "line-translate-anchor": this.propsObj.lineTranslateAnchor,
      "line-gap-width": this.propsObj.lineGapWidth,
      "line-offset": this.propsObj.lineOffset,
      "line-blur": this.propsObj.lineBlur,
      "line-dasharray": this.propsObj.lineDasharray
    };
    if (this.propsObj.imgSrc) {
      obj["line-pattern"] = this.mediaName;
    }
    this.paint = obj;
  }
}
const layerProps$2 = {
  ...layerProps$6,
  positionList: {
    type: Array,
    default: () => []
  },
  lineCap: {
    type: String,
    default: "round"
  },
  lineJoin: {
    type: String,
    default: "miter"
  },
  lineMiterLimit: {
    type: Number,
    default: 2
  },
  lineRoundLimit: {
    type: Number,
    default: 1.05
  },
  visibility: {
    type: String,
    default: "visible"
  },
  lineOpacity: {
    type: Number,
    default: 1
  },
  lineColor: {
    type: String,
    default: "#000"
  },
  lineTranslate: {
    type: Array,
    default: () => [0, 0]
  },
  lineTranslateAnchor: {
    type: String,
    default: "map"
  },
  lineWidth: {
    type: Number,
    default: 5
  },
  lineGapWidth: {
    type: Number,
    default: 0
  },
  lineOffset: {
    type: Number,
    default: 0
  },
  lineBlur: {
    type: Number,
    default: 0
  },
  lineDasharray: {
    type: Array,
    default: () => []
  },
  imgSrc: {
    type: String,
    default: ""
  },
  lineGradient: {
    type: String,
    default: ""
  },
  text: {
    type: String,
    default: ""
  },
  layout: {
    type: Object,
    default: () => ({})
  },
  paint: {
    type: Object,
    default: () => ({})
  }
};
const _sfc_main$5 = defineComponent({
  name: "GySjmapLine",
  props: {
    ...layerProps$2
  },
  emits: ["clickFun"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const mapId = proxy.$parent.id;
    let layerObj = null;
    onMounted(() => {
      layerObj = new CreateLineLayer$1(mapId, props, emit);
      if (props.text) {
        new CreateTextLayer$1(mapId, {
          layout: props.layout,
          textSize: props.layout["text-size"] || 50,
          ...props.paint,
          text: props.text,
          position: props.positionList
        }, "LineString");
      }
      const runTask = proxy.$parent.runTask;
      if (runTask) {
        runTask(layerObj, props);
      }
    });
    const destory = () => {
      layerObj.destory();
      layerObj = null;
    };
    onBeforeUnmount(() => {
      destory();
      const destoryTask = proxy.$parent.destory;
      if (destoryTask) {
        destoryTask();
      }
    });
  }
});
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return null;
}
const GySjmapLine = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__file", "D:/project/gy-map/packages/gy-sjmap/components/GySjmapLine/src/GySjmapLine.vue"]]);
class CreateLineLayer extends createOlLayer {
  constructor(id2, propsObj, emit) {
    super(id2, "fill", propsObj, emit);
    __publicField(this, "positionList");
    __publicField(this, "text");
    this.positionList = computed(() => propsObj.positionList);
    this.text = computed(() => propsObj.text);
    if (this.propsObj.imgSrc) {
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
        "type": "LineString",
        "coordinates": this.positionList.value
      },
      properties: {
        text: this.text.value
      }
    };
  }
  addLayerWatch() {
    watch(this.positionList, (n) => {
      this.setGeoPosition();
    });
  }
  setStyle() {
    this.layout = {};
    let obj = {
      "fill-color": this.propsObj.fillColor,
      "fill-antialias": this.propsObj.fillAntialias,
      "fill-opacity": this.propsObj.fillOpacity,
      "fill-translate": this.propsObj.fillTranslate,
      "fill-translate-anchor": this.propsObj.fillTranslateAnchor
    };
    if (this.propsObj.imgSrc) {
      obj["fill-pattern"] = this.mediaName;
    }
    if (this.propsObj.fillOutlineColor) {
      obj["fill-outline-color"] = this.propsObj.fillOutlineColor;
    }
    this.paint = obj;
  }
}
const layerProps$1 = {
  ...layerProps$6,
  positionList: {
    type: Array,
    default: () => []
  },
  text: {
    type: String,
    default: ""
  },
  textType: {
    type: String,
    default: "Polygon"
  },
  fillColor: {
    type: String,
    default: "#f00"
  },
  fillAntialias: {
    type: Boolean,
    default: true
  },
  fillOpacity: {
    type: Number,
    default: 1
  },
  fillOutlineColor: {
    type: String,
    default: ""
  },
  fillTranslate: {
    type: Array,
    default: () => [0, 0]
  },
  fillTranslateAnchor: {
    type: String,
    default: "map"
  },
  imgSrc: {
    type: String,
    default: ""
  },
  layout: {
    type: Object,
    default: () => ({})
  },
  paint: {
    type: Object,
    default: () => ({
      textColor: "#000"
    })
  }
};
const _sfc_main$4 = defineComponent({
  name: "GySjmapPolygon",
  props: {
    ...layerProps$1
  },
  emits: ["clickFun"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const mapId = proxy.$parent.id;
    let layerObj = null;
    onMounted(() => {
      layerObj = new CreateLineLayer(mapId, props, emit);
      if (props.text) {
        new CreateTextLayer$1(mapId, {
          layout: props.layout,
          textSize: props.layout["text-size"] || 20,
          ...props.paint,
          text: props.text,
          position: props.textType === "Polygon" ? [props.positionList] : props.positionList
        }, props.textType);
      }
      const runTask = proxy.$parent.runTask;
      if (runTask) {
        runTask(layerObj, props);
      }
    });
    const destory = () => {
      layerObj.destory();
      layerObj = null;
    };
    onBeforeUnmount(() => {
      destory();
      const destoryTask = proxy.$parent.destory;
      if (destoryTask) {
        destoryTask();
      }
    });
  }
});
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return null;
}
const GySjmapPolygon = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__file", "D:/project/gy-map/packages/gy-sjmap/components/GySjmapPolygon/src/GySjmapPolygon.vue"]]);
const _sfc_main$3 = defineComponent({
  name: "GySjmapTask",
  props: {
    positionList: {
      type: Array,
      default: () => []
    },
    loop: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 1e-3
    },
    taskStatus: {
      type: String,
      default: "play"
    },
    delay: {
      type: Number,
      default: 3e3
    }
  },
  emits: ["animate"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const mapId = proxy.$parent.id;
    let canPlay = true;
    let noComponents = false;
    let childrenWatch = null;
    let layer = null;
    let timer = void 0;
    const runTask = (childLayerObj, childProps) => {
      if (!canPlay) {
        return;
      }
      if (!noComponents) {
        if (!childrenWatch) {
          childrenWatch = watch(() => childProps.position, () => {
            animIndex = 0;
            destory();
          });
        }
        layer = childLayerObj;
      }
      if (props.taskStatus === "play") {
        startTask();
      }
      if (props.delay !== 0) {
        timer = setTimeout(() => {
          startTask();
        }, props.delay);
      }
    };
    watch(() => props.taskStatus, (n) => {
      if (n === "play") {
        startTask();
      } else if (n === "stop") {
        animIndex = 0;
        stopTask();
      } else if (n === "pause") {
        stopTask();
      }
    });
    const getAllLonlat = (positions) => {
      let linestring = TURF.lineString(positions);
      let step = Math.min(props.step, 0.5);
      let chunk = TURF.lineChunk(linestring, step, {
        units: "kilometers"
      });
      let positionsList = chunk.features.map((v) => {
        return v.geometry.coordinates[0];
      });
      positionsList.push(chunk.features.slice(-1)[0].geometry.coordinates[0]);
      return positionsList;
    };
    let lineGeometry = null;
    const startTask = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (noComponents ? false : !layer) {
        return;
      }
      if (aId) {
        return;
      }
      if (!lineGeometry) {
        lineGeometry = getAllLonlat(props.positionList);
      }
      animate();
    };
    let animIndex = 0;
    let aId = null;
    const animate = () => {
      let coordinate = lineGeometry[animIndex];
      if (!noComponents) {
        if (layer instanceof SGMap.Marker) {
          layer && layer.setLngLat(coordinate);
        } else {
          layer.nextPosition.value = coordinate;
        }
      }
      emit("animate", coordinate, animIndex);
      if (animIndex >= lineGeometry.length - 1) {
        stopTask();
        if (props.loop) {
          animIndex = 0;
          animate();
        }
        return;
      }
      props.step;
      animIndex++;
      aId = window.requestAnimationFrame(animate);
    };
    const stopTask = () => {
      childrenWatch && childrenWatch();
      aId && window.cancelAnimationFrame(aId);
      aId = null;
    };
    const destory = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      stopTask();
    };
    onBeforeMount(() => {
      let defaultStr = proxy.$slots.default;
      if (defaultStr) {
        let children = proxy.$slots.default();
        let len = 0;
        for (let i2 = 0; i2 < children.length; i2++) {
          let child = children[i2];
          if (typeof child.type !== "symbol") {
            len++;
            if (len > 1) {
              canPlay = false;
              console.error("GymapTask\u7EC4\u4EF6\u4E2D\u53EA\u5141\u8BB8\u5B58\u5728\u4E00\u4E2A\u9700\u8981\u6267\u884C\u52A8\u753B\u7684\u7EC4\u4EF6\u3002");
              break;
            }
          }
        }
      } else if (!defaultStr) {
        noComponents = true;
        runTask();
      }
    });
    onMounted(() => {
      if (noComponents) {
        runTask();
      }
    });
    return {
      id: mapId,
      runTask,
      destory
    };
  }
});
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
const GySjmapTask = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "D:/project/gy-map/packages/gy-sjmap/components/GySjmapTask/src/GySjmapTask.vue"]]);
const _sfc_main$2 = defineComponent({
  name: "GySjmapDraw",
  props: {
    isShowBtns: {
      type: Boolean,
      default: true
    },
    oldDataList: {
      type: Array,
      default: () => []
    },
    drawTypeList: {
      type: Array,
      default: () => {
        return [
          "Point",
          "Line",
          "Circle",
          "Rect",
          "Polygon"
        ];
      }
    },
    drawTypeCnameList: {
      type: Array,
      default: () => {
        return [
          "\u70B9",
          "\u7EBF",
          "\u5706",
          "\u77E9\u5F62",
          "\u591A\u8FB9\u5F62"
        ];
      }
    },
    btnBackground: {
      type: String,
      default: "rgb(102, 102, 102)"
    },
    btnColor: {
      type: String,
      default: "#fff"
    },
    btnActiveBackground: {
      type: String,
      default: "rgb(142, 142, 142)"
    },
    btnActiveColor: {
      type: String,
      default: "#fff"
    }
  },
  emits: ["drawFinish", "startDrawFun"],
  setup(props, { emit }) {
    const drawCon = ref(null);
    const { proxy } = getCurrentInstance();
    const mapId = proxy.$parent.id;
    const gySjmapObj = gySjMap(mapId);
    const mapFinish = computed(() => gySjmapObj.value && gySjmapObj.value.mapFinish);
    let drawObj = ref(null);
    let first = true;
    const drawType = ref("");
    const status = ref("");
    const drawListObj = reactive({
      Point: null,
      LineString: null,
      Circle: null,
      Polygon: null
    });
    let pluginObj = {
      "Point": "DrawPointHandler",
      "Line": "DrawPolylineHandler",
      "Circle": "DrawCircleHandler",
      "Rect": "DrawRectangleHandler",
      "Polygon": "DrawPolygonHandler"
    };
    let hasPluginList = [];
    const drawStatus = ref("");
    const addDrawPlugin = (typeStr) => {
      return new Promise((resolve) => {
        let type = pluginObj[typeStr || drawType.value];
        if (hasPluginList.includes(type)) {
          resolve(typeStr);
        } else {
          SGMap.plugin([`SGMap.${type}`]).then((data) => {
            let k = Object.keys(pluginObj)[Object.values(pluginObj).findIndex((v) => v === type)];
            hasPluginList.push(k);
            resolve(typeStr);
          });
        }
      });
    };
    const startDrawClick = () => {
      emit("startDrawFun");
      startDraw();
    };
    const startDraw = async () => {
      if (first) {
        first = false;
        gySjmapObj.value.map.doubleClickZoom.disable();
      }
      if (status.value === "start") {
        return;
      }
      status.value = "start";
      if (drawType.value && drawListObj[drawType.value]) {
        drawObj.value = drawListObj[drawType.value];
      } else {
        if (drawType.value) {
          await addDrawPlugin();
          let type = pluginObj[drawType.value];
          drawObj.value = new SGMap[type]({
            drawColor: "rgb(0, 153, 255)",
            editColor: "rgb(255, 204, 51)",
            map: gySjmapObj.value.map,
            enableEdit: true,
            featuresList: []
          });
          drawListObj[drawType.value] = drawObj.value;
          addDrawEvent();
        }
      }
      if (drawType.value) {
        drawObj.value.startDraw();
      }
    };
    const addDrawEvent = (drawTypeStr) => {
      let drawTypeObj = {
        "Point": "point",
        "Line": "polyline",
        "Circle": "circle",
        "Rect": "rectangle",
        "Polygon": "polygon"
      };
      drawTypeStr = drawTypeStr || drawType.value;
      let type = drawTypeObj[drawTypeStr];
      drawListObj[drawTypeStr].on(`draw.${type}.start`, function(data) {
        drawStatus.value = "drawStart";
      });
      drawListObj[drawTypeStr].on(`draw.${type}.end`, function(data) {
        drawStatus.value = "drawEnd";
      });
      drawListObj[drawTypeStr].on(`edit.${type}.start`, function(data) {
        drawStatus.value = "drawEdit";
      });
      drawListObj[drawTypeStr].on(`edit.${type}.end`, function(data) {
        drawStatus.value = "editEnd";
        if (status.value === "end") {
          submitData();
        }
      });
    };
    const goOnstartDraw = () => {
      drawObj.value.exitEdit();
      drawStatus.value = "drawStart";
      drawObj.value.startDraw();
    };
    const deleteDraw = () => {
      if (status.value === "start") {
        endDraw();
      }
      status.value = "delete";
    };
    const changeDrawType = (type) => {
      if (drawStatus.value === "drawStart") {
        return;
      }
      drawType.value = type;
      if (status.value !== "end") {
        endDraw();
        startDraw();
      }
    };
    const endDraw = (finish) => {
      if (status.value !== "end") {
        if (finish) {
          submitData();
        } else {
          status.value = "end";
          drawStatus.value = "";
          drawObj.value && drawObj.value.endDraw();
        }
      }
    };
    const submitData = () => {
      if (drawStatus.value === "drawStart") {
        return;
      }
      drawStatus.value = "";
      drawType.value = "";
      status.value = "end";
      drawObj.value && drawObj.value.endDraw();
      let data = [];
      let keys = Object.keys(drawListObj);
      keys.forEach((v) => {
        if (drawListObj[v]) {
          drawListObj[v].exitEdit();
          let features = drawListObj[v].getFeatures();
          features.forEach((val) => {
            if (val) {
              let coordinates = val.geometry.coordinates;
              switch (v) {
                case "Circle":
                  coordinates = val.properties.centerPoint;
                  break;
                case "Point":
                  coordinates = coordinates;
                  break;
                case "Polygon":
                  coordinates = coordinates[0];
                  break;
              }
              let obj = {
                type: v,
                coordinates
              };
              if (v === "Circle") {
                let radius = val.properties.radius;
                obj.radius = radius;
                obj.geometry = val.geometry;
              }
              data.push(obj);
            }
          });
        }
      });
      emit("drawFinish", data);
    };
    const destory = () => {
    };
    let isInitData = false;
    const initOldData = () => {
      if (mapFinish.value && !isInitData) {
        let oldDataList = props.oldDataList;
        if (oldDataList.length === 0) {
          return;
        }
        let typeArr = [...new Set(oldDataList.map((v) => {
          return v.type;
        }))];
        let typePluginArr = [];
        typeArr.forEach((v) => {
          if (!hasPluginList.includes(v)) {
            hasPluginList.push(v);
            typePluginArr.push("SGMap." + pluginObj[v]);
          }
        });
        let needClearPliginData = hasPluginList.filter((v) => !typeArr.includes(v));
        if (needClearPliginData.length !== 0) {
          needClearPliginData.forEach((v) => {
            drawListObj[v] && drawListObj[v].clearData();
          });
        }
        if (typePluginArr.length === 0) {
          drawOldData(typeArr, true);
        } else {
          SGMap.plugin(typePluginArr).then(() => {
            drawOldData(typeArr, true);
          });
        }
      }
    };
    const drawOldData = (typeArr, addEvent) => {
      let oldDataList = props.oldDataList;
      typeArr.forEach((type) => {
        if (drawListObj[type]) {
          drawListObj[type] && drawListObj[type].clearData();
          drawListObj[type] = null;
        }
        if (props.drawTypeList.includes(type)) {
          let pointArr = oldDataList.filter((v) => v.type === type);
          let featuresList = [];
          pointArr.forEach((v, i) => {
            let coordinates = JSON.parse(JSON.stringify(v.coordinates));
            let obj = {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates
              },
              properties: {
                id: `drawPointId_${type}_${i}`
              }
            };
            switch (type) {
              case "Line":
                obj.geometry.type = "LineString";
                break;
              case "Circle":
                if (v.geometry) {
                  obj.geometry = v.geometry;
                  obj.properties.centerPoint = coordinates;
                  obj.properties.radius = v.radius;
                }
                break;
              case "Polygon":
                let coor = [coordinates];
                obj.geometry = {
                  type: "Polygon",
                  coordinates: coor
                };
                break;
              case "Rect":
                let coor1 = [coordinates];
                obj.geometry = {
                  type: "Polygon",
                  coordinates: coor1
                };
                break;
            }
            if (obj) {
              featuresList.push(obj);
            }
          });
          let pluginType = pluginObj[type];
          drawListObj[type] = new SGMap[pluginType]({
            drawColor: "rgb(0, 153, 255)",
            editColor: "rgb(255, 204, 51)",
            map: gySjmapObj.value.map,
            enableEdit: true,
            featuresList
          });
          if (addEvent) {
            addDrawEvent(type);
          }
        } else {
          console.error(type + " \u7C7B\u578B\u4E0D\u6B63\u786E");
        }
      });
    };
    watch(() => props.oldDataList, (n, o) => {
      initOldData();
    }, {
      deep: true
    });
    watch(mapFinish, () => {
      initOldData();
    });
    onMounted(() => {
      initOldData();
      drawCon.value.style.setProperty("--btnBackground", props.btnBackground);
      drawCon.value.style.setProperty("--btnColor", props.btnColor);
      drawCon.value.style.setProperty("--deleteActiveBackground", props.deleteActiveBackground);
      drawCon.value.style.setProperty("--deleteActiveColor", props.deleteActiveColor);
      drawCon.value.style.setProperty("--btnActiveBackground", props.btnActiveBackground);
      drawCon.value.style.setProperty("--btnActiveColor", props.btnActiveColor);
    });
    onBeforeUnmount(() => {
    });
    const isHover = ref(false);
    const mouseenterSelect = () => {
      isHover.value = true;
    };
    const mouseleaveSelect = () => {
      isHover.value = false;
    };
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
      isHover
    };
  }
});
const GySjmapDraw_vue_vue_type_style_index_0_scoped_39b18afa_lang = "";
const _hoisted_1 = {
  class: "draw-btns-list",
  ref: "drawCon"
};
const _hoisted_2 = ["onClick"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("div", _hoisted_1, [
    withDirectives(createElementVNode("div", {
      class: "draw-start draw-btn",
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.startDrawClick && _ctx.startDrawClick(...args))
    }, "\u5F00\u59CB\u7ED8\u5236", 512), [
      [vShow, !_ctx.status || _ctx.status === "end"]
    ]),
    withDirectives(createElementVNode("div", {
      class: "draw-type draw-btn draw-type-select",
      onMouseenter: _cache[1] || (_cache[1] = (...args) => _ctx.mouseenterSelect && _ctx.mouseenterSelect(...args)),
      onMouseleave: _cache[2] || (_cache[2] = (...args) => _ctx.mouseleaveSelect && _ctx.mouseleaveSelect(...args))
    }, [
      createTextVNode(" \u7ED8\u5236\u7C7B\u578B "),
      createElementVNode("div", {
        class: "draw-type-select-con",
        style: normalizeStyle({ "height": !_ctx.isHover ? 0 : _ctx.drawTypeList.length * 20 + 16 + "px" })
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.drawTypeList, (item, index2) => {
          return openBlock(), createElementBlock("div", {
            key: "type" + index2,
            class: normalizeClass(["draw-type-option", { "active": _ctx.drawType === item }]),
            onClick: ($event) => _ctx.changeDrawType(item)
          }, toDisplayString(_ctx.drawTypeCnameList[index2] || "\u5F85\u5B9A"), 11, _hoisted_2);
        }), 128))
      ], 4)
    ], 544), [
      [vShow, _ctx.status && _ctx.status !== "end"]
    ]),
    withDirectives(createElementVNode("div", {
      class: "draw-end draw-btn",
      onClick: _cache[3] || (_cache[3] = (...args) => _ctx.goOnstartDraw && _ctx.goOnstartDraw(...args))
    }, " \u7EE7\u7EED\u6DFB\u52A0 ", 512), [
      [vShow, _ctx.status !== "end" && _ctx.drawStatus === "drawEnd"]
    ]),
    withDirectives(createElementVNode("div", {
      class: "draw-end draw-btn",
      onClick: _cache[4] || (_cache[4] = ($event) => _ctx.endDraw(true))
    }, "\u7ED8\u5236\u5B8C\u6210", 512), [
      [vShow, _ctx.status && _ctx.status !== "end"]
    ])
  ], 512)), [
    [vShow, _ctx.isShowBtns && _ctx.mapFinish]
  ]);
}
const GySjmapDraw = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-39b18afa"], ["__file", "D:/project/gy-map/packages/gy-sjmap/components/GySjmapDraw/src/GySjmapDraw.vue"]]);
class CreateHeatLayer extends createOlLayer {
  constructor(id2, propsObj, emit) {
    super(id2, "heatmap", propsObj, emit);
    __publicField(this, "heatData");
    this.heatData = computed(() => propsObj.heatData);
    this.draw();
  }
  addSource() {
    this.source = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: this.feature
      }
    };
  }
  addFeature() {
    let feature = [];
    this.heatData.value.forEach((d) => {
      if (d.length === 3) {
        feature.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [d[0], d[1]]
          },
          properties: {
            value: d[2]
          }
        });
      }
    });
    this.feature = feature;
  }
  setStyle() {
    this.layout = {};
    this.paint = {
      "heatmap-weight": this.propsObj.heatmapWeight,
      "heatmap-intensity": this.propsObj.heatmapIntensity,
      "heatmap-color": this.propsObj.heatmapColor,
      "heatmap-radius": this.propsObj.heatmapRadius,
      "heatmap-opacity": this.propsObj.heatmapOpacity
    };
  }
  addLayerWatch() {
    watch(this.heatData, () => {
      this.setGeoPosition();
    });
  }
}
const layerProps = {
  heatData: {
    type: Array,
    default: () => []
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
        "#f33900"
      ];
    }
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
    }
  },
  heatmapIntensity: {
    type: [Number, Array],
    default: 1
  },
  heatmapRadius: {
    type: [Number, Array],
    default: 100
  },
  heatmapOpacity: {
    type: [Number, Array],
    default: 1
  },
  ...layerProps$6
};
const _sfc_main$1 = defineComponent({
  name: "GySjmapHeat",
  props: {
    ...layerProps
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    const mapId = proxy.$parent.id;
    let layerObj = null;
    onMounted(() => {
      layerObj = new CreateHeatLayer(mapId, props);
    });
    const destory = () => {
      layerObj.destory();
      layerObj = null;
    };
    onBeforeUnmount(() => {
      destory();
    });
    return {
      layerObj
    };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return null;
}
const GySjmapHeat = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "D:/project/gy-map/packages/gy-sjmap/components/GySjmapHeat/src/GySjmapHeat.vue"]]);
const _sfc_main = defineComponent({
  name: "GySjmapLonlat",
  props: {
    showCon: {
      type: Boolean,
      default: true
    },
    className: {
      type: String,
      default: ""
    }
  },
  emits: ["getLonlat"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const mapId = proxy.$parent.id;
    const gySjmapObj = gySjMap(mapId);
    const mapFinish = computed(() => gySjmapObj.value && gySjmapObj.value.mapFinish);
    let isOn = false;
    const lonlat = ref("");
    const getLonLat = (e) => {
      lonlat.value = `${e.lngLat.lng},${e.lngLat.lat}`;
      emit("getLonlat", lonlat.value);
    };
    const addEvent = () => {
      if (mapFinish.value && !isOn) {
        gySjmapObj.value.map.on("click", getLonLat);
      }
    };
    watch(mapFinish, () => {
      addEvent();
    });
    onMounted(() => {
      addEvent();
    });
    const destory = () => {
      gySjmapObj.value.map && gySjmapObj.value.map.off("click", getLonLat);
    };
    onBeforeUnmount(() => {
      destory();
    });
    return {
      className: props.className,
      lonlat
    };
  }
});
const GySjmapLonlat_vue_vue_type_style_index_0_scoped_62b6ba7e_lang = "";
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("div", {
    class: normalizeClass(["GySjmapLonlat-con", _ctx.className])
  }, toDisplayString(_ctx.lonlat), 3)), [
    [vShow, _ctx.showCon]
  ]);
}
const GySjmapLonlat = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-62b6ba7e"], ["__file", "D:/project/gy-map/packages/gy-sjmap/components/GySjmapLonlat/src/GySjmapLonlat.vue"]]);
const components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GySjmap,
  GySjmapText,
  GySjmapCircle,
  GySjmapImage,
  GySjmapHtml,
  GySjmapLine,
  GySjmapPolygon,
  GySjmapTask,
  GySjmapDraw,
  GySjmapHeat,
  GySjmapLonlat
}, Symbol.toStringTag, { value: "Module" }));
const version = 8;
const sprite = "aegis://sprites/aegis/Streets";
const glyphs = "aegis://fonts/aegis/{fontstack}/{range}.pbf";
const sources = {
  epgis: {
    type: "vector",
    url: "aegis://aegis.Streets.zvLK"
  }
};
const layers = [
  {
    type: "background",
    id: "background",
    layout: {
      visibility: "visible"
    },
    paint: {
      "background-color": "#f7f7f7"
    }
  },
  {
    id: "Sea/1",
    type: "fill",
    source: "epgis",
    "source-layer": "Sea",
    maxzoom: 9,
    layout: {},
    paint: {
      "fill-color": "#b2cefe"
    }
  },
  {
    id: "World/1",
    type: "fill",
    source: "epgis",
    "source-layer": "World",
    maxzoom: 7,
    layout: {},
    paint: {
      "fill-color": "#f7f7f7"
    }
  },
  {
    id: "Province",
    type: "fill",
    source: "epgis",
    "source-layer": "Province",
    minzoom: 7,
    layout: {},
    paint: {
      "fill-color": "#f7f7f7"
    }
  },
  {
    id: "SouthIsland_S/1",
    type: "fill",
    source: "epgis",
    "source-layer": "SouthIsland_S",
    maxzoom: 7,
    layout: {},
    paint: {
      "fill-color": "#f7f7f7"
    }
  },
  {
    id: "AOI/Traffic/1",
    type: "fill",
    source: "epgis",
    "source-layer": "AOI",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 11,
    layout: {},
    paint: {
      "fill-color": "#CDEAE9"
    }
  },
  {
    id: "AOI/Building/1",
    type: "fill",
    source: "epgis",
    "source-layer": "AOI",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 11,
    layout: {},
    paint: {
      "fill-color": "#EEEEEE"
    }
  },
  {
    id: "AOI/School/1",
    type: "fill",
    source: "epgis",
    "source-layer": "AOI",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 11,
    layout: {},
    paint: {
      "fill-color": "#D2E8F5"
    }
  },
  {
    id: "AOI/Museum/1",
    type: "fill",
    source: "epgis",
    "source-layer": "AOI",
    filter: [
      "==",
      "_symbol",
      3
    ],
    minzoom: 11,
    layout: {},
    paint: {
      "fill-color": "#F4E0D7"
    }
  },
  {
    id: "AOI/Hospital/1",
    type: "fill",
    source: "epgis",
    "source-layer": "AOI",
    filter: [
      "==",
      "_symbol",
      4
    ],
    minzoom: 11,
    layout: {},
    paint: {
      "fill-color": "#F8DADA"
    }
  },
  {
    id: "AOI/Shopping/1",
    type: "fill",
    source: "epgis",
    "source-layer": "AOI",
    filter: [
      "==",
      "_symbol",
      5
    ],
    minzoom: 11,
    layout: {},
    paint: {
      "fill-color": "#DDD3F1"
    }
  },
  {
    id: "AOI/Park/1",
    type: "fill",
    source: "epgis",
    "source-layer": "AOI",
    filter: [
      "==",
      "_symbol",
      6
    ],
    minzoom: 11,
    layout: {},
    paint: {
      "fill-color": "#C6E2B2"
    }
  },
  {
    id: "AOI/Industry/1",
    type: "fill",
    source: "epgis",
    "source-layer": "AOI",
    filter: [
      "==",
      "_symbol",
      7
    ],
    minzoom: 11,
    layout: {},
    paint: {
      "fill-color": "#FDF5E6"
    }
  },
  {
    id: "Green",
    type: "fill",
    source: "epgis",
    "source-layer": "Green",
    minzoom: 7.5,
    layout: {},
    paint: {
      "fill-color": "#C6E2B2"
    }
  },
  {
    id: "WaterLine",
    type: "line",
    source: "epgis",
    "source-layer": "WaterLine",
    minzoom: 10,
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#b2cefe",
      "line-width": 1.2
    }
  },
  {
    id: "Water",
    type: "fill",
    source: "epgis",
    "source-layer": "Water",
    layout: {},
    paint: {
      "fill-color": "#b2cefe"
    }
  },
  {
    id: "Railway/1",
    type: "line",
    source: "epgis",
    "source-layer": "Railway",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 10,
    layout: {
      "line-join": "round"
    },
    paint: {
      "line-color": "#828282",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        7,
        2,
        8,
        3
      ]
    }
  },
  {
    id: "Railway/0",
    type: "line",
    source: "epgis",
    "source-layer": "Railway",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 10,
    layout: {
      "line-join": "round"
    },
    paint: {
      "line-color": "#FFFFFF",
      "line-dasharray": [
        6,
        6
      ],
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        7,
        1,
        8,
        2
      ]
    }
  },
  {
    id: "Railway/HighSpeed/1",
    type: "line",
    source: "epgis",
    "source-layer": "Railway",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 10,
    layout: {
      "line-join": "round"
    },
    paint: {
      "line-color": "#FF7F7F",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        7,
        2,
        8,
        3
      ]
    }
  },
  {
    id: "Railway/HighSpeed/0",
    type: "line",
    source: "epgis",
    "source-layer": "Railway",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 10,
    layout: {
      "line-join": "round"
    },
    paint: {
      "line-color": "#FFFFFF",
      "line-dasharray": [
        6,
        6
      ],
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        7,
        1,
        8,
        2
      ]
    }
  },
  {
    id: "R_FerryLine",
    type: "line",
    source: "epgis",
    "source-layer": "R_FerryLine",
    minzoom: 12.5,
    layout: {
      "line-join": "round"
    },
    paint: {
      "line-color": "#6699CD",
      "line-dasharray": [
        2,
        2
      ],
      "line-width": 1.2
    }
  },
  {
    id: "R_Pathway/Construction/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_Pathway",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 15,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#a8acb3",
      "line-dasharray": [
        0.5,
        1
      ],
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        15,
        3,
        16,
        4,
        17,
        7,
        18,
        12,
        19,
        16
      ]
    }
  },
  {
    id: "R_Pathway/Construction/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_Pathway",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 15,
    layout: {
      visibility: "visible",
      "line-cap": "square",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#e3e3e3",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        15,
        2,
        16,
        2,
        17,
        5,
        18,
        10,
        19,
        14
      ]
    }
  },
  {
    id: "R_Pathway/Tunel/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_Pathway",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 15,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#d7d7d7",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        15,
        3,
        16,
        4,
        17,
        7,
        18,
        12,
        19,
        16
      ]
    }
  },
  {
    id: "R_Pathway/Tunel/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_Pathway",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 15,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f0f0f0",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        15,
        2,
        16,
        2,
        17,
        5,
        18,
        10,
        19,
        14
      ]
    }
  },
  {
    id: "R_Pathway/Road/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_Pathway",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 15,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#d7d7d7",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        15,
        3,
        16,
        4,
        17,
        7,
        18,
        12,
        19,
        16
      ]
    }
  },
  {
    id: "R_Pathway/Road/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_Pathway",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 15,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#ffffff",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        15,
        2,
        16,
        2,
        17,
        5,
        18,
        10,
        19,
        14
      ]
    }
  },
  {
    id: "R_VillageRoad/Construction/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_VillageRoad",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 14,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#a8acb3",
      "line-dasharray": [
        0.5,
        1
      ],
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        15,
        4,
        16,
        6,
        17,
        9,
        18,
        14,
        19,
        18
      ]
    }
  },
  {
    id: "R_VillageRoad/Construction/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_VillageRoad",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 14,
    layout: {
      visibility: "visible",
      "line-cap": "square",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#e3e3e3",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        15,
        2,
        16,
        4,
        17,
        7,
        18,
        12,
        19,
        16
      ]
    }
  },
  {
    id: "R_VillageRoad/Tunel/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_VillageRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 14,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#d7d7d7",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        15,
        4,
        16,
        6,
        17,
        9,
        18,
        14,
        19,
        18
      ]
    }
  },
  {
    id: "R_VillageRoad/Tunel/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_VillageRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 14,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f0f0f0",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        15,
        2,
        16,
        4,
        17,
        7,
        18,
        12,
        19,
        16
      ]
    }
  },
  {
    id: "R_VillageRoad/Road/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_VillageRoad",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 14,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#d7d7d7",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        15,
        4,
        16,
        6,
        17,
        9,
        18,
        14,
        19,
        18
      ]
    }
  },
  {
    id: "R_VillageRoad/Road/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_VillageRoad",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 14,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#ffffff",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        15,
        2,
        16,
        4,
        17,
        7,
        18,
        12,
        19,
        16
      ]
    }
  },
  {
    id: "R_OrdinaryRoad/Construction/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_OrdinaryRoad",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 14.5,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#a8acb3",
      "line-dasharray": [
        0.5,
        1
      ],
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        14,
        3,
        15,
        4,
        16,
        6,
        17,
        13,
        18,
        22,
        19,
        38
      ]
    }
  },
  {
    id: "R_OrdinaryRoad/Construction/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_OrdinaryRoad",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 14.5,
    layout: {
      visibility: "visible",
      "line-cap": "square",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#e3e3e3",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        14,
        2,
        15,
        3,
        16,
        4,
        17,
        10,
        18,
        20,
        19,
        36
      ]
    }
  },
  {
    id: "R_OrdinaryRoad/Tunel/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_OrdinaryRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 14.5,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#d7d7d7",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        14,
        3,
        15,
        4,
        16,
        6,
        17,
        13,
        18,
        22,
        19,
        38
      ]
    }
  },
  {
    id: "R_OrdinaryRoad/Tunel/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_OrdinaryRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 14.5,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f0f0f0",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        14,
        2,
        15,
        3,
        16,
        4,
        17,
        10,
        18,
        20,
        19,
        36
      ]
    }
  },
  {
    id: "R_OrdinaryRoad/Road/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_OrdinaryRoad",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 14.5,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#d7d7d7",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        14,
        3,
        15,
        4,
        16,
        6,
        17,
        13,
        18,
        22,
        19,
        38
      ]
    }
  },
  {
    id: "R_OrdinaryRoad/Road/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_OrdinaryRoad",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 14.5,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#ffffff",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        14,
        2,
        15,
        3,
        16,
        4,
        17,
        10,
        18,
        20,
        19,
        36
      ]
    }
  },
  {
    id: "R_SecondaryRoad/Construction/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_SecondaryRoad",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#a8acb3",
      "line-dasharray": [
        0.5,
        1
      ],
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        12,
        2.5,
        15,
        4,
        16,
        8,
        17,
        14,
        18,
        24,
        19,
        38
      ]
    }
  },
  {
    id: "R_SecondaryRoad/Construction/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_SecondaryRoad",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-cap": "square",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#e3e3e3",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        12,
        1.5,
        15,
        3,
        16,
        6,
        17,
        12,
        18,
        22,
        19,
        36
      ]
    }
  },
  {
    id: "R_SecondaryRoad/Tunel/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_SecondaryRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#d7d7d7",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        12,
        2.5,
        15,
        4,
        16,
        8,
        17,
        14,
        18,
        24,
        19,
        38
      ]
    }
  },
  {
    id: "R_SecondaryRoad/Tunel/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_SecondaryRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f0f0f0",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        12,
        1.5,
        15,
        3,
        16,
        6,
        17,
        12,
        18,
        22,
        19,
        36
      ]
    }
  },
  {
    id: "R_SecondaryRoad/Tunel_1/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_SecondaryRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 12.7,
    maxzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#d7d7d7",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        12,
        2.5,
        15,
        4,
        16,
        8,
        17,
        14,
        18,
        24,
        19,
        38
      ]
    }
  },
  {
    id: "R_SecondaryRoad/Tunel_1/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_SecondaryRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 12.7,
    maxzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#ffffff",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        12,
        1.5,
        15,
        3,
        16,
        6,
        17,
        12,
        18,
        22,
        19,
        36
      ]
    }
  },
  {
    id: "R_SecondaryRoad/Road/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_SecondaryRoad",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 12.7,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#d7d7d7",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        12,
        2.5,
        15,
        4,
        16,
        8,
        17,
        14,
        18,
        24,
        19,
        38
      ]
    }
  },
  {
    id: "R_SecondaryRoad/Road/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_SecondaryRoad",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 12.7,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#ffffff",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        12,
        1.5,
        15,
        3,
        16,
        6,
        17,
        12,
        18,
        22,
        19,
        36
      ]
    }
  },
  {
    id: "R_TownshipRoad/Construction/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_TownshipRoad",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#a8acb3",
      "line-dasharray": [
        0.5,
        1
      ],
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        13,
        4,
        14,
        5,
        15,
        6,
        16,
        9,
        17,
        13,
        18,
        22,
        19,
        38
      ]
    }
  },
  {
    id: "R_TownshipRoad/Construction/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_TownshipRoad",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-cap": "square",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#e3e3e3",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        13,
        2,
        14,
        3,
        15,
        4,
        16,
        7,
        17,
        11,
        18,
        20,
        19,
        36
      ]
    }
  },
  {
    id: "R_TownshipRoad/Tunel/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_TownshipRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#d7d7d7",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        13,
        4,
        14,
        5,
        15,
        6,
        16,
        9,
        17,
        13,
        18,
        22,
        19,
        38
      ]
    }
  },
  {
    id: "R_TownshipRoad/Tunel/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_TownshipRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f0f0f0",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        13,
        2,
        14,
        3,
        15,
        4,
        16,
        7,
        17,
        11,
        18,
        20,
        19,
        36
      ]
    }
  },
  {
    id: "R_TownshipRoad/Tunel_1/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_TownshipRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 10,
    maxzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#d7d7d7",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        13,
        4,
        14,
        5,
        15,
        6,
        16,
        9,
        17,
        13,
        18,
        22,
        19,
        38
      ]
    }
  },
  {
    id: "R_TownshipRoad/Tunel_1/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_TownshipRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 10,
    maxzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#ffffff",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        13,
        2,
        14,
        3,
        15,
        4,
        16,
        7,
        17,
        11,
        18,
        20,
        19,
        36
      ]
    }
  },
  {
    id: "R_TownshipRoad/Road/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_TownshipRoad",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 10,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#d7d7d7",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        13,
        4,
        14,
        5,
        15,
        6,
        16,
        9,
        17,
        13,
        18,
        22,
        19,
        38
      ]
    }
  },
  {
    id: "R_TownshipRoad/Road/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_TownshipRoad",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 10,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#ffffff",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        13,
        2,
        14,
        3,
        15,
        4,
        16,
        7,
        17,
        11,
        18,
        20,
        19,
        36
      ]
    }
  },
  {
    id: "R_CountyRoad/Construction/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_CountyRoad",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#a8acb3",
      "line-dasharray": [
        0.5,
        1
      ],
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        3,
        12,
        5,
        15,
        7,
        16,
        10,
        17,
        14,
        18,
        24,
        19,
        38
      ]
    }
  },
  {
    id: "R_CountyRoad/Construction/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_CountyRoad",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-cap": "square",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#e3e3e3",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        2,
        12,
        3,
        15,
        5,
        16,
        8,
        17,
        12,
        18,
        22,
        19,
        36
      ]
    }
  },
  {
    id: "R_CountyRoad/Tunel/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_CountyRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#d7d7d7",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        3,
        12,
        5,
        15,
        7,
        16,
        10,
        17,
        14,
        18,
        24,
        19,
        38
      ]
    }
  },
  {
    id: "R_CountyRoad/Tunel/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_CountyRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f0f0f0",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        2,
        12,
        3,
        15,
        5,
        16,
        8,
        17,
        12,
        18,
        22,
        19,
        36
      ]
    }
  },
  {
    id: "R_CountyRoad/Tunel_1/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_CountyRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 9,
    maxzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#d7d7d7",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        3,
        12,
        5,
        15,
        7,
        16,
        10,
        17,
        14,
        18,
        24,
        19,
        38
      ]
    }
  },
  {
    id: "R_CountyRoad/Tunel_1/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_CountyRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 9,
    maxzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#ffffff",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        2,
        12,
        3,
        15,
        5,
        16,
        8,
        17,
        12,
        18,
        22,
        19,
        36
      ]
    }
  },
  {
    id: "R_CountyRoad/Road/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_CountyRoad",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 9,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#d7d7d7",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        3,
        12,
        5,
        15,
        7,
        16,
        10,
        17,
        14,
        18,
        24,
        19,
        38
      ]
    }
  },
  {
    id: "R_CountyRoad/Road/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_CountyRoad",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 9,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#ffffff",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        2,
        12,
        3,
        15,
        5,
        16,
        8,
        17,
        12,
        18,
        22,
        19,
        36
      ]
    }
  },
  {
    id: "R_PrimaryRoad/Construction/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_PrimaryRoad",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#a8acb3",
      "line-dasharray": [
        0.5,
        1
      ],
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        4,
        11,
        5,
        13,
        7,
        15,
        10,
        17,
        14,
        18,
        24,
        19,
        38
      ]
    }
  },
  {
    id: "R_PrimaryRoad/Construction/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_PrimaryRoad",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#e3e3e3",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        2,
        11,
        3,
        13,
        5,
        15,
        8,
        17,
        12,
        18,
        22,
        19,
        36
      ]
    }
  },
  {
    id: "R_PrimaryRoad/Tunel/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_PrimaryRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f7d78c",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        4,
        11,
        5,
        13,
        7,
        15,
        10,
        17,
        14,
        18,
        24,
        19,
        38
      ]
    }
  },
  {
    id: "R_PrimaryRoad/Tunel/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_PrimaryRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#DEB887",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        2,
        11,
        3,
        13,
        5,
        15,
        8,
        17,
        12,
        18,
        22,
        19,
        36
      ]
    }
  },
  {
    id: "R_PrimaryRoad/Tunel_1/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_PrimaryRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 9,
    maxzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f7d78c",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        4,
        11,
        5,
        13,
        7,
        15,
        10,
        17,
        14,
        18,
        24,
        19,
        38
      ]
    }
  },
  {
    id: "R_PrimaryRoad/Tunel_1/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_PrimaryRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 9,
    maxzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#fff0bb",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        2,
        11,
        3,
        13,
        5,
        15,
        8,
        17,
        12,
        18,
        22,
        19,
        36
      ]
    }
  },
  {
    id: "R_PrimaryRoad/Road/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_PrimaryRoad",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 9,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f7d78c",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        4,
        11,
        5,
        13,
        7,
        15,
        10,
        17,
        14,
        18,
        24,
        19,
        38
      ]
    }
  },
  {
    id: "R_PrimaryRoad/Road/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_PrimaryRoad",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 9,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#fff0bb",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        2,
        11,
        3,
        13,
        5,
        15,
        8,
        17,
        12,
        18,
        22,
        19,
        36
      ]
    }
  },
  {
    id: "R_ProvincialRoad/Construction/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_ProvincialRoad",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 11,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#a8acb3",
      "line-dasharray": [
        0.5,
        1
      ],
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        4,
        11,
        5,
        13,
        7,
        15,
        10,
        17,
        14,
        18,
        24,
        19,
        38
      ]
    }
  },
  {
    id: "R_ProvincialRoad/Construction/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_ProvincialRoad",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 11,
    layout: {
      visibility: "visible",
      "line-cap": "square",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#e3e3e3",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        2,
        11,
        3,
        13,
        5,
        15,
        8,
        17,
        12,
        18,
        22,
        19,
        36
      ]
    }
  },
  {
    id: "R_ProvincialRoad/Tunel/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_ProvincialRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f7d78c",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        8,
        1,
        10,
        4,
        11,
        5,
        13,
        7,
        15,
        10,
        17,
        14,
        18,
        24,
        19,
        38
      ]
    }
  },
  {
    id: "R_ProvincialRoad/Tunel/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_ProvincialRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#DEB887",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        8,
        0.5,
        10,
        2,
        11,
        3,
        13,
        5,
        15,
        8,
        17,
        12,
        18,
        22,
        19,
        36
      ]
    }
  },
  {
    id: "R_ProvincialRoad/Tunel_1/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_ProvincialRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 8,
    maxzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f7d78c",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        8,
        1,
        10,
        4,
        11,
        5,
        13,
        7,
        15,
        10,
        17,
        14,
        18,
        24,
        19,
        38
      ]
    }
  },
  {
    id: "R_ProvincialRoad/Tunel_1/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_ProvincialRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 8,
    maxzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#fff0bb",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        8,
        0.5,
        10,
        2,
        11,
        3,
        13,
        5,
        15,
        8,
        17,
        12,
        18,
        22,
        19,
        36
      ]
    }
  },
  {
    id: "R_ProvincialRoad/Road/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_ProvincialRoad",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 8,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f7d78c",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        8,
        1,
        10,
        4,
        11,
        5,
        13,
        7,
        15,
        10,
        17,
        14,
        18,
        24,
        19,
        38
      ]
    }
  },
  {
    id: "R_ProvincialRoad/Road/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_ProvincialRoad",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 8,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#fff0bb",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        8,
        0.5,
        10,
        2,
        11,
        3,
        13,
        5,
        15,
        8,
        17,
        12,
        18,
        22,
        19,
        36
      ]
    }
  },
  {
    id: "R_NationalRoad/Construction/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_NationalRoad",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 9,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#a8acb3",
      "line-dasharray": [
        0.5,
        1
      ],
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        8,
        3,
        9,
        4,
        11,
        5,
        13,
        7,
        15,
        12,
        17,
        18,
        18,
        28,
        19,
        52
      ]
    }
  },
  {
    id: "R_NationalRoad/Construction/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_NationalRoad",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 9,
    layout: {
      visibility: "visible",
      "line-cap": "square",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#e3e3e3",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        8,
        1,
        9,
        2,
        11,
        3,
        13,
        5,
        15,
        10,
        17,
        16,
        18,
        26,
        19,
        50
      ]
    }
  },
  {
    id: "R_NationalRoad/Tunel/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_NationalRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f7d78c",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        8,
        3,
        9,
        4,
        11,
        5,
        13,
        7,
        15,
        12,
        17,
        18,
        18,
        28,
        19,
        52
      ]
    }
  },
  {
    id: "R_NationalRoad/Tunel/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_NationalRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#DEB887",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        8,
        1,
        9,
        2,
        11,
        3,
        13,
        5,
        15,
        10,
        17,
        16,
        18,
        26,
        19,
        50
      ]
    }
  },
  {
    id: "R_NationalRoad/Tunel_1/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_NationalRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 7,
    maxzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f7d78c",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        8,
        3,
        9,
        4,
        11,
        5,
        13,
        7,
        15,
        12,
        17,
        18,
        18,
        28,
        19,
        52
      ]
    }
  },
  {
    id: "R_NationalRoad/Tunel_1/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_NationalRoad",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 7,
    maxzoom: 13,
    layout: {
      visibility: "visible",
      "line-cap": "square",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#fff0bb",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        8,
        1,
        9,
        2,
        11,
        3,
        13,
        5,
        15,
        10,
        17,
        16,
        18,
        26,
        19,
        50
      ]
    }
  },
  {
    id: "R_NationalRoad/Road/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_NationalRoad",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 7,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f7d78c",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        8,
        3,
        9,
        4,
        11,
        5,
        13,
        7,
        15,
        12,
        17,
        18,
        18,
        28,
        19,
        52
      ]
    }
  },
  {
    id: "R_NationalRoad/Road/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_NationalRoad",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 7,
    layout: {
      visibility: "visible",
      "line-cap": "square",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#fff0bb",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        8,
        1,
        9,
        2,
        11,
        3,
        13,
        5,
        15,
        10,
        17,
        16,
        18,
        26,
        19,
        50
      ]
    }
  },
  {
    id: "R_NationalRoad_Simple",
    type: "line",
    source: "epgis",
    "source-layer": "R_NationalRoad_Simple",
    minzoom: 6,
    maxzoom: 7,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        6,
        "#ffe5a9",
        8,
        "#f7d78c"
      ],
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        6,
        1,
        8,
        3
      ]
    }
  },
  {
    id: "R_UrbanHighway/Construction/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_UrbanHighway",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 11,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#a8acb3",
      "line-dasharray": [
        0.5,
        1
      ],
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        7,
        2,
        8,
        3,
        9,
        4,
        10,
        5,
        13,
        8,
        15,
        12,
        17,
        20,
        18,
        38,
        19,
        72
      ]
    }
  },
  {
    id: "R_UrbanHighway/Construction/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_UrbanHighway",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 11,
    layout: {
      visibility: "visible",
      "line-cap": "square",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#e3e3e3",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        7,
        1,
        9,
        2,
        10,
        3,
        13,
        6,
        15,
        10,
        17,
        18,
        18,
        36,
        19,
        70
      ]
    }
  },
  {
    id: "R_UrbanHighway/Tunel/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_UrbanHighway",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f7bf5f",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        7,
        2,
        8,
        3,
        9,
        4,
        10,
        5,
        13,
        8,
        15,
        12,
        17,
        20,
        18,
        38,
        19,
        72
      ]
    }
  },
  {
    id: "R_UrbanHighway/Tunel/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_UrbanHighway",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#CD853F",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        7,
        1,
        9,
        2,
        10,
        3,
        13,
        6,
        15,
        10,
        17,
        18,
        18,
        36,
        19,
        70
      ]
    }
  },
  {
    id: "R_UrbanHighway/Tunel_1/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_UrbanHighway",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 8,
    maxzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f7bf5f",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        7,
        2,
        8,
        3,
        9,
        4,
        10,
        5,
        13,
        8,
        15,
        12,
        17,
        20,
        18,
        38,
        19,
        72
      ]
    }
  },
  {
    id: "R_UrbanHighway/Tunel_1/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_UrbanHighway",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 8,
    maxzoom: 13,
    layout: {
      visibility: "visible",
      "line-cap": "square",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#fed151",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        7,
        1,
        9,
        2,
        10,
        3,
        13,
        6,
        15,
        10,
        17,
        18,
        18,
        36,
        19,
        70
      ]
    }
  },
  {
    id: "R_UrbanHighway/Road/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_UrbanHighway",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 8,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f7bf5f",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        7,
        2,
        8,
        3,
        9,
        4,
        10,
        5,
        13,
        8,
        15,
        12,
        17,
        20,
        18,
        38,
        19,
        72
      ]
    }
  },
  {
    id: "R_UrbanHighway/Road/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_UrbanHighway",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 8,
    layout: {
      visibility: "visible",
      "line-cap": "square",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#fed151",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        7,
        1,
        9,
        2,
        10,
        3,
        13,
        6,
        15,
        10,
        17,
        18,
        18,
        36,
        19,
        70
      ]
    }
  },
  {
    id: "R_ExpressWay/Construction/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_ExpressWay",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 8,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#a8acb3",
      "line-dasharray": [
        1.66667,
        1
      ],
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        7,
        2,
        8,
        4,
        10,
        6,
        11,
        8,
        12,
        9,
        13,
        10,
        15,
        13,
        17,
        22,
        18,
        42,
        19,
        80
      ]
    }
  },
  {
    id: "R_ExpressWay/Construction/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_ExpressWay",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 8,
    layout: {
      visibility: "visible",
      "line-cap": "square",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#e3e3e3",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        8,
        2,
        10,
        4,
        11,
        6,
        12,
        7,
        13,
        8,
        15,
        11,
        17,
        20,
        18,
        40,
        19,
        78
      ]
    }
  },
  {
    id: "R_ExpressWay/Tunel/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_ExpressWay",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f09c3c",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        7,
        2,
        8,
        4,
        10,
        6,
        11,
        8,
        12,
        9,
        13,
        10,
        15,
        13,
        17,
        22,
        18,
        42,
        19,
        80
      ]
    }
  },
  {
    id: "R_ExpressWay/Tunel/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_ExpressWay",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#CD853F",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        8,
        2,
        10,
        4,
        11,
        6,
        12,
        7,
        13,
        8,
        15,
        11,
        17,
        20,
        18,
        40,
        19,
        78
      ]
    }
  },
  {
    id: "R_ExpressWay/Tunel_1/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_ExpressWay",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 7,
    maxzoom: 13,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f09c3c",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        7,
        2,
        8,
        4,
        10,
        6,
        11,
        8,
        12,
        9,
        13,
        10,
        15,
        13,
        17,
        22,
        18,
        42,
        19,
        80
      ]
    }
  },
  {
    id: "R_ExpressWay/Tunel_1/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_ExpressWay",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 7,
    maxzoom: 13,
    layout: {
      visibility: "visible",
      "line-cap": "square",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#ffac4d",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        8,
        2,
        10,
        4,
        11,
        6,
        12,
        7,
        13,
        8,
        15,
        11,
        17,
        20,
        18,
        40,
        19,
        78
      ]
    }
  },
  {
    id: "R_ExpressWay/Road/1",
    type: "line",
    source: "epgis",
    "source-layer": "R_ExpressWay",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 7,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#f09c3c",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        7,
        2,
        8,
        4,
        10,
        6,
        11,
        8,
        12,
        9,
        13,
        10,
        15,
        13,
        17,
        22,
        18,
        42,
        19,
        80
      ]
    }
  },
  {
    id: "R_ExpressWay/Road/0",
    type: "line",
    source: "epgis",
    "source-layer": "R_ExpressWay",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 7,
    layout: {
      visibility: "visible",
      "line-cap": "square",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#ffac4d",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        8,
        2,
        10,
        4,
        11,
        6,
        12,
        7,
        13,
        8,
        15,
        11,
        17,
        20,
        18,
        40,
        19,
        78
      ]
    }
  },
  {
    id: "R_ExpressWay_Simple",
    type: "line",
    source: "epgis",
    "source-layer": "R_ExpressWay_Simple",
    minzoom: 5,
    maxzoom: 7,
    layout: {
      visibility: "visible",
      "line-join": "bevel"
    },
    paint: {
      "line-opacity": 1,
      "line-color": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        5,
        "#ffac4d",
        8,
        "#f09c3c"
      ],
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        5,
        1,
        7,
        2
      ]
    }
  },
  {
    id: "SubwayPolygon",
    type: "fill",
    source: "epgis",
    "source-layer": "SubwayPolygon",
    minzoom: 15,
    layout: {
      visibility: "visible"
    },
    paint: {
      "fill-color": [
        "get",
        "UI_COLOR"
      ],
      "fill-opacity": 0.7
    }
  },
  {
    id: "SubwayLine/plan",
    type: "line",
    source: "epgis",
    "source-layer": "SubwayLine",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 12,
    layout: {
      visibility: "visible",
      "line-join": "round"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#bebebe",
      "line-dasharray": [
        4,
        4
      ],
      "line-width": 1.2
    }
  },
  {
    id: "SubwayLine/construction",
    type: "line",
    source: "epgis",
    "source-layer": "SubwayLine",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 12,
    layout: {
      visibility: "visible",
      "line-join": "round"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#bebebe",
      "line-dasharray": [
        4,
        4
      ],
      "line-width": 1.2
    }
  },
  {
    id: "SubwayLine/operation",
    type: "line",
    source: "epgis",
    "source-layer": "SubwayLine",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 10,
    layout: {
      visibility: "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-opacity": 1,
      "line-color": [
        "get",
        "UI_COLOR"
      ],
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        11,
        1,
        15,
        3,
        19,
        5
      ]
    }
  },
  {
    id: "Boundary/Province",
    type: "line",
    source: "epgis",
    "source-layer": "Boundary",
    filter: [
      "==",
      "_symbol",
      0
    ],
    minzoom: 3,
    maxzoom: 7,
    layout: {
      visibility: "visible",
      "line-join": "round"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#989ea6",
      "line-dasharray": [
        0.5,
        1
      ],
      "line-width": 1
    }
  },
  {
    id: "Boundary/HongKong",
    type: "line",
    source: "epgis",
    "source-layer": "Boundary",
    filter: [
      "==",
      "_symbol",
      1
    ],
    minzoom: 3,
    maxzoom: 7,
    layout: {
      visibility: "visible",
      "line-join": "round"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#989ea6",
      "line-dasharray": [
        3,
        1.5,
        1.5,
        1.5
      ],
      "line-width": 1
    }
  },
  {
    id: "Boundary/Ceasefire",
    type: "line",
    source: "epgis",
    "source-layer": "Boundary",
    filter: [
      "==",
      "_symbol",
      2
    ],
    minzoom: 0,
    maxzoom: 7,
    layout: {
      visibility: "visible",
      "line-join": "round"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#989ea6",
      "line-dasharray": [
        0.5,
        1
      ],
      "line-width": 1
    }
  },
  {
    id: "Boundary/Nation",
    type: "line",
    source: "epgis",
    "source-layer": "Boundary",
    filter: [
      "==",
      "_symbol",
      3
    ],
    minzoom: 0,
    maxzoom: 7,
    layout: {
      visibility: "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#eaaeb6",
      "line-width": 1
    }
  },
  {
    id: "Boundary/UndecidedNation",
    type: "line",
    source: "epgis",
    "source-layer": "Boundary",
    filter: [
      "==",
      "_symbol",
      4
    ],
    minzoom: 0,
    maxzoom: 7,
    layout: {
      visibility: "visible",
      "line-join": "round"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#eaaeb6",
      "line-dasharray": [
        0.5,
        1
      ],
      "line-width": 1
    }
  },
  {
    id: "Boundary/Dispute",
    type: "line",
    source: "epgis",
    "source-layer": "Boundary",
    filter: [
      "==",
      "_symbol",
      5
    ],
    minzoom: 0,
    maxzoom: 7,
    layout: {
      visibility: "visible",
      "line-join": "round"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#eaaeb6",
      "line-dasharray": [
        0.5,
        1
      ],
      "line-width": 1
    }
  },
  {
    id: "Boundary/UndecidedNationC",
    type: "line",
    source: "epgis",
    "source-layer": "Boundary",
    filter: [
      "==",
      "_symbol",
      6
    ],
    maxzoom: 7,
    layout: {
      visibility: "visible",
      "line-join": "round"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#e04747",
      "line-dasharray": [
        0.5,
        1
      ],
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        0,
        1,
        4,
        2,
        5,
        3,
        7,
        4
      ]
    }
  },
  {
    id: "Boundary/NationC",
    type: "line",
    source: "epgis",
    "source-layer": "Boundary",
    filter: [
      "==",
      "_symbol",
      7
    ],
    maxzoom: 7,
    layout: {
      visibility: "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-opacity": 1,
      "line-color": "#e04747",
      "line-width": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        0,
        1,
        4,
        2,
        5,
        3,
        7,
        4
      ]
    }
  },
  {
    id: "2d-Building",
    type: "fill",
    source: "epgis",
    "source-layer": "2d-Building",
    minzoom: 16,
    layout: {},
    paint: {
      "fill-color": "#e6e6e6",
      "fill-opacity": 0.7
    }
  },
  {
    id: "Building",
    type: "fill-extrusion",
    source: "epgis",
    "source-layer": "Building",
    minzoom: 16,
    layout: {
      visibility: "visible"
    },
    paint: {
      "fill-extrusion-base": 0,
      "fill-extrusion-height": [
        "get",
        "max_height"
      ],
      "fill-extrusion-opacity": 0.65,
      "fill-extrusion-color": "rgb(255,255,255)"
    }
  },
  {
    id: "SouthIsland",
    type: "symbol",
    source: "epgis",
    "source-layer": "SouthIsland",
    minzoom: 4,
    layout: {
      visibility: "visible",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-size": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        4,
        10,
        8,
        11
      ],
      "text-anchor": "center",
      "text-field": "{_name}",
      "text-optional": true
    },
    paint: {
      "text-color": "#62718a",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1
    }
  },
  {
    id: "AOI/label/label",
    type: "symbol",
    source: "epgis",
    "source-layer": "AOI/label",
    minzoom: 15,
    layout: {
      visibility: "visible",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-size": 13,
      "text-field": "{_name}",
      "text-optional": true
    },
    paint: {
      "text-color": "#9C9C9C",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1.2
    }
  },
  {
    id: "Railway/label/label",
    type: "symbol",
    source: "epgis",
    "source-layer": "Railway/label",
    minzoom: 14,
    layout: {
      visibility: "visible",
      "symbol-placement": "line",
      "symbol-spacing": 600,
      "text-field": "{_name}",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-letter-spacing": 0.2,
      "text-optional": true,
      "text-size": 12
    },
    paint: {
      "text-color": "#606066",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1
    }
  },
  {
    id: "R_Pathway/label/name",
    type: "symbol",
    source: "epgis",
    "source-layer": "R_Pathway/label",
    minzoom: 16,
    layout: {
      visibility: "visible",
      "symbol-placement": "line",
      "symbol-spacing": 600,
      "text-field": "{_name}",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-letter-spacing": 0.2,
      "text-optional": true,
      "text-size": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        16,
        13,
        18,
        15
      ]
    },
    paint: {
      "text-color": "#6d7073",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1
    }
  },
  {
    id: "R_VillageRoad/label/name",
    type: "symbol",
    source: "epgis",
    "source-layer": "R_VillageRoad/label",
    minzoom: 15,
    layout: {
      visibility: "visible",
      "symbol-placement": "line",
      "symbol-spacing": 600,
      "text-field": "{_name}",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-letter-spacing": 0.2,
      "text-optional": true,
      "text-size": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        16,
        13,
        18,
        15
      ]
    },
    paint: {
      "text-color": "#6d7073",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1
    }
  },
  {
    id: "R_OrdinaryRoad/label/name",
    type: "symbol",
    source: "epgis",
    "source-layer": "R_OrdinaryRoad/label",
    minzoom: 15,
    layout: {
      visibility: "visible",
      "symbol-placement": "line",
      "symbol-spacing": 600,
      "text-field": "{_name}",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-letter-spacing": 0.2,
      "text-optional": true,
      "text-size": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        15,
        12,
        16,
        13,
        17,
        15,
        18,
        16
      ]
    },
    paint: {
      "text-color": "#6d7073",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1
    }
  },
  {
    id: "R_SecondaryRoad/label/name",
    type: "symbol",
    source: "epgis",
    "source-layer": "R_SecondaryRoad/label",
    minzoom: 14,
    layout: {
      visibility: "visible",
      "symbol-placement": "line",
      "symbol-spacing": 600,
      "text-field": "{_name}",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-letter-spacing": 0.2,
      "text-optional": true,
      "text-size": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        12,
        12,
        14,
        13,
        16,
        15,
        18,
        18
      ]
    },
    paint: {
      "text-color": "#6d7073",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1
    }
  },
  {
    id: "R_TownshipRoad/label/name",
    type: "symbol",
    source: "epgis",
    "source-layer": "R_TownshipRoad/label",
    minzoom: 14,
    layout: {
      visibility: "visible",
      "symbol-placement": "line",
      "symbol-spacing": 600,
      "text-field": "{_name}",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-letter-spacing": 0.2,
      "text-optional": true,
      "text-size": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        15,
        12,
        16,
        13,
        17,
        15,
        18,
        16
      ]
    },
    paint: {
      "text-color": "#6d7073",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1
    }
  },
  {
    id: "R_CountyRoad/label/name",
    type: "symbol",
    source: "epgis",
    "source-layer": "R_CountyRoad/label",
    filter: [
      "==",
      "_label_class",
      0
    ],
    minzoom: 14,
    layout: {
      visibility: "visible",
      "symbol-placement": "line",
      "symbol-spacing": 600,
      "text-field": "{_name}",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-letter-spacing": 0.2,
      "text-optional": true,
      "text-size": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        12,
        12,
        14,
        13,
        16,
        15,
        18,
        18
      ]
    },
    paint: {
      "text-color": "#6d7073",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1
    }
  },
  {
    id: "R_CountyRoad/label/RouteNO",
    type: "symbol",
    source: "epgis",
    "source-layer": "R_CountyRoad/label",
    filter: [
      "==",
      "_label_class",
      1
    ],
    minzoom: 12,
    layout: {
      visibility: "visible",
      "symbol-placement": "point",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-size": 10,
      "symbol-spacing": 600,
      "text-field": "{_name}",
      "icon-image": "icons_28_15_150",
      "icon-text-fit": "both",
      "icon-text-fit-padding": [
        9,
        4.5,
        6.5,
        4.5
      ],
      "icon-rotation-alignment": "viewport",
      "text-rotation-alignment": "viewport",
      "text-optional": true
    },
    paint: {
      "text-color": "#4a4a4a",
      "text-halo-color": "#4a4a4a",
      "text-halo-width": 0
    }
  },
  {
    id: "R_PrimaryRoad/label/name",
    type: "symbol",
    source: "epgis",
    "source-layer": "R_PrimaryRoad/label",
    minzoom: 13,
    layout: {
      visibility: "visible",
      "symbol-placement": "line",
      "symbol-spacing": 600,
      "text-field": "{_name}",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-letter-spacing": 0.2,
      "text-optional": true,
      "text-size": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        13,
        14,
        16,
        15,
        18,
        18
      ]
    },
    paint: {
      "text-color": "#827a70",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1
    }
  },
  {
    id: "R_ProvincialRoad/label/name",
    type: "symbol",
    source: "epgis",
    "source-layer": "R_ProvincialRoad/label",
    filter: [
      "==",
      "_label_class",
      0
    ],
    minzoom: 12,
    layout: {
      visibility: "visible",
      "symbol-placement": "line",
      "symbol-spacing": 600,
      "text-field": "{_name}",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-letter-spacing": 0.2,
      "text-optional": true,
      "text-size": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        13,
        14,
        16,
        15,
        18,
        18
      ]
    },
    paint: {
      "text-color": "#827a70",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1
    }
  },
  {
    id: "R_ProvincialRoad/label/RouteNO",
    type: "symbol",
    source: "epgis",
    "source-layer": "R_ProvincialRoad/label",
    filter: [
      "==",
      "_label_class",
      1
    ],
    minzoom: 11,
    layout: {
      visibility: "visible",
      "symbol-placement": "point",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-size": 10,
      "symbol-spacing": 600,
      "text-field": "{_name}",
      "icon-image": "icons_28_15_149",
      "icon-text-fit": "both",
      "icon-text-fit-padding": [
        9,
        4.5,
        6.5,
        4.5
      ],
      "icon-rotation-alignment": "viewport",
      "text-rotation-alignment": "viewport",
      "text-optional": true
    },
    paint: {
      "text-color": "#4a4a4a",
      "text-halo-color": "#4a4a4a",
      "text-halo-width": 0
    }
  },
  {
    id: "R_NationalRoad/label/RouteNO",
    type: "symbol",
    source: "epgis",
    "source-layer": "R_NationalRoad/label",
    filter: [
      "==",
      "_label_class",
      0
    ],
    minzoom: 9,
    layout: {
      visibility: "visible",
      "symbol-placement": "point",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-size": 10,
      "symbol-spacing": 600,
      "text-field": "{_name}",
      "icon-image": "icons_28_15_148",
      "icon-text-fit": "both",
      "icon-text-fit-padding": [
        9,
        4.5,
        6.5,
        4.5
      ],
      "icon-rotation-alignment": "viewport",
      "text-rotation-alignment": "viewport",
      "text-optional": true
    },
    paint: {
      "text-color": "#FFFFFF",
      "text-halo-color": "#ffffff",
      "text-halo-width": 0
    }
  },
  {
    id: "R_NationalRoad/label/name",
    type: "symbol",
    source: "epgis",
    "source-layer": "R_NationalRoad/label",
    filter: [
      "==",
      "_label_class",
      1
    ],
    minzoom: 12,
    layout: {
      visibility: "visible",
      "symbol-placement": "line",
      "symbol-spacing": 600,
      "text-field": "{_name}",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-letter-spacing": 0.2,
      "text-optional": true,
      "text-size": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        12,
        11,
        13,
        13,
        14,
        16,
        15,
        18,
        20
      ]
    },
    paint: {
      "text-color": "#606066",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1
    }
  },
  {
    id: "R_UrbanHighway/label/name",
    type: "symbol",
    source: "epgis",
    "source-layer": "R_UrbanHighway/label",
    minzoom: 12,
    layout: {
      visibility: "visible",
      "symbol-placement": "line",
      "symbol-spacing": 600,
      "text-field": "{_name}",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-letter-spacing": 0.2,
      "text-optional": true,
      "text-size": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        12,
        11,
        13,
        13,
        14,
        16,
        15,
        18,
        20
      ]
    },
    paint: {
      "text-color": "#606066",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1
    }
  },
  {
    id: "R_ExpressWay/label/RouteNO",
    type: "symbol",
    source: "epgis",
    "source-layer": "R_ExpressWay/label",
    filter: [
      "all",
      [
        "==",
        "_label_class",
        0
      ],
      [
        "==",
        "$type",
        "Point"
      ]
    ],
    minzoom: 8,
    layout: {
      visibility: "visible",
      "symbol-placement": "point",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-size": 10,
      "symbol-spacing": 600,
      "text-field": "{_name}",
      "icon-image": "icons_28_15_146",
      "icon-text-fit": "both",
      "icon-text-fit-padding": [
        9,
        4.5,
        6.5,
        4.5
      ],
      "icon-rotation-alignment": "viewport",
      "text-rotation-alignment": "viewport",
      "text-optional": true
    },
    paint: {
      "text-color": "#FFFFFF",
      "text-halo-color": "#ffffff",
      "text-halo-width": 0
    }
  },
  {
    id: "R_ExpressWay/label/name",
    type: "symbol",
    source: "epgis",
    "source-layer": "R_ExpressWay/label",
    filter: [
      "==",
      "_label_class",
      1
    ],
    minzoom: 12,
    layout: {
      visibility: "visible",
      "symbol-placement": "line",
      "symbol-spacing": 600,
      "text-field": "{_name}",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-letter-spacing": 0.2,
      "text-optional": true,
      "text-size": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        10,
        12,
        11,
        13,
        13,
        14,
        16,
        15,
        18,
        20
      ]
    },
    paint: {
      "text-color": "#606066",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1
    }
  },
  {
    id: "SubwayLine/label/label",
    type: "symbol",
    source: "epgis",
    "source-layer": "SubwayLine/label",
    minzoom: 13,
    layout: {
      visibility: "visible",
      "symbol-placement": "line",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-size": 12,
      "text-field": "{_name}",
      "text-optional": true
    },
    paint: {
      "text-color": [
        "get",
        "UI_COLOR"
      ],
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1
    }
  },
  {
    id: "Village",
    type: "symbol",
    source: "epgis",
    "source-layer": "Village",
    minzoom: 13,
    layout: {
      visibility: "visible",
      "text-size": 12,
      "text-field": "{_name}",
      "text-anchor": "center",
      "icon-anchor": "center",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-max-width": 8,
      "text-justify": "center",
      "icon-allow-overlap": false,
      "text-allow-overlap": false
    },
    paint: {
      "text-color": "#a3a3a3",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1
    }
  },
  {
    id: "BuildingNO",
    type: "symbol",
    source: "epgis",
    "source-layer": "BuildingNO",
    minzoom: 17,
    layout: {
      visibility: "visible",
      "text-size": 12,
      "text-field": "{_name}",
      "text-anchor": "center",
      "icon-anchor": "center",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-max-width": 8,
      "text-justify": "center",
      "icon-allow-overlap": false,
      "text-allow-overlap": false
    },
    paint: {
      "text-color": "#a3a3a3",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1
    }
  },
  {
    id: "POI7",
    type: "symbol",
    source: "epgis",
    "source-layer": "POI7",
    minzoom: 18,
    layout: {
      visibility: "visible",
      "icon-image": "{icon}",
      "icon-size": 0.9,
      "text-size": 12,
      "text-field": "{_name}",
      "text-anchor": "left",
      "icon-anchor": "bottom",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-max-width": 8,
      "text-justify": "left",
      "text-offset": [
        1,
        -1
      ],
      "icon-allow-overlap": false,
      "text-allow-overlap": false
    },
    paint: {
      "text-color": "#696464",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1
    }
  },
  {
    id: "POI6",
    type: "symbol",
    source: "epgis",
    "source-layer": "POI6",
    minzoom: 17,
    layout: {
      visibility: "visible",
      "icon-image": "{icon}",
      "icon-size": 0.9,
      "text-size": 12,
      "text-field": "{_name}",
      "text-anchor": "left",
      "icon-anchor": "bottom",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-max-width": 8,
      "text-justify": "left",
      "text-offset": [
        1,
        -1
      ],
      "icon-allow-overlap": false,
      "text-allow-overlap": false
    },
    paint: {
      "text-color": "#696464",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1
    }
  },
  {
    id: "POI5",
    type: "symbol",
    source: "epgis",
    "source-layer": "POI5",
    minzoom: 16,
    layout: {
      visibility: "visible",
      "icon-image": "{icon}",
      "icon-size": 0.9,
      "text-size": 12,
      "text-field": "{_name}",
      "text-anchor": "left",
      "icon-anchor": "bottom",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-max-width": 8,
      "text-justify": "left",
      "text-offset": [
        1,
        -1
      ],
      "icon-allow-overlap": false,
      "text-allow-overlap": false
    },
    paint: {
      "text-color": "#696464",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1
    }
  },
  {
    id: "POI4",
    type: "symbol",
    source: "epgis",
    "source-layer": "POI4",
    minzoom: 15.5,
    layout: {
      visibility: "visible",
      "icon-image": "{icon}",
      "icon-size": 0.9,
      "text-size": 12,
      "text-field": "{_name}",
      "text-anchor": "left",
      "icon-anchor": "bottom",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-max-width": 8,
      "text-justify": "left",
      "text-offset": [
        1,
        -1
      ],
      "icon-allow-overlap": false,
      "text-allow-overlap": false
    },
    paint: {
      "text-color": "#696464",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1
    }
  },
  {
    id: "SubwayExit",
    type: "symbol",
    source: "epgis",
    "source-layer": "SubwayExit",
    minzoom: 15.5,
    layout: {
      visibility: "visible",
      "icon-image": "icons_28_15_152",
      "icon-size": 0.9,
      "text-size": 9,
      "text-field": "{_name}",
      "text-anchor": "center",
      "icon-anchor": "center",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-max-width": 8,
      "text-justify": "center",
      "text-allow-overlap": true
    },
    paint: {
      "text-color": "#2880e4",
      "text-halo-color": "#ffffff",
      "text-halo-width": 0.6
    }
  },
  {
    id: "POI3",
    type: "symbol",
    source: "epgis",
    "source-layer": "POI3",
    minzoom: 14.5,
    layout: {
      visibility: "visible",
      "icon-image": "{icon}",
      "icon-size": 0.9,
      "text-size": 12,
      "text-field": "{_name}",
      "text-anchor": "left",
      "icon-anchor": "bottom",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-max-width": 8,
      "text-justify": "left",
      "text-offset": [
        1,
        -1
      ],
      "icon-allow-overlap": false,
      "text-allow-overlap": false
    },
    paint: {
      "text-color": "#696464",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1
    }
  },
  {
    id: "POI2",
    type: "symbol",
    source: "epgis",
    "source-layer": "POI2",
    minzoom: 13,
    layout: {
      visibility: "visible",
      "icon-image": "{icon}",
      "icon-size": 0.9,
      "text-size": 12,
      "text-field": "{_name}",
      "text-anchor": "left",
      "icon-anchor": "bottom",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-max-width": 8,
      "text-justify": "left",
      "text-offset": [
        1,
        -1
      ],
      "icon-allow-overlap": false,
      "text-allow-overlap": false
    },
    paint: {
      "text-color": "#696464",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1
    }
  },
  {
    id: "POI1",
    type: "symbol",
    source: "epgis",
    "source-layer": "POI1",
    minzoom: 11,
    layout: {
      visibility: "visible",
      "icon-image": "{icon}",
      "icon-size": 0.9,
      "text-size": 12,
      "text-field": "{_name}",
      "text-anchor": "left",
      "icon-anchor": "bottom",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-max-width": 8,
      "text-justify": "left",
      "text-offset": [
        1,
        -1
      ],
      "icon-allow-overlap": false,
      "text-allow-overlap": false
    },
    paint: {
      "text-color": "#696464",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1
    }
  },
  {
    id: "Street",
    type: "symbol",
    source: "epgis",
    "source-layer": "Street",
    minzoom: 12,
    layout: {
      visibility: "visible",
      "text-size": 12,
      "text-field": "{_name}",
      "text-anchor": "center",
      "icon-anchor": "center",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-max-width": 8,
      "text-justify": "center",
      "icon-allow-overlap": false,
      "text-allow-overlap": false
    },
    paint: {
      "text-color": "#a3a3a3",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1
    }
  },
  {
    id: "Town",
    type: "symbol",
    source: "epgis",
    "source-layer": "Town",
    minzoom: 9.5,
    maxzoom: 11,
    layout: {
      visibility: "visible",
      "text-size": 12,
      "text-field": "{_name}",
      "text-anchor": "center",
      "icon-anchor": "center",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-max-width": 8,
      "text-justify": "center",
      "icon-allow-overlap": false,
      "text-allow-overlap": false
    },
    paint: {
      "text-color": "#a3a3a3",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1
    }
  },
  {
    id: "SubwayStation",
    type: "symbol",
    source: "epgis",
    "source-layer": "SubwayStation",
    minzoom: 13,
    layout: {
      visibility: "visible",
      "icon-image": "{icon}",
      "icon-size": 0.9,
      "text-size": 13,
      "text-field": "{_name}",
      "text-anchor": "left",
      "icon-anchor": "center",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-max-width": 8,
      "text-justify": "left",
      "text-offset": [
        1,
        0
      ],
      "icon-allow-overlap": false,
      "text-allow-overlap": false
    },
    paint: {
      "icon-color": "#006691",
      "text-color": "#62718a",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1
    }
  },
  {
    id: "Government",
    type: "symbol",
    source: "epgis",
    "source-layer": "Government",
    minzoom: 11.5,
    layout: {
      visibility: "visible",
      "icon-image": "icons_28_15_105",
      "icon-size": 0.9,
      "text-size": 12,
      "text-field": "{_name}",
      "text-anchor": "left",
      "icon-anchor": "bottom",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-max-width": 8,
      "text-justify": "left",
      "text-offset": [
        1,
        -1
      ],
      "icon-allow-overlap": false,
      "text-allow-overlap": false
    },
    paint: {
      "text-color": "#62718a",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1
    }
  },
  {
    id: "Airport",
    type: "symbol",
    source: "epgis",
    "source-layer": "Airport",
    minzoom: 10,
    layout: {
      visibility: "visible",
      "icon-image": "icons_28_15_53",
      "icon-size": 0.9,
      "text-size": 12,
      "text-field": "{_name}",
      "text-anchor": "left",
      "icon-anchor": "bottom",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-max-width": 8,
      "text-justify": "left",
      "text-offset": [
        1,
        -1
      ],
      "icon-allow-overlap": false,
      "text-allow-overlap": false
    },
    paint: {
      "text-color": "#3a5c9e",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1
    }
  },
  {
    id: "County",
    type: "symbol",
    source: "epgis",
    "source-layer": "County",
    minzoom: 8,
    maxzoom: 11.5,
    layout: {
      visibility: "visible",
      "text-size": 12,
      "text-field": "{_name}",
      "text-anchor": "center",
      "icon-anchor": "center",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-max-width": 8,
      "text-justify": "center",
      "icon-allow-overlap": false,
      "text-allow-overlap": false
    },
    paint: {
      "icon-color": "#1C0082",
      "text-color": "#555555",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1
    }
  },
  {
    id: "City",
    type: "symbol",
    source: "epgis",
    "source-layer": "City",
    minzoom: 5,
    maxzoom: 10,
    layout: {
      visibility: "visible",
      "icon-image": "{icon}",
      "icon-size": 0.8,
      "text-size": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        5,
        11,
        7,
        13,
        10,
        15
      ],
      "text-field": "{_name}",
      "text-anchor": "left",
      "icon-anchor": "center",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-max-width": 8,
      "text-justify": "left",
      "text-offset": [
        0.5,
        0
      ],
      "icon-allow-overlap": false,
      "text-allow-overlap": false
    },
    paint: {
      "text-color": "#3C3C3C",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1
    }
  },
  {
    id: "ProvincialCapital2",
    type: "symbol",
    source: "epgis",
    "source-layer": "ProvincialCapital",
    minzoom: 4,
    maxzoom: 10,
    filter: [
      "in",
      "_name",
      "\u6FB3\u95E8"
    ],
    layout: {
      visibility: "visible",
      "icon-image": "icons_28_15_3",
      "icon-size": 0.9,
      "text-size": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        5,
        11,
        7,
        13,
        10,
        15
      ],
      "text-field": "{_name}",
      "text-anchor": "right",
      "icon-anchor": "center",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-max-width": 8,
      "text-justify": "left",
      "text-offset": [
        -0.7,
        0
      ],
      "icon-allow-overlap": true,
      "text-allow-overlap": true
    },
    paint: {
      "text-color": "#252525",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1
    }
  },
  {
    id: "ProvincialCapital",
    type: "symbol",
    source: "epgis",
    "source-layer": "ProvincialCapital",
    minzoom: 4,
    maxzoom: 10,
    filter: [
      "!in",
      "_name",
      "\u6FB3\u95E8"
    ],
    layout: {
      visibility: "visible",
      "icon-image": "icons_28_15_3",
      "icon-size": 0.9,
      "text-size": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        5,
        11,
        7,
        13,
        10,
        15
      ],
      "text-field": "{_name}",
      "text-anchor": "left",
      "icon-anchor": "center",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-max-width": 8,
      "text-justify": "left",
      "text-offset": [
        0.7,
        0
      ],
      "icon-allow-overlap": true,
      "text-allow-overlap": true
    },
    paint: {
      "text-color": "#252525",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1
    }
  },
  {
    id: "Ociean",
    type: "symbol",
    source: "epgis",
    "source-layer": "Ociean",
    minzoom: 3,
    layout: {
      visibility: "visible",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-size": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        4,
        10,
        8,
        13
      ],
      "text-anchor": "center",
      "text-field": "{_name}",
      "text-optional": true
    },
    paint: {
      "text-color": "#2e68c1",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1.6
    }
  },
  {
    id: "Nation",
    type: "symbol",
    source: "epgis",
    "source-layer": "Nation",
    minzoom: 2,
    maxzoom: 3,
    layout: {
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-size": 16,
      "text-anchor": "center",
      "text-field": "{_name}",
      "text-optional": true
    },
    paint: {
      "text-color": "#FF0000",
      "text-halo-color": "#FFFFFF",
      "text-halo-width": 1.6
    }
  },
  {
    id: "Capital",
    type: "symbol",
    source: "epgis",
    "source-layer": "Capital",
    minzoom: 3,
    maxzoom: 10,
    layout: {
      "icon-image": "icons_28_15_2",
      "icon-size": 0.9,
      "text-size": [
        "interpolate",
        [
          "linear"
        ],
        [
          "zoom"
        ],
        4,
        12,
        8,
        14
      ],
      "text-field": "{_name}",
      "text-anchor": "left",
      "icon-anchor": "center",
      "text-font": [
        "Microsoft YaHei Regular"
      ],
      "text-max-width": 8,
      "text-justify": "left",
      "text-offset": [
        0.7,
        0
      ],
      "icon-allow-overlap": false,
      "text-allow-overlap": false
    },
    paint: {
      "text-color": "#252525",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1
    }
  }
];
const id = "Streets.zvLK";
const streets = {
  version,
  sprite,
  glyphs,
  sources,
  layers,
  id
};
const SGMap = window.SGMap;
const TURF = window.turf;
let gyMapResultObj = {};
const gySjmapInit = (type) => {
  type = type || "";
  if (type && gyMapResultObj[type]) {
    return gyMapResultObj[type];
  }
  const getRightZoom = (zoom) => {
    return Math.max(mapOpt.minZoom, Math.min(Number(zoom || 0), mapOpt.maxZoom));
  };
  const formatOpt = () => {
    mapOpt.minZoom = Math.max(1, mapOpt.minZoom);
    mapOpt.maxZoom = Math.min(18, mapOpt.maxZoom);
    mapOpt.zoom = getRightZoom(mapOpt.zoom);
  };
  let map = ref(null);
  let mapOpt = {
    key: "",
    sn: "",
    centerPoint: [116.40531, 39.896884],
    minZoom: 1,
    maxZoom: 20,
    zoom: 16,
    extent: [],
    scrollZoom: true,
    dragRotate: false,
    dragPan: true,
    keyboard: false,
    doubleClickZoom: true,
    bearing: 0,
    pitch: 0,
    styleType: 0,
    localIdeographFontFamily: "Microsoft YoHei"
  };
  let contentId = "";
  let mapFinish = ref(false);
  const init = (id2, opt) => {
    if (!id2) {
      console.error(`not find ${id2}`);
      return;
    }
    initOptions(id2, opt);
    initMap();
  };
  let initOptions = (id2, opt) => {
    contentId = id2;
    mapOpt = Object.assign({}, mapOpt, opt);
    formatOpt();
    let extent = mapOpt.extent || void 0;
    if (extent) {
      let lonlat1 = extent[0];
      let lonlat2 = extent[1];
      if (lonlat1 && lonlat2) {
        mapOpt.extent = new SGMap.LngLatBounds(lonlat1, lonlat2);
      } else {
        mapOpt.extent = void 0;
      }
    }
  };
  const getStyleType = () => {
    if (typeof mapOpt.styleType === "object") {
      let keys = Object.keys(mapOpt.styleType);
      keys.forEach((key) => {
        let obj = streets.layers.find((v) => v.id === key);
        if (obj) {
          obj.paint = Object.assign(obj.paint, mapOpt.styleType[key]);
          if (obj.paint.visibility) {
            obj.layout = {
              "visibility": obj.paint.visibility
            };
            delete obj.paint.visibility;
          }
        }
      });
      return streets;
    } else {
      let styleArr = [
        "aegis://styles/aegis/Streets",
        "aegis://styles/aegis/Satellite512"
      ];
      return styleArr[mapOpt.styleType] || "aegis://styles/aegis/Streets";
    }
  };
  const initMap = () => {
    if (!(mapOpt.key && mapOpt.sn)) {
      alert("\u8BF7\u6DFB\u52A0\u5730\u56FE\u4F60\u7533\u8BF7\u7684appKey\u4E0E\u4F60\u7533\u8BF7\u7684appSecret\uFF01");
      return;
    }
    SGMap.tokenTask.login(mapOpt.key, mapOpt.sn).then(function() {
      map.value = new SGMap.Map({
        container: contentId,
        style: getStyleType(),
        pitch: mapOpt.pitch,
        bearing: mapOpt.bearing,
        zoom: mapOpt.zoom,
        minZoom: mapOpt.minZoom,
        maxZoom: mapOpt.maxZoom,
        center: mapOpt.centerPoint,
        localIdeographFontFamily: mapOpt.localIdeographFontFamily,
        maxBounds: mapOpt.extent,
        scrollZoom: mapOpt.scrollZoom,
        dragPan: mapOpt.dragPan,
        keyboard: mapOpt.keyboard,
        doubleClickZoom: mapOpt.doubleClickZoom
      });
      map.value.on("load", function() {
        mapFinish.value = true;
      });
    });
  };
  const addLayerIndex = () => {
    layerIndex.value = layerIndex.value + 1;
  };
  const setMapMediaArr = (src) => {
    mapMediaArr.value.push(src);
  };
  const destory = () => {
    map.value && map.value.remove();
    map.value = null;
    delete gyMapResultObj[type];
  };
  const layerIndex = ref(0);
  const mapMediaArr = ref([]);
  let result = ref({
    contentId: type,
    map,
    mapFinish,
    init,
    layerIndex,
    getStyleType,
    addLayerIndex,
    mapMediaArr,
    setMapMediaArr,
    destory
  });
  gyMapResultObj[type] = result;
  return result;
};
const gySjmap = (type) => {
  if (gyMapResultObj[type]) {
    return gyMapResultObj[type];
  }
  return gySjmapInit.call(void 0, type);
};
const gySjMap = gySjmap;
let install = (Vue) => {
  if (!install.installed) {
    const _components = Object.keys(components).map(
      (key) => components[key]
    );
    _components.forEach((component) => {
      if ((component.hasOwnProperty("name") || component.hasOwnProperty("__name")) && component.hasOwnProperty("setup")) {
        Vue.component(component.name || component.__name, component);
      }
    });
  }
};
const index = {
  install
};
export {
  GySjmap,
  GySjmapCircle,
  GySjmapDraw,
  GySjmapHeat,
  GySjmapHtml,
  GySjmapImage,
  GySjmapLine,
  GySjmapLonlat,
  GySjmapPolygon,
  GySjmapTask,
  GySjmapText,
  SGMap,
  TURF,
  index as default,
  gySjMap,
  install
};

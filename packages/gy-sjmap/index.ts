import * as components from './components'
import gySjMap, {SGMap, TURF} from './hooks/gySjMap'
import type {App} from 'vue-demi'

let install:any = (Vue:App):void => {
  if (!install.installed) {
    const _components = Object.keys(components).map(
      (key) => components[key as keyof typeof components]
    );
    _components.forEach((component:any) => {
      if (
        (component.hasOwnProperty('name') ||
          component.hasOwnProperty('__name')) &&
        component.hasOwnProperty('setup')
      ) {
        Vue.component(component.name || component.__name, component);
      }
    });
  }
}

export default {
  install
}
export type {gySjmapType, MapOptType} from './hooks/gySjMap'
//引用组件
import {GySjmap} from './components/GySjmap';
import {GySjmapText} from './components/GySjmapText';
import {GySjmapCircle} from './components/GySjmapCircle';
import {GySjmapImage} from './components/GySjmapImage';
import {GySjmapHtml} from './components/GySjmapHtml';
import {GySjmapLine} from './components/GySjmapLine';
import {GySjmapPolygon} from './components/GySjmapPolygon';
import {GySjmapTask} from './components/GySjmapTask';
import {GySjmapDraw} from './components/GySjmapDraw';
import {GySjmapHeat} from './components/GySjmapHeat';
import {GySjmapLonlat} from './components/GySjmapLonlat';
import {GySjmapPlaceSearch} from './components/GySjmapPlaceSearch';

export {
  SGMap,
  TURF,
  install,

  gySjMap,
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
  GySjmapLonlat,
  GySjmapPlaceSearch,
}


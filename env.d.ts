/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}


declare module 'gy-sjmap'
declare module 'gy-ui'
declare module 'vue3-hljs'
declare module 'theme'

type LeftMenuItem = {
  name: string;
  path: string;
};
type LeftMenuGroup = {
  title: string;
  items: LeftMenuItem[];
};

interface TableData {
  shuxing?: string;    //属性
  shuoming?: string;   //说明
  leixing?: string;    //类型
  kexuan?: string;     //可选参数
  moren?: string | number | boolean;      //默认参数
}

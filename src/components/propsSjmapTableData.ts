const propsSjmapTableData = [
  {
    shuxing: 'minZoom',
    shuoming: '允许显示多边形的最小地图层级',
    leixing: 'number',
    kexuan: '1 - 20',
  },
  {
    shuxing: 'maxZoom',
    shuoming: '允许显示多边形的最大地图层级',
    leixing: 'number',
    kexuan: '1 - 20',
  },
];
export default propsSjmapTableData;

export const eventTableHeader = [
  {
    label: '事件名',
    prop: 'name',
  },
  {
    label: '说明',
    prop: 'shuoming',
  },
  {
    label: '回调参数',
    prop: 'params',
  },
]
export const eventTable = [
  {
    name: 'clickFun',
    shuoming: `
    点击事件
    `,
    params: `
    MapsEvent对象`,
  },
]

let newPath2 = "/ccmodel/newobj";
const centerPoint2 = [116.40531, 39.897184]
const filesName = 'newHome';
const objScale = 100;
let config = {
  startPoint: [116.40541, 39.896884],
  minDistance: 100,//放大缩小,100
  maxDistance: 100000,//放大缩小,3000
  minPolarAngle: Math.PI / 180 * 5,
  maxPolarAngle: Math.PI / 180 * 70,
  name: "ccModel",
  code: "ccModel",
  files: {
    newHome: [
    ],
  },//z是垂直向下
  objScale: { x: objScale, y: objScale, z: objScale },
  scene: {
    "out": {
      type: [filesName],
      camera: { x: 116.40541, y: 39.896884, z: 0, range: 1762.882842018815, tilt: 33.046121484260354, heading: 2.1577581606670435 },
      trans: []
    },
  }
}

export default config

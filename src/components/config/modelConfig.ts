let basePath = "/gyModel";
let config = {
  code: "ccModel",
  files: {
    house: [
      {
        path: basePath,
        file: "BiaoJiMoXing.FBX",
      },
    ],
  },
  scene: {
    "out": {
      type: ["house"],
      camera: {
        'position': {
          x:19.629739354291328,
          y:41.00541616484154,
          z:80.65063181505542,
        },
        "target": {
          x:0,
          y:0,
          z:0,
        }
      },
      trans: []
    },
  },
  objScale: {x: 0.1, y: 0.1, z: 0.1},
  basePath: basePath,
}

export default config;

export const maps = [
  "assets/tiles/map0.json",
  "assets/tiles/map1.json",
  "assets/tiles/map2.json",
  "assets/tiles/map0s.json",
  "assets/tiles/map1s.json",
  "assets/tiles/map1s2.json",
  "assets/tiles/map2s.json",
  "assets/tiles/map3.json",
  "assets/tiles/map4.json",
  "assets/tiles/map4s.json",
  "assets/tiles/map5.json",
  "assets/tiles/map5s.json",
  "assets/tiles/map5s2.json",
  "assets/tiles/map5s3.json",
  "assets/tiles/map5s4.json",
  "assets/tiles/map5s5.json",
  "assets/tiles/map5s6.json",
  "assets/tiles/map6.json",
  "assets/tiles/map6s.json",
  "assets/tiles/map7.json",
  "assets/tiles/map7s.json",
  "assets/tiles/map8.json",
  "assets/tiles/map8s.json",
];

export const collisionTilesGround = [
  7, 8, 12, 13, 14, 16, 17, 18, 26, 28, 29, 30, 34, 37, 40, 41, 42, 51, 56,
];

export const collisionTilesSpikes = [
  61, 62, 21, 22, 23, 33, 34, 35, 45, 46, 47, 56,
];

export const fruitGroups = {
  singleFruitPositions: [{ x: 0, y: 0 }],
  lineShortPositions: [
    { x: 0, y: 0 },
    { x: 32, y: 0 },
    { x: 64, y: 0 },
  ],
  linePositions: [
    { x: 0, y: 0 },
    { x: 32, y: 0 },
    { x: 64, y: 0 },
    { x: 96, y: 0 },
    { x: 128, y: 0 },
  ],

  lineLongPositions: [
    { x: 0, y: 0 },
    { x: 32, y: 0 },
    { x: 64, y: 0 },
    { x: 96, y: 0 },
    { x: 128, y: 0 },
    { x: 160, y: 0 },
    { x: 192, y: 0 },
    { x: 224, y: 0 },
    { x: 256, y: 0 },
    { x: 288, y: 0 },
  ],
  convexArcShortPositions: [
    { x: 0, y: 0 },
    { x: 32, y: -16 },
    { x: 64, y: 0 },
  ],

  convexArcPositions: [
    { x: 0, y: 0 },
    { x: 32, y: -16 },
    { x: 64, y: -24 },
    { x: 96, y: -16 },
    { x: 128, y: 0 },
  ],

  convexArcLongPositions: [
    { x: 0, y: 0 },
    { x: 32, y: -16 },
    { x: 64, y: -32 },
    { x: 96, y: -48 },
    { x: 128, y: -56 },
    { x: 160, y: -48 },
    { x: 192, y: -32 },
    { x: 224, y: -16 },
    { x: 256, y: 0 },
  ],

  convexSemiArcPositions: [
    { x: 0, y: 0 },
    { x: 32, y: -16 },
    { x: 64, y: -24 },
    { x: 96, y: -24 },
  ],

  convexSemiArcLongPositions: [
    { x: 0, y: 0 },
    { x: 32, y: -16 },
    { x: 64, y: -32 },
    { x: 96, y: -48 },
    { x: 128, y: -56 },
    { x: 160, y: -56 },
  ],

  concaveSemiArcLongPositions: [
    { x: 0, y: +8 },
    { x: 32, y: +8 },
    { x: 64, y: +16 },
    { x: 96, y: +32 },
    { x: 128, y: +48 },
    { x: 160, y: +64 },
  ],
};

//each index matches de index of maps property in Map class
export const fruitPositions = [
  //MAP0
  [
    { col: 10, row: 9, type: fruitGroups.lineLongPositions },
    { col: 30, row: 9, type: fruitGroups.lineLongPositions },
    { col: 50, row: 9, type: fruitGroups.lineLongPositions },
    { col: 70, row: 9, type: fruitGroups.lineLongPositions },
  ],
  //MAP1
  [
    { col: 17, row: 8, type: fruitGroups.linePositions },
    { col: 27, row: 9, type: fruitGroups.linePositions },
    { col: 37, row: 8, type: fruitGroups.linePositions },
    { col: 47, row: 9, type: fruitGroups.linePositions },
    { col: 57, row: 8, type: fruitGroups.linePositions },
  ],
  //MAP2
  [
    { col: 14, row: 8, type: fruitGroups.lineShortPositions },
    { col: 18, row: 7, type: fruitGroups.lineShortPositions },
    { col: 23, row: 6, type: fruitGroups.lineShortPositions },
    { col: 28, row: 7, type: fruitGroups.lineShortPositions },
    { col: 32, row: 8, type: fruitGroups.lineShortPositions },
    { col: 38, row: 9, type: fruitGroups.linePositions },
    { col: 46, row: 8, type: fruitGroups.lineShortPositions },
    { col: 50, row: 7, type: fruitGroups.lineShortPositions },
    { col: 55, row: 6, type: fruitGroups.lineShortPositions },
    { col: 59, row: 7, type: fruitGroups.lineShortPositions },
    { col: 63, row: 8, type: fruitGroups.lineShortPositions },
  ],
  //MAP0S
  [
    { col: 20, row: 9, type: fruitGroups.lineLongPositions },
    { col: 40, row: 9, type: fruitGroups.lineLongPositions },
    { col: 60, row: 9, type: fruitGroups.lineLongPositions },
  ],
  //MAP1S
  [
    { col: 15, row: 8, type: fruitGroups.lineLongPositions },
    { col: 29, row: 9, type: fruitGroups.singleFruitPositions },
    { col: 30, row: 9, type: fruitGroups.singleFruitPositions },
    { col: 35, row: 8, type: fruitGroups.lineLongPositions },
    { col: 49, row: 9, type: fruitGroups.singleFruitPositions },
    { col: 50, row: 9, type: fruitGroups.singleFruitPositions },
    { col: 55, row: 8, type: fruitGroups.lineLongPositions },
  ],
  //MAP1S2
  [
    { col: 17, row: 8, type: fruitGroups.convexArcPositions },
    { col: 37, row: 8, type: fruitGroups.convexArcPositions },
    { col: 57, row: 8, type: fruitGroups.convexArcPositions },
  ],
  //MAP2s
  [
    { col: 14, row: 8, type: fruitGroups.lineShortPositions },
    { col: 18, row: 7, type: fruitGroups.lineShortPositions },
    { col: 23, row: 6, type: fruitGroups.lineShortPositions },
    { col: 28, row: 7, type: fruitGroups.lineShortPositions },
    { col: 32, row: 8, type: fruitGroups.lineShortPositions },
    { col: 38, row: 9, type: fruitGroups.linePositions },
    { col: 46, row: 8, type: fruitGroups.lineShortPositions },
    { col: 50, row: 7, type: fruitGroups.lineShortPositions },
    { col: 55, row: 6, type: fruitGroups.lineShortPositions },
    { col: 59, row: 7, type: fruitGroups.lineShortPositions },
    { col: 63, row: 8, type: fruitGroups.lineShortPositions },
  ],
  //MAP3
  [
    { col: 14, row: 8, type: fruitGroups.lineShortPositions },
    { col: 18, row: 7, type: fruitGroups.lineShortPositions },
    { col: 22, row: 6, type: fruitGroups.lineShortPositions },
    { col: 26, row: 5, type: fruitGroups.lineShortPositions },
    { col: 30, row: 4, type: fruitGroups.lineShortPositions },
    { col: 34, row: 3, type: fruitGroups.lineShortPositions },
    { col: 39, row: 2, type: fruitGroups.lineShortPositions },
    { col: 44, row: 3, type: fruitGroups.lineShortPositions },
    { col: 48, row: 4, type: fruitGroups.lineShortPositions },
    { col: 52, row: 5, type: fruitGroups.lineShortPositions },
    { col: 56, row: 6, type: fruitGroups.lineShortPositions },
    { col: 60, row: 7, type: fruitGroups.lineShortPositions },
    { col: 64, row: 8, type: fruitGroups.lineShortPositions },
  ],
  //MAP4
  [
    { col: 2, row: 8, type: fruitGroups.lineLongPositions },
    { col: 18, row: 5, type: fruitGroups.lineLongPositions },
    { col: 18, row: 9, type: fruitGroups.lineLongPositions },
    { col: 35, row: 8, type: fruitGroups.lineLongPositions },
    { col: 52, row: 5, type: fruitGroups.lineLongPositions },
    { col: 52, row: 9, type: fruitGroups.lineLongPositions },
    { col: 68, row: 8, type: fruitGroups.lineLongPositions },
  ],
  //MAP4S
  [
    { col: 2, row: 8, type: fruitGroups.lineLongPositions },
    { col: 18, row: 5, type: fruitGroups.lineLongPositions },
    { col: 18, row: 9, type: fruitGroups.lineLongPositions },
    { col: 37.5, row: 8, type: fruitGroups.convexArcPositions },
    { col: 52, row: 5, type: fruitGroups.lineLongPositions },
    { col: 52, row: 9, type: fruitGroups.lineLongPositions },
    { col: 68, row: 8, type: fruitGroups.lineLongPositions },
  ],
  //MAP5
  [
    { col: 2, row: 8, type: fruitGroups.lineLongPositions },
    { col: 18, row: 6, type: fruitGroups.lineLongPositions },
    { col: 18, row: 9, type: fruitGroups.lineLongPositions },
    { col: 35, row: 8, type: fruitGroups.lineLongPositions },
    { col: 52, row: 6, type: fruitGroups.lineLongPositions },
    { col: 52, row: 9, type: fruitGroups.lineLongPositions },
    { col: 68, row: 8, type: fruitGroups.lineLongPositions },
  ],
  //MAP5S
  [
    { col: 2, row: 8, type: fruitGroups.lineLongPositions },
    { col: 16, row: 6, type: fruitGroups.singleFruitPositions },
    { col: 17, row: 6, type: fruitGroups.singleFruitPositions },
    { col: 18.5, row: 6, type: fruitGroups.convexArcLongPositions },
    { col: 28, row: 6, type: fruitGroups.singleFruitPositions },
    { col: 29, row: 6, type: fruitGroups.singleFruitPositions },
    { col: 18, row: 9, type: fruitGroups.lineLongPositions },
    { col: 35, row: 8, type: fruitGroups.lineLongPositions },
    { col: 50, row: 6, type: fruitGroups.singleFruitPositions },
    { col: 51, row: 6, type: fruitGroups.singleFruitPositions },
    { col: 52.5, row: 6, type: fruitGroups.convexArcLongPositions },
    { col: 62, row: 6, type: fruitGroups.singleFruitPositions },
    { col: 63, row: 6, type: fruitGroups.singleFruitPositions },
    { col: 52, row: 9, type: fruitGroups.lineLongPositions },
    { col: 68, row: 8, type: fruitGroups.lineLongPositions },
  ],
  //MAP5S2
  [
    { col: 2, row: 8, type: fruitGroups.lineLongPositions },
    { col: 16, row: 5, type: fruitGroups.singleFruitPositions },
    { col: 17, row: 5, type: fruitGroups.singleFruitPositions },
    { col: 18.5, row: 5, type: fruitGroups.convexArcLongPositions },
    { col: 28, row: 5, type: fruitGroups.singleFruitPositions },
    { col: 29, row: 5, type: fruitGroups.singleFruitPositions },
    { col: 20.5, row: 9, type: fruitGroups.linePositions },
    { col: 38.5, row: 5, type: fruitGroups.lineShortPositions },
    { col: 50, row: 5, type: fruitGroups.singleFruitPositions },
    { col: 51, row: 5, type: fruitGroups.singleFruitPositions },
    { col: 52.5, row: 5, type: fruitGroups.convexArcLongPositions },
    { col: 62, row: 5, type: fruitGroups.singleFruitPositions },
    { col: 63, row: 5, type: fruitGroups.singleFruitPositions },
    { col: 54.5, row: 9, type: fruitGroups.linePositions },
    { col: 68, row: 8, type: fruitGroups.lineLongPositions },
  ],
  //MAP5S3
  [
    { col: 2, row: 8, type: fruitGroups.lineLongPositions },
    { col: 16, row: 5, type: fruitGroups.singleFruitPositions },
    { col: 17, row: 5, type: fruitGroups.singleFruitPositions },
    { col: 18.5, row: 5, type: fruitGroups.convexArcLongPositions },
    { col: 28, row: 5, type: fruitGroups.singleFruitPositions },
    { col: 29, row: 5, type: fruitGroups.singleFruitPositions },
    { col: 20.5, row: 9, type: fruitGroups.linePositions },
    { col: 37, row: 5, type: fruitGroups.linePositions },
    { col: 50, row: 5, type: fruitGroups.singleFruitPositions },
    { col: 51, row: 5, type: fruitGroups.singleFruitPositions },
    { col: 52.5, row: 5, type: fruitGroups.convexArcLongPositions },
    { col: 62, row: 5, type: fruitGroups.singleFruitPositions },
    { col: 63, row: 5, type: fruitGroups.singleFruitPositions },
    { col: 54.5, row: 9, type: fruitGroups.linePositions },
    { col: 68, row: 8, type: fruitGroups.lineLongPositions },
  ],
  //MAP5S4
  [
    { col: 2, row: 8, type: fruitGroups.linePositions },
    { col: 14, row: 5, type: fruitGroups.linePositions },
    { col: 23.5, row: 4.5, type: fruitGroups.lineShortPositions },
    { col: 31, row: 5, type: fruitGroups.lineShortPositions },
    { col: 38, row: 5.5, type: fruitGroups.lineShortPositions },
    { col: 46, row: 5, type: fruitGroups.lineShortPositions },
    { col: 53.5, row: 4.5, type: fruitGroups.lineShortPositions },
    { col: 61, row: 5, type: fruitGroups.linePositions },
    { col: 74, row: 8, type: fruitGroups.linePositions },
  ],
  //MAP5S5
  [
    { col: 3, row: 8, type: fruitGroups.lineShortPositions },
    { col: 7, row: 7, type: fruitGroups.lineShortPositions },
    { col: 11, row: 6, type: fruitGroups.lineShortPositions },
    { col: 15, row: 5, type: fruitGroups.lineShortPositions },
    //
    { col: 20, row: 4, type: fruitGroups.linePositions },
    //
    { col: 26, row: 4, type: fruitGroups.concaveSemiArcLongPositions },
    ///////////
    { col: 43, row: 8, type: fruitGroups.lineShortPositions },
    { col: 47, row: 7, type: fruitGroups.lineShortPositions },
    { col: 51, row: 6, type: fruitGroups.lineShortPositions },
    { col: 55, row: 5, type: fruitGroups.lineShortPositions },
    //
    { col: 60, row: 4, type: fruitGroups.linePositions },
    //
    { col: 66, row: 4, type: fruitGroups.concaveSemiArcLongPositions },
  ],
  //MAP5S6
  [
    { col: 3, row: 8, type: fruitGroups.lineShortPositions },
    { col: 7, row: 7, type: fruitGroups.lineShortPositions },
    { col: 11, row: 6, type: fruitGroups.lineShortPositions },
    { col: 15, row: 5, type: fruitGroups.lineShortPositions },
    //
    { col: 19, row: 4, type: fruitGroups.linePositions },
    //
    { col: 24, row: 4, type: fruitGroups.concaveSemiArcLongPositions },
    ///////////
    { col: 43, row: 8, type: fruitGroups.lineShortPositions },
    { col: 47, row: 7, type: fruitGroups.lineShortPositions },
    { col: 51, row: 6, type: fruitGroups.lineShortPositions },
    { col: 55, row: 5, type: fruitGroups.lineShortPositions },
    //
    { col: 60, row: 4, type: fruitGroups.linePositions },
    //
    { col: 65, row: 4, type: fruitGroups.concaveSemiArcLongPositions },
  ],
  //MAP6
  [
    { col: 2, row: 8, type: fruitGroups.lineLongPositions },
    { col: 18, row: 6, type: fruitGroups.lineLongPositions },
    { col: 18, row: 9, type: fruitGroups.lineLongPositions },
    { col: 35, row: 5, type: fruitGroups.lineLongPositions },
    { col: 35, row: 8, type: fruitGroups.lineLongPositions },
    { col: 52, row: 6, type: fruitGroups.lineLongPositions },
    { col: 52, row: 9, type: fruitGroups.lineLongPositions },
    { col: 68, row: 8, type: fruitGroups.lineLongPositions },
  ],
  //MAP6S
  [
    { col: 2, row: 8, type: fruitGroups.lineLongPositions },
    { col: 18.5, row: 6, type: fruitGroups.convexArcLongPositions },
    { col: 18, row: 9, type: fruitGroups.lineLongPositions },
    { col: 37.5, row: 4.5, type: fruitGroups.convexArcPositions },
    { col: 35, row: 8, type: fruitGroups.lineLongPositions },
    { col: 52.5, row: 6, type: fruitGroups.convexArcLongPositions },
    { col: 52, row: 9, type: fruitGroups.lineLongPositions },
    { col: 68, row: 8, type: fruitGroups.lineLongPositions },
  ],
  //MAP7
  [
    { col: 20, row: 8, type: fruitGroups.singleFruitPositions },
    { col: 21, row: 8, type: fruitGroups.singleFruitPositions },
    { col: 23, row: 7, type: fruitGroups.singleFruitPositions },
    { col: 24, row: 7, type: fruitGroups.singleFruitPositions },
    { col: 26, row: 6, type: fruitGroups.singleFruitPositions },
    { col: 27, row: 6, type: fruitGroups.singleFruitPositions },
    { col: 29, row: 5, type: fruitGroups.singleFruitPositions },
    { col: 30, row: 5, type: fruitGroups.singleFruitPositions },
    { col: 32, row: 4, type: fruitGroups.singleFruitPositions },
    { col: 33, row: 4, type: fruitGroups.singleFruitPositions },
    { col: 35, row: 3, type: fruitGroups.singleFruitPositions },
    { col: 36, row: 3, type: fruitGroups.singleFruitPositions },
    { col: 38, row: 2, type: fruitGroups.lineShortPositions },
    { col: 42, row: 3, type: fruitGroups.singleFruitPositions },
    { col: 43, row: 3, type: fruitGroups.singleFruitPositions },
    { col: 45, row: 4, type: fruitGroups.singleFruitPositions },
    { col: 46, row: 4, type: fruitGroups.singleFruitPositions },
    { col: 48, row: 5, type: fruitGroups.singleFruitPositions },
    { col: 49, row: 5, type: fruitGroups.singleFruitPositions },
    { col: 51, row: 6, type: fruitGroups.singleFruitPositions },
    { col: 52, row: 6, type: fruitGroups.singleFruitPositions },
    { col: 54, row: 7, type: fruitGroups.singleFruitPositions },
    { col: 55, row: 7, type: fruitGroups.singleFruitPositions },
    { col: 57, row: 8, type: fruitGroups.singleFruitPositions },
    { col: 58, row: 8, type: fruitGroups.singleFruitPositions },
    { col: 65, row: 9, type: fruitGroups.convexSemiArcPositions },
  ],
  //MAP7S
  [
    { col: 3, row: 7, type: fruitGroups.convexSemiArcPositions },
    { col: 19, row: 4, type: fruitGroups.lineShortPositions },
    { col: 24, row: 5, type: fruitGroups.lineShortPositions },
    { col: 30, row: 6, type: fruitGroups.lineLongPositions },
    { col: 43, row: 5, type: fruitGroups.lineShortPositions },
    { col: 48, row: 4, type: fruitGroups.lineShortPositions },
    { col: 54, row: 3, type: fruitGroups.lineShortPositions },
    { col: 60, row: 4, type: fruitGroups.lineShortPositions },
    { col: 65, row: 5, type: fruitGroups.lineShortPositions },
    { col: 70, row: 6, type: fruitGroups.lineShortPositions },
    { col: 75, row: 7, type: fruitGroups.lineShortPositions },
  ],
  //MAP8
  [
    { col: 9, row: 7, type: fruitGroups.lineShortPositions },
    { col: 19, row: 7, type: fruitGroups.lineShortPositions },
    { col: 29, row: 7, type: fruitGroups.lineShortPositions },
    { col: 39, row: 7, type: fruitGroups.lineShortPositions },

    { col: 53.5, row: 8, type: fruitGroups.convexArcShortPositions },
    { col: 63.5, row: 8, type: fruitGroups.convexArcShortPositions },
    { col: 73.5, row: 8, type: fruitGroups.convexArcShortPositions },
  ],
  //MAP8S
  [
    { col: 3, row: 8, type: fruitGroups.convexSemiArcLongPositions },
    { col: 19, row: 6, type: fruitGroups.convexSemiArcLongPositions },
    { col: 26, row: 4, type: fruitGroups.concaveSemiArcLongPositions },
    { col: 35, row: 7, type: fruitGroups.convexSemiArcLongPositions },
    { col: 53.5, row: 8, type: fruitGroups.convexArcShortPositions },
    { col: 63.5, row: 8, type: fruitGroups.convexArcShortPositions },
    { col: 73.5, row: 8, type: fruitGroups.convexArcShortPositions },
  ],
];

//each index matches de index of maps property in Map class
export const monkeyPositions = [
  //MAP0
  [
    { col: 28, row: 0 },
    { col: 48, row: 0 },
    { col: 68, row: 0 },
  ],

  //MAP1
  [
    { col: 24, row: 0 },
    { col: 44, row: 0 },
    { col: 64, row: 0 },
  ],
  //MAP2
  [],
  //MAP0S
  [
    { col: 28, row: 0 },
    { col: 48, row: 0 },
    { col: 68, row: 0 },
  ],
  //MAP1S
  [
    { col: 24, row: 0 },
    { col: 44, row: 0 },
    { col: 64, row: 0 },
  ],
  //MAP1S2
  [],
  //MAP2S
  [{ col: 48, row: 0 }],
  //MAP3
  [
    { col: 11, row: 0 },
    { col: 78, row: 0 },
  ],
  //MAP4
  [{ col: 46, row: 0 }],
  //MAP4S
  [{ col: 76, row: 0 }],
  //MAP5
  [
    { col: 11, row: 0 },
    { col: 45, row: 0 },
    { col: 78, row: 0 },
  ],
  //MAP5S
  [],
  //MAP5S2
  [
    { col: 11, row: 0 },
    { col: 78, row: 0 },
  ],
  //MAP5S3
  [
    { col: 11, row: 0 },
    { col: 78, row: 0 },
  ],
  //MAP5S4
  [],
  //MAP5S5
  [],
  //MAP5S6
  [],
  //MAP6
  [
    { col: 28, row: 0 },
    { col: 62, row: 0 },
  ],
  //MAP6
  [
    { col: 11, row: 0 },
    { col: 76, row: 0 },
  ],
];

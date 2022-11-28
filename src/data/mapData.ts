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
  7, 8, 12, 13, 14, 16, 17, 18, 26, 28, 29, 30, 34, 37, 40, 41, 42, 51,
];

export const collisionTilesSpikes = [
  61, 62, 21, 22, 23, 33, 34, 35, 45, 46, 47, 56,
];

export const fruitGroups = {
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
    { x: 0, y: 0 },
    { x: 32, y: +8 },
    { x: 64, y: +16 },
    { x: 96, y: +32 },
    { x: 128, y: +48 },
    { x: 144, y: +80 },
  ],
};

//each index matches de index of maps property in Map class
export const fruitPositions = [
  [{ x: 192, y: 210, type: fruitGroups.lineLongPositions }],
  [{ x: 178, y: 200, type: fruitGroups.convexArcLongPositions }],
  [{ x: 300, y: 150, type: fruitGroups.convexArcPositions }],
  [{ x: 480, y: 32, type: fruitGroups.concaveSemiArcLongPositions }],
];

//each index matches de index of maps property in Map class
export const monkeyPositions = [
  [{ x: 576, y: 0 }],
  [{ x: 576, y: 0 }],
  [{ x: 576, y: 0 }],
  [{ x: 384, y: 0 }],
];

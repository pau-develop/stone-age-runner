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
  { x: 192, y: 210, type: fruitGroups.lineLongPositions },
  { x: 178, y: 200, type: fruitGroups.convexArcLongPositions },
  { x: 300, y: 150, type: fruitGroups.convexArcPositions },
  { x: 480, y: 32, type: fruitGroups.concaveSemiArcLongPositions },
];

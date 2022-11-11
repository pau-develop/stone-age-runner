import "phaser";

const config = {
  title: "Stone Age Runner",
  version: "0.0.1",
  pixelArt: true,
  type: Phaser.AUTO,
  backgroundColor: "#000",
  width: 640,
  height: 360,
  parent: "game-container",
};

const game = new Phaser.Game(config);

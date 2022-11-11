import "phaser";
import Stage from "./Stage";

const config = {
  title: "Stone Age Runner",
  version: "0.0.1",
  pixelArt: true,
  type: Phaser.AUTO,
  backgroundColor: "#000",
  width: 640,
  height: 360,
  parent: "game-container",
  scene: [Stage],
};

const game = new Phaser.Game(config);

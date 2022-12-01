import "phaser";
import Stage from "./scenes/Stage";
import Menu from "./scenes/Menu";

const config = {
  title: "Stone Age Runner",
  version: "0.0.1",
  pixelArt: true,
  type: Phaser.AUTO,
  backgroundColor: "#000",
  width: 640,
  height: 360,
  parent: "game-container",
  scene: [Menu, Stage],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 1000 },
    },
  },
};

const game = new Phaser.Game(config);

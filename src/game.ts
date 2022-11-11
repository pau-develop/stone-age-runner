import "phaser";

export default class Demo extends Phaser.Scene {
  constructor() {
    super("demo");
  }

  preload() {}

  create() {}
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#125555",
  width: 640,
  height: 360,
  scene: Demo,
};

const game = new Phaser.Game(config);

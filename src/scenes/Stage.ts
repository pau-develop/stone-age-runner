class Stage extends Phaser.Scene {
  hero;
  constructor() {
    super("Stage");
  }
  preload() {
    this.load.spritesheet("hero", "assets/hero/hero.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }
  create() {
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("hero", {
        start: 0,
        end: 11,
      }),
      frameRate: 25,
      repeat: -1,
    });
    this.hero = this.add.sprite(64, 160, "hero");
    this.hero.setOrigin(0, 0);
    this.hero.play("run");
  }
  update() {}
}

export default Stage;

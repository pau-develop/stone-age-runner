import Hero from "../classes/Hero";

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
    this.hero = new Hero(this, 64, 232, "hero");
    this.hero.play("run");
  }

  update() {
    if (this.hero.isAlive) {
      this.hero.moveHero();
    }
  }
}

export default Stage;

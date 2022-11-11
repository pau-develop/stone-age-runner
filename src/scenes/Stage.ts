import Hero from "../classes/Hero";

class Stage extends Phaser.Scene {
  hero;
  jump;
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
    this.jump = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  update() {
    this.hero.checkForCollision();
    this.hero.playAnimations();
    if (this.hero.isAlive) {
      this.hero.moveHero();
      this.getInput();
    }
  }

  getInput() {
    //TAP
    this.jump.on("down", () => {
      if (this.hero.body.blocked.down && this.hero.isAlive) {
        this.hero.jumpLimit = this.hero.y - 100;
        this.hero.body.velocity.y = this.hero.jumpForce;
        this.hero.isJumping = true;
        return;
      }
      if (!this.hero.body.blocked.down && !this.hero.doubleJumped) {
        this.hero.doubleJumped = true;
        this.hero.jumpLimit = this.hero.y - 100;
        this.hero.jumpForce = -200;
        this.hero.body.velocity.y = this.hero.jumpForce;
        this.hero.isJumping = true;
      }
    });
    //HOLD
    if (this.jump.isDown && this.hero.isJumping) {
      if (this.hero.y > this.hero.jumpLimit) {
        this.hero.body.velocity.y = this.hero.jumpForce;
        this.hero.jumpForce += 2;
      } else {
        this.hero.isJumping = false;
      }
    }
    //RELEASE
    this.jump.on("up", () => {
      this.hero.isJumping = false;
    });
  }
}

export default Stage;

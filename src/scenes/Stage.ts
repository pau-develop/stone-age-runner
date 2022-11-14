import Hero from "../classes/Hero";
import Map from "../classes/Map";
import Ui from "../classes/Ui";

class Stage extends Phaser.Scene {
  hero;
  jump;
  map;
  background;
  ui;
  fps;
  hasRestarted = false;

  constructor() {
    super("Stage");
  }
  preload() {
    this.load.bitmapFont("04b", "assets/font/04b.png", "assets/font/04b.xml");
    this.load.spritesheet("hero", "assets/hero/hero.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.image("tiles", "assets/tiles/tiles.png");
    this.map = new Map();
    this.map.maps.forEach((element, index) => {
      this.load.tilemapTiledJSON(`tilemap${index}`, element);
    });
    this.load.image("background", "assets/background/0.png");
  }
  create() {
    this.ui = new Ui(this, this.game);
    this.hero = new Hero(this, 64, 100, "hero");
    this.jump = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.map.instantiateMap(this.hero, this);

    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);
    this.background.setDepth(-50);
    this.background.setScrollFactor(0, 0);
    this.cameras.main.startFollow(this.hero, true, 1, 1, -192, 0);
    this.cameras.main.setBounds(0, 0, NaN, 360);
  }

  update() {
    this.ui.getFPS(this.game);
    this.hero.checkForCollision();
    this.hero.playAnimations();
    this.getInput();
    if (this.hero.isAlive) {
      this.map.shiftMaps(this.hero, this);
      this.hero.moveHero();
    } else if (!this.hero.isAlive) {
      if (!this.hero.justCrashed) {
        this.ui.displayDeathMessage(this);
        this.hero.body.velocity.y = 0;
        this.hero.justCrashed = true;
      }
      if (this.hero.bounceSpeed < 0) this.hero.bounceSpeed += 1;
      else this.hero.bounceSpeed = 0;
      this.hero.body.velocity.x = this.hero.bounceSpeed;
    }
  }

  getInput() {
    if (this.hero.isAlive) {
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
    } else {
      if (this.ui.die !== undefined) {
        this.jump.on("up", () => {
          if (!this.hasRestarted) {
            this.scene.restart();
            this.hasRestarted = true;
          }
        });
      }
    }
  }
}

export default Stage;

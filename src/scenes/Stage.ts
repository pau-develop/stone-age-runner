import Fruit from "../classes/Fruit";
import Hero from "../classes/Hero";
import Map from "../classes/Map";
import Monkey from "../classes/Monkey";
import Steam from "../classes/Steam";
import Ui from "../classes/Ui";

class Stage extends Phaser.Scene {
  monkey;
  hero;
  jump;
  map;
  background;
  ui;
  fps;
  hasRestarted: boolean;
  fruits;
  monkeyGroup = new Array(0);
  meters;
  constructor() {
    super("Stage");
  }
  preload() {
    this.monkeyGroup = new Array(0);
    this.load.spritesheet("monkey", "assets/monkey/monkey.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("fruits", "assets/collectibles/fruits.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("steam", "assets/hero/steam.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("bar-container", "assets/ui/bar-container.png");
    this.load.image("bar", "assets/ui/bar.png");
    this.load.bitmapFont("2p", "assets/font/2p.png", "assets/font/2p.xml");
    this.load.spritesheet("hero", "assets/hero/hero.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.image("tiles", "assets/tiles/tiles.png");
    this.map = new Map(this.cameras.main, this);
    this.map.maps.forEach((element, index) => {
      this.load.tilemapTiledJSON(`tilemap${index}`, element);
    });
    this.load.image("background", "assets/background/0.png");
  }
  init() {
    this.hasRestarted = false;
  }
  create() {
    this.ui = new Ui(this, this.game);
    this.hero = new Hero(this, 64, 100, "hero");
    this.monkeyGroup.push(
      new Monkey(this, 600, 100, "monkey", this.hero, this.map)
    );
    this.monkeyGroup.push(
      new Monkey(this, 728, 100, "monkey", this.hero, this.map)
    );
    this.jump = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.map.instantiateMap(this.hero, this.monkeyGroup, this);
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);
    this.background.setDepth(-50);
    this.background.setScrollFactor(0, 0);
    this.cameras.main.startFollow(this.hero, true, 1, 1, -192, 0);
    this.cameras.main.setBounds(0, 0, NaN, 360);
  }

  update() {
    this.meters = Math.round(this.cameras.main.scrollX / 64);
    this.ui.displayDistance(this.meters);
    this.ui.displayScore(this.hero.score);
    this.ui.getFPS(this.game);
    this.ui.controlBar(this.hero.heroEnergy);
    this.hero.checkForCollision();
    if (this.monkeyGroup.length > 0) {
      this.monkeyGroup.forEach((monkey) => {
        monkey.checkForCollision();
        monkey.checkBounds(this.cameras.main);
        monkey.playAnimations();
        monkey.moveMonkey();
      });
    }
    this.removeMonkeys();
    this.hero.checkEnergyStatus();
    this.hero.playAnimations();
    this.getInput();
    if (this.hero.isAlive) {
      this.map.shiftMaps(this.hero, this.monkeyGroup, this);
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

  removeMonkeys() {
    this.monkeyGroup = this.monkeyGroup.filter(
      (monkey) => !monkey.canBeRemoved
    );
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
          if (this.hero.doubleJumped && this.hero.heroEnergy > 0) {
            this.hero.consumeEnergyBar();
            this.hero.emitSteam();
          } else if (this.hero.doubleJumped && this.hero.heroEnergy <= 0)
            this.hero.isJumping = false;
        } else {
          this.hero.isJumping = false;
        }
      }
      //RELEASE
      this.jump.on("up", () => {
        this.hero.isJumping = false;
      });
    } else {
      this.jump.on("up", () => {
        if (
          !this.hasRestarted &&
          !this.hero.isAlive &&
          this.ui.die !== undefined
        ) {
          this.scene.restart();
          this.hasRestarted = true;
        }
      });
    }
  }
}

export default Stage;

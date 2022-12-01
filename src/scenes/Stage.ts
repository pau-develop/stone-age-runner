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
  accelerate;
  break;
  map;
  background;
  ui;
  fps;
  hasRestarted: boolean;
  fruits;
  monkeyGroup = new Array(0);
  meters;
  music;
  heroSounds = new Array();

  constructor() {
    super("Stage");
  }
  preload() {
    this.load.audio("step", "assets/fx/STEP1VOLUME.wav");
    this.load.audio("hit", "assets/fx/CRASH1.wav");
    this.load.audio("eat", "assets/fx/EAT2.wav");
    this.load.audio("jump", "assets/fx/JUMP2LLARG.wav");
    this.load.audio("track", "assets/music/TRACK.wav");
    this.load.audio("double-jump", "assets/fx/FART2.wav");
    this.load.audio("spikes", "assets/fx/SPIKES.wav");

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
    this.heroSounds.push(this.sound.add("step", { loop: false }));
    this.heroSounds.push(this.sound.add("hit", { loop: false }));
    this.heroSounds.push(this.sound.add("eat", { loop: false, volume: 0.2 }));
    this.heroSounds.push(this.sound.add("jump", { loop: false }));
    this.heroSounds.push(this.sound.add("double-jump", { loop: true }));
    this.heroSounds.push(this.sound.add("spikes", { loop: false })); //5
    this.map.getSound(this.heroSounds[2]);
    this.music = this.sound.add("track", { loop: true });
    this.music.play();

    this.ui = new Ui(this, this.game);
    this.hero = new Hero(this, -64, 200, "hero", this.heroSounds);

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
    ////

    this.monkeyGroup.forEach((monkey) => {
      this.map.scrollingMap.forEach((map) => {
        this.physics.add.collider(monkey, map.ground);
        map.spikes !== null && this.physics.add.collider(monkey, map.spikes);
      });
    });
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
        monkey.moveCharacter();
      });
    }
    this.removeMonkeys();
    this.hero.checkEnergyStatus();
    this.hero.playSounds();
    this.hero.playAnimations();
    this.getInput();
    if (this.hero.isAlive) {
      this.map.shiftMaps(this.hero, this.monkeyGroup, this);
      this.hero.moveCharacter();
    } else if (!this.hero.isAlive) {
      if (!this.hero.justCrashed) {
        this.ui.displayDeathMessage(this);
        this.hero.body.velocity.y = 0;
        this.hero.justCrashed = true;
      }
      if (!this.hero.isSpiked && !this.hero.isSpikedTop) {
        if (this.hero.bounceSpeed < 0) this.hero.bounceSpeed += 1;
        else this.hero.bounceSpeed = 0;
        this.hero.body.velocity.x = this.hero.bounceSpeed;
      }
    }
  }

  removeMonkeys() {
    this.monkeyGroup = this.monkeyGroup.filter(
      (monkey) => !monkey.canBeRemoved
    );
  }
  manageJump() {
    //TAP
    this.jump.on("down", () => {
      if (this.hero.body.blocked.down && this.hero.isAlive) {
        this.hero.jumpLimit = this.hero.y - 100;
        this.hero.body.velocity.y = this.hero.jumpForce;
        this.hero.isJumping = true;
        return;
      }
      if (
        !this.hero.body.blocked.down &&
        !this.hero.doubleJumped &&
        this.hero.heroEnergy > 0 &&
        this.hero.isAlive
      ) {
        this.hero.doubleJumped = true;
        this.hero.jumpLimit = this.hero.y - 100;
        this.hero.jumpForce = -200;
        this.hero.body.velocity.y = this.hero.jumpForce;
        this.hero.isJumping = true;
      }
    });
    //HOLD
    if (this.jump.isDown && this.hero.isJumping && !this.hero.isSpiked) {
      if (!this.hero.doubleJumped) {
        if (this.hero.y > this.hero.jumpLimit) {
          this.hero.body.velocity.y = this.hero.jumpForce;
          this.hero.jumpForce += 2;
        } else {
          this.hero.isJumping = false;
        }
      } else if (this.hero.doubleJumped) {
        if (this.hero.heroEnergy > 0) {
          this.hero.body.velocity.y = this.hero.doubleJumpForce;
          this.hero.consumeEnergyBar();
          this.hero.emitSteam();
        } else if (this.hero.heroEnergy <= 0) this.hero.isJumping = false;
      }
    }
    //RELEASE
    this.jump.on("up", () => {
      this.hero.isJumping = false;
      this.hero.doubleJumped = false;
    });
  }

  getInput() {
    if (this.hero.isAlive) {
      this.manageJump();
    }
    //UI CONTROLS
    else {
      this.jump.on("up", () => {
        if (
          !this.hasRestarted &&
          !this.hero.isAlive &&
          this.ui.die !== undefined
        ) {
          this.music.stop();

          this.scene.stop("Stage").start("Menu");
          this.hasRestarted = true;
        }
      });
    }
  }
}

export default Stage;

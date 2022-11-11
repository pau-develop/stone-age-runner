class Hero extends Phaser.Physics.Arcade.Sprite {
  isAlive = true;
  doubleJumped = false;
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.setOrigin(0, 0);
    this.init();
    this.createAnimations();
    this.play("run");
  }

  init() {
    this.body.setSize(32, 54);
    this.body.offset.y = 10;
    this.setCollideWorldBounds(true);
  }

  moveHero() {
    this.body.velocity.x = 200;
  }

  checkForCollision() {
    if (this.body.blocked.right) this.isAlive = false;
  }

  createAnimations() {
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("hero", {
        start: 0,
        end: 11,
      }),
      frameRate: 25,
      repeat: -1,
    });
    this.anims.create({
      key: "dash",
      frames: this.anims.generateFrameNumbers("hero", {
        start: 12,
        end: 26,
      }),
      frameRate: 25,
      repeat: -1,
    });
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("hero", {
        start: 27,
        end: 35,
      }),
      frameRate: 25,
      repeat: 0,
    });
    this.anims.create({
      key: "fall",
      frames: this.anims.generateFrameNumbers("hero", {
        start: 36,
        end: 37,
      }),
      frameRate: 25,
      repeat: 0,
    });
    this.anims.create({
      key: "land",
      frames: this.anims.generateFrameNumbers("hero", {
        start: 38,
        end: 42,
      }),
      frameRate: 25,
      repeat: 0,
    });
    this.anims.create({
      key: "crash",
      frames: this.anims.generateFrameNumbers("hero", {
        start: 43,
        end: 52,
      }),
      frameRate: 25,
      repeat: 0,
    });
    this.anims.create({
      key: "crash-air",
      frames: this.anims.generateFrameNumbers("hero", {
        start: 53,
        end: 54,
      }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "crash-land",
      frames: this.anims.generateFrameNumbers("hero", {
        start: 55,
        end: 59,
      }),
      frameRate: 25,
      repeat: 0,
    });
    this.anims.create({
      key: "double-jump",
      frames: this.anims.generateFrameNumbers("hero", {
        start: 60,
        end: 68,
      }),
      frameRate: 80,
      repeat: 0,
    });
    this.anims.create({
      key: "double-jump-fall",
      frames: this.anims.generateFrameNumbers("hero", {
        start: 70,
        end: 72,
      }),
      frameRate: 25,
      repeat: 0,
    });
  }

  playAnimations() {
    if (this.isAlive) {
      if (
        !this.body.blocked.down &&
        this.body.velocity.y <= 0 &&
        this.anims.currentAnim.key !== "jump" &&
        !this.doubleJumped
      )
        this.play("jump");
      else if (
        !this.body.blocked.down &&
        this.body.velocity.y <= 0 &&
        this.anims.currentAnim.key !== "double-jump" &&
        this.doubleJumped
      )
        this.play("double-jump");
      else if (
        !this.body.blocked.down &&
        this.body.velocity.y > 0 &&
        this.anims.currentAnim.key !== "fall" &&
        !this.doubleJumped
      )
        this.play("fall");
      else if (
        !this.body.blocked.down &&
        this.body.velocity.y > 0 &&
        this.anims.currentAnim.key !== "double-jump-fall" &&
        this.doubleJumped
      )
        this.play("double-jump-fall");
      else if (
        this.body.blocked.down &&
        this.anims.currentAnim.key !== "run" &&
        this.anims.currentAnim.key !== "land"
      )
        this.play("land");
      else if (
        this.body.blocked.down &&
        this.anims.currentAnim.key === "land" &&
        this.anims.currentFrame.index === 4
      ) {
        this.play("run");
      }
    } else {
      if (this.body.blocked.right && this.anims.currentAnim.key !== "crash") {
        this.play("crash");
      } else if (
        this.anims.currentAnim.key === "crash" &&
        this.anims.currentFrame.index === 10 &&
        !this.body.blocked.down
      )
        this.play("crash-air");
      else if (
        this.anims.currentAnim.key === "crash" &&
        this.anims.currentFrame.index === 10 &&
        this.body.blocked.down
      )
        this.play("crash-land");
    }
  }
}

export default Hero;

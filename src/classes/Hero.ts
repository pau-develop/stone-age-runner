class Hero extends Phaser.Physics.Arcade.Sprite {
  isAlive = true;
  isJumping = false;
  doubleJumped = false;
  jumpLimit: number;
  jumpForce = -200;
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
    console.log(this.isAlive);
  }

  createAnimations() {
    this.createAnimation("run", 0, 11, 25, -1);
    this.createAnimation("jump", 27, 35, 25, 0);
    this.createAnimation("fall", 36, 37, 25, 0);
    this.createAnimation("land", 38, 42, 25, 0);
    this.createAnimation("crash", 43, 52, 25, 0);
    this.createAnimation("crash-air", 53, 54, 5, -1);
    this.createAnimation("crash-land", 55, 59, 25, 0);
    this.createAnimation("double-jump", 60, 68, 80, 0);
    this.createAnimation("double-jump-fall", 70, 72, 25, 0);
  }

  createAnimation(
    key: string,
    start: number,
    end: number,
    rate: number,
    repeat: number
  ) {
    this.anims.create({
      key: key,
      frames: this.anims.generateFrameNumbers("hero", {
        start: start,
        end: end,
      }),
      frameRate: rate,
      repeat: repeat,
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
      ) {
        this.play("crash-air");
      } else if (
        this.anims.currentAnim.key === "crash" &&
        this.anims.currentFrame.index === 10 &&
        this.body.blocked.down
      ) {
        this.play("crash-land");
      } else if (
        this.anims.currentAnim.key === "crash-air" &&
        this.body.blocked.down
      ) {
        this.play("crash-land");
      }
    }
  }
}

export default Hero;

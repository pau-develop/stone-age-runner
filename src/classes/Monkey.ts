class Monkey extends Phaser.Physics.Arcade.Sprite {
  scene;
  monkey;
  isAlive = true;
  justCrashed = false;
  bounceSpeed = 50;
  isStomped = false;
  shouldMove = false;
  canBeRemoved = false;
  monkeyGroup;
  constructor(scene, x, y, sprite, hero, monkeyGroup) {
    super(scene, x, y, sprite);
    this.monkeyGroup = monkeyGroup;
    this.scene = scene;
    this.monkey = this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.setOrigin(0, 0);
    hero.setColliders(this.monkey);
    this.init();
    this.createAnimations();
    this.play("run");
  }

  init() {
    this.monkey.body.setSize(32, 45);
    this.monkey.body.offset.y = 18;
  }

  moveMonkey() {
    if (this.shouldMove) {
      this.monkey.body.velocity.x = -100;
    }
  }

  checkForCollision() {
    if (!this.isAlive) {
      if (this.justCrashed) {
        if (this.monkey.bounceSpeed > 0) this.monkey.bounceSpeed -= 1;
        else {
          this.monkey.bounceSpeed = 0;
          this.canBeRemoved = true;
        }
        this.monkey.body.velocity.x = this.monkey.bounceSpeed;
      }
    }
  }

  createAnimations() {
    this.createAnimation("run", 0, 11, 50, -1);
    this.createAnimation("crash", 12, 21, 25, 0);
    this.createAnimation("crash-air", 22, 23, 25, 0);
    this.createAnimation("crash-land", 24, 29, 25, 0);
    this.createAnimation("stomped", 30, 35, 18, 0);
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
      frames: this.anims.generateFrameNumbers("monkey", {
        start: start,
        end: end,
      }),
      frameRate: rate,
      repeat: repeat,
    });
  }

  checkBounds(camera) {
    if (
      this.monkey.body.x <= camera.scrollX + 640 &&
      this.monkey.body.x >= camera.scrollX &&
      this.isAlive
    )
      this.shouldMove = true;
  }

  playAnimations() {
    if (this.isAlive) {
      //nothing
    } else if (!this.isAlive) {
      if (this.body.touching.left && this.anims.currentAnim.key !== "crash") {
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
      } else if (this.isStomped && this.anims.currentAnim.key !== "stomped") {
        this.play("stomped");
      }
    }
  }
}

export default Monkey;

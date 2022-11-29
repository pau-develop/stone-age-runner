import Character from "./Character";

class Monkey extends Character {
  isStomped = false;
  shouldMove = false;
  canBeRemoved = false;
  constructor(scene, x, y, sprite, hero, map) {
    super(scene, x, y, sprite);
    this.bounceSpeed = 50;
    this.speed = -50;
    hero.setColliders(this);
    this.init();
    this.createAnimations();
    this.play("run");
  }

  init() {
    this.body.setSize(44, 45);
    this.body.offset.y = 17;
    this.body.offset.x = 5;
  }

  checkForCollision() {
    if (!this.isAlive) {
      this.body.setSize(60, 45);
      this.body.offset.y = 17;
      if (this.justCrashed) {
        if (this.bounceSpeed > 0) this.bounceSpeed -= 1;
        else {
          this.bounceSpeed = 0;
          this.canBeRemoved = true;
        }
        this.body.velocity.x = this.bounceSpeed;
      } else if (this.isStomped) this.canBeRemoved = true;
    } else {
      if (this.body.blocked.left) {
        this.shouldMove = false;
        this.justCrashed = true;
        this.isAlive = false;
      }
    }
  }

  createAnimations() {
    this.createAnimation("run", 0, 11, 40, -1, "monkey");
    this.createAnimation("crash", 12, 21, 25, 0, "monkey");
    this.createAnimation("crash-air", 22, 23, 25, 0, "monkey");
    this.createAnimation("crash-land", 24, 29, 25, 0, "monkey");
    this.createAnimation("stomped", 30, 35, 18, 0, "monkey");
    this.createAnimation("fall", 39, 40, 5, 0, "monkey");
    this.createAnimation("land", 41, 44, 25, 0, "monkey");
  }

  checkBounds(camera) {
    console.log(camera.scrollX + 640, this.body.x, this.isAlive);
    if (
      this.body.x <= camera.scrollX + 640 &&
      this.body.x >= camera.scrollX &&
      this.isAlive
    ) {
      this.shouldMove = true;
    } else if (this.body.x < camera.scrollX) this.canBeRemoved = true;
  }

  playAnimations() {
    if (this.isAlive) {
      //nothing
      if (
        !this.body.blocked.down &&
        this.body.velocity.y > 0 &&
        this.anims.currentAnim.key !== "fall"
      )
        this.play("fall");
      else if (
        this.body.blocked.down &&
        this.anims.currentAnim.key !== "run" &&
        this.anims.currentAnim.key !== "land"
      ) {
        this.play("land");
      } else if (
        this.body.blocked.down &&
        this.anims.currentAnim.key === "land" &&
        this.anims.currentFrame.index === 4
      ) {
        this.play("run");
      }
    } else if (!this.isAlive) {
      if (
        (this.body.touching.left && this.anims.currentAnim.key !== "crash") ||
        (this.body.blocked.left && this.anims.currentAnim.key !== "crash")
      ) {
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

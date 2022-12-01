import Character from "./Character";
import FloatingText from "./FloatingText";
import Steam from "./Steam";

class Hero extends Character {
  touchedSpikes = false;
  isJumping = false;
  doubleJumped = false;
  jumpLimit: number;
  jumpForce = -200;
  doubleJumpForce = -150;
  hitMobForce = -300;
  bounceSpeed = -50;
  heroSpeed = 250;
  heroEnergy = 100;
  isRecovering = false;
  isConsuming = false;
  score = 0;
  counter = 5;
  spikeCounter = 0;
  isCrashed = false;
  heroSounds = new Array();
  checkBlocked = false;
  isSpiked = false;
  isSpikedTop = false;
  destPos;
  spikedX = 0;
  spikedY = 0;
  spikedXDir = 0;
  colliderX = 20;
  colliderY = 54;

  constructor(scene, x, y, sprite, heroSounds) {
    super(scene, x, y, sprite);
    this.shouldMove = true;
    this.init();
    this.createAnimations();
    this.play("run");
    this.heroSounds = heroSounds;
  }

  init() {
    this.isAlive = true;
    this.body.setSize(this.colliderX, this.colliderY);
    this.body.offset.y = 10;
  }

  emitSteam() {
    this.counter++;
    if (this.counter >= 5) {
      new Steam(this.scene, this.x + 30, this.y + 35, "steam");
      this.counter = 0;
    }
  }

  checkEnergyStatus() {
    if (this.heroEnergy > 100) this.heroEnergy = 100;
  }

  checkForCollision() {
    if (!this.isSpiked) {
      if (this.body.blocked.up) {
        this.body.y = this.body.y + 2;
        this.isJumping = false;
        this.body.velocity.y = +20;
        return;
      }
      if (this.body.blocked.right) {
        if (!this.checkBlocked) {
          console.log("checking right...");
          this.body.y = this.body.y + 2;
          this.checkBlocked = true;
          return;
        } else {
          if (!this.body.blocked.up) this.isAlive = false;
        }
      }

      if (this.body.blocked.down) {
        this.checkBlocked = false;
        this.counter = 5;
        this.isJumping = false;
        this.doubleJumped = false;
        this.jumpForce = -200;
        this.body.setSize(this.colliderX, this.colliderY);
        this.body.offset.y = 10;
        if (this.isAlive) this.fillEnergyBar();
      } else {
        this.body.setSize(this.colliderX, this.colliderY);
        this.body.offset.y = 5;
      }
    }
  }

  fillEnergyBar() {
    if (!this.isRecovering) {
      this.isRecovering = true;
      const interval = setInterval(() => {
        if (this.heroEnergy < 100) this.heroEnergy += 1;
        else this.heroEnergy = 100;
        this.isRecovering = false;
        clearInterval(interval);
      }, 250);
    }
  }

  setColliders(monkey) {
    this.scene.physics.add.collider(monkey, this, () => {
      if (this.body.touching.right) {
        this.isCrashed = true;
        this.isAlive = false;
        monkey.justCrashed = true;
        monkey.body.velocity.x = 0;
      } else if (this.body.touching.down) {
        this.heroSounds[1].play();
        this.score += 1000;
        this.heroEnergy += 15;
        new FloatingText(
          this.scene,
          1000,
          this.body.position.x,
          this.body.position.y
        );
        this.body.velocity.y = this.hitMobForce;
        this.doubleJumped = false;
        monkey.isStomped = true;
        monkey.body.velocity.x = 0;
      }
      monkey.isAlive = false;
    });
  }

  consumeEnergyBar() {
    if (!this.isConsuming) {
      this.isConsuming = true;
      const interval = setInterval(() => {
        if (this.heroEnergy > 0) this.heroEnergy -= 0.5;
        else this.heroEnergy = 0;
        this.isConsuming = false;
        clearInterval(interval);
      }, 15);
    }
  }

  createAnimations() {
    this.createAnimation("run", 0, 11, 25, -1, "hero");
    this.createAnimation("jump", 27, 35, 25, 0, "hero");
    this.createAnimation("fall", 36, 37, 25, 0, "hero");
    this.createAnimation("land", 38, 42, 25, 0, "hero");
    this.createAnimation("crash", 43, 52, 25, 0, "hero");
    this.createAnimation("crash-air", 53, 54, 5, -1, "hero");
    this.createAnimation("crash-land", 55, 59, 25, 0, "hero");
    this.createAnimation("double-jump", 60, 68, 80, 0, "hero");
    this.createAnimation("double-jump-fall", 70, 72, 25, 0, "hero");
    this.createAnimation("pinched", 72, 79, 25, 0, "hero");
  }

  playSounds() {
    if (this.anims.currentAnim.key === "run") {
      if (this.anims.currentFrame.index === 3) {
        this.heroSounds[0].play();
      } else if (this.anims.currentFrame.index === 9) {
        this.heroSounds[0].play();
      }
    } else if (
      this.anims.currentAnim.key === "land" &&
      this.anims.currentFrame.index === 1
    )
      this.heroSounds[0].play();
    //HIT
    else if (
      this.anims.currentAnim.key === "crash" &&
      this.anims.currentFrame.index === 1
    ) {
      if (this.isSpiked) this.heroSounds[5].play();
      else this.heroSounds[1].play();
    }

    //JUMP
    else if (this.anims.currentAnim.key === "jump") {
      if (this.body.velocity.y < 0 && this.anims.currentFrame.index === 1)
        this.heroSounds[3].play();
      else if (this.body.velocity.y >= 0) {
        this.heroSounds[3].stop();
      }
    }
    //DOUBLE-JUMP
    else if (
      this.anims.currentAnim.key === "double-jump" &&
      this.anims.currentFrame.index === 2
    ) {
      this.heroSounds[4].play();
    } else if (this.anims.currentAnim.key === "fall") {
      this.heroSounds[4].stop();
    }
  }

  playSound(sound) {
    this.heroSounds[sound].play();
  }

  playAnimations() {
    if (this.isAlive) {
      if (
        !this.body.blocked.down &&
        this.body.velocity.y <= 0 &&
        this.anims.currentAnim.key !== "jump" &&
        this.anims.currentAnim.key !== "double-jump" &&
        !this.doubleJumped
      ) {
        this.play("jump");
      } else if (
        !this.body.blocked.down &&
        this.body.velocity.y <= 0 &&
        this.anims.currentAnim.key !== "double-jump" &&
        this.doubleJumped
      )
        this.play("double-jump");
      else if (
        !this.body.blocked.down &&
        this.body.velocity.y > 0 &&
        this.anims.currentAnim.key !== "fall"
      )
        this.play("fall");
      else if (
        !this.body.blocked.down &&
        this.body.velocity.y > 0 &&
        this.anims.currentAnim.key !== "double-jump-fall" &&
        this.anims.currentAnim.key === "double-jump"
      )
        this.play("double-jump-fall");
      else if (
        this.body.blocked.down &&
        this.anims.currentAnim.key !== "run" &&
        this.anims.currentAnim.key !== "land" &&
        !this.isSpiked
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
      this.body.setSize(this.colliderX, this.colliderY);

      if (
        (this.isSpiked || this.isSpikedTop) &&
        this.anims.currentAnim.key !== "pinched"
      ) {
        this.play("pinched");
      }
      if (
        (this.body.blocked.right &&
          this.anims.currentAnim.key !== "crash" &&
          !this.isSpiked) ||
        (this.isCrashed &&
          this.body.touching.right &&
          this.anims.currentAnim.key !== "crash" &&
          !this.isSpiked)
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
      }
    }
  }
}

export default Hero;

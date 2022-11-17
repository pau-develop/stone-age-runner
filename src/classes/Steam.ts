class Steam extends Phaser.Physics.Arcade.Sprite {
  steam;
  alpha = 1;
  counter = 0;
  offset;
  movingUp = false;
  randomYSpeed;
  scaleFactor = Math.random() * (1.5 - 0.5) + 0.5;
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.steam = scene.add.existing(this);
    this.setOrigin(0, 0);
    this.scene.physics.world.enable(this);
    this.steam.body.setAllowGravity(false);

    const randomXSpeed = Math.round(Math.random() * (100 - 80) + 80);
    this.randomYSpeed = Math.round(Math.random() * (60 - 30) + 30) * -1;
    this.steam.body.velocity.y = 25;
    this.steam.body.velocity.x = randomXSpeed;
    this.createAnimations();
    this.play("steam");
    this.offset = y + 5;
    this.scaleX = 0;
    this.scaleY = 0;
  }

  createAnimations() {
    this.anims.create({
      key: "steam",
      frames: this.anims.generateFrameNumbers("steam", {
        start: 0,
        end: 2,
      }),
      frameRate: 5,
      repeat: -1,
    });
  }

  preUpdate() {
    this.controlOpacity();
    this.rotateSprite();
    this.moveSprite();
    this.scaleSprite();
    this.checkAndDestroy();
    this.steam.alpha = this.alpha;
    this.alpha -= 0.01;
  }
  moveSprite() {
    if (!this.movingUp) {
      if (this.steam.body.y > this.offset) {
        this.steam.body.velocity.y = this.randomYSpeed;
        this.movingUp = true;
      }
    }
  }
  scaleSprite() {
    if (this.steam.scaleX <= this.scaleFactor) {
      this.steam.scaleX = this.steam.scaleX + 0.1;
      this.steam.scaleY = this.steam.scaleY + 0.1;
    } else {
      this.steam.scaleX = this.scaleFactor;
      this.steam.scaleY = this.scaleFactor;
    }
  }

  controlOpacity() {
    this.counter++;
    if (this.counter >= 40) {
      this.alpha -= 0.01;
      this.steam.alpha = this.alpha;
      this.counter = 0;
    }
  }

  rotateSprite() {
    this.steam.angle += 1;
  }

  checkAndDestroy() {
    if (
      this.steam.x < this.scene.cameras.main.scrollX - 64 ||
      this.steam.y < this.scene.cameras.main.scrollY - 64 ||
      this.alpha <= 0
    ) {
      this.steam.destroy();
    }
  }
}

export default Steam;

class Character extends Phaser.Physics.Arcade.Sprite {
  scene;
  isAlive = true;
  justCrashed = false;
  bounceSpeed = -50;
  shouldMove = false;
  speed = 250;
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.depth = -47;
    this.setOrigin(0, 0);
  }

  createAnimation(
    key: string,
    start: number,
    end: number,
    rate: number,
    repeat: number,
    character: string
  ) {
    this.anims.create({
      key: key,
      frames: this.anims.generateFrameNumbers(character, {
        start: start,
        end: end,
      }),
      frameRate: rate,
      repeat: repeat,
    });
  }

  moveCharacter() {
    if (this.shouldMove) this.body.velocity.x = this.speed;

    this.body.x = Math.round(this.body.x);
  }
}

export default Character;

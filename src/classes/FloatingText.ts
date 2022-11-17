class FloatingText extends Phaser.Physics.Arcade.Sprite {
  text;
  textShadow;
  sprite;
  scene;
  colors = [0xeee300, 0xeee300, 0xee3600, 0xee3600];
  altColors = [0xffffff, 0xffffff, 0xffffff, 0xffffff];
  flag = false;
  counter = 0;
  constructor(scene, points, x, y) {
    super(scene, x, y, "fruits");
    this.sprite = scene.add.existing(this);
    this.setOrigin(0, 0);
    this.scene.physics.world.enable(this);
    this.sprite.body.setAllowGravity(false);
    this.textShadow = scene.add
      .bitmapText(x + 2, y + 2, "2p", points, 8)
      .setTint(0x000000, 0x000000, 0x000000, 0x000000);
    this.text = scene.add
      .bitmapText(x, y, "2p", points, 8)
      .setTint(this.colors[0], this.colors[1], this.colors[2], this.colors[3]);

    this.visible = false;
    const randomSpeed = Math.round(Math.random() * (30 - 10) + 10) * -1;
    this.body.velocity.y = randomSpeed;
  }

  preUpdate() {
    this.moveText();
    this.textBlinking();
    this.checkOutOfBounds();
  }
  textBlinking() {
    this.counter++;
    if (this.counter >= 4) {
      if (this.flag) {
        this.text.setTint(
          this.colors[0],
          this.colors[1],
          this.colors[2],
          this.colors[3]
        );
      } else {
        this.text.setTint(
          this.altColors[0],
          this.altColors[1],
          this.altColors[2],
          this.altColors[3]
        );
      }
      this.flag = !this.flag;
      this.counter = 0;
    }
  }
  checkOutOfBounds() {
    if (
      this.sprite.x < this.scene.cameras.main.scrollX - 64 ||
      this.sprite.y < this.scene.cameras.main.scrollY - 64
    ) {
      this.text.destroy();
      this.textShadow.destroy();
      this.destroy();
    }
  }

  moveText() {
    this.body.y = Math.round(this.body.y);
    this.text.y = this.body.y;
    this.textShadow.y = this.body.y;
  }
}

export default FloatingText;

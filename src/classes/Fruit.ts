class Fruit extends Phaser.Physics.Arcade.Sprite {
  fruit;
  points;
  constructor(scene, x, y, sprite, currentFruit, hero) {
    super(scene, x, y, sprite);

    this.fruit = scene.add.existing(this).setFrame(currentFruit);
    this.setOrigin(0, 0);
    this.scene.physics.world.enable(this);
    this.fruit.body.setAllowGravity(false);
    scene.physics.add.collider(this.fruit, hero, () => {
      hero.score += this.points;
      this.fruit.destroy();
    });
    this.setFruitProperties(currentFruit);
    console.log(this.points);
  }

  setFruitProperties(currentFruit) {
    switch (currentFruit) {
      case 0:
        this.fruit.body.setSize(25, 15);
        this.points = 500;
        break;
      case 1:
        this.fruit.body.setSize(22, 20);
        this.fruit.body.offset.x = 7;
        this.points = 450;
        break;
      case 2:
        this.fruit.body.setSize(18, 22);
        this.points = 300;
        break;
      case 3:
        this.fruit.body.setSize(18, 22);
        this.points = 400;
        break;
      case 4:
        this.fruit.body.setSize(16, 16);
        this.points = 350;
        break;
      default:
        null;
    }
  }
}

export default Fruit;

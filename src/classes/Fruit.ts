class Fruit extends Phaser.Physics.Arcade.Sprite {
  fruit;
  points;
  energy;
  constructor(scene, x, y, sprite, currentFruit, hero) {
    super(scene, x, y, sprite);

    this.fruit = scene.add.existing(this).setFrame(currentFruit);
    this.setOrigin(0, 0);
    this.scene.physics.world.enable(this);
    this.fruit.body.setAllowGravity(false);
    scene.physics.add.collider(this.fruit, hero, () => {
      this.fruit.destroy();
      hero.score += this.points;
      hero.heroEnergy += this.energy;
    });
    this.setFruitProperties(currentFruit);
    this.fruit.body.setMass(0.5);
    this.fruit.body.mass;
  }

  setFruitProperties(currentFruit) {
    switch (currentFruit) {
      case 0:
        this.fruit.body.setSize(25, 15);
        this.points = 500;
        this.energy = 10;
        break;
      case 1:
        this.fruit.body.setSize(22, 20);
        this.fruit.body.offset.x = 7;
        this.points = 450;
        this.energy = 5;
        break;
      case 2:
        this.fruit.body.setSize(18, 22);
        this.points = 300;
        this.energy = 3;
        break;
      case 3:
        this.fruit.body.setSize(18, 22);
        this.points = 400;
        this.energy = 4;
        break;
      case 4:
        this.fruit.body.setSize(16, 16);
        this.points = 350;
        this.energy = 2;
        break;
      default:
        null;
    }
  }
}

export default Fruit;

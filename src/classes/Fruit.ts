import FloatingText from "./FloatingText";

class Fruit extends Phaser.Physics.Arcade.Sprite {
  fruit;
  points;
  energy;
  yInitialPos;
  direction;
  topOffset;
  botOffset;
  oscillationSpeed = 20;
  constructor(scene, x, y, sprite, currentFruit, hero, direction, eatFX) {
    super(scene, x, y, sprite);

    this.fruit = scene.add.existing(this).setFrame(currentFruit);
    this.setOrigin(0, 0);
    this.scene.physics.world.enable(this);
    this.fruit.body.setAllowGravity(false);
    scene.physics.add.collider(this.fruit, hero, () => {
      new FloatingText(
        scene,
        this.points,
        this.fruit.body.x,
        this.fruit.body.y
      );
      eatFX.play();
      this.fruit.destroy();
      hero.score += this.points;
      hero.heroEnergy += this.energy;
    });
    this.setFruitProperties(currentFruit);
    this.fruit.body.setMass(0.5);
    this.yInitialPos = y;
    this.direction = direction;
    this.topOffset = this.yInitialPos + 5;
    this.botOffset = this.yInitialPos - 5;
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

  preUpdate() {
    this.fruitOscillation();
    this.snap();
  }

  fruitOscillation() {
    if (this.direction === 1) {
      if (this.body.y < this.topOffset) {
        this.body.velocity.y = this.oscillationSpeed * this.direction;
      } else {
        this.body.velocity.y = 0;
        this.direction *= -1;
      }
    } else {
      if (this.body.y > this.botOffset) {
        this.body.velocity.y = this.oscillationSpeed * this.direction;
      } else {
        this.body.velocity.y = 0;
        this.direction *= -1;
      }
    }
  }

  snap() {
    this.body.y = Math.round(this.body.y);
  }
}

export default Fruit;

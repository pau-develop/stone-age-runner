import Hero from "./Hero";

class Ui {
  barContainer;
  bar;
  totalEnergy = 100;

  distance;
  distanceShadow;
  die;
  dieShadow;
  score;
  scoreShadow;

  constructor(scene, game) {
    this.barContainer = scene.add
      .sprite(255, 14, "bar-container")
      .setScrollFactor(0)
      .setOrigin(0, 0);

    this.bar = scene.add
      .sprite(257, 16, "bar")
      .setScrollFactor(0)
      .setOrigin(0, 0);

    this.scoreShadow = scene.add
      .bitmapText(11, 11, "2p", "Score: 0", 8)
      .setScrollFactor(0)
      .setTint(0x000000);

    this.score = scene.add
      .bitmapText(10, 10, "2p", "Score: 0", 8)
      .setScrollFactor(0)
      .setTint(0x00adcc);

    this.distanceShadow = scene.add
      .bitmapText(11, 21, "2p", "Distance: 0", 8)
      .setScrollFactor(0)
      .setTint(0x000000);
    this.distance = scene.add
      .bitmapText(10, 20, "2p", "Distance: 0", 8)
      .setScrollFactor(0)
      .setTint(0x00adcc);
  }

  displayScore(score) {
    this.score.text = "Score: " + score;
    this.scoreShadow.text = "Score: " + score;
  }
  displayDistance(meters) {
    this.distance.text = "Distance: " + meters + " m";
    this.distanceShadow.text = "Distance: " + meters + " m";
  }

  controlBar(heroEnergy: number) {
    if (heroEnergy > 100) heroEnergy = 100;
    const percentage = this.bar.width / this.totalEnergy;
    this.bar.displayWidth = heroEnergy * percentage;
  }

  displayDeathMessage(scene, meters, points) {
    const interval = setInterval(() => {
      this.dieShadow = scene.add
        .bitmapText(
          scene.cameras.main.width / 2 + 2,
          scene.cameras.main.height / 2 + 1,
          "2p",
          `You are dead... \n\nYou've run for ${meters} meters\n\nand scored ${points} points\n\nPress space`,
          16,
          1
        )
        .setScrollFactor(0)
        .setTint(0x000000)
        .setOrigin(0.5);
      this.die = scene.add
        .bitmapText(
          scene.cameras.main.width / 2,
          scene.cameras.main.height / 2,
          "2p",
          `You are dead... \n\nYou've run for ${meters} meters\n\nand scored ${points} points\n\nPress space`,
          16,
          1
        )
        .setScrollFactor(0)
        .setTint(0x00adcc)
        .setOrigin(0.5);

      clearInterval(interval);
    }, 2000);
  }
}

export default Ui;

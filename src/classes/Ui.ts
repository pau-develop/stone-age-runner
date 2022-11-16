import Hero from "./Hero";

class Ui {
  barContainer;
  bar;
  totalEnergy = 100;
  fps;
  die;
  score;
  scoreDisplay;
  constructor(scene, game) {
    this.barContainer = scene.add
      .sprite(288, 10, "bar-container")
      .setScrollFactor(0)
      .setOrigin(0, 0);

    this.bar = scene.add
      .sprite(292, 14, "bar")
      .setScrollFactor(0)
      .setOrigin(0, 0);

    this.fps = scene.add
      .bitmapText(10, 10, "04b", game.loop.actualFps.toFixed(2) + " fps", 16)
      .setScrollFactor(0)
      .setTint(0xeee300, 0xeee300, 0xee3600, 0xee3600);

    this.score = scene.add
      .bitmapText(10, 30, "04b", "Score: 0", 16)
      .setScrollFactor(0)
      .setTint(0xeee300, 0xeee300, 0xee3600, 0xee3600);
  }

  getFPS(game) {
    this.fps.text = game.loop.actualFps.toFixed(2) + "fps";
  }

  displayScore(score) {
    this.score.text = "Score: " + score;
  }

  controlBar(heroEnergy: number) {
    if (heroEnergy > 100) heroEnergy = 100;
    const percentage = this.bar.width / this.totalEnergy;
    this.bar.displayWidth = heroEnergy * percentage;
  }

  displayDeathMessage(scene) {
    const interval = setInterval(() => {
      this.die = scene.add
        .bitmapText(
          scene.cameras.main.width / 2,
          scene.cameras.main.height / 2,
          "04b",
          "You are dead... \nPress space to restart",
          16,
          1
        )
        .setScrollFactor(0)
        .setTint(0xeee300, 0xeee300, 0xee3600, 0xee3600)
        .setOrigin(0.5);

      clearInterval(interval);
    }, 2000);
  }
}

export default Ui;

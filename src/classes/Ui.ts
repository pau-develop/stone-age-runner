class Ui {
  fps;
  die;

  constructor(scene, game) {
    this.fps = scene.add
      .bitmapText(10, 10, "04b", game.loop.actualFps.toFixed(2) + " fps", 16)
      .setScrollFactor(0)
      .setTint(0xeee300, 0xeee300, 0xee3600, 0xee3600);
  }

  getFPS(game) {
    this.fps.text = game.loop.actualFps.toFixed(2) + "fps";
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

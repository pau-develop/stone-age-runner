class Menu extends Phaser.Scene {
  backgroundImage;
  acceptButton;
  helpButton;
  flag = false;
  message;

  color = false;
  frame = 0;
  constructor() {
    super("Menu");
  }
  preload() {
    this.load.image("menu", "assets/menu/LOGO4.png");
    this.load.bitmapFont("2p", "assets/font/2p.png", "assets/font/2p.xml");
  }
  init() {
    this.flag = false;
    this.blinkingText();
  }
  create() {
    this.backgroundImage = this.add.image(0, 0, "menu");
    this.backgroundImage.setOrigin(0, 0);
    this.input.keyboard
      .addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
      .on("up", () => {
        if (!this.flag) {
          this.scene.stop("Menu").start("Stage");
          this.flag = true;
        }
      });

    this.input.keyboard
      .addKey(Phaser.Input.Keyboard.KeyCodes.H)
      .on("up", () => {
        this.helpMenu();
      });

    this.message = this.add
      .bitmapText(320, 305, "2p", "Press space to play\n\n Press H for help", 8)
      .setOrigin(0.5, 0.5)
      .setTint(0x00adcc);

    this.add
      .bitmapText(620, 340, "2p", "www.pau-dev.com", 8)
      .setOrigin(1, 0)
      .setTint(0x00adcc);
  }

  helpMenu() {
    this.add
      .rectangle(320, 150, 420, 200, 0x000000)
      .setStrokeStyle(4, 0x00adcc);

    this.add
      .bitmapText(
        320,
        90,
        "2p",
        "Press space to jump & hold it to jump higher.",
        8
      )
      .setOrigin(0.5, 0.5)
      .setTint(0x00adcc);

    this.add
      .bitmapText(
        320,
        120,
        "2p",
        "While on air, press & hold space to double jump.",
        8
      )
      .setOrigin(0.5, 0.5)
      .setTint(0x00adcc);

    this.add
      .bitmapText(320, 150, "2p", "Double jumping consumes energy.", 8)
      .setOrigin(0.5, 0.5)
      .setTint(0x00adcc);

    this.add
      .bitmapText(320, 180, "2p", "Eat fruits to recover energy.", 8)
      .setOrigin(0.5, 0.5)
      .setTint(0x00adcc);

    this.add
      .bitmapText(320, 210, "2p", "Avoid spikes, walls & monkeys.", 8)
      .setOrigin(0.5, 0.5)
      .setTint(0x00adcc);
  }

  blinkingText() {
    this.frame++;
    if (this.frame >= 5) {
      if (!this.color) this.message.setTint(0x00adcc);
      else this.message.setTint(0xffffff);
      this.color = !this.color;
      this.frame = 0;
    }
  }

  update() {
    this.blinkingText();
  }
}

export default Menu;

class Menu extends Phaser.Scene {
  backgroundImage;
  acceptButton;
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
    this.acceptButton = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.message = this.add
      .bitmapText(320, 320, "2p", "Press space", 16)
      .setOrigin(0.5, 0.5)
      .setTint(0x00adcc, 0x00adcc, 0x00adcc, 0x00adcc);
  }

  getInput() {
    this.acceptButton.on("up", () => {
      if (!this.flag) {
        this.scene.stop("Menu").start("Stage");
        this.flag = true;
      }
    });
  }

  blinkingText() {
    this.frame++;
    if (this.frame >= 5) {
      if (!this.color)
        this.message.setTint(0x00adcc, 0x00adcc, 0x00adcc, 0x00adcc);
      else this.message.setTint(0xffffff, 0xffffff, 0xffffff, 0xffffff);
      this.color = !this.color;
      this.frame = 0;
    }
  }

  update() {
    this.getInput();
    this.blinkingText();
  }
}

export default Menu;

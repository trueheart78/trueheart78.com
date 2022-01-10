class Game {
  name;
  system;
  status;
  added;
  removed;
  hours = 0;
  disc = false;
  cartridge = false;
  gamepass = false;
  surpriseMe = true;
  notes = [];

  constructor(game) {
    this.name = game.name;
    this.added = game.added;
    this.system = game.system.toUpperCase();
    this.status = game.status.toLowerCase();

    if (game.hasOwnProperty("hours")) {
      this.hours = game.hours;
    }
    if (game.hasOwnProperty("disc")) {
      this.disc = game.disc;
    }
    if (game.hasOwnProperty("cartridge")) {
      this.cartridge = game.cartridge;
    }
    if (game.hasOwnProperty("gamepass")) {
      this.gamepass = game.gamepass;
    }
    if (game.hasOwnProperty("notes")) {
      this.notes = game.notes;
    }
    if (game.hasOwnProperty("removed")) {
      this.removed = game.removed;
    }
    if (game.hasOwnProperty("surprise_me")) {
      this.surpriseMe = game.surprise_me;
    }
  }
  get hasNotes() {
    return (this.notes.length > 0);
  }
  get wasRemoved() {
    return (this.removed != undefined);
  }
  get beaten() {
    return (this.status == "beaten");
  }
  get jettisoned() {
    return (this.status == "jettisoned");
  }
  get playing() {
    return (this.status == "playing");
  }
  get paused() {
    return (this.status == "paused");
  }
  get unplayed() {
    return (this.status == "unplayed");
  }
  get fun() {
    return (this.status == "fun");
  }
  get awaitingContent() {
    return (this.status == "awaiting content");
  }
  get vrExperience() {
    return (this.status == "vr experiences");
  }
  get completed() {
    return (this.beaten || this.jettisoned);
  }
  get xbox() {
    return (["XSX", "XB1", "360", "XB"].includes(this.system));
  }
  get nintendo() {
    return (this.system == "NS");
  }
  get vr() {
    return (this.system == "VR");
  }
}

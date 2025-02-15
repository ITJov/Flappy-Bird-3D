export default class KeyboardHelper {
  constructor(scene) {
    this.keys = {};
    this.keyPressed = {};
    document.body.addEventListener("keydown", (ev) => this.on_key_down(ev));
    document.body.addEventListener("keyup", (ev) => this.on_key_up(ev));
  }
  on_key_down(ev) {
    if (!this.keyPressed[ev.key]) {
      this.keys[ev.key] = true;
      this.keyPressed[ev.key] = true;
    }
  }
  on_key_up(ev) {
    this.keys[ev.key] = false;
    this.keyPressed[ev.key] = false;
  }
}


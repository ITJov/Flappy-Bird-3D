import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@0.136/examples/jsm/controls/PointerLockControls.js';

export default class Controls {
  constructor(camera, domElement) {
    this.controls = new PointerLockControls(camera, domElement);
    document.addEventListener("click", () => this.controls.lock());
  }
}

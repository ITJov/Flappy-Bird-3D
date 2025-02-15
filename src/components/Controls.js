import { PointerLockControls } from "../../node_modules/three/examples/jsm/controls/PointerLockControls.js";

export default class Controls {
  constructor(camera, domElement) {
    this.controls = new PointerLockControls(camera, domElement);
    document.addEventListener("click", () => this.controls.lock());
  }
}

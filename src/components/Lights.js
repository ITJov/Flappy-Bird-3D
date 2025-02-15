import * as THREE from "three";

export default class Lights {
  constructor(scene) {
    this.scene = scene;
    this.addLights();
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffa500, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    this.scene.add(directionalLight);
  }
}

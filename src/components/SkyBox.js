import { CubeTextureLoader } from "three";

export default class SkyBox {
  constructor(scene) {
    this.scene = scene;
    this.loadSkybox();
  }

  loadSkybox() {
    const skyboxLoader = new CubeTextureLoader();
    this.scene.background = skyboxLoader.load([
      "./assets/skyBox/cube_down.png",
      "./assets/skyBox/cube_front.png",
      "./assets/skyBox/cube_back.png",
      "./assets/skyBox/cube_up.png",
      "./assets/skyBox/cube_left.png",
      "./assets/skyBox/cube_right.png",
    ]);
  }
}

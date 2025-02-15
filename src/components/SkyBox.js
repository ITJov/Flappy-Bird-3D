import { CubeTextureLoader } from "three";

export default class SkyBox {
  constructor(scene) {
    this.scene = scene;
    this.loadSkybox();
  }

  loadSkybox() {
    const skyboxLoader = new CubeTextureLoader();
    this.scene.background = skyboxLoader.load([
      "src/assets/skyBox/cube_down.png",
      "src/assets/skyBox/cube_front.png",
      "src/assets/skyBox/cube_back.png",
      "src/assets/skyBox/cube_up.png",
      "src/assets/skyBox/cube_left.png",
      "src/assets/skyBox/cube_right.png",
    ]);
  }
}

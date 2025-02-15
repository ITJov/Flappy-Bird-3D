import { GLTFLoader } from "../../node_modules/three/examples/jsm/loaders/GLTFLoader.js";

export default class Mountain {
    loadMountain(scene) {
        const loader = new GLTFLoader();
        loader.load("./assets/objects/mountain_lake.glb", (gltf) => {
            const mountainLake = gltf.scene;
            mountainLake.position.set(0, -1, -100); 
            mountainLake.scale.set(20, 30, 10); 
            mountainLake.name = "mountainLake";
            scene.add(mountainLake);
        });
    }
}
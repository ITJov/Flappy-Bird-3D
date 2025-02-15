import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.136/examples/jsm/loaders/GLTFLoader.js";

export default class Mountain {
    loadMountain(scene) {
        const loader = new GLTFLoader();
        loader.load("src/assets/objects/mountain_lake.glb", (gltf) => {
            const mountainLake = gltf.scene;
            mountainLake.position.set(0, -1, -100); 
            mountainLake.scale.set(20, 30, 10); 
            mountainLake.name = "mountainLake";
            scene.add(mountainLake);
        });
    }
}
import * as THREE from "three";
import { FontLoader } from "https://cdn.jsdelivr.net/npm/three@0.136/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "https://cdn.jsdelivr.net/npm/three@0.136/examples/jsm/geometries/TextGeometry.js";

export default class Text3D {
    constructor(scene, loader, text, fontOptions, materialOptions, position) {
        this.scene = scene;
        this.loader = loader;
        this.text = text;
        this.fontOptions = fontOptions;
        this.materialOptions = materialOptions;
        this.position = position;
    }

    loadFont(callback) {
        const textLoader = new FontLoader();
        textLoader.load(
            '/fonts/helvetiker_regular.typeface.json',  // Pastikan path benar
            callback,
            undefined,
            (error) => console.error("Error loading font:", error)
        );
    }

    createTextMesh(font) {
        const textGeometry = new TextGeometry(this.text, {
            ...this.fontOptions,
            font,
        });
        const textMaterial = new THREE.MeshBasicMaterial(this.materialOptions);
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(...this.position);
        this.scene.add(textMesh);
    }

    addText() {
        this.loadFont((font) => this.createTextMesh(font));
    }
}

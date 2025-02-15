import * as THREE from "three";
import * as CANNON from "cannon-es";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class Floor {
  constructor(scene, physicsWorld, camera, bird) {
    this.scene = scene;
    this.physicsWorld = physicsWorld;
    this.camera = camera;

    this.bird = bird;
    this.rockyTexture = null;
    this.trees = [];
    this.treeModel = null;
    this.lastTreePosition = -200;
    this.treeBatchSize = 30;

    this.initFloor();
    this.loadTreeModel();
  }

  initFloor() {
    const textureLoader = new THREE.TextureLoader();
    this.rockyTexture = textureLoader.load("./assets/textures/rocky_texture.jpg");
    this.rockyTexture.wrapS = this.rockyTexture.wrapT = THREE.RepeatWrapping;
    this.rockyTexture.repeat.set(50, 50);

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), new THREE.MeshStandardMaterial({ map: this.rockyTexture, opacity: 0  , transparent: true }));

    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -45;
    floor.name = "floor";
    this.scene.add(floor);

    const floorBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
    });
    floorBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    floorBody.position.set(0, -45, 0);
    this.physicsWorld.addBody(floorBody);

    this.floor = floor;
  }

  loadTreeModel() {
    const loader = new GLTFLoader();
    loader.load(
      "./assets/models/quiver_tree_02_1k.gltf",
      (gltf) => {
        this.treeModel = gltf.scene;
        //area awal (2 batch)
        this.addTreeFirst();
      },
      undefined,
      (error) => {
        console.error("Gagal memuat pohon:", error);
      }
    );
  }

  // Fungsi baru untuk menambahkan pohon awal
  addTreeFirst() {
    // Tambahkan dua batch pohon untuk mengisi area awal
    // this.addTreeBatch();
    // this.addTreeBatch();
  }

  generateTreePosition(basePosition) {
    const spread = 200;
    return {
      x: (Math.random() - 0.5) * spread + basePosition,
      z: (Math.random() - 0.5) * spread,
    };
  }

  addTreeBatch() {
    if (!this.treeModel) return;

    const newTrees = [];
    const basePosition = this.lastTreePosition + 200;

    for (let i = 0; i < this.treeBatchSize; i++) {
      const tree = this.treeModel.clone();
      const position = this.generateTreePosition(basePosition);

      tree.position.set(position.x, -5, position.z);

      const scale = 1.5 + Math.random();
      tree.scale.set(scale, scale, scale);
      tree.rotation.y = Math.random() * Math.PI * 2;

      this.scene.add(tree);
      newTrees.push(tree);
    }

    this.lastTreePosition = basePosition;

    if (this.trees.length > this.treeBatchSize * 2) {
      const treesToRemove = this.trees.splice(0, this.treeBatchSize);
      treesToRemove.forEach((tree) => {
        this.scene.remove(tree);
        tree.traverse((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
      });
    }

    this.trees.push(...newTrees);
  }

  update() {
    if (this.rockyTexture && this.camera) {
      this.rockyTexture.offset.x = this.camera.position.x * 0.01;
      this.rockyTexture.offset.y = this.camera.position.z * 0.01;
    }

    if (this.bird && this.bird.position.x > this.lastTreePosition - 100) {
      this.addTreeBatch();
    }

    const viewDistance = 300;
    this.trees.forEach((tree) => {
      if (this.bird) {
        tree.visible = Math.abs(tree.position.x - this.bird.position.x) < viewDistance;
      }
    });
  }
}

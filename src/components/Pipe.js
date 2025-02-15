import * as THREE from "three";
import * as CANNON from "cannon-es";

export default class Pipe {
  constructor(scene, barkMaterial, physicsWorld, x, z, height, gap) {
    this.scene = scene;
    this.barkMaterial = barkMaterial;
    this.physicsWorld = physicsWorld;
    this.x = x;
    this.z = z;
    this.height = height;
    this.gap = gap;

    this.bottomPipe = null;
    this.topPipe = null;
    this.addPipes();
  }

  addPipes() {
    const randomGapY = Math.random() * 10 - 5;

    // Pipa Bawah
    const bottomPipeHeight = this.height + 40;
    const bottomPipeMesh = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, bottomPipeHeight, 32), this.barkMaterial);
    bottomPipeMesh.position.set(this.x, randomGapY - this.gap / 4 - bottomPipeHeight / 2, this.z);
    bottomPipeMesh.name = "pipe";
    this.scene.add(bottomPipeMesh);

    const bottomPipeBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Cylinder(2, 2, bottomPipeHeight, 32),
    });
    bottomPipeBody.position.copy(bottomPipeMesh.position);
    this.physicsWorld.addBody(bottomPipeBody);

    // Edge bawah
    const bottomEdgeGeometry = new THREE.CylinderGeometry(2.5, 2.5, 2, 32);
    const bottomEdgeMesh = new THREE.Mesh(bottomEdgeGeometry, this.barkMaterial);
    bottomEdgeMesh.position.set(this.x, randomGapY - this.gap / 4, this.z);
    bottomEdgeMesh.name = "pipe";
    this.scene.add(bottomEdgeMesh);

    const bottomEdgeBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Cylinder(2.5, 2.5, 2, 32),
    });
    bottomEdgeBody.position.copy(bottomEdgeMesh.position);
    this.physicsWorld.addBody(bottomEdgeBody);

    this.bottomPipe = {
      mesh: bottomPipeMesh,
      body: bottomPipeBody,
      edge: { mesh: bottomEdgeMesh, body: bottomEdgeBody },
    };

    // Pipa Atas
    const topPipeHeight = this.height + 30;
    const topPipeMesh = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, topPipeHeight, 32), this.barkMaterial);
    topPipeMesh.position.set(this.x, randomGapY + (this.gap - 10) / 2 + topPipeHeight / 2, this.z);
    topPipeMesh.name = "pipe";
    this.scene.add(topPipeMesh);

    const topPipeBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Cylinder(2, 2, topPipeHeight, 32),
    });
    topPipeBody.position.copy(topPipeMesh.position);
    this.physicsWorld.addBody(topPipeBody);

    // Edge atas
    const topEdgeGeometry = new THREE.CylinderGeometry(2.5, 2.5, 2, 32);
    const topEdgeMesh = new THREE.Mesh(topEdgeGeometry, this.barkMaterial);
    topEdgeMesh.position.set(this.x, randomGapY + (this.gap - 10) / 2, this.z);
    topEdgeMesh.name = "pipe";
    this.scene.add(topEdgeMesh);

    const topEdgeBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Cylinder(2.5, 2.5, 2, 32),
    });
    topEdgeBody.position.copy(topEdgeMesh.position);
    this.physicsWorld.addBody(topEdgeBody);

    this.topPipe = {
      mesh: topPipeMesh,
      body: topPipeBody,
      edge: { mesh: topEdgeMesh, body: topEdgeBody },
    };
  }

  updatePosition(x, z) {
    const randomGapY = Math.random() * 10 - 5;

    // Update posisi pipa bawah
    this.bottomPipe.mesh.position.set(x, randomGapY - this.gap / 4 - (this.height + 40) / 2, z);
    this.bottomPipe.body.position.set(x, randomGapY - this.gap / 4 - (this.height + 40) / 2, z);

    // Update posisi edge bawah (jika ada)
    if (this.bottomPipe.edge) {
      this.bottomPipe.edge.mesh.position.set(x, randomGapY - this.gap / 4, z);
      this.bottomPipe.edge.body.position.set(x, randomGapY - this.gap / 4, z);
    }

    // Update posisi pipa atas
    this.topPipe.mesh.position.set(x, randomGapY + (this.gap - 10) / 2 + this.height + 10 / 2, z);
    this.topPipe.body.position.set(x, randomGapY + this.gap / 2 + this.height + 10 / 2, z);

    // Update posisi edge atas (jika ada)
    if (this.topPipe.edge) {
      this.topPipe.edge.mesh.position.set(x, randomGapY + (this.gap - 10) / 2, z);
      this.topPipe.edge.body.position.set(x, randomGapY + (this.gap - 10) / 2, z);
    }
  }
}

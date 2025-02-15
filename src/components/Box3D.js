import * as THREE from 'three';

export default class Box3D {
	constructor(
		scene,
		loader,
		geometryOptions,
		materialOptions,
		position,
		rotation
	) {
		this.scene = scene;
		this.loader = loader;
		this.geometryOptions = geometryOptions;
		this.materialOptions = materialOptions;
		this.position = position;
		this.rotation = rotation;
		this.mesh = null;
	}

	addBox() {
		const geometry = new THREE.BoxGeometry(...this.geometryOptions);
		const material = new THREE.MeshBasicMaterial(this.materialOptions);
		this.mesh = new THREE.Mesh(geometry, material);
		this.mesh.position.set(...this.position);
		if (this.rotation) {
			this.mesh.rotation.set(...this.rotation);
		}
		this.scene.add(this.mesh);
	}
}

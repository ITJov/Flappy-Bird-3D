
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import KeyboardHelper from "./components/keyboard.js";

// Setup scene, camera, and renderer
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xa0a0a0, 20, 100);

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Pointer lock controls
const controls = new PointerLockControls(camera, document.body);
document.addEventListener('click', () => controls.lock());

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Floor with texture
const textureLoader = new THREE.TextureLoader();
const rockyTexture = textureLoader.load('./assets/textures/rocky_texture.jpg');

rockyTexture.wrapS = rockyTexture.wrapT = THREE.RepeatWrapping;
rockyTexture.repeat.set(10, 10);

const floor = new THREE.Mesh(
	new THREE.PlaneGeometry(100, 100),
	new THREE.MeshStandardMaterial({ map: rockyTexture })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1;
scene.add(floor);

// Bark texture for pipes

const barkColorTexture = textureLoader.load(
	'./assets/textures/Bark014_1K-PNG_Color.png'
);
const barkAOTexure = textureLoader.load(
	'./assets/textures/Bark014_1K-PNG_AmbientOcclusion.png'
);
const barkRoughnessTexture = textureLoader.load(
	'./assets/textures/Bark014_1K-PNG_Roughness.png'
);
const barkNormalTexture = textureLoader.load(
	'./assets/textures/Bark014_1K-PNG_NormalGL.png'
);
[
	barkColorTexture,
	barkAOTexure,
	barkRoughnessTexture,
	barkNormalTexture,
].forEach((tex) => {
	tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
});

const barkMaterial = new THREE.MeshStandardMaterial({
	map: barkColorTexture,
	aoMap: barkAOTexure,
	roughnessMap: barkRoughnessTexture,
	normalMap: barkNormalTexture,
	roughness: 1.0,
	metalness: 0.0,
});

// create pipes
function createPipe(x, z, height, gap) {
	const randomGapY = Math.random() * 10 - 5;

	// Bottom pipe
	const bottomPipeGeometry = new THREE.CylinderGeometry(1, 1, height, 32);
	bottomPipeGeometry.setAttribute(
		'uv2',
		new THREE.BufferAttribute(bottomPipeGeometry.attributes.uv.array, 2)
	);
	const bottomPipe = new THREE.Mesh(bottomPipeGeometry, barkMaterial);
	bottomPipe.position.set(x, randomGapY - gap / 2 - height / 2, z);
	scene.add(bottomPipe);

	// Top pipe
	const topPipeGeometry = new THREE.CylinderGeometry(1, 1, height, 32);
	topPipeGeometry.setAttribute(
		'uv2',
		new THREE.BufferAttribute(topPipeGeometry.attributes.uv.array, 2)
	);
	const topPipe = new THREE.Mesh(topPipeGeometry, barkMaterial);
	topPipe.position.set(x, randomGapY + gap / 2 + height / 2, z);
	scene.add(topPipe);

	// Bottom edge
	const bottomEdge = new THREE.Mesh(
		new THREE.CylinderGeometry(1.5, 1.5, 2, 32),
		barkMaterial
	);
	bottomEdge.position.set(x, randomGapY - gap / 2, z);
	scene.add(bottomEdge);

	// Top edge
	const topEdge = new THREE.Mesh(
		new THREE.CylinderGeometry(1.5, 1.5, 2, 32),
		barkMaterial
	);
	topEdge.position.set(x, randomGapY + gap / 2, z);
	scene.add(topEdge);
}

// Add pipes
for (let i = 0; i < 5; i++) {
	createPipe(i * 15, 0, 20, 10);
}

// skybox
const skyboxLoader = new THREE.CubeTextureLoader();
scene.background = skyboxLoader.load([
	'./assets/skyBox/cube_right.png',
	'./assets/skyBox/cube_left.png',
	'./assets/skyBox/cube_up.png',
	'./assets/skyBox/cube_down.png',
	'./assets/skyBox/cube_back.png',
	'./assets/skyBox/cube_front.png',
]);

//  bird model
const loader = new GLTFLoader();
let bird;
let mixer;
const clock = new THREE.Clock();

loader.load('./assets/objects/phoenix_bird.glb', (gltf) => {
	bird = gltf.scene;
	bird.position.set(0, 1, 0);
	bird.scale.set(0.005, 0.005, 0.005);
	scene.add(bird);

	// Animation for bird
	mixer = new THREE.AnimationMixer(bird);
	if (gltf.animations.length > 0) {
		const action = mixer.clipAction(gltf.animations[0]);
		action.play();
	}
});

// Audio listener and background music
const listener = new THREE.AudioListener();
camera.add(listener);

const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load('./assets/audio/backsound_squid_game.mp3', (buffer) => {
	sound.setBuffer(buffer);
	sound.setLoop(true);
	sound.setVolume(0.5);
	// sound.play();
});

// Animation loop
function animate() {
	requestAnimationFrame(animate);

	const delta = clock.getDelta();
	if (mixer) mixer.update(delta);

	if (bird) {
		bird.position.x += 0.1;
		camera.position.set(
			bird.position.x - 5,
			bird.position.y + 2,
			bird.position.z
		);
		camera.lookAt(bird.position);
	}

	renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

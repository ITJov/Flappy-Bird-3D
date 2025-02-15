import * as THREE from 'three';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import Text3D from './components/Text3D.js';
import Box3D from './components/Box3D.js';
import AudioHelper from "./components/Audio.js";

let scene, camera, renderer;

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		55,
		window.innerWidth / window.innerHeight,
		45,
		30000
	);
	camera.position.set(0, 0, 1000);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	let controls = new OrbitControls(camera, renderer.domElement);
	controls.addEventListener('change', animate);
	controls.minDistance = 500;
	controls.maxDistance = 1500;

	// audio
	const audio = new AudioHelper(camera, "/src/assets/audios/Opening-Flappy Bird.mp3", {
		loop: true,
		volume: 0.5,
		autoplay: true,
	  });
	

	// Skybox
	let materialArray = [];
	let loader = new THREE.TextureLoader();

	let textures = [
		'meadow_ft',
		'meadow_bk',
		'meadow_up',
		'meadow_dn',
		'meadow_rt',
		'meadow_lf',
	].map((name) => loader.load(`./assets/skyBox/${name}.jpg`));

	textures.forEach((texture) => {
		materialArray.push(new THREE.MeshBasicMaterial({ map: texture }));
	});

	materialArray.forEach((material) => {
		material.side = THREE.BackSide;
	});

	let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
	let skyBox = new THREE.Mesh(skyboxGeo, materialArray);
	scene.add(skyBox);

	// Add Flappy Bird 3D Text
	const creditsText = new Text3D(
		scene,
		loader,
		'C R E D I T S   B Y   :',
		{
			size: 30,
			height: 5,
		},
		{ color: 0xffffff },
		[-400, 250, 10]
	);
	creditsText.addText();

	const jejesText = new Text3D(
		scene,
		loader,
		'2 2 7 2 0 0 4   -  J e s s i c a  A l v i n a  L u w i a',
		{
			size: 25,
			height: 1,
		},
		{ color: 0xffffff },
		[-400, 150, 10]
	);
	jejesText.addText();

	const elmoText = new Text3D(
		scene,
		loader,
		'2 2 7 2 0 0 7   -  E l m o s i u s  S u l i',
		{
			size: 25,
			height: 1,
		},
		{ color: 0xffffff },
		[-400, 50, 10]
	);
	elmoText.addText();

	const chirsText = new Text3D(
		scene,
		loader,
		'2 2 7 2 0 1 9   -  C h r i s t o p h e r  W i d j a y a',
		{
			size: 25,
			height: 1,
		},
		{ color: 0xffffff },
		[-400, -50, 10]
	);
	chirsText.addText();

	const chernoText = new Text3D(
		scene,
		loader,
		'2 2 7 2 0 2 3   -  C h e r n o  S a l w a  J o v i a n s y a h a',
		{
			size: 25,
			height: 1,
		},
		{ color: 0xffffff },
		[-400, -150, 10]
	);
	chernoText.addText();

	const josephineText = new Text3D(
		scene,
		loader,
		'2 2 7 2 0 2 9   -  J o s e p h i n e  A l v i n a  L u w i a',
		{
			size: 25,
			height: 1,
		},
		{ color: 0xffffff },
		[-400, -250, 10]
	);
	josephineText.addText();

	// Add Background Box for Text
	const backPanel = new Box3D(
		scene,
		loader,
		[1050, 20, 750],
		{
			map: loader.load('./assets/textures/text_texture.jpeg'),
			color: 0x555555,
		},
		[0, -0, 0],
		[-Math.PI / 2, 0, 0]
	);
	backPanel.addBox();

	// Add Start Button
	const backButton = new Box3D(
		scene,
		loader,
		[240, 20, 100],
		{
			map: loader.load('./assets/textures/text_texture.jpeg'),
			color: 0x555555,
		},
		[-700, 350, 0],
		[-Math.PI / 2, 0, 0]
	);
	backButton.addBox();

	// Add Start Text
	const backText = new Text3D(
		scene,
		loader,
		'BACK',
		{
			size: 20,
			height: 2,
		},
		{ color: 0xffffff },
		[-740, 340, 10]
	);
	backText.addText();

	window.addEventListener('click', (event) => {
		const mouse = new THREE.Vector2(
			(event.clientX / window.innerWidth) * 2 - 1,
			-(event.clientY / window.innerHeight) * 2 + 1
		);
		const raycaster = new THREE.Raycaster();
		raycaster.setFromCamera(mouse, camera);

		const intersects = raycaster.intersectObjects([backButton.mesh]);

		if (intersects.length > 0) {
			const clickedObject = intersects[0].object;
			if (clickedObject === backButton.mesh) {
				window.location.href = 'opening.html';
			}
		}
	});

	animate();
}

function animate() {
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

init();

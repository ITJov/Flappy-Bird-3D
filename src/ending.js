import * as THREE from 'three';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import Text3D from './components/Text3D.js';
import Box3D from './components/Box3D.js';

let scene, camera, renderer;

// Cek apakah halaman telah diakses sebelumnya
if (!localStorage.getItem("fromMain")) {
	// Jika tidak, kembalikan ke halaman openning.html
	window.location.href = "opening.html";
  } else {
	// Jika ya, hapus status untuk mencegah reload kembali ke openning.html
	localStorage.removeItem("fromMain");
  }


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
	const gameoverText = new Text3D(
		scene,
		loader,
		" Ouch, You  Died ! ",
		{
			size: 70,
			height: 5,
		},
		{ color: 0xffffff },
		[-430, 190, 10]
	);
	gameoverText.addText();

	// Add Background Box for Text
	const backPanel = new Box3D(
		scene,
		loader,
		[900, 20, 200],
		{
			map: loader.load('./assets/textures/text_texture.jpeg'),
			color: 0x555555,
		},
		[-30, 230, 0],
		[-Math.PI / 2, 0, 0]
	);
	backPanel.addBox();

	// Add Start Button
	const restartButton = new Box3D(
		scene,
		loader,
		[240, 20, 100],
		{
			map: loader.load('./assets/textures/text_texture.jpeg'),
			color: 0x555555,
		},
		[-200, -90, 0],
		[-Math.PI / 2, 0, 0]
	);
	restartButton.addBox();

	// Add Start Text
	const restartText = new Text3D(
		scene,
		loader,
		'RESTART',
		{
			size: 20,
			height: 2,
		},
		{ color: 0xffffff },
		[-260, -100, 10]
	);
	restartText.addText();

	// Add Credits Button
	const menuButton = new Box3D(
		scene,
		loader,
		[290, 20, 100],
		{
			map: loader.load('./assets/textures/text_texture.jpeg'),
			color: 0x555555,
		},
		[150, -90, 0],
		[-Math.PI / 2, 0, 0]
	);
	menuButton.addBox();

	// Add Credits Text
	const menuText = new Text3D(
		scene,
		loader,
		'BACK TO MENU',
		{
			size: 20,
			height: 2,
		},
		{ color: 0xffffff },
		[50, -100, 10]
	);
	menuText.addText();

	window.addEventListener('click', (event) => {
		const mouse = new THREE.Vector2(
			(event.clientX / window.innerWidth) * 2 - 1,
			-(event.clientY / window.innerHeight) * 2 + 1
		);
		const raycaster = new THREE.Raycaster();
		raycaster.setFromCamera(mouse, camera);

		const intersects = raycaster.intersectObjects([
			restartButton.mesh,
			menuButton.mesh,
		]);

		if (intersects.length > 0) {
			const clickedObject = intersects[0].object;
			if (clickedObject === restartButton.mesh) {
				localStorage.setItem('fromOpening', 'true');
				window.location.href = 'index.html';
			} else if (clickedObject === menuButton.mesh) {
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

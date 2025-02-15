import * as THREE from "three";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
import Text3D from "./components/Text3D.js";
import Box3D from "./components/Box3D.js";
import AudioHelper from "./components/Audio.js";

let scene, camera, renderer;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000);
  camera.position.set(0, 0, 1000);

  const audio = new AudioHelper(camera, "/src/assets/audios/Opening-Flappy Bird.mp3", {
    loop: true,
    volume: 0.5,
    autoplay: true,
  });

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", animate);
  controls.minDistance = 500;
  controls.maxDistance = 1500;

  // Skybox
  let materialArray = [];
  let loader = new THREE.TextureLoader();

  let textures = ["meadow_ft", "meadow_bk", "meadow_up", "meadow_dn", "meadow_rt", "meadow_lf"].map((name) => loader.load(`./assets/skyBox/${name}.jpg`));

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
  const flappyBirdText = new Text3D(
    scene,
    loader,
    "Flappy Bird 3D",
    {
      size: 80,
      height: 5,
    },
    { color: 0xffffff },
    [-400, 200, 10]
  );
  flappyBirdText.addText();

  // Add Background Box for Text
  const backPanel = new Box3D(
    scene,
    loader,
    [900, 20, 200],
    {
      map: loader.load("./assets/textures/text_texture.jpeg"),
      color: 0x555555,
    },
    [-30, 230, 0],
    [-Math.PI / 2, 0, 0]
  );
  backPanel.addBox();

  // Add Start Button
  const startButton = new Box3D(
    scene,
    loader,
    [240, 20, 100],
    {
      map: loader.load("./assets/textures/text_texture.jpeg"),
      color: 0x555555,
    },
    [-200, -90, 0],
    [-Math.PI / 2, 0, 0]
  );
  startButton.addBox();

  // Add Start Text
  const startText = new Text3D(
    scene,
    loader,
    "START",
    {
      size: 20,
      height: 2,
    },
    { color: 0xffffff },
    [-240, -100, 10]
  );
  startText.addText();

  // Add Credits Button
  const creditsButton = new Box3D(
    scene,
    loader,
    [240, 20, 100],
    {
      map: loader.load("./assets/textures/text_texture.jpeg"),
      color: 0x555555,
    },
    [150, -90, 0],
    [-Math.PI / 2, 0, 0]
  );
  creditsButton.addBox();

  // Add Credits Text
  const creditsText = new Text3D(
    scene,
    loader,
    "CREDITS",
    {
      size: 20,
      height: 2,
    },
    { color: 0xffffff },
    [100, -100, 10]
  );
  creditsText.addText();

  window.addEventListener("click", (event) => {
    const mouse = new THREE.Vector2((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects([startButton.mesh, creditsButton.mesh]);

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      if (clickedObject === startButton.mesh) {
        localStorage.setItem("fromOpening", "true");
        window.location.href = "index.html";
      } else if (clickedObject === creditsButton.mesh) {
        window.location.href = "credits.html";
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

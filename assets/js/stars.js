import * as THREE from "three";

let scene, camera, renderer, starGeo, stars;

const starColors = [0xfec5be, 0xffffff, 0xcf9ef9, 0xe3ffe9, 0xfde4b1];
const STAR_RANGE = 300;
const NUM_STARS_FACTOR = 30;
const STAR_SIZE = 1.7;

const init = () => {
  scene = new THREE.Scene();

  const container = document.getElementById("home");
  const width = container.offsetWidth;
  const height = container.offsetHeight + 200;

  camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
  camera.position.z = 1;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  const numStars = Math.floor((width * height) / NUM_STARS_FACTOR);

  starGeo = new THREE.BufferGeometry();
  const positions = [];
  const colors = [];

  for (let i = 0; i < numStars; i++) {
    const x = Math.random() * STAR_RANGE * 2 - STAR_RANGE;
    const y = Math.random() * STAR_RANGE * 2 - STAR_RANGE;
    const z = Math.random() * STAR_RANGE * 2 - STAR_RANGE;

    positions.push(x, y, z);

    const randomColorIndex = Math.floor(Math.random() * starColors.length);
    const color = new THREE.Color(starColors[randomColorIndex]);
    colors.push(color.r, color.g, color.b);
  }

  starGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(positions), 3)
  );
  starGeo.setAttribute(
    "color",
    new THREE.BufferAttribute(new Float32Array(colors), 3)
  );

  let sprite = new THREE.TextureLoader().load("./images/star.webp");
  let starMaterial = new THREE.PointsMaterial({
    size: STAR_SIZE,
    map: sprite,
    alphaTest: 0.5,
    transparent: true,
    vertexColors: true,
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);

  animate();

  window.addEventListener("resize", debounce(onWindowResize, 250));
};

const animate = () => {
  stars.position.z = camera.position.z - 100;
  stars.rotation.x += 0.0010;
  stars.rotation.y += 0.0010;

  const positions = starGeo.getAttribute("position");
  positions.needsUpdate = true;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

const onWindowResize = () => {
  const container = document.getElementById("home");
  const width = container.offsetWidth;
  const height = container.offsetHeight + 200;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
};

const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};

window.onload = () => {
  init();

  const starsContainer = document.getElementById("three-banner");
  starsContainer.appendChild(renderer.domElement);
};

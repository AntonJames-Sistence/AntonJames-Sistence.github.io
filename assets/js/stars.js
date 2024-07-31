import * as THREE from "three";

let scene, camera, renderer, starGeo, stars, planet, planetGlow;
let clock = new THREE.Clock();

const starColors = [0xfec5be, 0xffffff, 0xcf9ef9, 0xe3ffe9, 0xfde4b1];
const STAR_RANGE = 300;
const NUM_STARS_FACTOR = 30;
const STAR_SIZE = 1.7;

const createGlowTexture = () => {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');

  // Create radial gradient
  context.beginPath();
  context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, false);
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.6)');
  gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.2)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  context.fillStyle = gradient;
  context.fill();

  return new THREE.CanvasTexture(canvas);
};

const init = () => {
  scene = new THREE.Scene();

  const container = document.getElementById("home");
  const width = container.offsetWidth;
  const height = container.offsetHeight + 200;

  camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
  camera.position.z = 50; // Move the camera back to see the planet

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

  // Create the black sphere (planet)
  const planetGeometry = new THREE.SphereGeometry(10, 30, 30);
  const blackMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

  planet = new THREE.Mesh(planetGeometry, blackMaterial);
  planet.position.set(5, 10, -60); // Position the planet at the center but further away

  scene.add(planet);

  // Create the glow effect around the planet using the generated texture
  const planetGlowGeometry = new THREE.PlaneGeometry(30, 30);
  const planetGlowTexture = createGlowTexture();
  const planetGlowMaterial = new THREE.SpriteMaterial({ map: planetGlowTexture, transparent: true, blending: THREE.AdditiveBlending });
  planetGlow = new THREE.Sprite(planetGlowMaterial);
  planetGlow.position.set(5, 10, -60);
  planetGlow.scale.set(150, 30, 1); // Adjust the size of the glow
  planetGlow.material.rotation = Math.PI / 4; // Rotate the glow to be at an angle
  scene.add(planetGlow);

  // Add a light source to illuminate the planet and stars
  const light = new THREE.PointLight(0xffffff, 1, 1000);
  light.position.set(0, 0, 100);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040)); // Add ambient light for better visibility

  animate();

  window.addEventListener("resize", debounce(onWindowResize, 250));
};

const animate = () => {
  stars.position.z = camera.position.z - 100;
  stars.rotation.x += 0.0010;
  stars.rotation.y += 0.0010;

  const positions = starGeo.getAttribute("position");
  positions.needsUpdate = true;

  // Rotate the black sphere
  planet.rotation.y += 0.001;

  // Create pulsing effect for the glow
  const elapsedTime = clock.getElapsedTime();
  const scale = 1 + 0.1 * Math.sin(elapsedTime); // Adjust the frequency and amplitude of the pulsing effect
  planetGlow.scale.set(150 * scale, 30 * scale, 1);

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

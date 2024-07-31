import * as THREE from "three";

let scene, camera, renderer, starGeo, stars, planet, planetGlow, circularGlow;
let clock = new THREE.Clock();

const starColors = [0xfec5be, 0xffffff, 0xcf9ef9, 0xe3ffe9, 0xfde4b1];
const STAR_RANGE = 300;
const NUM_STARS_FACTOR = 30;
const STAR_SIZE = 1.7;

const createGlowTexture = () => {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  // Create radial gradient
  context.beginPath();
  context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, false);
  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.6)");
  gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.2)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
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
  camera.position.z = 50; // Move the camera back to see the black hole

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

  // Create the glow effect around the black hole using the generated texture
  const planetGlowTexture = createGlowTexture();
  const planetGlowMaterial = new THREE.SpriteMaterial({
    map: planetGlowTexture,
  });
  planetGlow = new THREE.Sprite(planetGlowMaterial);
  planetGlow.position.set(5, 10, -99);
  planetGlow.scale.set(90, 5, 1); // Adjust the size of the glow
  planetGlow.material.rotation = Math.PI / 4; // Rotate the glow to be at an angle
  scene.add(planetGlow);

  // Create the circular glow around the planet using the generated texture
  const circularGlowMaterial = new THREE.SpriteMaterial({
    map: planetGlowTexture,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });
  circularGlow = new THREE.Sprite(circularGlowMaterial);
  circularGlow.position.set(5, 10, -99); // Ensure it is in front of the planet and other glow
  circularGlow.scale.set(15, 15, 1); // Adjust the size of the circular glow
  scene.add(circularGlow);

  // Add a light source to illuminate the black hole and stars
  // const light = new THREE.PointLight(0xffffff, 1, 1000);
  // light.position.set(0, 0, 100);
  // scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040)); // Add ambient light for better visibility

  animate();
};

const animate = () => {
  stars.position.z = camera.position.z - 100;
  stars.rotation.x += 0.001;
  stars.rotation.y += 0.001;

  const positions = starGeo.getAttribute("position");
  positions.needsUpdate = true;

  // Create pulsing effect for the black hole and the glow
  const elapsedTime = clock.getElapsedTime();
  const scale = 0.5 * (1 + 0.4 * Math.sin(elapsedTime)); // Adjust the frequency and amplitude of the pulsing effect

  planetGlow.scale.set(scale * 90, scale * 5, 1); // Apply the pulsing effect to the glow
  circularGlow.scale.set(scale * 15, scale * 15, 1); // Apply the pulsing effect to the circular glow

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

window.onload = () => {
  init();

  const starsContainer = document.getElementById("three-banner");
  starsContainer.appendChild(renderer.domElement);
};

import * as THREE from "three";

let scene, camera, renderer, starGeo, stars;

const starColors = [0xfec5be, 0xffffff, 0xcf9ef9, 0xe3ffe9, 0xfde4b1];

const init = () => {
  scene = new THREE.Scene();

  // Get the size of the parent element
  const width = document.getElementById("home").offsetWidth;
  const height = document.getElementById("home").offsetHeight;

  camera = new THREE.PerspectiveCamera(
    60,
    width / height,
    1,
    1000,
  );
  camera.position.z = 1;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  starGeo = new THREE.BufferGeometry();
  const positions = [];
  const colors = [];

  for (let i = 0; i < 15000; i++) {
    const x = Math.random() * 500 - 300;
    const y = Math.random() * 500 - 300;
    const z = Math.random() * 500 - 300;

    positions.push(x, y, z);

    const randomColor =
      starColors[Math.floor(Math.random() * starColors.length)];
    const color = new THREE.Color(randomColor);
    colors.push(color.r, color.g, color.b);
  }

  starGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(positions), 3),
  );
  starGeo.setAttribute(
    "color",
    new THREE.BufferAttribute(new Float32Array(colors), 3),
  );

  let sprite = new THREE.TextureLoader().load("./images/star.png");
  let starMaterial = new THREE.PointsMaterial({
    size: 1.7,
    map: sprite,
    alphaTest: 0.5,
    transparent: true,
    vertexColors: true,
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);

  animate();
};

const animate = () => {
  // Move the stars in the opposite direction of the camera's movement
  stars.position.z = camera.position.z - 100;

  // Rotate the stars
  stars.rotation.x += 0.0010;
  stars.rotation.y += 0.0010;

  const positions = starGeo.getAttribute("position");
  positions.needsUpdate = true;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

window.onload = () => {
  init();

  const starsContainer = document.getElementById("three-banner");
  starsContainer.appendChild(renderer.domElement);

  // Handle window resize and adjust renderer size
  window.addEventListener("resize", () => {
    const width = starsContainer.offsetWidth;
    const height = starsContainer.offsetHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
};

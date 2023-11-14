import * as THREE from "three";

let scene, camera, renderer, starGeo, star, stars;

const starColors = [0xfec5be, 0xffffff, 0xcf9ef9, 0xe3ffe9, 0xfde4b1];

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000,
  );
  camera.position.z = 1;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  starGeo = new THREE.BufferGeometry();
  const positions = [];
  const colors = [];

  for (let i = 0; i < 10000; i++) {
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
}

function animate() {
  // Update star positions based on time

  const starPositions = starGeo.attributes.position.array;
  for (let i = 2, l = starPositions.length; i < l; i += 3) {
    starPositions[i] += 1; // You can adjust the speed of the movement here

    // Check if the star is behind the camera
    if (starPositions[i] > 300) {
      starPositions[i] = -200; // Reset the star position in front of the camera
    }
  }

  starGeo.attributes.position.needsUpdate = true; // Update the buffer geometry

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.onload = () => {
  init();

  const starsContainer = document.getElementById("three-banner");
  starsContainer.appendChild(renderer.domElement);
};

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

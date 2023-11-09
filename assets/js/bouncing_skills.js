import * as THREE from 'three';

let scene, camera, renderer, icons;

const skillIcons = [
  './images/skills/next.png',
  './images/skills/python.png',
  './images/skills/react.png',
  // Add more skill icons as needed
];

const bannerContainer = document.getElementById('three-banner');

const init = () => {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 1;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(bannerContainer.clientWidth, bannerContainer.clientHeight);

  icons = new THREE.Group();
  scene.add(icons);

  createIcons();

  animate();
};

const createIcons = () => {
  skillIcons.forEach((iconPath) => {
    const iconTexture = new THREE.TextureLoader().load(iconPath);
    const iconMaterial = new THREE.SpriteMaterial({ map: iconTexture });
    const icon = new THREE.Sprite(iconMaterial);

    // Set random initial position within the scene
    icon.position.x = (Math.random() - 0.5) * 10;
    icon.position.y = (Math.random() - 0.5) * 10;
    icon.position.z = (Math.random() - 0.5) * 10;

    // Set a random rotation
    icon.rotation.x = Math.random() * Math.PI;
    icon.rotation.y = Math.random() * Math.PI;

    // Set a random scale
    const scale = Math.random() * 0.5 + 0.5; // Random scale between 0.5 and 1.0
    icon.scale.set(scale, scale, scale);

    icons.add(icon);
  });
};

const animate = () => {
  // Update icon positions
  icons.children.forEach((icon) => {
    icon.position.x += 0.005 * (Math.random() - 0.5);
    icon.position.y += 0.005 * (Math.random() - 0.5);
    icon.position.z += 0.005 * (Math.random() - 0.5);

    // Bounce back when hitting borders
    if (Math.abs(icon.position.x) > 5) icon.position.x *= -1;
    if (Math.abs(icon.position.y) > 5) icon.position.y *= -1;
    if (Math.abs(icon.position.z) > 5) icon.position.z *= -1;
  });

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

window.onload = () => {
  init();

  // Select the #three-banner element and append the renderer's domElement to it
//   const bannerContainer = document.getElementById('three-banner');
  bannerContainer.appendChild(renderer.domElement);
};

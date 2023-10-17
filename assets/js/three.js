import * as THREE from 'three';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer and add it to the DOM
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-container').appendChild(renderer.domElement);

// Create a smoke particle system
const smokeGeometry = new THREE.BufferGeometry();
const smokeMaterial = new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.1 });

const smokeParticles = new THREE.Points(smokeGeometry, smokeMaterial);
scene.add(smokeParticles);

// Set up the smoke particles' positions and animation
const smokeCount = 1000;
const positions = new Float32Array(smokeCount * 3);

for (let i = 0; i < smokeCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
}

smokeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Animate the smoke particles (e.g., make them rise)
function animateSmoke() {
    const positionAttribute = smokeGeometry.getAttribute('position');

    for (let i = 0; i < smokeCount; i++) {
        positionAttribute.setXYZ(i, positionAttribute.getX(i), positionAttribute.getY(i) + 0.01, positionAttribute.getZ(i));
    }

    positionAttribute.needsUpdate = true;
}

// Call the animateSmoke function in your animation loop
function animate() {
    requestAnimationFrame(animate);
    animateSmoke();
    // Other animations and rendering code here
    renderer.render(scene, camera);
}
animate();

import * as THREE from 'three';

let scene, camera, renderer, starGeo, stars;

const starColors = [0xfec5be, 0xffffff, 0xcf9ef9, 0xe3ffe9, 0xfde4b1];

const init = () => {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,1, 1000);
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

        // Choose a random color from the starColors array
        const randomColor = starColors[Math.floor(Math.random() * starColors.length)];
        const color = new THREE.Color(randomColor);
        colors.push(color.r, color.g, color.b);
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

    let sprite = new THREE.TextureLoader().load('./images/star.png');
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
    // Rotate the stars
    stars.rotation.x += 0.0015;
    stars.rotation.y += 0.0015;
  
    // Access the position attribute of the starGeo
    const positions = starGeo.getAttribute('position');
  
    // Mark the attribute as needing update
    positions.needsUpdate = true;
  
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};
  

window.onload = () => {
  init();

  // Select the #stars-container element and append the renderer's domElement to it
  const starsContainer = document.getElementById('three-banner');
  starsContainer.appendChild(renderer.domElement);
};
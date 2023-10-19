import * as THREE from 'three';

let scene, camera, renderer, starGeo, stars;

const starColors = [0xfa8072, 0xffffff, 0xffd700, 0x00ffff, 0x4b0082];

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
  
    // Iterate through each star's position and move them towards the camera
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
  
      // Calculate the new position by moving stars towards the camera (negative Z direction)
      const speed = 0.05; // Adjust this value to control the speed of the stars
      const newZ = z - speed;
  
      // Check if the star is too close to the camera, and reset its position
      // if (newZ < -300) {
      //   // Reset the star's position far in the positive Z direction
      //   positions.setXYZ(i, Math.random() * 600 - 300, Math.random() * 600 - 300, 600);
      // } else {
      //   positions.setXYZ(i, x, y, newZ);
      // }
    }
  
    // Mark the attribute as needing update
    positions.needsUpdate = true;
  
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};
  

window.onload = () => {
  init();

  // Select the #stars-container element and append the renderer's domElement to it
  const starsContainer = document.getElementById('banner');
  starsContainer.appendChild(renderer.domElement);
};
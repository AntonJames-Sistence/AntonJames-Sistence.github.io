import * as THREE from 'three';

let scene, camera, renderer, starGeo, stars, star;

const init = () => {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI/2;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    starGeo = new THREE.BufferGeometry();
    const positions = [];
    for (let i = 0; i < 6000; i++) {
        positions.push(
            Math.random() * 800 - 300,
            Math.random() * 800 - 300,
            Math.random() * 800 - 300
        );
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));

    // ===========
    // ===========

    let sprite = new THREE.TextureLoader().load('star.png');
    let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.9,
        map: sprite
    });

    stars = new THREE.Points(starGeo,starMaterial);
    scene.add(stars);

    animate();
};

const animate = () => {
    // Rotate the stars
    stars.rotation.x += 0.0005;
    stars.rotation.y += 0.0005;
  
    // Access the position attribute of the starGeo
    const positions = starGeo.getAttribute('position');
  
    // Iterate through each star's position and apply animation
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
  
      // Apply animation to the stars (e.g., make them twinkle)
    const time = Date.now() * 0.00005;
    const newX = x + Math.sin(time + i) * 1;
    const newY = y + Math.sin(time + i) * 1;
    const newZ = z + Math.sin(time + i) * 1;

    // Update the position attribute with the animated values
    positions.setXYZ(i, newX, newY, newZ);
}
  
    // Mark the attribute as needing update
    positions.needsUpdate = true;
  
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

window.onload = () => {
  init();

  // Select the #stars-container element and append the renderer's domElement to it
  const starsContainer = document.getElementById('stars-container');
  starsContainer.appendChild(renderer.domElement);
};
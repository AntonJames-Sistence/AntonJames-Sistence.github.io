import * as THREE from 'three';

let scene, camera, renderer, starGeo, stars, star;

const init = () => {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI/2;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    

    // document.body.appendChild(renderer.domElement);

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


    let sprite = new THREE.TextureLoader().load('star.png');
    let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.7,
        map: sprite
    });

    stars = new THREE.Points(starGeo,starMaterial);
    scene.add(stars);

    animate();
}

const animate = () => {
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}

window.onload = () => {
  init();

  // Select the #stars-container element and append the renderer's domElement to it
  const starsContainer = document.getElementById('stars-container');
  starsContainer.appendChild(renderer.domElement);
};
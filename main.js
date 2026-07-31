import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";
import { createStadium } from "./game/stadium.js";

// =========================
// Scene
// =========================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// =========================
// Camera
// =========================
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 28, 32);
camera.lookAt(0, 0, 0);

// =========================
// Renderer
// =========================
const canvas = document.getElementById("gameCanvas");

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

// =========================
// Lights
// =========================
const ambient = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambient);

const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(30, 50, 20);
sun.castShadow = true;
scene.add(sun);

// =========================
// Stadium
// =========================
createStadium(scene);

// =========================
// Resize
// =========================
window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});

// =========================
// Animation Loop
// =========================
function animate() {

    requestAnimationFrame(animate);

    renderer.render(scene, camera);

}

animate();

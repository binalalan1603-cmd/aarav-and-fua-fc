import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

export function createStadium(scene) {

    // Grass
    const grass = new THREE.Mesh(
        new THREE.PlaneGeometry(110, 70),
        new THREE.MeshStandardMaterial({
            color: 0x2e8b57
        })
    );

    grass.rotation.x = -Math.PI / 2;
    grass.receiveShadow = true;
    scene.add(grass);

    // White pitch lines
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff
    });

    const points = [
        new THREE.Vector3(-50, 0.03, -32),
        new THREE.Vector3(50, 0.03, -32),
        new THREE.Vector3(50, 0.03, 32),
        new THREE.Vector3(-50, 0.03, 32),
        new THREE.Vector3(-50, 0.03, -32)
    ];

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    scene.add(new THREE.Line(geometry, lineMaterial));

    // Halfway line
    const half = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0.03, -32),
        new THREE.Vector3(0, 0.03, 32)
    ]);

    scene.add(new THREE.Line(half, lineMaterial));

    // Centre circle
    const circlePoints = [];

    for (let i = 0; i <= 64; i++) {

        const angle = (i / 64) * Math.PI * 2;

        circlePoints.push(
            new THREE.Vector3(
                Math.cos(angle) * 9,
                0.03,
                Math.sin(angle) * 9
            )
        );

    }

    const circle = new THREE.BufferGeometry().setFromPoints(circlePoints);

    scene.add(new THREE.Line(circle, lineMaterial));

    // Goals
    createGoal(scene, -50);
    createGoal(scene, 50);

}

function createGoal(scene, x) {

    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff
    });

    const leftPost = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 3),
        material
    );

    leftPost.position.set(x, 1.5, -4);
    scene.add(leftPost);

    const rightPost = leftPost.clone();
    rightPost.position.z = 4;
    scene.add(rightPost);

    const crossbar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 8),
        material
    );

    crossbar.rotation.z = Math.PI / 2;
    crossbar.position.set(x, 3, 0);

    scene.add(crossbar);

}

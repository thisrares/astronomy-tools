import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { stars, toCartesianCoordinates } from "./particlesCoordinates.js";
import { constellations, cartesianConstellations } from './constellationsCoordinates.js';
import { constellationsLines } from './constellationsLines.js';
import particlesVertexShader from './shaders/particles/vertex.glsl';
import particlesFragmentShader from './shaders/particles/fragment.glsl';


console.log(cartesianConstellations(10));

//Cursor
const cursor = {
    x: 0,
    y: 0
};

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    //Update renderer
    renderer.setSize(sizes.width, sizes.height);
    // renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');


// Scene
const scene = new THREE.Scene();

// set Sphere radius
let r = 2;

// Add axes to your scene
const axesHelper = new THREE.AxesHelper(1); // 1 is the length of the axes
scene.add(axesHelper);


// // Object
// const mesh = new THREE.Mesh(
//     new THREE.SphereGeometry(r, 32, 32),
//     new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true})
// );
// scene.add(mesh);


/**
 * Particles (stars)
 */
//Geometry
const particlesGeomtery = new THREE.BufferGeometry();
const particlesPositions = toCartesianCoordinates(r, stars);
particlesGeomtery.setAttribute(
    'position',
    new THREE.BufferAttribute(particlesPositions, 3)
);
// console.log(particlesPositions);

//Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.01,
    sizeAttenuation: true
});

// const particlesMaterial = new THREE.RawShaderMaterial({
//     vertexShader: particlesVertexShader,
//     fragmentShader: particlesFragmentShader
// });

const particles = new THREE.Points(particlesGeomtery, particlesMaterial);
scene.add(particles);

/**
 * Equator
 */
const lineGeometry = new THREE.BufferGeometry();
const count = 100;
const linePoints = new Float32Array(count * 3);
const step = 2 *Math.PI / count;
for (let i = 0; i < count; i ++) {
    linePoints[i*3] = r * Math.cos(i * step);
    linePoints[i*3 + 1] = 0;
    linePoints[i*3 + 2] = r * Math.sin(i * step);
}
lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePoints, 3));
const lineMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const equator = new THREE.LineLoop(lineGeometry, lineMaterial);
scene.add(equator);

/**
 * Constellations Lines
 */
const constellationsArray = constellationsLines(cartesianConstellations(r));
for (let i = 0; i < constellationsArray.length; i++) {
    scene.add(constellationsArray[i]);
}


// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();

// window.addEventListener('click', (event) => {
//     // Convert mouse to normalized device coordinates (-1 to +1)
//     mouse.x = (event.clientX / sizes.width) * 2 - 1;
//     mouse.y = -(event.clientY / sizes.height) * 2 + 1;

//     raycaster.setFromCamera(mouse, camera);

//     const intersects = raycaster.intersectObjects(points);

//     if (intersects.length > 0) {
//         console.log('Point clicked!', intersects[0].object);
//         intersects[0].object.material.color.set(0xffffff); // Example: change color
//     }
// });


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100);

camera.position.z = 2;
// camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 2;
// controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();

    // // Update objects
    // mesh.rotation.y = elapsedTime;

    // //Update camera
    // // camera.position.x = cursor.x * 3;
    // camera.position.y = cursor.y * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.lookAt(mesh.position);

    //Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
/**
 * WHEELUP GANGZ - Three.js Main Entry
 * 3D Interactive Homepage Experience
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// =============================================
// GLOBAL VARIABLES
// =============================================

let scene, camera, renderer, controls;
let wheel, particles, logo;
let scrollY = 0;
let targetScrollY = 0;
let mouseX = 0, mouseY = 0;
let isInitialized = false;

// Scene sections for scroll-based navigation
const sections = {
    hero: { start: 0, end: 0.25 },
    about: { start: 0.25, end: 0.5 },
    gallery: { start: 0.5, end: 0.75 },
    contact: { start: 0.75, end: 1 }
};

// =============================================
// WEBGL CHECK
// =============================================

function checkWebGL() {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext &&
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
}

// =============================================
// INITIALIZATION
// =============================================

function init() {
    // Check WebGL support
    if (!checkWebGL()) {
        document.getElementById('webgl-fallback').classList.remove('hidden');
        return;
    }

    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.Fog(0x0a0a0a, 5, 50);

    // Create camera
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 8);

    // Create renderer
    const container = document.getElementById('three-container');
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Add lights
    createLights();

    // Create 3D objects
    createWheel();
    createParticles();
    createAmbientObjects();

    // Setup controls (disabled for production, enable for debug)
    // controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;

    // Event listeners
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('mousemove', onMouseMove);

    // Mark as initialized
    isInitialized = true;

    // Start animation
    animate();

    console.log('🎮 Three.js scene initialized');
}

// =============================================
// LIGHTS
// =============================================

function createLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Main directional light
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    // White rim light
    const rimLight = new THREE.PointLight(0xffffff, 2, 20);
    rimLight.position.set(-5, 2, 3);
    scene.add(rimLight);

    // Back fill light (cool tone for contrast)
    const fillLight = new THREE.PointLight(0x8888ff, 0.3, 15);
    fillLight.position.set(3, -3, -5);
    scene.add(fillLight);
}

// =============================================
// 3D WHEEL (PROCEDURAL)
// =============================================

function createWheel() {
    wheel = new THREE.Group();
    wheel.userData = { rotationSpeed: 0.002 };

    // Wheel parameters
    const rimRadius = 2;
    const rimThickness = 0.15;
    const hubRadius = 0.4;
    const spokeCount = 32;

    // Create rim (torus)
    const rimGeometry = new THREE.TorusGeometry(rimRadius, rimThickness, 16, 64);
    const rimMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.2,
        envMapIntensity: 1
    });
    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    wheel.add(rim);

    // Create tire (outer torus)
    const tireGeometry = new THREE.TorusGeometry(rimRadius + 0.1, 0.12, 8, 64);
    const tireMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        metalness: 0.1,
        roughness: 0.9
    });
    const tire = new THREE.Mesh(tireGeometry, tireMaterial);
    wheel.add(tire);

    // Create hub
    const hubGeometry = new THREE.CylinderGeometry(hubRadius, hubRadius, 0.3, 32);
    const hubMaterial = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.95,
        roughness: 0.1
    });
    const hub = new THREE.Mesh(hubGeometry, hubMaterial);
    hub.rotation.x = Math.PI / 2;
    wheel.add(hub);

    // Create spokes
    const spokeMaterial = new THREE.MeshStandardMaterial({
        color: 0xdddddd,
        metalness: 0.8,
        roughness: 0.3
    });

    for (let i = 0; i < spokeCount; i++) {
        const angle = (i / spokeCount) * Math.PI * 2;
        const spokeLength = rimRadius - hubRadius - 0.1;

        const spokeGeometry = new THREE.CylinderGeometry(0.015, 0.015, spokeLength, 6);
        const spoke = new THREE.Mesh(spokeGeometry, spokeMaterial);

        spoke.position.x = Math.cos(angle) * (hubRadius + spokeLength / 2);
        spoke.position.y = Math.sin(angle) * (hubRadius + spokeLength / 2);
        spoke.rotation.z = angle - Math.PI / 2;

        wheel.add(spoke);
    }

    // Create gear/chainring
    createGear(wheel);

    // Position and rotate wheel
    wheel.rotation.x = 0.3;
    wheel.rotation.y = -0.4;

    // Responsive wheel position - center on mobile, slightly left on desktop
    const isMobile = window.innerWidth < 768;
    wheel.position.set(isMobile ? 0 : -1, 0, 0);

    scene.add(wheel);
}

function createGear(parent) {
    const gearGroup = new THREE.Group();

    // Gear parameters
    const gearRadius = 0.6;
    const toothCount = 24;
    const toothHeight = 0.1;

    // Create gear base
    const gearGeometry = new THREE.CylinderGeometry(gearRadius, gearRadius, 0.08, 32);
    const gearMaterial = new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        metalness: 0.95,
        roughness: 0.15
    });
    const gearBase = new THREE.Mesh(gearGeometry, gearMaterial);
    gearBase.rotation.x = Math.PI / 2;
    gearGroup.add(gearBase);

    // Create gear teeth
    for (let i = 0; i < toothCount; i++) {
        const angle = (i / toothCount) * Math.PI * 2;

        const toothGeometry = new THREE.BoxGeometry(0.08, toothHeight, 0.08);
        const tooth = new THREE.Mesh(toothGeometry, gearMaterial);

        tooth.position.x = Math.cos(angle) * (gearRadius + toothHeight / 2);
        tooth.position.y = Math.sin(angle) * (gearRadius + toothHeight / 2);
        tooth.position.z = 0;
        tooth.rotation.z = angle;

        gearGroup.add(tooth);
    }

    // Center hole
    const holeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 16);
    const holeMaterial = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        metalness: 0.5,
        roughness: 0.5
    });
    const hole = new THREE.Mesh(holeGeometry, holeMaterial);
    hole.rotation.x = Math.PI / 2;
    hole.position.z = 0.01;
    gearGroup.add(hole);

    gearGroup.position.z = 0.05;
    parent.add(gearGroup);
}

// =============================================
// PARTICLES SYSTEM
// =============================================

function createParticles() {
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        // Random positions in a sphere
        const radius = 5 + Math.random() * 15;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi) - 5;

        sizes[i] = Math.random() * 3 + 1;

        // All white particles
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
    });

    particles = new THREE.Points(geometry, material);
    particles.userData = { originalPositions: positions.slice() };
    scene.add(particles);
}

// =============================================
// AMBIENT OBJECTS (Floating Triangles)
// =============================================

function createAmbientObjects() {
    const triangleGroup = new THREE.Group();

    const triangleMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
    });

    for (let i = 0; i < 10; i++) {
        const size = 0.1 + Math.random() * 0.2;
        const triangleShape = new THREE.Shape();
        triangleShape.moveTo(0, size);
        triangleShape.lineTo(-size * 0.6, -size * 0.5);
        triangleShape.lineTo(size * 0.6, -size * 0.5);
        triangleShape.lineTo(0, size);

        const geometry = new THREE.ShapeGeometry(triangleShape);
        const triangle = new THREE.Mesh(geometry, triangleMaterial.clone());

        triangle.position.set(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10 - 5
        );

        triangle.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );

        triangle.userData = {
            speed: 0.001 + Math.random() * 0.002,
            rotSpeed: (Math.random() - 0.5) * 0.01,
            floatOffset: Math.random() * Math.PI * 2
        };

        triangleGroup.add(triangle);
    }

    scene.add(triangleGroup);
    scene.userData.triangles = triangleGroup;
}

// =============================================
// EVENT HANDLERS
// =============================================

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Update wheel position for responsive layout
    if (wheel) {
        const isMobile = window.innerWidth < 768;
        wheel.position.x = isMobile ? 0 : -1;
    }
}

function onScroll() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    targetScrollY = window.scrollY / scrollHeight;

    // Update scroll progress bar
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
        progressBar.style.width = `${targetScrollY * 100}%`;
    }
}

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

// =============================================
// ANIMATION LOOP
// =============================================

function animate() {
    requestAnimationFrame(animate);

    if (!isInitialized) return;

    // Smooth scroll interpolation
    scrollY += (targetScrollY - scrollY) * 0.05;

    // Animate wheel
    if (wheel) {
        // Constant rotation
        wheel.rotation.z += wheel.userData.rotationSpeed;

        // Mouse parallax
        wheel.rotation.x = 0.3 + mouseY * 0.1;
        wheel.rotation.y = -0.4 + mouseX * 0.15;

        // Scroll-based position
        wheel.position.y = scrollY * -3;
        wheel.position.z = scrollY * -5;
    }

    // Animate particles
    if (particles) {
        particles.rotation.y += 0.0003;
        particles.rotation.x += 0.0001;

        // Scroll-based spread
        const positions = particles.geometry.attributes.position.array;
        const original = particles.userData.originalPositions;
        const spread = 1 + scrollY * 0.5;

        for (let i = 0; i < positions.length; i++) {
            positions[i] = original[i] * spread;
        }
        particles.geometry.attributes.position.needsUpdate = true;
    }

    // Animate triangles
    if (scene.userData.triangles) {
        const time = Date.now() * 0.001;
        scene.userData.triangles.children.forEach(triangle => {
            triangle.rotation.x += triangle.userData.rotSpeed;
            triangle.rotation.y += triangle.userData.rotSpeed * 0.5;
            triangle.position.y += Math.sin(time + triangle.userData.floatOffset) * 0.002;
        });
    }

    // Camera scroll animation
    const cameraZ = 8 - scrollY * 5;
    const cameraY = scrollY * 2;
    camera.position.z = cameraZ;
    camera.position.y = cameraY;
    camera.lookAt(0, scrollY * 2, -scrollY * 5);

    renderer.render(scene, camera);
}

// =============================================
// INTEGRATION WITH LOADING SCREEN
// =============================================

function onLoadingComplete() {
    // Show main content
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.classList.remove('hidden');
        mainContent.classList.add('visible');
    }
}

// Listen for loading complete
window.addEventListener('loadingComplete', onLoadingComplete);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for loading screen to complete
    const checkLoading = setInterval(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen && loadingScreen.classList.contains('fade-out')) {
            clearInterval(checkLoading);
            onLoadingComplete();
        }
    }, 100);

    // Initialize Three.js
    init();
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (renderer) {
        renderer.dispose();
    }
});

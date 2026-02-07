// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

// RENDERER
const renderer = new THREE.WebGLRenderer({ alpha: true });
const hero = document.querySelector(".hero");
renderer.setSize(hero.offsetWidth, hero.offsetHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById("three-hero").appendChild(renderer.domElement);
const hero = document.querySelector(".hero");
camera.aspect = hero.offsetWidth / hero.offsetHeight;
camera.updateProjectionMatrix();
renderer.setSize(hero.offsetWidth, hero.offsetHeight);



// PARTICLES
const particlesCount = 1500;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: 0.03,
    transparent: true,
    opacity: 0.8
});

const particles = new THREE.Points(
    particlesGeometry,
    particlesMaterial
);
scene.add(particles);

// MOUSE
const mouse = {
    x: 0,
    y: 0
};

window.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = -(event.clientY / window.innerHeight - 0.5) * 2;
});

// ANIMATION
function animate() {
    requestAnimationFrame(animate);

    particles.rotation.y += 0.0008;
    particles.rotation.x += 0.0003;

    particles.rotation.y += mouse.x * 0.002;
    particles.rotation.x += mouse.y * 0.002;

    renderer.render(scene, camera);
}
animate();

// RESIZE
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
// RESIZE
window.addEventListener("resize", () => {
    const hero = document.querySelector(".hero");
    camera.aspect = hero.offsetWidth / hero.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(hero.offsetWidth, hero.offsetHeight);
});

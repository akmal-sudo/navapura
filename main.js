/* ==========================================================
   1) PARTICLE BACKGROUND
========================================================== */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 150; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 1 + Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00e5ff";

    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;

        ctx.fillRect(p.x, p.y, p.size, p.size);
    });

    requestAnimationFrame(animateParticles);
}
animateParticles();

/* ==========================================================
   2) PROCEDURAL THREE.JS HOLOGRAM CITY
========================================================== */
const cityCanvas = document.getElementById("city");
const renderer = new THREE.WebGLRenderer({ canvas: cityCanvas, antialias: true, alpha: true });
renderer.setSize(cityCanvas.clientWidth, cityCanvas.clientHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, cityCanvas.clientWidth / cityCanvas.clientHeight, 0.1, 1000);
camera.position.set(15, 25, 30);

const hologramMaterial = new THREE.MeshBasicMaterial({
    color: "#00f6ff",
    wireframe: true
});

// Build procedural buildings
for (let i = 0; i < 80; i++) {
    const geometry = new THREE.BoxGeometry(
        1 + Math.random() * 3,
        4 + Math.random() * 15,
        1 + Math.random() * 3
    );

    const mesh = new THREE.Mesh(geometry, hologramMaterial);

    mesh.position.x = (Math.random() - 0.5) * 30;
    mesh.position.z = (Math.random() - 0.5) * 30;
    mesh.position.y = geometry.parameters.height / 2;

    scene.add(mesh);
}

// Soft blue glow light
const light = new THREE.PointLight("#00eaff", 4, 100);
light.position.set(0, 20, 10);
scene.add(light);

function animateCity() {
    scene.rotation.y += 0.002;
    renderer.render(scene, camera);
    requestAnimationFrame(animateCity);
}
animateCity();

/* ==========================================================
   3) LIVE STATS SIMULATION
========================================================== */
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(() => {
    document.getElementById("traffic").textContent = randomRange(30, 95) + "%";
    document.getElementById("grid").textContent = randomRange(48, 52) + " Hz";
    document.getElementById("health").textContent = randomRange(2, 14);
}, 1200);

/* ==========================================================
   4) GSAP SCROLL ANIMATIONS
========================================================== */
gsap.utils.toArray("section").forEach((section) => {
    gsap.from(section, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        scrollTrigger: {
            trigger: section,
            start: "top 85%"
        }
    });
});

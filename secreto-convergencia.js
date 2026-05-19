// =========================
// 1. LLUVIA CON CANVAS
// =========================
const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const drops = [];
const DROP_COUNT = 200;
for (let i = 0; i < DROP_COUNT; i++) {
    drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 4 + Math.random() * 12,
        length: 8 + Math.random() * 14,
        opacity: 0.3 + Math.random() * 0.5
    });
}

function drawRain() {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    for (let drop of drops) {
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.strokeStyle = `rgba(200, 220, 255, ${drop.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

function updateRain() {
    for (let drop of drops) {
        drop.y += drop.speed;
        if (drop.y > height) {
            drop.y = -drop.length;
            drop.x = Math.random() * width;
        }
    }
}

function animateRain() {
    updateRain();
    drawRain();
    requestAnimationFrame(animateRain);
}
animateRain();

// =========================
// 2. SONIDO DE MÁQUINA DE ESCRIBIR AL CARGAR
// =========================
const typewriterSound = document.getElementById('typewriterSound');
if (typewriterSound) {
    // Pequeño retraso para dar ambiente
    setTimeout(() => {
        typewriterSound.play().catch(e => console.log);
    }, 500);
}

// =========================
// 3. BOTÓN VIAJAR A LONDRES
// =========================
const travelBtn = document.getElementById('viajarLondres');
const flashDiv = document.getElementById('convergencia-flash');
const cameraSound = document.getElementById('cameraSound');
const trainSound = document.getElementById('trainSound');

function activarFlash() {
    if (cameraSound) {
        cameraSound.currentTime = 0;
        cameraSound.play().catch(e => console.log);
    }
    flashDiv.classList.remove('flash-active');
    void flashDiv.offsetWidth;
    flashDiv.classList.add('flash-active');
}

travelBtn.addEventListener('click', () => {
    // Sonido de tren al partir
    if (trainSound) {
        trainSound.currentTime = 0;
        trainSound.play().catch(e => console.log);
    }
    activarFlash();
    setTimeout(() => {
        // Redirigir a Londres (paddington-index.html o similar)
        window.location.href = "capitulo-paddington.html";  // Ajusta según tu página de Londres
    }, 500);
});
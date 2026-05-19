// Lluvia con canvas (igual que antes)
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

// Sonido ambiental (se activa con primer clic)
const stadiumSound = document.getElementById('estadioAmbience');
document.body.addEventListener('click', () => {
    if (stadiumSound && stadiumSound.paused) {
        stadiumSound.play().catch(e => console.log);
    }
}, { once: true });

// Botón a la convergencia (estación de tren)
const trainBtn = document.getElementById('toTrainBtn');
const flashDiv = document.getElementById('estadio-flash');
const cameraSound = document.getElementById('cameraSound');

function activarFlash() {
    if (cameraSound) {
        cameraSound.currentTime = 0;
        cameraSound.play().catch(e => console.log);
    }
    flashDiv.classList.remove('flash-active');
    void flashDiv.offsetWidth;
    flashDiv.classList.add('flash-active');
}

trainBtn.addEventListener('click', () => {
    activarFlash();
    setTimeout(() => {
        // Aquí debes poner la URL de la página de convergencia hacia Londres
        window.location.href = "secreto-convergencia.html"; 
    }, 400);
});
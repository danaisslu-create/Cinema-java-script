// LLUVIA (mismo código)
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
for (let i = 0; i < 180; i++) {
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

// FLASH Y SONIDOS
const flash = document.getElementById('medianeras-flash');
const clickSound = document.getElementById('clickSound');
const cameraSound = document.getElementById('cameraSound');

function activarFlash() {
    if (cameraSound) {
        cameraSound.currentTime = 0;
        cameraSound.play().catch(e=>console.log);
    }
    if (clickSound) clickSound.play().catch(e=>console.log);
    flash.classList.remove('flash-active');
    void flash.offsetWidth;
    flash.classList.add('flash-active');
}

// BOTÓN VIAJAR A EL SECRETO DE SUS OJOS
const viajarBtn = document.getElementById('viajarBtn');
viajarBtn.addEventListener('click', () => {
    activarFlash();
    setTimeout(() => {
        window.location.href = "elsecretodesusojos.html";
    }, 500);
});
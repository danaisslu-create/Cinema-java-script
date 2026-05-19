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
const DROP_COUNT = 180;
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
// 2. RADIO INTERACTIVA
// =========================
const activateBtn = document.getElementById('activateRadioBtn');
const radioSignal = document.getElementById('radioSignal');
const visualizer = document.getElementById('visualizer');
const nowPlayingSpan = document.getElementById('nowPlayingTrack');
const clickSound = document.getElementById('clickSound');
const flashDiv = document.getElementById('radio-flash');

// Lista de canciones para simular "Now Playing" (tangos y temas de la película)
const playlistTracks = [
    "🎶 Volver — Carlos Gardel",
    "🎵 Por una cabeza — Carlos Gardel",
    "💃 El día que me quieras — Gardel",
    "📖 La pregunta de sus ojos — OST",
    "🚉 Estación de tren — Federico Jusid",
    "🏟️ El estadio — Federico Jusid",
    "✉️ TE AMO — Banda sonora",
    "🕯️ Recuerdos — Federico Jusid"
];

let trackIndex = 0;
let animationInterval = null;

function activarRadio() {
    // Activar ondas y visualizador
    radioSignal.classList.add('active');
    visualizer.classList.add('playing');
    
    // Efecto de neón
    const neonDiv = document.createElement('div');
    neonDiv.classList.add('neon-flash');
    document.body.appendChild(neonDiv);
    
    // Sonido de clic
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log);
    }
    
    // Flash blanco adicional
    flashDiv.classList.remove('flash-active');
    void flashDiv.offsetWidth;
    flashDiv.classList.add('flash-active');
    
    // Cambiar "Now Playing" cada 5 segundos
    if (animationInterval) clearInterval(animationInterval);
    animationInterval = setInterval(() => {
        trackIndex = (trackIndex + 1) % playlistTracks.length;
        nowPlayingSpan.innerText = playlistTracks[trackIndex];
        // pequeña animación de fade
        nowPlayingSpan.style.transition = 'opacity 0.15s';
        nowPlayingSpan.style.opacity = '0.5';
        setTimeout(() => { nowPlayingSpan.style.opacity = '1'; }, 150);
    }, 5000);
    
    // Eliminar el neón tras la animación
    setTimeout(() => {
        if (neonDiv && neonDiv.parentNode) neonDiv.remove();
    }, 1000);
    
    // Mensaje en consola (opcional)
    console.log("Radio Buenos Aires activada");
}

activateBtn.addEventListener('click', activarRadio);

// Limpiar intervalo al salir de la página
window.addEventListener('beforeunload', () => {
    if (animationInterval) clearInterval(animationInterval);
});
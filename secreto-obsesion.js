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
// 2. DATOS DE RECUERDOS (claves exactas)
// =========================
const recuerdosData = {
    "carta1": {
        titulo: "✉️ Primera carta",
        img: "ASSETS/Imagenes/carta-amor.jpg",
        desc: "“Querido Benjamín: Te escribo desde el silencio. Nunca me atreví a decirte que...” (la carta está incompleta, manchada por la lluvia)."
    },
    "foto-tren": {
        titulo: "🚂 Foto en la estación",
        img: "ASSETS/Imagenes/foto-tren.jpg",
        desc: "Una fotografía vieja. Irene y Benjamín en el andén, mirándose como si supieran que sería la última vez."
    },
    "diario": {
        titulo: "📓 Página del diario",
        img: "ASSETS/Imagenes/diario-viejo.jpg",
        desc: "“25 de junio de 1999. Hoy lo vi. Me sonrió. Y no pude decirle nada.”"
    }
};

// Popup genérico
const popup = document.getElementById('recuerdoPopup');
const popupTitulo = document.getElementById('popupTitulo');
const popupImagen = document.getElementById('popupImagen');
const popupDesc = document.getElementById('popupDescripcion');

function cerrarPopup() {
    const allPopups = document.querySelectorAll('.popup-overlay');
    allPopups.forEach(p => p.style.display = 'none');
}

document.querySelectorAll('.popup-close').forEach(btn => btn.addEventListener('click', cerrarPopup));

function mostrarRecuerdo(id) {
    const data = recuerdosData[id];
    if (data) {
        popupTitulo.innerText = data.titulo;
        popupImagen.src = data.img;
        popupDesc.innerText = data.desc;
        popup.style.display = 'flex';
        activarFlash();
        // Sonido de papel opcional
        const paper = new Audio('ASSETS/Audios/paper-flip.mp3');
        paper.play().catch(e=>console.log);
    }
}

// Asignar eventos a todas las tarjetas menos la del tango
document.querySelectorAll('.recuerdo-card').forEach(card => {
    const id = card.dataset.recuerdo;
    if (id !== 'tango') {
        card.addEventListener('click', () => mostrarRecuerdo(id));
    }
});

// =========================
// 3. TOCADISCOS CON PLAY/PAUSE (TANGO)
// =========================
const tocadiscosPopup = document.getElementById('tocadiscosPopup');
const tangoAudio = document.getElementById('tangoAudio');
const playPauseBtn = document.getElementById('playPauseBtn');
const vinilo = document.getElementById('vinilo');

let isPlaying = false;

// Abrir popup del tango
const tangoCard = document.querySelector('.recuerdo-card[data-recuerdo="tango"]');
if (tangoCard) {
    tangoCard.addEventListener('click', () => {
        tocadiscosPopup.style.display = 'flex';
        activarFlash();
        // Al abrir, detener música si estaba sonando
        if (tangoAudio) {
            tangoAudio.pause();
            tangoAudio.currentTime = 0;
        }
        vinilo.classList.remove('animando');
        playPauseBtn.innerText = '▶ PLAY';
        isPlaying = false;
    });
}

// Cerrar tocadiscos (el botón específico)
document.getElementById('closeTocadiscos').addEventListener('click', () => {
    tocadiscosPopup.style.display = 'none';
    if (tangoAudio) {
        tangoAudio.pause();
        isPlaying = false;
        vinilo.classList.remove('animando');
    }
});

// Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (!isPlaying) {
        tangoAudio.play().then(() => {
            isPlaying = true;
            playPauseBtn.innerText = '⏸ PAUSE';
            vinilo.classList.add('animando');
        }).catch(err => {
            console.log("Error al reproducir:", err);
            alert("El navegador bloqueó el audio. Haz clic en cualquier parte de la página primero y luego intenta de nuevo.");
        });
    } else {
        tangoAudio.pause();
        isPlaying = false;
        playPauseBtn.innerText = '▶ PLAY';
        vinilo.classList.remove('animando');
    }
});

// =========================
// 4. BOTÓN IR AL ESTADIO
// =========================
const irEstadio = document.getElementById('irEstadioBtn');
irEstadio.addEventListener('click', () => {
    activarFlash();
    setTimeout(() => {
        window.location.href = "secreto-estadio.html";
    }, 400);
});

// =========================
// 5. FLASH Y SONIDO CLICK
// =========================
function activarFlash() {
    const flash = document.getElementById('obsession-flash');
    const sound = document.getElementById('clickSound');
    if (sound) sound.play().catch(e=>console.log);
    flash.classList.remove('flash-active');
    void flash.offsetWidth;
    flash.classList.add('flash-active');
}
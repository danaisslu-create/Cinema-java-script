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
        speed: 5 + Math.random() * 12,
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
// 2. DATOS DE LAS PISTAS
// =========================
const pistasData = {
    ficha: {
        titulo: "📄 Ficha policial",
        img: "ASSETS/Imagenes/ficha-policial.jpg",
        desc: "Liliana Morales fue atacada el 21 de junio de 1999. No hay testigos. El único sospechoso fue liberado por falta de pruebas."
    },
    testimonio: {
        titulo: "🗣️ Testimonio de Benjamín Esposito",
        img: "ASSETS/Imagenes/testimonio.jpg",
        desc: "“Vi algo en sus ojos. El odio no se borra. Pasaron 25 años y todavía lo recuerdo.”"
    },
    foto: {
        titulo: "🖼️ Fotografía de la escena",
        img: "ASSETS/Imagenes/escena-crimen.jpg",
        desc: "Una foto borrosa de la estación de tren. Alguien escribió detrás: 'TE AMO'."
    },
    carta: {
        titulo: "✉️ Carta anónima",
        img: "ASSETS/Imagenes/carta-anonima.jpg",
        desc: "“Pregunta en el estadio. Ahí está la verdad.”"
    }
};

// =========================
// 3. POPUPS Y SONIDOS
// =========================
const popup = document.getElementById('pistaPopup');
const popupTitulo = document.getElementById('popupTitulo');
const popupImagen = document.getElementById('popupImagen');
const popupDesc = document.getElementById('popupDescripcion');
const closeBtn = document.querySelector('.popup-close');
const typewriter = document.getElementById('typewriterSound');
const paperSound = document.getElementById('paperSound');

function mostrarPopup(pistaId) {
    const data = pistasData[pistaId];
    if (!data) return;
    popupTitulo.innerText = data.titulo;
    popupImagen.src = data.img;
    popupDesc.innerText = data.desc;
    popup.style.display = 'flex';
    // Sonidos
    if (typewriter) {
        typewriter.currentTime = 0;
        typewriter.play().catch(e=>console.log);
    }
    if (paperSound) {
        paperSound.currentTime = 0;
        paperSound.play().catch(e=>console.log);
    }
    activarFlash();
}

function cerrarPopup() {
    popup.style.display = 'none';
}
closeBtn.addEventListener('click', cerrarPopup);
window.addEventListener('click', (e) => {
    if (e.target === popup) cerrarPopup();
});

// Asignar eventos a las tarjetas
const pistas = document.querySelectorAll('.pista-card');
pistas.forEach(card => {
    card.addEventListener('click', () => {
        const pistaId = card.dataset.pista;
        mostrarPopup(pistaId);
    });
});

// =========================
// 4. BOTÓN RESOLVER
// =========================
const resolverBtn = document.getElementById('resolverBtn');
resolverBtn.addEventListener('click', () => {
    // Guardar progreso y pasar a la siguiente escena (ej. estadio)
    localStorage.setItem('casoResuelto', 'true');
    window.location.href = "secreto-estadio.html"; // página que conecta ambos finales
});

// =========================
// 5. FLASH
// =========================
function activarFlash() {
    const flash = document.getElementById('justicia-flash');
    const sound = document.getElementById('clickSound');
    if (sound) sound.play().catch(e=>console.log);
    flash.classList.remove('flash-active');
    void flash.offsetWidth;
    flash.classList.add('flash-active');
}
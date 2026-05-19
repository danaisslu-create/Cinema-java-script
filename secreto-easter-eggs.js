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
// 2. DATOS DE EASTER EGGS
// =========================
const eggsData = {
    oscar: {
        titulo: "🏆 Oscar a Mejor Película Extranjera",
        img: "ASSETS/Imagenes/oscar-secreto.jpg",
        desc: "El secreto de sus ojos ganó el Oscar en 2010. Es la primera película argentina en conseguir este premio."
    },
    plano: {
        titulo: "🎬 El famoso plano secuencia",
        img: "ASSETS/Imagenes/plano-secuencia.jpg",
        desc: "La escena del estadio se rodó en una sola toma de 5 minutos con 200 extras. El director la ensayó durante 3 días."
    },
    teamo: {
        titulo: "✉️ El 'TE AMO' en la máquina",
        img: "ASSETS/Imagenes/te-amo-carta.jpg",
        desc: "Benjamín escribe 'TEMO' (temo) pero luego la máquina escribe 'TE AMO' sin querer. Ese error cambió el final."
    },
    darín: {
        titulo: "🎭 Ricardo Darín como Benjamín",
        img: "ASSETS/Imagenes/ricardo-darin.jpg",
        desc: "Darín aprendió a usar una máquina de escribir real para dar más realismo. Además, propuso el gesto de la corbata."
    },
    libro: {
        titulo: "📖 Basada en una novela",
        img: "ASSETS/Imagenes/libro-secreto.jpg",
        desc: "La película adapta 'La pregunta de sus ojos' de Eduardo Sacheri, quien también coescribió el guión."
    },
    final: {
        titulo: "🎬 Final alternativo",
        img: "ASSETS/Imagenes/final-alternativo.jpg",
        desc: "El director probó un final donde Irene se va en el tren. Pero decidió el final que conocemos porque era más esperanzador."
    }
};

// =========================
// 3. POPUP Y EVENTOS
// =========================
const popup = document.getElementById('eggPopup');
const popupTitulo = document.getElementById('popupTitulo');
const popupImagen = document.getElementById('popupImagen');
const popupDesc = document.getElementById('popupDescripcion');
const closeBtn = document.querySelector('.popup-close');
const clickSound = document.getElementById('clickSound');

function mostrarPopup(id) {
    const data = eggsData[id];
    if (!data) return;
    popupTitulo.innerText = data.titulo;
    popupImagen.src = data.img;
    popupDesc.innerText = data.desc;
    popup.style.display = 'flex';
    activarFlash();
    // Sonido de clic (opcional)
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(e=>console.log);
    }
}

function cerrarPopup() {
    popup.style.display = 'none';
}

closeBtn.addEventListener('click', cerrarPopup);
window.addEventListener('click', (e) => {
    if (e.target === popup) cerrarPopup();
});

// Asignar eventos a todas las tarjetas
document.querySelectorAll('.egg-card').forEach(card => {
    const id = card.dataset.egg;
    card.addEventListener('click', () => mostrarPopup(id));
});

// =========================
// 4. FLASH (reutilizado)
// =========================
function activarFlash() {
    const flash = document.getElementById('easter-flash');
    flash.classList.remove('flash-active');
    void flash.offsetWidth;
    flash.classList.add('flash-active');
}
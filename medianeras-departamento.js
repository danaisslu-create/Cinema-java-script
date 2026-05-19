// LLUVIA (mismo código que en encuentro)
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

// FLASH Y SONIDO
const flash = document.getElementById('medianeras-flash');
const clickSound = document.getElementById('clickSound');

function activarFlash() {
    if (clickSound) clickSound.play().catch(e=>console.log);
    flash.classList.remove('flash-active');
    void flash.offsetWidth;
    flash.classList.add('flash-active');
}

// DATOS DE OBJETOS
const objetosData = {
    maqueta: {
        titulo: "🏙️ Maqueta de Buenos Aires",
        desc: "Mariana construyó esta maqueta durante meses. 'Cada edificio tiene una historia que contar', dice. 'Como nosotros.'"
    },
    ventana: {
        titulo: "🪟 La ventana con vistas",
        desc: "Desde aquí se ve el balcón de enfrente. 'Alguien mira también', susurra Mariana. 'A veces es cuestión de esperar el momento.'"
    },
    balcon: {
        titulo: "🚪 El balcón vacío",
        desc: "Un balcón con una silla solitaria. 'A veces esperamos sin saber qué. O a quién.' Nicole siente que la entiende."
    }
};

// POPUP
const popup = document.getElementById('objetoPopup');
const popupTitulo = document.getElementById('popupTitulo');
const popupDesc = document.getElementById('popupDescripcion');
const closeBtn = document.querySelector('.popup-close');

function mostrarPopup(id) {
    const data = objetosData[id];
    if (!data) return;
    popupTitulo.innerText = data.titulo;
    popupDesc.innerText = data.desc;
    popup.style.display = 'flex';
    activarFlash();
}

function cerrarPopup() {
    popup.style.display = 'none';
}
closeBtn.addEventListener('click', cerrarPopup);
window.addEventListener('click', (e) => {
    if (e.target === popup) cerrarPopup();
});

// EVENTOS DE LOS OBJETOS
document.querySelectorAll('.objeto').forEach(obj => {
    const id = obj.dataset.objeto;
    obj.addEventListener('click', () => mostrarPopup(id));
});

// BOTÓN SUBIR A TERRAZA
const terrazaBtn = document.getElementById('terrazaBtn');
terrazaBtn.addEventListener('click', () => {
    activarFlash();
    setTimeout(() => {
        window.location.href = "medianeras-terraza.html";
    }, 400);
});
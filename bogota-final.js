// =========================
// 1. SONIDO Y FLASH DE CÁMARA
// =========================
const camara = document.getElementById('camaraIcon');
const camaraLuz = document.getElementById('camaraLuz');
const shutterSound = document.getElementById('cameraShutter');
const flashGlobal = document.getElementById('final-flash');

function activarFlashCamara() {
    camaraLuz.classList.remove('flash');
    void camaraLuz.offsetWidth;
    camaraLuz.classList.add('flash');
    if (shutterSound) {
        shutterSound.currentTime = 0;
        shutterSound.play().catch(e => console.log);
    }
    flashGlobal.classList.remove('flash-active');
    void flashGlobal.offsetWidth;
    flashGlobal.classList.add('flash-active');
}

camara.addEventListener('click', activarFlashCamara);
camara.addEventListener('mouseenter', () => {
    // Sonido suave al pasar mouse
    if (shutterSound) {
        const softSound = shutterSound.cloneNode();
        softSound.volume = 0.2;
        softSound.play().catch(e=>console.log);
    }
});

// =========================
// 2. DECISIONES
// =========================
const comprarBtn = document.getElementById('comprarBtn');
const devolverBtn = document.getElementById('devolverBtn');

function irAPagina(url) {
    activarFlashCamara();
    setTimeout(() => {
        window.location.href = url;
    }, 400);
}

comprarBtn.addEventListener('click', () => {
    irAPagina('capitulos.html');
});

devolverBtn.addEventListener('click', () => {
    irAPagina('creditos.html');
});

// =========================
// 3. SONIDO AMBIENTE (lo intentamos al primer clic del usuario)
// =========================
const ambiente = document.getElementById('ambienteBogota');
document.body.addEventListener('click', () => {
    if (ambiente && ambiente.paused) {
        ambiente.volume = 0.3;
        ambiente.play().catch(e => console.log);
    }
}, { once: true });
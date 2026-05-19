// =========================
// 1. FLASH DE ENTRADA (efecto cámara)
// =========================
window.addEventListener('load', () => {
    const flash = document.getElementById('creditos-flash');
    flash.classList.remove('flash-active');
    void flash.offsetWidth;
    flash.classList.add('flash-active');
    console.log("Bienvenida a los créditos. La última toma.");
});

// =========================
// 2. MÚSICA DE FONDO (con botón Play/Pause)
// =========================
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');
let isPlaying = false;

// El navegador bloquea autoplay, así que esperamos a que el usuario haga clic en el botón
musicBtn.addEventListener('click', () => {
    if (!isPlaying) {
        music.play().then(() => {
            isPlaying = true;
            musicBtn.innerHTML = '⏸ Pausar música';
        }).catch(err => {
            console.log("Error al reproducir:", err);
            alert("Haz clic en cualquier parte de la página primero para activar el audio.");
        });
    } else {
        music.pause();
        isPlaying = false;
        musicBtn.innerHTML = '🎵 Reproducir música';
    }
});

// Opcional: si quieres que la música comience al primer clic en cualquier lugar (más amigable)
document.body.addEventListener('click', function once() {
    if (!isPlaying && musicBtn.innerHTML !== '⏸ Pausar música') {
        music.play().then(() => {
            isPlaying = true;
            musicBtn.innerHTML = '⏸ Pausar música';
        }).catch(e => console.log);
    }
    document.body.removeEventListener('click', once);
}, { once: true });
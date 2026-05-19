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
// 2. MÚSICA CON AUTOPLAY INTENTADO + BOTÓN PAUSE
// =========================
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');
let isPlaying = false;

// Función para iniciar la música (sea por autoplay o por clic)
function startMusic() {
    if (isPlaying) return;
    music.muted = false;   // aseguramos que no esté silenciado
    music.play().then(() => {
        isPlaying = true;
        if (musicBtn) musicBtn.innerHTML = '⏸ Pausar música';
    }).catch(err => {
        console.log("No se pudo iniciar la música automáticamente");
    });
}

// Intentar autoplay con muted (algunos navegadores lo permiten)
music.muted = true;
music.play().then(() => {
    // Si logra empezar, desmutear después de 0.1s
    setTimeout(() => {
        music.muted = false;
        isPlaying = true;
        if (musicBtn) musicBtn.innerHTML = '⏸ Pausar música';
    }, 100);
}).catch(err => {
    console.log("Autoplay bloqueado, esperando interacción del usuario.");
    // Si falla, mostramos el botón y esperamos clic
    if (musicBtn) musicBtn.style.display = 'inline-block';
});

// Botón para reproducir/pausar (siempre funcional)
if (musicBtn) {
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPlaying) {
            music.pause();
            isPlaying = false;
            musicBtn.innerHTML = '🎵 Reproducir música';
        } else {
            music.muted = false;
            music.play().then(() => {
                isPlaying = true;
                musicBtn.innerHTML = '⏸ Pausar música';
            }).catch(err => {
                console.log("Error al reproducir:", err);
                alert("Haz clic en cualquier parte de la página primero para activar el audio.");
            });
        }
    });
}

// Opcional: si el usuario hace clic en cualquier lugar y aún no hay música, activarla (sin necesidad de botón)
document.body.addEventListener('click', function activarPorClic() {
    if (!isPlaying && music.paused) {
        music.muted = false;
        music.play().then(() => {
            isPlaying = true;
            if (musicBtn) musicBtn.innerHTML = '⏸ Pausar música';
        }).catch(e => console.log);
    }
});
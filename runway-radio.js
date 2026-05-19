// =========================
// RUNWAY RADIO - INTERACTIVIDAD
// =========================

const activateBtn = document.getElementById('activateRadioBtn');
const radioSignal = document.getElementById('radioSignal');
const visualizer = document.getElementById('visualizer');
const nowPlayingSpan = document.getElementById('nowPlayingTrack');
const clickSound = document.getElementById('clickSound');
const cameraSound = document.getElementById('cameraSound');
const spotifyFrame = document.getElementById('spotifyPlayer');

// Lista de canciones para simular el "Now Playing"
// (Puedes cambiarlas por canciones reales de tu playlist)
const playlistTracks = [
    "✨ Fashion Icon — Runway Mix",
    "💃 Night in New York — Catwalk Edit",
    "👠 Heels on Marble — Andy's Theme",
    "🎨 Cerulean Speech — Miranda's Anthem",
    "📸 Paparazzi Flash — Nicole's Groove",
    "🧥 Coat Throw — Nigel's Remix",
    "🚕 Taxi Driver — NYC Streets",
    "👗 That's All — Miranda's Outro"
];

let trackIndex = 0;
let animationInterval = null;

// Función para intentar activar el audio del iframe de Spotify
function tryActivateSpotify() {
    if (!spotifyFrame) return;
    // Forzamos una recarga del iframe con autoplay (solo funciona si el usuario ya hizo clic)
    // pero como el usuario ya hizo clic en "Activar Radio", el navegador lo permite.
    // Sin embargo, la API de Spotify no permite autoplay por seguridad. 
    // Lo que sí podemos hacer es mostrar un pequeño tooltip amigable.
    console.log("¡Radio encendida! Dale play al reproductor si no suena solo.");
    // Opcional: agregar un mensaje flotante sutil
    const tooltip = document.createElement('div');
    tooltip.innerText = "🎵 Haz clic en ▶️ para empezar la música";
    tooltip.style.position = 'fixed';
    tooltip.bottom = '20px';
    tooltip.left = '20px';
    tooltip.background = 'rgba(0,0,0,0.7)';
    tooltip.color = '#ffd898';
    tooltip.padding = '8px 16px';
    tooltip.borderRadius = '40px';
    tooltip.fontFamily = 'Italiana, serif';
    tooltip.fontSize = '14px';
    tooltip.zIndex = '10000';
    tooltip.style.backdropFilter = 'blur(5px)';
    document.body.appendChild(tooltip);
    setTimeout(() => tooltip.remove(), 4000);
}

// Función para activar la animación de la radio
function activateRadioAnimation() {
    // 1. Activar ondas y visualizador
    radioSignal.classList.add('active');
    visualizer.classList.add('playing');
    
    // 2. Efecto de neón
    const neonDiv = document.createElement('div');
    neonDiv.classList.add('neon-flash');
    document.body.appendChild(neonDiv);
    
    // 3. Sonido de clic de radio
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log('Audio error:', e));
    }
    
    // 4. Intentar activar Spotify (solo aviso)
    tryActivateSpotify();
    
    // 5. Cambiar "Now Playing" cada 5 segundos
    if (animationInterval) clearInterval(animationInterval);
    animationInterval = setInterval(() => {
        trackIndex = (trackIndex + 1) % playlistTracks.length;
        nowPlayingSpan.innerText = playlistTracks[trackIndex];
        // pequeño flash visual al cambiar de canción
        nowPlayingSpan.style.transition = 'opacity 0.15s';
        nowPlayingSpan.style.opacity = '0.5';
        setTimeout(() => { nowPlayingSpan.style.opacity = '1'; }, 150);
        // También un pequeño flash de cámara (opcional)
        if (cameraSound) {
            cameraSound.currentTime = 0;
            cameraSound.play().catch(e=>console.log);
        }
        const miniFlash = document.getElementById('fashion-flash');
        if (miniFlash) {
            miniFlash.classList.remove('flash-active');
            void miniFlash.offsetWidth;
            miniFlash.classList.add('flash-active');
        }
    }, 5000);
    
    // 6. Eliminar el neón tras la animación
    setTimeout(() => {
        if (neonDiv && neonDiv.parentNode) neonDiv.remove();
    }, 1000);
}

// Evento del botón
activateBtn.addEventListener('click', () => {
    activateRadioAnimation();
});

// Limpiar intervalo si la página se cierra
window.addEventListener('beforeunload', () => {
    if (animationInterval) clearInterval(animationInterval);
});
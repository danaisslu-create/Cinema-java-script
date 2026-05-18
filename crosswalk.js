// =========================
// CROSSWALK - TRANSICIÓN A TAXI DRIVER
// =========================

// Esperar a que cargue todo
window.addEventListener('DOMContentLoaded', () => {
    iniciarSecuencia();
});

async function iniciarSecuencia() {
    // Elementos
    const moodText = document.getElementById('moodText');
    const transitionText = document.getElementById('transitionText');
    const taxi = document.getElementById('taxiStop');
    const flashOverlay = document.getElementById('cameraFlashOverlay');
    const audioAmbience = document.getElementById('crosswalkAmbience');
    const taxiSound = document.getElementById('taxiStopSound');
    const cameraShutter = document.getElementById('cameraShutter');
    const thunder = document.getElementById('thunderSound');

    // Asegurar reproducción de audio ambiente (requiere interacción)
    function playAmbience() {
        if (audioAmbience) {
            audioAmbience.play().catch(e => console.log("Autoplay bloqueado, esperando clic"));
        }
        window.removeEventListener('click', playAmbience);
    }
    window.addEventListener('click', playAmbience, { once: true });

    // 1. Cambiar textos gradualmente
    let step = 0;
    const messages = [
        "La moda se disuelve entre la lluvia...",
        "Los flashes ahora son relámpagos.",
        "El rugido de la ciudad se vuelve hostil.",
        "Algo viejo, algo peligroso te observa."
    ];

    for (let i = 0; i < messages.length; i++) {
        await delay(2000);
        moodText.style.opacity = '0';
        await delay(400);
        moodText.innerText = messages[i];
        moodText.style.opacity = '1';
        if (i === 2) {
            // Trueno
            if (thunder) thunder.play().catch(e => console.log);
            // Pequeño flash ambiental
            flashOverlay.style.opacity = '0.3';
            await delay(150);
            flashOverlay.style.opacity = '0';
        }
    }

    // 2. Hacer aparecer el taxi
    await delay(1000);
    transitionText.innerText = "Un taxi emerge de la noche...";
    taxi.classList.add('appear');
    if (taxiSound) taxiSound.play().catch(e => console.log);

    // 3. Efecto de lluvia más intensa (cambiar filtro del video)
    const video = document.querySelector('.crosswalk-bg-video');
    if (video) {
        video.style.filter = 'brightness(0.5) saturate(0.8) contrast(1.3)';
    }

    await delay(2500);

    // 4. Texto final antes del flash
    transitionText.innerText = "Mirando por el visor...";
    await delay(1200);

    // 5. Flash y redirección
    flashOverlay.classList.add('flash-active');
    if (cameraShutter) {
        cameraShutter.currentTime = 0;
        cameraShutter.play().catch(e => console.log);
    }
    await delay(400);

    // Redirigir a la página de Taxi Driver (o siguiente capítulo)
    window.location.href = "capitulo-3-taxidriver.html";  // Ajusta según tu estructura
}

// Helper
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const ruta = localStorage.getItem("rutaCompletada"); // "nigel" o "miranda"
if(ruta === "nigel") {
    moodText.innerText = "El brillo de la fiesta se apaga bajo la lluvia...";
} else {
    moodText.innerText = "Las órdenes de Miranda se disuelven en el vapor...";
}
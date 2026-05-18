// =========================
// RECUPERAR LOOK DE NIGEL
// =========================
let outfit = [];
let stylePoints = 0;

try {
    outfit = JSON.parse(localStorage.getItem("nigelLookFinal")) || [];
    stylePoints = parseInt(localStorage.getItem("nigelEstiloTotal")) || 0;
} catch(e) { console.warn(e); }

// Mostrar polaroid del outfit principal
const outfitPolaroidImg = document.getElementById("outfitPolaroidImg");
const outfitPolaroidText = document.getElementById("outfitPolaroidText");
if (outfit.length > 0) {
    // Tomar la primera prenda como imagen representativa
    outfitPolaroidImg.src = outfit[0].imgSrc || "ASSETS/Imagenes/default-outfit.jpg";
    outfitPolaroidText.innerHTML = `Look Nigel<br>${stylePoints} pts de estilo`;
} else {
    outfitPolaroidImg.src = "ASSETS/Imagenes/default-outfit.jpg";
    outfitPolaroidText.innerHTML = "Look básico";
}

// También podemos agregar polaroids de las otras prendas
const polaroidStrip = document.getElementById("polaroidStrip");
outfit.forEach((prenda, idx) => {
    if (idx === 0) return; // ya mostramos la principal
    const polaroid = document.createElement("div");
    polaroid.className = "polaroid-card";
    polaroid.innerHTML = `
        <img src="${prenda.imgSrc}" alt="${prenda.nombre}">
        <p>${prenda.nombre}</p>
    `;
    polaroidStrip.appendChild(polaroid);
});

// =========================
// POPUP POR ESCENA
// =========================
const popup = document.getElementById("nightPopup");
let currentScene = "";

function abrirPopupEscena(sceneId) {
    const titulo = document.getElementById("popupSceneTitle");
    const img = document.getElementById("popupSceneImg");
    const desc = document.getElementById("popupSceneDesc");
    const extraDiv = document.getElementById("popupExtra");
    extraDiv.innerHTML = ""; // limpiar

    // Datos según la escena
    const scenes = {
        rooftop: {
            titulo: "🌆 Rooftop 360°",
            img: "ASSETS/Imagenes/rooftop-nyc.jpg",
            desc: "Nigel: 'Mira esa ciudad. Tú también brillas así esta noche.'",
            extra: () => {} // sin extra
        },
        restaurant: {
            titulo: "🍽️ Cena en Daniel",
            img: "ASSETS/Imagenes/restaurant-nyc.jpg",
            desc: "Comida espectacular. Pero lo mejor es tu entrada con ese vestido.",
            extra: () => mostrarNotificacion("📲 Miranda: '¿Ya terminaste de comer? Corre las pruebas de mañana.'")
        },
        gallery: {
            titulo: "🖼️ Galería Gagosian",
            img: "ASSETS/Imagenes/art-gallery.jpg",
            desc: "Arte moderno y flashes de paparazzi. ¡Sonríe!",
            extra: () => {
                activarFashionFlash(); // flash al abrir
                // agregar mini polaroid en el popup
                const polaroidExtra = document.createElement("div");
                polaroidExtra.className = "popup-extra-polaroid";
                polaroidExtra.innerHTML = `<img src="ASSETS/Imagenes/polaroid-moment.jpg" style="width:100%; border-radius:8px;"><p>✨ Tu momento estrella</p>`;
                extraDiv.appendChild(polaroidExtra);
            }
        },
        party: {
            titulo: "💃 After Party de Vogue",
            img: "ASSETS/Imagenes/fashion-party.jpg",
            desc: "Música alta, luces y modelos. ¡Eres la invitada de Nigel!",
            extra: () => {
                // múltiples flashes
                for(let i=0;i<3;i++) setTimeout(()=>activarFashionFlash(), i*300);
                mostrarNotificacion("📱 Nigel: 'No te vayas, falta el after after...'");
                mostrarNotificacion("📱 Desconocido: 'Ese outfit es increíble. ¿Eres famosa?'");
            }
        }
    };

    const data = scenes[sceneId];
    if(!data) return;
    titulo.innerText = data.titulo;
    img.src = data.img;
    desc.innerText = data.desc;
    if(data.extra) data.extra();

    popup.style.display = "flex";
    currentScene = sceneId;
}

function cerrarNightPopup() {
    popup.style.display = "none";
}

// Asignar clicks a las tarjetas
document.querySelectorAll(".scene-card").forEach(card => {
    card.addEventListener("click", () => {
        const scene = card.dataset.scene;
        abrirPopupEscena(scene);
        // También puede salir un taxi al azar
        if(Math.random() > 0.6) lanzarTaxi();
    });
});

// =========================
// NOTIFICACIONES DE TELÉFONO
// =========================
let notifTimeout;
function mostrarNotificacion(mensaje) {
    const notif = document.getElementById("phoneNotification");
    notif.innerText = mensaje;
    notif.style.display = "block";
    document.getElementById("notificationSound").play().catch(e=>console.log);
    clearTimeout(notifTimeout);
    notifTimeout = setTimeout(() => {
        notif.style.display = "none";
    }, 3000);
}

// =========================
// TAXI ANIMADO
// =========================
function lanzarTaxi() {
    const taxi = document.getElementById("taxi");
    taxi.classList.remove("taxi-moving");
    void taxi.offsetWidth; // reiniciar animación
    taxi.classList.add("taxi-moving");
    document.getElementById("taxiHorn").play().catch(e=>console.log);
    // cada cierto tiempo aparece un taxi
}

// Lanzar un taxi cada 8-12 segundos
setInterval(() => {
    lanzarTaxi();
}, 10000);

// =========================
// FLASH DE PAPARAZZI (reutilizado)
// =========================
function activarFashionFlash() {
    const flash = document.getElementById("fashion-flash");
    const cameraAudio = document.getElementById("cameraSound");
    if(cameraAudio) {
        cameraAudio.currentTime = 0;
        cameraAudio.play().catch(e=>console.log);
    }
    flash.classList.remove("flash-active");
    void flash.offsetWidth;
    flash.classList.add("flash-active");
}

// También flashes aleatorios cada cierto tiempo (como si paparazzi reales)
setInterval(() => {
    if(Math.random() < 0.4) activarFashionFlash();
}, 7000);

// =========================
// AMBIENTE Y BOTÓN CONTINUAR
// =========================
window.addEventListener("click", function initAudio() {
    const ambiance = document.getElementById("nightAmbience");
    if(ambiance) ambiance.play().catch(e=>console.log);
    window.removeEventListener("click", initAudio);
}, { once: true });

document.getElementById("continueToCrosswalk").addEventListener("click", () => {
    // Guardar datos para el crosswalk si es necesario
    localStorage.setItem("rutaCompletada", "nigel");
    window.location.href = "crosswalk.html";
});
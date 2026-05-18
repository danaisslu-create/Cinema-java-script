// =========================
// CRÍTICAS ALEATORIAS (con sonido de error)
// =========================
const criticasList = [
    "❌ No es lo suficientemente bueno",
    "❌ Mediocre",
    "❌ Fuera de temporada",
    "❌ Aburrido",
    "❌ No entiendes nada",
    "❌ ¿Eso es todo?"
];

const criticismDiv = document.getElementById("criticism");
const errorSound = document.getElementById("errorSound");

function cambiarCritica() {
    const nueva = criticasList[Math.floor(Math.random() * criticasList.length)];
    criticismDiv.innerHTML = nueva;
    // Reproducir sonido de error
    if (errorSound) {
        errorSound.currentTime = 0;
        errorSound.play().catch(e => console.log);
    }
    activarFashionFlash(); // flash agresivo
}

// Cambiar crítica cada 2.5 segundos
setInterval(cambiarCritica, 2500);

// =========================
// CANVAS: MAQUILLAJE CORRIDO (gotas negras)
// =========================
const canvas = document.getElementById("makeupCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Dibujar gotas de maquillaje corrido
let drops = [];
for (let i = 0; i < 80; i++) {
    drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 6 + 2,
        speedY: Math.random() * 1.5 + 0.5,
        color: `rgba(0,0,0,${Math.random() * 0.5 + 0.3})`
    });
}

function drawMakeup() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let d of drops) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.fill();
        // Mover hacia abajo (simular goteo)
        d.y += d.speedY;
        if (d.y > canvas.height + 20) {
            d.y = -20;
            d.x = Math.random() * canvas.width;
        }
    }
    requestAnimationFrame(drawMakeup);
}
drawMakeup();

// =========================
// FLASH Y SONIDOS (reutilizando funciones globales o definiendo)
// =========================
function activarFashionFlash() {
    const flash = document.getElementById("fashion-flash");
    const cameraAudio = document.getElementById("cameraSound");
    if (cameraAudio) {
        cameraAudio.currentTime = 0;
        cameraAudio.play().catch(e => console.log);
    }
    if (flash) {
        flash.classList.remove("flash-active");
        void flash.offsetWidth;
        flash.classList.add("flash-active");
    }
}

// Asegurar que el overlay de flash existe (si no, lo creamos)
if (!document.getElementById("fashion-flash")) {
    const newFlash = document.createElement("div");
    newFlash.id = "fashion-flash";
    document.body.appendChild(newFlash);
}

// =========================
// BOTÓN DE HUIDA
// =========================
document.getElementById("toCrosswalk").addEventListener("click", () => {
    localStorage.setItem("rutaCompletada", "miranda");
    // Guardar nivel de estrés o cualquier otro dato
    window.location.href = "crosswalk.html";
});

// =========================
// AMBIENTE: Iniciar audio de lluvia
// =========================
window.addEventListener("click", function initRain() {
    const rain = document.getElementById("rainSound");
    if (rain) rain.play().catch(e => console.log);
    window.removeEventListener("click", initRain);
}, { once: true });

// =========================
// AGREGAR EFECTO DE LLUVIA (opcional)
// =========================
const rainDiv = document.createElement("div");
rainDiv.className = "rain-effect";
document.body.appendChild(rainDiv);
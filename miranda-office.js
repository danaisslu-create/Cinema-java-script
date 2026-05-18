// =========================
// TIMER (cuenta regresiva estresante)
// =========================
let timeLeft = 300; // 5 minutos en segundos
const timerElement = document.getElementById("timer");
let timerInterval;

function updateTimer() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerElement.textContent = `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        mostrarMensajeMiranda("¡Se acabó el tiempo! Miranda te mira con desprecio.");
        document.getElementById("goToBreakdownBtn").style.background = "#9b1d36";
    } else {
        timeLeft--;
    }
}

timerInterval = setInterval(updateTimer, 1000);

// =========================
// TAREAS (popups de estrés)
// =========================
let activeTask = null;
const taskItems = document.querySelectorAll("#taskList li");
const completeBtn = document.getElementById("completeTaskBtn");

function mostrarPopupTarea(tarea) {
    const popup = document.createElement("div");
    popup.className = "devil-popup";
    popup.style.display = "flex";
    popup.innerHTML = `
        <div class="devil-popup-box miranda-popup-box">
            <button class="devil-close" onclick="this.parentElement.parentElement.remove()">✕</button>
            <h2>⚠️ Tarea imposible</h2>
            <p>${tarea}</p>
            <button class="choose-button miranda-button" onclick="simularEsfuerzo(this)">Intentar</button>
        </div>
    `;
    document.body.appendChild(popup);
    document.getElementById("emailSound").play();
}

function simularEsfuerzo(btn) {
    const popupDiv = btn.closest(".devil-popup");
    popupDiv.remove();
    mostrarMensajeMiranda("Miranda: '¿Eso es todo? Esperaba más.'");
    // agregar más tareas al listado
    const newTask = document.createElement("li");
    newTask.textContent = "📎 Preparar el board de tendencias (5 min)";
    document.getElementById("taskList").appendChild(newTask);
    activarTacones(); // sonido de tacones acercándose
}

function activarTacones() {
    const heels = document.getElementById("heelsSound");
    if(heels) {
        heels.currentTime = 0;
        heels.play().catch(e=>console.log);
        setTimeout(() => heels.pause(), 2000);
    }
}

function mostrarMensajeMiranda(msg) {
    const msgDiv = document.getElementById("mirandaMessage");
    msgDiv.innerHTML = `Miranda: “${msg}”`;
    activarFashionFlash(); // flash para tensión
}

// Al hacer click en una tarea de la lista
taskItems.forEach(task => {
    task.addEventListener("click", () => {
        const text = task.textContent;
        mostrarPopupTarea(text);
        activeTask = task;
    });
});

completeBtn.addEventListener("click", () => {
    if(activeTask) {
        activeTask.remove();
        activeTask = null;
        mostrarMensajeMiranda("Bien, ahora haz las otras tres.");
        // añadir nueva tarea caótica
        const nuevas = ["📑 Traducir revista italiana", "📞 Llamar a la imprenta", "✍️ Firmar documentos legales"];
        const nueva = document.createElement("li");
        nueva.textContent = nuevas[Math.floor(Math.random() * nuevas.length)];
        document.getElementById("taskList").appendChild(nueva);
        activarTacones();
    } else {
        mostrarMensajeMiranda("No has seleccionado ninguna tarea. ¿Crees que esto es un juego?");
    }
});

// Popup de llamada aleatoria cada 15 segundos
setInterval(() => {
    if(Math.random() < 0.6) {
        document.getElementById("callPopup").style.display = "flex";
        activarTacones();
    }
}, 15000);

function cerrarCallPopup() {
    document.getElementById("callPopup").style.display = "none";
}
function atenderLlamada() {
    cerrarCallPopup();
    mostrarMensajeMiranda("La floristería no tiene las rosas blancas. Consíguelas tú misma.");
    activarFashionFlash();
}

// =========================
// BOTÓN AL BREAKDOWN
// =========================
document.getElementById("goToBreakdownBtn").addEventListener("click", () => {
    localStorage.setItem("mirandaStressLevel", timeLeft); // guardar cuánto tiempo aguantó
    window.location.href = "miranda-breakdown.html";
});

// =========================
// FLASH Y AUDIO AMBIENTE
// =========================
function activarFashionFlash() { /* igual que antes */ }
window.addEventListener("click", ()=>{
    document.getElementById("devilAmbience")?.play();
}, {once:true});
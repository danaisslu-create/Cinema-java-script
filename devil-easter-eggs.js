// =========================
// DATOS DE EASTER EGGS (POPUPS)
// =========================
const eggsData = {
    abrigo: {
        titulo: "🧥 El abrigo de Miranda",
        img: "ASSETS/Imagenes/miranda-coat.png",
        desc: "Miranda lanzaba abrigos reales de Donna Karan valorados en $8,000. En cada escena usaban 6 copias."
    },
    
    bolso: {
        titulo: "👜 El bolso verde",
        img: "ASSETS/Imagenes/green-bag.png",
        desc: "El bolso de Andy es de FENDI, valor real $1,200. Aparece solo 3 segundos en la película."
    },
    ceruleo: {
        titulo: "🎨 El azul cerúleo",
        img: "ASSETS/Imagenes/cerulean.jpg",
        desc: "El famoso discurso de Miranda sobre el cerúleo es real. El color revolucionó la moda en los 90."
    }
};

// =========================
// POPUP AL HACER CLIC EN TARJETA
// =========================
const eggCards = document.querySelectorAll(".egg-card");
const popup = document.getElementById("easterPopup");

function abrirPopup(eggId) {
    const data = eggsData[eggId];
    if (!data) return;
    document.getElementById("popupTitle").innerText = data.titulo;
    document.getElementById("popupImage").src = data.img;
    document.getElementById("popupDescription").innerText = data.desc;
    popup.style.display = "flex";
    activarFlash();
}

function cerrarPopup() {
    popup.style.display = "none";
}

eggCards.forEach(card => {
    card.addEventListener("click", () => {
        const egg = card.dataset.egg;
        abrirPopup(egg);
    });
});

// =========================
// SECCIÓN DE FRASE SECRETA (clic en orden)
// =========================
const wordBtns = document.querySelectorAll(".word-btn");
const orderDisplay = document.getElementById("orderDisplay");
const revealBtn = document.getElementById("revealSecretBtn");
const secretDiv = document.getElementById("secretMessage");

let selectedWords = [];

wordBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const word = btn.dataset.word;
        if (selectedWords.includes(word)) return; // no repetir
        selectedWords.push(word);
        btn.classList.add("selected");
        orderDisplay.innerText = selectedWords.join(" ");
    });
});

revealBtn.addEventListener("click", () => {
    const frase = selectedWords.join(" ");
    if (frase === "ANNA WINTOUR INSPIRÓ MIRANDA") {
        secretDiv.style.display = "block";
        activarFlash();
        // Opcional: reproducir sonido de logro
    } else {
        alert("❌ Orden incorrecto. Intenta: ANNA, WINTOUR, INSPIRÓ, MIRANDA");
    }
});

// =========================
// FLASH DE CÁMARA
// =========================
function activarFlash() {
    const flash = document.getElementById("fashion-flash");
    const sound = document.getElementById("cameraSound");
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log);
    }
    if (flash) {
        flash.classList.remove("flash-active");
        void flash.offsetWidth;
        flash.classList.add("flash-active");
    }
}
// =========================
// DIALOGOS INTERACTIVOS
// =========================

const dialogues = [

    "Las luces parecen flotar sobre el pavimento mojado.",

    "Travis habla como si conociera cada sombra de Manhattan.",

    "El silencio del taxi pesa más que la lluvia afuera."

];

// =========================
// CAMBIAR DIALOGO
// =========================

function changeDialogue(index){

    document.getElementById("taxiDialogue").innerText = dialogues[index];
}

// =========================
// DIALOGOS AUTOMATICOS
// =========================

const ambientLines = [

    "La ciudad se ve diferente después de medianoche.",

    "Nueva York nunca duerme. Solo cambia de máscara.",

    "Las calles brillan como una película vieja.",

    "Todo parece más lejano desde el asiento trasero."

];

let currentLine = 0;

// =========================
// LOOP DIALOGOS
// =========================

setInterval(() => {

    document.getElementById("taxiDialogue").innerText =
    ambientLines[currentLine];

    currentLine++;

    if(currentLine >= ambientLines.length){

        currentLine = 0;
    }

}, 7000);

// =========================
// AUDIO AUTOMÁTICO
// =========================

window.addEventListener("click", function(){

    document.getElementById("bogotaAudio").play();

}, { once:true });


// =========================
// IR AL MERCADO
// =========================

function irMercado(){

    let bus = document.getElementById("bogotaBus");

    bus.classList.remove("bus-move");

    void bus.offsetWidth;

    bus.classList.add("bus-move");

    setTimeout(function(){

        window.location.href = "mercado-pulgas.html";

    }, 2400);
}

// =========================
// VINYL POPUP
// =========================

function abrirVinylPopup(){

    document.getElementById("vinyl-popup").style.display = "flex";
}

function cerrarVinylPopup(){

    document.getElementById("vinyl-popup").style.display = "none";
}

// =========================
// RADIO POPUP
// =========================

function abrirRadioPopup(){

    document.getElementById("radio-popup").style.display = "flex";
}

function cerrarRadioPopup(){

    document.getElementById("radio-popup").style.display = "none";
}

function activarCamara(){

    activarFlash();

    document.getElementById("camera-glitch").style.display = "flex";

    setTimeout(() => {

        window.location.href = "devil-wears-prada.html";

    }, 2200);
}

// =========================
// ABRIR POPUP
// =========================

function abrirPopup(id){

    document.getElementById(id).style.display = "flex";

    // FLASH PARA EL PERIODICO

    if(id === "news-popup"){

        activarFlash();
    }

    // RADIO APAGA AMBIENTE

    if(id === "radio-popup"){

        document
        .getElementById("pulgasAudio")
        .pause();
    }
}

function cerrarPopup(id){

    document.getElementById(id).style.display = "none";

    // =========================
    // VINYL
    // =========================

    if(id === "vinyl-popup"){

        let vinyl =
        document.getElementById("vinylAudio");

        vinyl.pause();

        vinyl.currentTime = 0;
    }

    // =========================
    // VOLVER AMBIENTE
    // =========================

    document
    .getElementById("pulgasAudio")
    .play();
}
// =========================
// FLASH DE COLORES
// =========================

function activarFlash(){

    let glitch = document.getElementById("glitch-screen");

    glitch.classList.remove("glitch-active");

    void glitch.offsetWidth;

    glitch.classList.add("glitch-active");
}

// =========================
// AUDIO INTERACTION
// =========================

const ambienteAudio =
document.getElementById("pulgasAudio");

const vinylAudio =
document.getElementById("vinylAudio");

// =========================
// CUANDO SUENA EL VINILO
// =========================

vinylAudio.addEventListener("play", () => {

    ambienteAudio.pause();
});

// =========================
// CUANDO SE PAUSA
// =========================

vinylAudio.addEventListener("pause", () => {

    ambienteAudio.play();
});

// =========================
// CUANDO TERMINA
// =========================

vinylAudio.addEventListener("ended", () => {

    ambienteAudio.play();
});

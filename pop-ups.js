// =========================
// ABRIR POPUP
// =========================

function abrirPopup(id){

    document.getElementById(id).style.display = "flex";
}

// =========================
// CERRAR POPUP
// =========================

function cerrarPopup(id){

    let popup =
    document.getElementById(id);

    popup.style.display = "none";

    // DETENER VIDEO

    let iframe =
    popup.querySelector("iframe");

    iframe.src = iframe.src;
}

// =========================
// SUBWAY
// =========================

function abrirSubwayPopup(){

    document.getElementById("subwayPopup").style.display = "flex";

    let tren = document.getElementById("subwayTrain");

    tren.classList.remove("subway-move");

    void tren.offsetWidth;

    tren.classList.add("subway-move");
}

function cerrarSubwayPopup(){

    document.getElementById("subwayPopup").style.display = "none";
}

// =========================
// TIMES SQUARE
// =========================

function abrirTimesPopup(){

    document.getElementById("timesPopup").style.display = "flex";

    let flash = document.getElementById("timesFlash");

    flash.classList.remove("times-square-active");

    void flash.offsetWidth;

    flash.classList.add("times-square-active");
}

function cerrarTimesPopup(){

    document.getElementById("timesPopup").style.display = "none";
}

// =========================
// CAMERA
// =========================

function abrirCameraPopup(){

    document.getElementById("cameraPopup").style.display = "flex";
}

function cerrarCameraPopup(){

    document.getElementById("cameraPopup").style.display = "none";
}
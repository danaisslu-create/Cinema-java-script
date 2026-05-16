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
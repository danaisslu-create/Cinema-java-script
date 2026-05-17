// =========================
// AUDIO
// =========================

window.addEventListener("click", function(){

    document.getElementById("devilAmbience").play();

}, { once:true });

// =========================
// NIGEL POPUP
// =========================

function abrirNigelPopup(){

    document.getElementById("nigel-popup").style.display = "flex";

    activarFashionFlash();
}

function cerrarNigelPopup(){

    document.getElementById("nigel-popup").style.display = "none";
}

// =========================
// MIRANDA POPUP
// =========================

function abrirMirandaPopup(){

    document.getElementById("miranda-popup").style.display = "flex";

    activarFashionFlash();
}

function cerrarMirandaPopup(){

    document.getElementById("miranda-popup").style.display = "none";
}

// =========================
// FLASH
// =========================

function activarFashionFlash(){

    document.getElementById("cameraSound").play();

    let flash = document.getElementById("fashion-flash");

    flash.classList.remove("flash-active");

    void flash.offsetWidth;

    flash.classList.add("flash-active");
}

// =========================
// ELEGIR CAMINOS
// =========================

function elegirNigel(){

    window.location.href = "nigel-route.html";
}

function elegirMiranda(){

    window.location.href = "miranda-route.html";
}
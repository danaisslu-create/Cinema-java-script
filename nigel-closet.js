// =========================
// GLOBALES
// =========================
let estiloTotal = 0;
let prendasEquipadas = [];   // guardamos objetos {nombre, puntos, imgSrc}
const sonidoTela = document.getElementById("telaSound");
const nigelCommentDiv = document.getElementById("nigel-comment");

// Diccionario de datos de las prendas (se puede enriquecer)
const prendasData = {
    abrigo:   { nombre: "Abrigo", puntos: 5, descripcion: "Un clásico atemporal que abraza con elegancia.", img: "ASSETS/Imagenes/trenchcoat.png" },
    tacones:  { nombre: "Tacones rojos", puntos: 4, descripcion: "El poder en cada paso. Sonido de determinación.", img: "ASSETS/Imagenes/tacones-rojos.png" },
    bolso:    { nombre: "Bolso estructurado", puntos: 3, descripcion: "Llevas el orden y el caos con estilo.", img: "ASSETS/Imagenes/Untitled.png" },
    lentes:   { nombre: "Lentes de sol", puntos: 2, descripcion: "Misterio y actitud. Nadie sabe qué miras.", img: "ASSETS/Imagenes/sunglasses.png" },
    sombrero: { nombre: "Sombrero de fieltro", puntos: 3, descripcion: "Toque bohemio con carácter.", img: "ASSETS/Imagenes/hat.png" },
    bufanda:  { nombre: "Bufanda de seda", puntos: 2, descripcion: "Un susurro de lujo alrededor del cuello.", img: "ASSETS/Imagenes/scarf.png" },
    cinturon: { nombre: "Guantes", puntos: 2, descripcion: "Un accesorio que añade misterio y calidez.", img: "ASSETS/Imagenes/guantes.png" },  // Nota: la clave sigue siendo "cinturon" pero el nombre mostrado es "Guantes"
    vestido:  { nombre: "Vestido", puntos: 5, descripcion: "El fondo de armario definitivo. Nunca falla.", img: "ASSETS/Imagenes/cocktail-dress.png" }
};

// =========================
// INICIALIZAR EVENTOS
// =========================
document.addEventListener("DOMContentLoaded", () => {
    // Asignar click a cada prenda
    const prendas = document.querySelectorAll(".prenda-item");
    prendas.forEach(prenda => {
        prenda.addEventListener("click", (e) => {
            e.stopPropagation();
            const tipoPrenda = prenda.dataset.prenda;
            abrirPopupRevista(tipoPrenda);
        });

        // Hover con sonido de tela
        prenda.addEventListener("mouseenter", () => {
            if (sonidoTela) {
                sonidoTela.currentTime = 0;
                sonidoTela.play().catch(e => console.log("audio error", e));
            }
            // glow adicional
            prenda.style.transition = "0.1s";
        });
    });

    // Botón finalizar look
    document.getElementById("finishLookBtn").addEventListener("click", () => {
        if (prendasEquipadas.length === 0) {
            actualizarComentarioNigel("¿Nada? ¡Vamos, atrévete! Elige al menos una prenda.");
            return;
        }
        // Guardamos el look final en localStorage para la siguiente página
        localStorage.setItem("nigelLookFinal", JSON.stringify(prendasEquipadas));
        localStorage.setItem("nigelEstiloTotal", estiloTotal);
        // Redirigir a la noche fashion
        window.location.href = "nigel-night.html";
    });
});

// =========================
// POPUP REVISTA
// =========================
let currentPrendaTipo = null;

function abrirPopupRevista(tipo) {
    const data = prendasData[tipo];
    if (!data) return;

    currentPrendaTipo = tipo;

    const popup = document.getElementById("revista-popup");
    document.getElementById("popup-titulo").innerText = data.nombre;
    document.getElementById("popup-descripcion").innerHTML = `${data.descripcion}<br><strong>+${data.puntos} pts de estilo</strong>`;
    document.getElementById("popup-imagen").src = data.img;

    // Configurar botón equipar
    const equiparBtn = document.getElementById("equiparBtn");
    // Quitar eventos anteriores clonando o reemplazando
    const nuevoBtn = equiparBtn.cloneNode(true);
    equiparBtn.parentNode.replaceChild(nuevoBtn, equiparBtn);
    nuevoBtn.addEventListener("click", () => {
        equiparPrenda(tipo);
        cerrarPopupRevista();
    });

    popup.style.display = "flex";
    activarFashionFlash(); // el flash de cámara
}

function cerrarPopupRevista() {
    document.getElementById("revista-popup").style.display = "none";
}

// =========================
// EQUIPAR PRENDA
// =========================
function equiparPrenda(tipo) {
    const data = prendasData[tipo];
    if (!data) return;

    // Verificar si ya está equipada
    if (prendasEquipadas.some(p => p.tipo === tipo)) {
        actualizarComentarioNigel(`Ya llevas ${data.nombre}. ¡No puedes duplicar!`);
        return;
    }

    // Agregar
    prendasEquipadas.push({
        tipo: tipo,
        nombre: data.nombre,
        puntos: data.puntos,
        imgSrc: data.img
    });

    estiloTotal += data.puntos;
    actualizarContadorEstilo();
    actualizarPanelOutfit();
    actualizarComentarioNigelPorLook();
    // Sonido de "zip" o flash
    activarFashionFlash();
}

// =========================
// ACTUALIZAR INTERFAZ
// =========================
function actualizarContadorEstilo() {
    document.getElementById("stylePoints").innerText = estiloTotal;
}

function actualizarPanelOutfit() {
    const outfitListDiv = document.getElementById("outfit-list");
    if (prendasEquipadas.length === 0) {
        outfitListDiv.innerHTML = '<p class="outfit-empty">Aún no has equipado nada. Haz click en una prenda.</p>';
        return;
    }

    let html = '';
    prendasEquipadas.forEach((prenda, index) => {
        html += `
            <div class="prenda-equipada">
                🧥 ${prenda.nombre} (+${prenda.puntos})
                <button data-index="${index}" class="remover-prenda">✖</button>
            </div>
        `;
    });
    outfitListDiv.innerHTML = html;

    // Agregar eventos de remover
    document.querySelectorAll(".remover-prenda").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.dataset.index);
            removerPrenda(idx);
        });
    });
}

function removerPrenda(index) {
    const removida = prendasEquipadas[index];
    estiloTotal -= removida.puntos;
    prendasEquipadas.splice(index, 1);
    actualizarContadorEstilo();
    actualizarPanelOutfit();
    actualizarComentarioNigelPorLook();
}

function actualizarComentarioNigel(mensaje) {
    nigelCommentDiv.innerHTML = `💬 Nigel: “${mensaje}”`;
}

function actualizarComentarioNigelPorLook() {
    const total = estiloTotal;
    if (prendasEquipadas.length === 0) {
        actualizarComentarioNigel("Esperando verte brillar… Elige algo, corazón.");
        return;
    }
    if (total < 6) {
        actualizarComentarioNigel("Un comienzo tímido. ¡Atrévete con más capas!");
    } else if (total < 12) {
        actualizarComentarioNigel("Mucho mejor. Ya tienes personalidad. ¿Un toque más?");
    } else if (total < 18) {
        actualizarComentarioNigel("¡Eso es! Ahora sí pareces una neoyorquina imparable.");
    } else {
        actualizarComentarioNigel("¡Dios mío! Esto es portada de Vogue. ¡Estás lista para la noche!");
    }
}

// =========================
// FLASH REUTILIZADO (copiado de devil.js)
// =========================
function activarFashionFlash() {
    const flash = document.getElementById("fashion-flash");
    const cameraAudio = document.getElementById("cameraSound");
    if (cameraAudio) {
        cameraAudio.currentTime = 0;
        cameraAudio.play().catch(e => console.log);
    }
    flash.classList.remove("flash-active");
    void flash.offsetWidth;
    flash.classList.add("flash-active");
}

// =========================
// AMBIENTE: iniciar audio al primer click global
// =========================
window.addEventListener("click", function initAudio() {
    const ambiance = document.getElementById("devilAmbience");
    if (ambiance) ambiance.play().catch(e=>console.log);
    window.removeEventListener("click", initAudio);
}, { once: true });
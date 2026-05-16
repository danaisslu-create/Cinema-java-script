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
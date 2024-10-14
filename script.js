

function notaRecuperacao(b1, b2, b3, b4) {
    const pesos = [2, 2, 3, 3];
    const notas = [b1, b2, b3, b4];

    // Encontrar a menor nota e seu índice
    const menorNota = Math.min(b1, b2, b3, b4);
    const indiceMenor = notas.indexOf(menorNota);

    // Soma das notas com os pesos
    let somaPesos = 0;
    let somaNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        if (i === indiceMenor) {
            // Quando for a menor nota, não inclui ela na soma
            somaNotas += 0; // Fazendo isso, estamos apenas substituindo pela nota de recuperação
        } else {
            somaNotas += notas[i] * pesos[i];
        }
        somaPesos += pesos[i];
    }

    // Agora procuramos por x que faz a média ser igual a 60
    for (let x = 0; x <= 100; x++) {
        const novaMedia = (somaNotas + x * pesos[indiceMenor]) / somaPesos;

        if (novaMedia >= 60) {
            return x; // Retorna a nota necessária na recuperação
        }
    }

    return null; // Retorna null se não encontrar uma nota válida
}

function calcular() {
const b1 = parseFloat(document.getElementById('bimestre1').value) || 0;
const b2 = parseFloat(document.getElementById('bimestre2').value) || 0;
const b3 = parseFloat(document.getElementById('bimestre3').value) || 0;
const b4 = parseFloat(document.getElementById('bimestre4').value) || 0;

const pesos = [2, 2, 3, 3];
const notas = [b1, b2, b3, b4];

const totalPesos = pesos.reduce((a, b) => a + b, 0);

let media = (b1 * pesos[0] + b2 * pesos[1] + b3 * pesos[2] + b4 * pesos[3]) / totalPesos;

if (b1 && b2 && b3 && b4) {
    // Todas as notas foram inseridas
    if (media >= 60) {
        document.getElementById('resultado').innerText = "APROVADO";
    } else {
        // Lógica do notaRecuperacao
        const notaNecessaria = notaRecuperacao(b1, b2, b3, b4);
            document.getElementById('resultado').innerText = `REPROVADO. Você precisa de ${Math.max(0, notaNecessaria).toFixed(2)} na recuperação.`;
    }
} else if (b1 && b2 && b3) {
    // Três bimestres preenchidos
    const notaFaltante = (60 * totalPesos - (b1 * pesos[0] + b2 * pesos[1] + b3 * pesos[2])) / pesos[3];
    document.getElementById('resultado').innerText = `PRECISA DE ${Math.max(0, notaFaltante).toFixed(2)} NO 4º BIMESTRE.`;
} else if (b1 && b2) {
    // Dois bimestres preenchidos
    const nota3 = (60 * totalPesos - (b1 * pesos[0] + b2 * pesos[1])) / (pesos[2] + pesos[3]);
    const nota4 = (60 * totalPesos - (b1 * pesos[0] + b2 * pesos[1] + nota3 * pesos[2])) / pesos[3];
    document.getElementById('resultado').innerText = `PRECISA DE ${Math.max(0, nota3).toFixed(2)} NO 3º E ${Math.max(0, nota4).toFixed(2)} NO 4º BIMESTRE.`;
} else {
    document.getElementById('resultado').innerText = "Preencha pelo menos o 1º e 2º Bimestre.";
}
}
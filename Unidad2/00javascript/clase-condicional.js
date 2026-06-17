/*
CONDICIONALES
Ejecutan un bloque de código dependiendo si se cumple la condición
*/

// If / else if / else
const nota = 8
if (nota >= 9) {
    console.log("Excelente")
} else if (nota >= 7) {
    console.log("Aprobado")
} else {
    console.log("Reprobado")
}

// Switch
const semaforo = "rojo"
switch (semaforo) {
    case "rojo":
        console.log("Detenerse")
        break
    case "amarillo":
        console.log("Precaución")
        break
    case "verde":
        console.log("Avanzar")
        break
    default:
        console.log("Color no válido")
}

// Operador Ternario
const edad = 20
const acceso = (edad >= 18) ? "Permitido" : "Denegado"
console.log(acceso)

// FUNCIONES

// If / else if / else
function probarNota() {
   const valorNota = document.getElementById("nota").value;
  const nota = parseFloat(valorNota);
  let resultado = "";

  if (nota >= 9) {
    resultado = "Excelente";
  } else if (nota >= 7) {
    resultado = "Aprobado";
  } else {
    resultado = "Reprobado";
  }

  document.getElementById("resultadoNota").innerText = resultado;
}

// Switch
function probarSemaforo() {
  const valorSemaforo = document.getElementById("semaforo").value;
  let resultado = "";

  switch (valorSemaforo) {
    case "rojo":
      resultado = "Detenerse";
      break;
    case "amarillo":
      resultado = "Precaución";
      break;
    case "verde":
      resultado = "Avanzar";
      break;
    default:
      resultado = "Color no válido";
  }

  document.getElementById("resultadoSemaforo").innerText = resultado;
}

// Operador Ternario
function probarEdad() {
  const valorEdad = document.getElementById("edad").value;
  const edad = parseInt(valorEdad);
  const acceso = (edad >= 18) ? "Permitido" : "Denegado";

  document.getElementById("resultadoEdad").innerText = acceso;
}

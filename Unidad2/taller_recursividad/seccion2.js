// SECCIÓN 2: Recursividad en Estructuras Lineales (Nivel Intermedio)


// Ejercicio 2.1: Inversión de un Arreglo (In-Place)
function invertirArreglo(arr, inicio, fin) {
    // Caso Base: Si los índices se encuentran o se cruzan, detenemos la inversión
    if (inicio >= fin) {
        return;
    }
    // Caso Recursivo: Intercambiamos los elementos extremos y nos movemos hacia el centro
    const temp = arr[inicio];
    arr[inicio] = arr[fin];
    arr[fin] = temp;
    invertirArreglo(arr, inicio + 1, fin - 1);
}
// Casos de prueba para validación
let miLista = [10, 20, 30, 40, 50];
invertirArreglo(miLista, 0, miLista.length - 1);
console.assert(JSON.stringify(miLista) === JSON.stringify([50, 40, 30, 20, 10]), "Error en invertirArreglo");
console.log("Ejercicio 2.1 superado.");


// Ejercicio 2.2: Búsqueda Binaria Recursiva
function busquedaBinariaRecursiva(arr, objetivo, bajo, alto) {
    // Caso Base 1: Si el rango de búsqueda es inválido, el elemento no existe
    if (bajo > alto) {
        return -1;
    }
    const medio = Math.floor((bajo + alto) / 2);
    // Caso Base 2: Si el elemento en el punto medio es el objetivo, retornamos su índice
    if (arr[medio] === objetivo) {
        return medio;
    }
    // Caso Recursivo: Buscamos recursivamente en la mitad izquierda o derecha
    if (arr[medio] > objetivo) {
        return busquedaBinariaRecursiva(arr, objetivo, bajo, medio - 1);
    } else {
        return busquedaBinariaRecursiva(arr, objetivo, medio + 1, alto);
    }
}
// Casos de prueba para validación
const datosOrdenados = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
console.assert(busquedaBinariaRecursiva(datosOrdenados, 23, 0, 9) === 5, "Error en busqueda binaria");
console.assert(busquedaBinariaRecursiva(datosOrdenados, 100, 0, 9) === -1, "Error en busqueda binaria");
console.log("Ejercicio 2.2 superado.");
// SECCIÓN 1: Calentamiento Numérico (Nivel Básico)


// Ejercicio 1.1: Suma de Dígitos de un Número
function sumaDigitos(n) {
    // Caso Base: Si el número es 0, retornamos 0 para terminar
    if (n === 0) {
        return 0;
    }
    // Caso Recursivo: Sumamos el último dígito al resultado de procesar los restantes
    return (n % 10) + sumaDigitos(Math.floor(n / 10));
}
// Casos de prueba para validación
console.assert(sumaDigitos(1243) === 10, "Error en sumaDigitos(1243)");
console.assert(sumaDigitos(0) === 0, "Error en sumaDigitos(0)");
console.assert(sumaDigitos(9) === 9, "Error en sumaDigitos(9)");
console.log("Ejercicio 1.1 superado.");


/**
 * Ejercicio 1.2: Potencia Recursiva
 */
function potencia(base, exponente) {
    // Caso Base: Cualquier número elevado a la potencia 0 es igual a 1
    if (exponente === 0) {
        return 1;
    }
    // Caso Recursivo: Exponenciación según si el exponente es par o impar
    if (exponente % 2 === 0) {
        const mitad = potencia(base, exponente / 2);
        return mitad * mitad;
    } else {
        const mitad = potencia(base, Math.floor(exponente / 2));
        return base * mitad * mitad;
    }
}
// Casos de prueba para validación
console.assert(potencia(2, 10) === 1024, "Error en potencia(2, 10)");
console.assert(potencia(5, 3) === 125, "Error en potencia(5, 3)");
console.assert(potencia(7, 0) === 1, "Error en potencia(7, 0)");
console.log("Ejercicio 1.2 superado.");
// SECCIÓN 4: Optimización - Recursividad de Cola


// Pregunta 4.3: Factorial de Cola (Tail Recursion)
function factorialCola(n, acumulador = 1) {
    // Caso Base: Si n llega a 1 o 0, retornamos el resultado acumulado
    if (n <= 1) {
        return acumulador;
    }
    // Caso Recursivo: Llamada de cola realizando la multiplicación en los argumentos
    return factorialCola(n - 1, acumulador * n);
}
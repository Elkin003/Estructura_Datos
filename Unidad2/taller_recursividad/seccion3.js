// SECCIÓN 3: Estructuras No Lineales y Algoritmos Avanzados (Nivel Avanzado)


class NodoArbol {
    constructor(valor) {
        this.valor = valor;
        this.izquierdo = null;
        this.derecho = null;
    }
}


// Recorrido Inorden (Izquierdo -> Raíz -> Derecho)
function recorridoInorden(raiz) {
    const resultado = [];
    function recorrer(nodo) {
        // Caso Base: Si el nodo es nulo, detenemos el recorrido en esta rama.
        if (nodo === null) {
            return;
        }
        // Caso Recursivo: Recorremos el hijo izquierdo, luego la raíz, y luego el derecho.
        recorrer(nodo.izquierdo);
        resultado.push(nodo.valor);
        recorrer(nodo.derecho);
    }
    recorrer(raiz);
    return resultado;
}


// Recorrido Preorden (Raíz -> Izquierdo -> Derecho)
function recorridoPreorden(raiz) {
    const resultado = [];
    function recorrer(nodo) {
        // Caso Base: Si el nodo es nulo, regresamos.
        if (nodo === null) {
            return;
        }
        // Caso Recursivo: Registramos la raíz, luego recorremos el izquierdo y el derecho.
        resultado.push(nodo.valor);
        recorrer(nodo.izquierdo);
        recorrer(nodo.derecho);
    }
    recorrer(raiz);
    return resultado;
}


// Recorrido Postorden (Izquierdo -> Derecho -> Raíz)
function recorridoPostorden(raiz) {
    const resultado = [];
    function recorrer(nodo) {
        // Caso Base: Si el nodo es nulo, regresamos.
        if (nodo === null) {
            return;
        }
        // Caso Recursivo: Recorremos izquierdo, derecho y al final registramos la raíz.
        recorrer(nodo.izquierdo);
        recorrer(nodo.derecho);
        resultado.push(nodo.valor);
    }
    recorrer(raiz);
    return resultado;
}

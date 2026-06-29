/**
 * Clase Pila (LIFO)
 * Implementada mediante nodos enlazados
 */
class Pila {
    constructor() {
        this.cima = null;
        this.tamano = 0;
    }

    // Apilar elemento en la cima
    push(valor) {
        const nuevoNodo = new Nodo(valor);
        nuevoNodo.siguiente = this.cima;
        this.cima = nuevoNodo;
        this.tamano++;
    }

    // Desapilar elemento de la cima
    pop() {
        if (this.isEmpty()) {
            return null;
        }
        const valorExtraido = this.cima.valor;
        this.cima = this.cima.siguiente;
        this.tamano--;
        return valorExtraido;
    }

    // Ver elemento de la cima
    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.cima.valor;
    }

    isEmpty() {
        return this.cima === null;
    }

    clear() {
        this.cima = null;
        this.tamano = 0;
    }
}

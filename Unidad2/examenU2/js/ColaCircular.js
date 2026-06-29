/**
 * Clase Cola Circular (FIFO)
 * Optimiza la memoria reutilizando un array estático de tamaño fijo.
 */
class ColaCircular {
    constructor(capacidad = 5) {
        this.capacidad = capacidad;
        this.arreglo = new Array(capacidad).fill(null);
        this.frente = 0;
        this.final = 0;
        this.tamano = 0;
    }

    // Encolar elemento en el final
    enqueue(valor) {
        if (this.isFull()) {
            return false;
        }
        if (!this.isEmpty()) {
            this.final = (this.final + 1) % this.capacidad;
        }
        this.arreglo[this.final] = valor;
        this.tamano++;
        this.imprimirEstadoConsola("ENQUEUE");
        return true;
    }

    // Desencolar elemento del frente
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        const valorExtraido = this.arreglo[this.frente];
        this.arreglo[this.frente] = null;
        if (this.tamano === 1) {
            this.frente = 0;
            this.final = 0;
        } else {
            this.frente = (this.frente + 1) % this.capacidad;
        }
        this.tamano--;
        this.imprimirEstadoConsola("DEQUEUE");
        return valorExtraido;
    }

    isEmpty() {
        return this.tamano === 0;
    }

    isFull() {
        return this.tamano === this.capacidad;
    }

    contiene(nota) {
        for (let i = 0; i < this.capacidad; i++) {
            if (this.arreglo[i] !== null && this.arreglo[i].id === nota.id) {
                return true;
            }
        }
        return false;
    }

    registrarNota(nota) {
        // Evitar duplicados en la cola
        if (this.contiene(nota)) {
            return;
        }

        // Si está llena liberamos espacio
        if (this.isFull()) {
            this.dequeue();
        }

        this.enqueue(nota);
    }

    clear() {
        this.arreglo.fill(null);
        this.frente = 0;
        this.final = 0;
        this.tamano = 0;
        this.imprimirEstadoConsola("CLEAR");
    }

    imprimirEstadoConsola(accion) {
        console.log(`Cola Circular | Accion: ${accion} | Tamaño: ${this.tamano}/${this.capacidad}`);
        console.log(`Puntero Frente: ${this.frente} | Puntero Final: ${this.final}`);

        const lineas = [];
        for (let i = 0; i < this.capacidad; i++) {
            const nota = this.arreglo[i];
            let valorTexto = "LIBRE";

            if (nota !== null) {
                valorTexto = `"${nota.nombre}"`;
            }

            let punteroInfo = "";
            if (i === this.frente && i === this.final) {
                punteroInfo = " <- FRENTE y FINAL";
            } else if (i === this.frente) {
                punteroInfo = " <- FRENTE";
            } else if (i === this.final) {
                punteroInfo = " <- FINAL";
            }

            lineas.push(`  Posición [${i}]: ${valorTexto}${punteroInfo}`);
        }
        console.log(lineas.join("\n"));
        console.log("\n");
    }
}

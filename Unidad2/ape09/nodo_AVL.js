// Estructura del Nodo AVL para el registro energético
export class NodoAVL {  
    constructor(idSensor, lectura) {
        this.idSensor = idSensor;  
        this.lectura = lectura;  
        this.altura = 1; // Un nodo hoja inicialmente tiene altura 1  
        this.izquierdo = null;  
        this.derecho = null;  
    }
}  
  
// Implementación Completa del TDA AVL  
export class ArbolAVLSensores {  
    constructor() {
        this.raiz = null;
    }

    // Método utilitario para obtener la altura (seguro contra null)  
    getAltura(nodo) {  
        if (nodo === null) return 0;  
        return nodo.altura;  
    }  
  
    // Cálculo del Factor de Equilibrio  
    getBalance(nodo) {  
        if (nodo === null) return 0;  
        // Un árbol AVL está balanceado si la diferencia está entre -1 y 1
        return this.getAltura(nodo.izquierdo) - this.getAltura(nodo.derecho);  
    }  
  
    // Rotación Simple a la Derecha (Se usa cuando el subárbol izquierdo es más pesado)
    rotacionDerecha(y) {  
        let x = y.izquierdo;  
        let T2 = x.derecho;  
  
        // Realizar la rotación  
        x.derecho = y;  
        y.izquierdo = T2;  
  
        // Actualizar alturas (primero el nodo que bajó y, luego el que subió x)  
        y.altura = Math.max(this.getAltura(y.izquierdo), this.getAltura(y.derecho)) + 1;  
        x.altura = Math.max(this.getAltura(x.izquierdo), this.getAltura(x.derecho)) + 1;  
  
        return x; // Retornar la nueva raíz de este subárbol  
    }  
  
    // TAREA COMPLETADA: Rotación Simple a la Izquierda (Se usa cuando el subárbol derecho es más pesado)  
    rotacionIzquierda(x) {  
        let y = x.derecho;  
        let T2 = y.izquierdo;  
  
        // Realizar la rotación  
        y.izquierdo = x;  
        x.derecho = T2;  

        // Actualizar alturas (primero el nodo que bajó x, luego el que subió y)  
        x.altura = Math.max(this.getAltura(x.izquierdo), this.getAltura(x.derecho)) + 1;  
        y.altura = Math.max(this.getAltura(y.izquierdo), this.getAltura(y.derecho)) + 1;  

        return y; // Retornar la nueva raíz de este subárbol  
    }  

    // Método público para insertar un nuevo sensor
    insertar(idSensor, lectura) {
        this.raiz = this._insertarRecursivo(this.raiz, idSensor, lectura);
    }

    // TAREA COMPLETADA: Método auxiliar recursivo para insertar y auto-balancear
    _insertarRecursivo(nodo, idSensor, lectura) {
        // 1. Realizar la inserción normal de un ABP (Árbol Binario de Búsqueda)
        if (nodo === null) {
            return new NodoAVL(idSensor, lectura);
        }

        // Usamos el idSensor para decidir si va a la izquierda o derecha
        if (idSensor < nodo.idSensor) {
            nodo.izquierdo = this._insertarRecursivo(nodo.izquierdo, idSensor, lectura);
        } else if (idSensor > nodo.idSensor) {
            nodo.derecho = this._insertarRecursivo(nodo.derecho, idSensor, lectura);
        } else {
            // No se permiten claves duplicadas en este diseño
            return nodo;
        }

        // 2. Actualizar la altura del nodo ancestro actual
        nodo.altura = 1 + Math.max(this.getAltura(nodo.izquierdo), this.getAltura(nodo.derecho));

        // 3. Obtener el factor de equilibrio para verificar si se desbalanceó
        let balance = this.getBalance(nodo);

        // 4. Si el nodo se desbalanceó, existen 4 casos posibles:

        // Caso Izquierda - Izquierda (Rotación simple a la derecha)
        if (balance > 1 && idSensor < nodo.izquierdo.idSensor) {
            return this.rotacionDerecha(nodo);
        }

        // Caso Derecha - Derecha (Rotación simple a la izquierda)
        if (balance < -1 && idSensor > nodo.derecho.idSensor) {
            return this.rotacionIzquierda(nodo);
        }

        // Caso Izquierda - Derecha (Rotación doble: izquierda y luego derecha)
        if (balance > 1 && idSensor > nodo.izquierdo.idSensor) {
            nodo.izquierdo = this.rotacionIzquierda(nodo.izquierdo);
            return this.rotacionDerecha(nodo);
        }

        // Caso Derecha - Izquierda (Rotación doble: derecha y luego izquierda)
        if (balance < -1 && idSensor < nodo.derecho.idSensor) {
            nodo.derecho = this.rotacionDerecha(nodo.derecho);
            return this.rotacionIzquierda(nodo);
        }

        // Retornar el nodo (sin cambios si ya estaba balanceado)
        return nodo;
    }

    // TAREA COMPLETADA: Método público para buscar un sensor
    buscar(idSensor) {
        return this._buscarRecursivo(this.raiz, idSensor);
    }

    // TAREA COMPLETADA: Método auxiliar recursivo para buscar de forma eficiente O(log n)
    _buscarRecursivo(nodo, idSensor) {
        // Caso base: El nodo es nulo o encontramos el sensor buscado
        if (nodo === null || nodo.idSensor === idSensor) {
            return nodo;
        }

        // Si el id buscado es menor, ir al subárbol izquierdo
        if (idSensor < nodo.idSensor) {
            return this._buscarRecursivo(nodo.izquierdo, idSensor);
        }

        // Si el id buscado es mayor, ir al subárbol derecho
        return this._buscarRecursivo(nodo.derecho, idSensor);
    }
}

class RegistroEnergia {
    constructor() {
         // Generación de un registro de energía ficticio (ej. 110V a 240V)
        this.voltaje = +(110 + Math.random() * 130).toFixed(2);
    }
}

// Clase para la simulación principal
class SimulacionSmartGrid {
    static ejecutarPrueba() {
        const redElectrica = new ArbolAVLSensores();
        const numSensores = 100000;
        console.log(`Iniciando despliegue de ${numSensores} sensores inteligentes...`);
        
        // Inserción completamente secuencial 
          // (Esto provocaría el peor caso O(n) en un BST normal)
        for (let i = 0; i < numSensores; i++) {
            let lectura = new RegistroEnergia(); 
            redElectrica.insertar(i, lectura); 
        }
        console.log("Red eléctrica AVL construida y balanceada con éxito.");
        
        // Medición del tiempo de búsqueda
        const idBuscado = 99999;
        // Capturamos el tiempo con precisión submilisegundo en JS
        const inicioBusqueda = performance.now();
        
        const resultado = redElectrica.buscar(idBuscado);
        
        const finBusqueda = performance.now();
        const tiempoMs = finBusqueda - inicioBusqueda;
        console.log(`Tiempo de búsqueda del Sensor ID ${idBuscado}: ${tiempoMs.toFixed(4)} ms.`);
    }
}

// Iniciar simulación
SimulacionSmartGrid.ejecutarPrueba();
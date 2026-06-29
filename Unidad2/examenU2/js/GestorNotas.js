/**
 * Clase GestorNotas
 * Controlador central que integra la lista de Notas, las Pilas y la Cola Circular
 */
class GestorNotas {
    constructor() {
        this.notas = [];
        this.ultimoId = 0;
        this.notaActiva = null;
        // Historial de cambios
        this.pilaDeshacer = new Pila();
        this.pilaRehacer = new Pila();
        // Notas recientes
        this.colaRecientes = new ColaCircular(5);
    }

    crearNota(nombre, contenido = "") {
        this.ultimoId++;
        const nuevaNota = new Nota(this.ultimoId, nombre, contenido);
        this.notas.push(nuevaNota);
        return nuevaNota;
    }

    // Seleccionar una nota y encolarla en Recientes
    seleccionarNota(nota) {
        this.notaActiva = nota;
        // Limpiar historial al cambiar de nota
        this.pilaDeshacer.clear();
        this.pilaRehacer.clear();
        // Encolar en recientes
        this.colaRecientes.registrarNota(nota);
    }

    registrarCambioEnHistorial(contenidoPrevio) {
        if (!this.notaActiva) {
            return;
        }
        // Evitar estados duplicados
        if (this.pilaDeshacer.peek() !== contenidoPrevio) {
            this.pilaDeshacer.push(contenidoPrevio);
            this.pilaRehacer.clear(); // Limpiar pila de rehacer
        }
    }

    deshacer() {
        if (!this.notaActiva || this.pilaDeshacer.isEmpty()) {
            return null;
        }
        const contenidoAnterior = this.pilaDeshacer.pop();
        // Guardar estado actual para rehacer
        this.pilaRehacer.push(this.notaActiva.contenido);
        this.notaActiva.contenido = contenidoAnterior;
        return contenidoAnterior;
    }

    rehacer() {
        if (!this.notaActiva || this.pilaRehacer.isEmpty()) {
            return null;
        }
        const contenidoSiguiente = this.pilaRehacer.pop();
        // Guardar estado actual para deshacer
        this.pilaDeshacer.push(this.notaActiva.contenido);
        this.notaActiva.contenido = contenidoSiguiente;
        return contenidoSiguiente;
    }

    crearNotasPorDefecto() {
        this.notas = [];
        this.crearNota(
            "Estructura de Datos",
            "Optimizar el ordenamiento y el envío\n\n¿Cuál es el algoritmo de ordenación óptimo para 50000, 75000 y 1000000 paquetes?\n¿Cuánto tiempo mejoró y por qué es mejor que otros?\n\nAutónomos:\nPrimero: informe de investigación\nSegundo: exposición de los métodos\n\nEvaluación de Proyecto de materia:\nTener FIFO (colas), LIFO (pilas) y colas circulares obligatorio\nInterfaz gráfica (puntos extra)\nRecursividad (puntos extra)\nExposición de 10 minutos máximo"
        );
        this.crearNota(
            "Requisitos de software",
            "Hacer el diagrama de casos de uso en base a los requisitos del documento\n\nPrimero aplicar las técnicas (estudio de documentos, sistemas, prototipo, brainstorm, escenarios)\nDespués de aplicar las técnicas, documentar los requisitos (plazo hasta el lunes)\n\nACD mañana\n\nPRÓXIMA SEMANA:\nCómo construir agentes inteligentes para que generen un documento de requisitos en base a la documentación que se tiene"
        );
        this.crearNota(
            "Base de datos",
            "Examen (Proyecto) del 22 al 26 de Junio\n\nSeparar algunas tablas a un web service (solo para consultar mediante URL sin interfaz, no usar MySQL, usar otra BD SQL) con su propio usuario con permisos de búsqueda\nLas demás tablas en un web application con interfaz\n\nDocumentar los modelos y todo el CRUD a través del panel de administración\n\nCrear template guardar_consulta.html muy simple\nCampos: mascota (seleccionar de las que hay), fecha, diagnóstico, veterinario (seleccionar de la otra base de datos)"
        );
        this.crearNota(
            "Arquitectura de Ordenadores",
            "Evolución de memorias:\nTipos de memoria (RAM, SDRAM y caché) y su evolución histórica\nDiferencia de tipos de caché L1\nExaminar qué tiene la PC actual (GPU dedicada o compartida, núcleos, velocidad de procesador y buses)\n\nSimulación en Vivado:\nImplementar un bus de transmisión de datos usando 2 dispositivos (debe tener entrada, salida, buses de control, dirección y datos)"
        );
        this.crearNota(
            "Estadística Analítica",
            "Tareas en Mendeley:\nCapturas de pantalla de cómo obtuvieron la bibliografía\nExplicar primero cómo añadir un nuevo registro con capturas\nCrear el grupo Grupo1_Agosto26\nCompartir bibliografía e invitar al correo del profesor angel.k.orellana@...\n\nEnsayo de buses antiguos y modernos:\nISA, AGP, PCI, PCIe, M2, SATA, USB\nDebe contener introducción, desarrollo, conclusiones y bibliografía"
        );
    }
}

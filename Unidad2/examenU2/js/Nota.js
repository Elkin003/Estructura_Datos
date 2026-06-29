/**
 * Clase Nota
 * Representa la entidad de una nota de texto
 */
class Nota {
    constructor(id, nombre, contenido = "") {
        this.id = id;
        this.nombre = nombre;
        this.contenido = contenido;
    }
}

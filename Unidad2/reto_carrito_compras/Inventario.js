const Producto = require('./Producto')

class Inventario {
    constructor() {
        this.productos = []
    }

    agregarProducto(producto) {
        this.productos.push(producto)
    }

    obtenerProducto(id) {
        return this.productos.find(p => p.id === id)
    }

    obtenerTodos() {
        return this.productos
    }
}

module.exports = Inventario
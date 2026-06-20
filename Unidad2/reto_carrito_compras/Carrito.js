class Carrito {
    constructor() {
        this.productos = []
    }

    agregar(producto, cantidad) {
        if (cantidad <= 0) {
            return "La cantidad debe ser mayor a cero."
        }
        if (producto.stock < cantidad) {
            return "No hay suficiente stock disponible en el inventario."
        }

        producto.stock -= cantidad

        // Buscamos si el producto ya está en el carrito
        let productoExistente = this.productos.find(p => p.producto.id === producto.id)

        if (productoExistente) {
            productoExistente.cantidad += cantidad
        } else {
            this.productos.push({ producto: producto, cantidad: cantidad })
        }

        return `Se agregaron ${cantidad} unidades de "${producto.nombre}" al carrito.`
    }

    retirar(productoId, cantidad) {
        // Buscamos la posición del producto en el arreglo
        let indice = this.productos.findIndex(p => p.producto.id === productoId)

        if (indice === -1) {
            return "El producto no está en el carrito."
        }

        let productoEnCarrito = this.productos[indice]

        if (cantidad <= 0) {
            return "La cantidad a retirar debe ser mayor a cero."
        }

        if (cantidad >= productoEnCarrito.cantidad) {
            productoEnCarrito.producto.stock += productoEnCarrito.cantidad
            this.productos.splice(indice, 1)
            return `Se retiró "${productoEnCarrito.producto.nombre}" por completo del carrito.`
        } else {
            productoEnCarrito.cantidad -= cantidad
            productoEnCarrito.producto.stock += cantidad
            return `Se retiraron ${cantidad} unidades de "${productoEnCarrito.producto.nombre}".`
        }
    }

    calcularTotal() {
        let total = 0
        for (let p of this.productos) {
            total += p.producto.precio * p.cantidad
        }
        return total
    }

    obtenerProductos() {
        return this.productos
    }
}

module.exports = Carrito
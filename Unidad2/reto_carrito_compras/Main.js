const readline = require('readline')
const Producto = require('./Producto')
const Inventario = require('./Inventario')
const Carrito = require('./Carrito')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const inventario = new Inventario()
const carrito = new Carrito()

inventario.agregarProducto(new Producto("1", "Libro", 15, 10))
inventario.agregarProducto(new Producto("2", "Cuaderno", 1, 30))
inventario.agregarProducto(new Producto("3", "Marcadores", 1, 15))
inventario.agregarProducto(new Producto("4", "Mochila", 25, 5))

function agregarAlCarrito() {
    rl.question("ID del producto a añadir: ", (id) => {
        let producto = inventario.obtenerProducto(id.trim())
        if (!producto) {
            console.log("Producto no encontrado")
            return menu()
        }

        rl.question("Cantidad a añadir: ", (cantidadTexto) => {
            let cantidad = parseInt(cantidadTexto.trim())
            if (isNaN(cantidad) || cantidad <= 0) {
                console.log("Cantidad no válida")
                return menu()
            }

            let resultado = carrito.agregar(producto, cantidad)
            console.log(resultado)
            menu()
        })
    })
}

function retirarDelCarrito() {
    if (carrito.obtenerProductos().length === 0) {
        console.log("El carrito está vacío")
        return menu()
    }

    rl.question("ID del producto a retirar: ", (id) => {
        rl.question("Cantidad a retirar: ", (cantidadTexto) => {
            let cantidad = parseInt(cantidadTexto.trim())
            if (isNaN(cantidad) || cantidad <= 0) {
                console.log("Cantidad no válida")
                return menu()
            }

            let resultado = carrito.retirar(id.trim(), cantidad)
            console.log(resultado)
            menu()
        })
    })
}

function menu() {
    console.log("\n\n--- INVENTARIO ---")
    let productos = inventario.obtenerTodos()
    for (let p of productos) {
        console.log(`ID: ${p.id} | ${p.nombre} | Precio: $${p.precio} | Stock: ${p.stock}`)
    }

    console.log("\n--- CARRITO ---")
    let productosCarrito = carrito.obtenerProductos()
    if (productosCarrito.length === 0) {
        console.log("El carrito está vacío")
    } else {
        for (let p of productosCarrito) {
            let subtotal = p.producto.precio * p.cantidad
            console.log(`${p.producto.nombre} (ID: ${p.producto.id}) x ${p.cantidad} - Subtotal: $${subtotal}`)
        }
        console.log(`Total a pagar: $${carrito.calcularTotal()}`)
    }

    console.log("\nOpciones:")
    console.log("1. Añadir producto")
    console.log("2. Retirar producto")
    console.log("3. Salir")

    rl.question("\nSeleccione una opción: ", (opcion) => {
        switch (opcion.trim()) {
            case "1":
                agregarAlCarrito()
                break

            case "2":
                retirarDelCarrito()
                break

            case "3":
                rl.close()
                break

            default:
                console.log("Opción no válida")
                menu()
                break
        }
    })
}

menu()
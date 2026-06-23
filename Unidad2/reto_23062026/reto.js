class Playlist {
    constructor(nombre) {
        this.nombre = nombre
        this.canciones = []
    }

    agregarCancion(titulo, artista) {
        this.canciones.push({ titulo, artista })
        console.log(`Cancion agregada: ${titulo} de ${artista}`)
    }

    reproducirSiguiente() {
        if (this.canciones.length === 0) {
            console.log("La playlist esta vacia. No hay canciones por reproducir.")
            return
        }
        const cancion = this.canciones.shift()
        console.log(`Reproduciendo: ${cancion.titulo} de ${cancion.artista}`)
    }

    verSiguiente() {
        if (this.canciones.length === 0) {
            console.log("No hay canciones en espera.")
            return
        }
        const siguiente = this.canciones[0]
        console.log(`Siguiente en cola: ${siguiente.titulo} de ${siguiente.artista}`)
    }

    verCola() {
        if (this.canciones.length === 0) {
            console.log("La playlist esta vacia.")
            return
        }
        console.log(`Playlist: ${this.nombre} (${this.canciones.length} canciones)`)
        this.canciones.forEach((c, i) => {
            console.log(`  ${i + 1}. ${c.titulo} - ${c.artista}`)
        })
    }
}

const playlist = new Playlist("Mis Favoritas")

playlist.agregarCancion("Cancion 1", "Artista A")
playlist.agregarCancion("Cancion 2", "Artista B")
playlist.agregarCancion("Cancion 3", "Artista C")
playlist.agregarCancion("Cancion 4", "Artista D")

console.log("")
playlist.verCola()

console.log("")
playlist.verSiguiente()

console.log("")
playlist.reproducirSiguiente()
playlist.reproducirSiguiente()

console.log("")
playlist.verCola()

console.log("")
playlist.reproducirSiguiente()
playlist.reproducirSiguiente()
playlist.reproducirSiguiente()

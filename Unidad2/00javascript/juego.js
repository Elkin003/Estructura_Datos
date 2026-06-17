const numeroSecreto = Math.floor(Math.random()*10+1)
const numeroJugador = parseInt(prompt("Adivina el número secreto entre el número 1 al 10:"))

console.log(`Este es el número con el que juegas ${numeroJugador}`)

if (numeroJugador === numeroSecreto) {
    console.log("Felicidades, adivinaste el número secreto!")
} else if (numeroJugador < numeroSecreto) {
    console.log("Número menor, intenta nuevamente")
} else {
    console.log("Número mayor, intenta nuevamente")
}
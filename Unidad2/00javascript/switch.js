let expr = "mangos"

switch (expr) {
    case "mangos":
        console.log("Los mangos x5 cuestan $1")
        break

    case "naranjas":
        console.log("Las naranjas x10 cuestan $1")
        break

    case "manzanas":
        console.log("Las manzanas x5 cuestan $1")
        break

    default:
        console.log(`Lo siento no contamos con $(expr)`)
        break
}
console.log("Quiere comprar algo")

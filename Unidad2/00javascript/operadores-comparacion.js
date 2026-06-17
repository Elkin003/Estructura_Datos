/*
==     
===    mismo tipo y mismo valor

!=
!==    diferente tipo y diferente valor

>
<

AND
&&

OR
||

NOT
!
*/

// OPERADORES DE COMPARACIÓN

const a = 5
const b = "5"
const c = 10

// Igualdad
const esIgual = a == b
const esIgualEstricto = a === b
console.log(esIgual)
console.log(esIgualEstricto)

// Desigualdad
const esDiferente = a != b
const esDiferenteEstricto = a !== b
console.log(esDiferente)
console.log(esDiferenteEstricto)

// Mayor y Menor
const esMayor = c > a
const esMenor = c < a
console.log(esMayor)
console.log(esMenor)


// OPERADORES LÓGICOS

const llueve = true
const haceFrio = false

// AND
const climaMalo = llueve && haceFrio
console.log(climaMalo)

// OR
const salirConParaguas = llueve || haceFrio
console.log(salirConParaguas)

// NOT
const noLlueve = !llueve
console.log(noLlueve)
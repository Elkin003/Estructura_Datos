const gestor = new GestorNotas();
let contenidoPrevio = null;
gestor.crearNotasPorDefecto();

// Buscamos los elementos de la interfaz por su id
const listaNotas = document.getElementById('lista-notas');
const listadoRecientes = document.getElementById('lista-recientes');
const visorTituloNota = document.getElementById('visor-titulo-nota');
const editorTexto = document.getElementById('editor-texto');
const botonDeshacer = document.getElementById('boton-deshacer');
const botonRehacer = document.getElementById('boton-rehacer');

// FUNCIONES DE RENDERIZADO

// Generar el HTML de una nota
function generarHtmlNota(nota) {
    const claseActivo = (gestor.notaActiva && nota.id === gestor.notaActiva.id) ? ' activo' : '';
    return `
        <div class="elemento-lista${claseActivo}" onclick="abrirNotaPorId(${nota.id})">
            <i class="fa-solid fa-file-lines icono-nota"></i>
            <span class="nombre-elemento">${nota.nombre}</span>
        </div>`;
}

// Renderizado de la lista de notas
function renderizarNotas() {
    let html = '';
    gestor.notas.forEach(nota => {
        html += generarHtmlNota(nota);
    });
    listaNotas.innerHTML = html;
    // Habilitamos o deshabilitamos los botones según el estado de las pilas
    botonDeshacer.disabled = !gestor.notaActiva || gestor.pilaDeshacer.isEmpty();
    botonRehacer.disabled = !gestor.notaActiva || gestor.pilaRehacer.isEmpty();
}

// Renderizado de las notas recientes
function renderizarRecientes() {
    let html = '';
    let posicionNota = gestor.colaRecientes.frente;

    for (let contador = 0; contador < gestor.colaRecientes.tamano; contador++) {
        const notaReciente = gestor.colaRecientes.arreglo[posicionNota];
        if (notaReciente) {
            html = generarHtmlNota(notaReciente) + html;
        }
        posicionNota = (posicionNota + 1) % gestor.colaRecientes.capacidad;
    }

    listadoRecientes.innerHTML = html;
}

// ACCIONES

// Crear nueva nota
function crearNuevaNota() {
    const nombre = prompt("Nombre de la nota:", "Sin título");
    if (nombre && nombre.trim() !== '') {
        const nuevaNota = gestor.crearNota(nombre.trim());
        abrirNota(nuevaNota);
    }
}

// Abrir una nota seleccionada
function abrirNota(nota) {
    gestor.seleccionarNota(nota);
    editorTexto.disabled = false;
    editorTexto.value = nota.contenido;
    visorTituloNota.textContent = nota.nombre;
    contenidoPrevio = nota.contenido;

    renderizarNotas();
    renderizarRecientes();
}

// Buscar y abrir nota por su ID
function abrirNotaPorId(id) {
    const nota = gestor.notas.find(n => n.id === id);
    if (nota) {
        abrirNota(nota);
    }
}

// OPERACIONES DEL HISTORIAL

// Deshacer el último cambio de texto
function deshacerCambio() {
    // Si hay algún cambio en el editor que aún no se ha guardado, lo registramos primero
    if (editorTexto.value !== contenidoPrevio) {
        gestor.registrarCambioEnHistorial(contenidoPrevio);
        contenidoPrevio = editorTexto.value;
    }

    const nuevoContenido = gestor.deshacer();
    if (nuevoContenido !== null) {
        editorTexto.value = nuevoContenido;
        contenidoPrevio = nuevoContenido; // Actualizamos nuestra referencia
        renderizarNotas();
    }
}

// Rehacer el último cambio deshecho
function rehacerCambio() {
    const nuevoContenido = gestor.rehacer();
    if (nuevoContenido !== null) {
        editorTexto.value = nuevoContenido;
        contenidoPrevio = nuevoContenido; // Actualizamos nuestra referencia
        renderizarNotas();
    }
}


// EVENTOS DEL EDITOR DE TEXTO

// Control de escritura y guardado en historial por palabras (espacio o enter)
function controlarEscritura() {
    if (!gestor.notaActiva) return;

    const textoActual = editorTexto.value;
    const ultimoCaracter = textoActual.slice(-1);

    // Si escribe un espacio o salto de línea, guardamos el estado anterior en el historial
    if (ultimoCaracter === ' ' || ultimoCaracter === '\n') {
        gestor.registrarCambioEnHistorial(contenidoPrevio);
        contenidoPrevio = textoActual;
    }

    gestor.notaActiva.contenido = textoActual;
    renderizarNotas();
}

// Manejar atajos de teclado en el editor (Ctrl + Z y Ctrl + Shift + Z)
function manejarAtajos(evento) {
    if (evento.ctrlKey && evento.key.toLowerCase() === 'z') {
        evento.preventDefault();
        if (evento.shiftKey) {
            rehacerCambio();
        } else {
            deshacerCambio();
        }
    }
}

renderizarNotas();
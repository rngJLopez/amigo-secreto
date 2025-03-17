// Lista de amigos
let amigos = [];

// Función para agregar nombres a la lista
function agregarAmigo() {
    let input = document.getElementById("amigo");
    let nombre = input.value.trim(); // Eliminar espacios en blanco

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    if (amigos.includes(nombre)) {
        alert("Este nombre ya ha sido agregado.");
        return;
    }

    amigos.push(nombre);
    input.value = ""; // Limpiar input
    actualizarLista();
}

// Función para actualizar la lista en pantalla
function actualizarLista() {
    let listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = ""; // Limpiar lista antes de actualizar

    amigos.forEach((amigo) => {
        let li = document.createElement("li");
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

// Función para realizar el sorteo
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debes agregar al menos 2 amigos para hacer el sorteo.");
        return;
    }

    let amigosDisponibles = [...amigos]; // Copia del array original
    let resultado = [];

    amigos.forEach((amigo) => {
        let posibles = amigosDisponibles.filter(a => a !== amigo); // Evitar autoasignación

        if (posibles.length === 0) {
            // Si en la última ronda alguien se quedó sin opciones, rehacer el sorteo
            return sortearAmigo();
        }

        let elegido = posibles[Math.floor(Math.random() * posibles.length)];
        resultado.push(`A ${amigo} le ha tocado ${elegido}.`);

        // Eliminar al elegido de los disponibles
        amigosDisponibles = amigosDisponibles.filter(a => a !== elegido);
    });

    mostrarResultado(resultado);
}

// Función para mostrar los resultados en un alert
function mostrarResultado(resultado) {
    let mensaje = "🎁 Resultado del sorteo:\n\n" + resultado.join("\n");
    alert(mensaje);
}
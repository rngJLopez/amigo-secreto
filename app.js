// Lista de amigos
let amigos = [];

// Función para agregar nombres a la lista
function agregarAmigo() {
    let input = document.getElementById("amigo");
    let nombre = input.value.trim(); 

    if (nombre.length < 2) {
        alert("El nombre debe tener al menos 2 caracteres.");
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        alert("Por favor, ingresa un nombre válido (solo letras y espacios).");
        return;
    }

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
    listaAmigos.innerHTML = ""; 

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
            return sortearAmigo();
        }

        let elegido = posibles[Math.floor(Math.random() * posibles.length)];
        resultado.push(`➤ A ${amigo} le ha tocado ${elegido}.`);

        // Eliminar al elegido de los disponibles
        amigosDisponibles = amigosDisponibles.filter(a => a !== elegido);
    });

    mostrarResultado(resultado);
}

function mostrarResultado(resultado) {
    let mensaje = "🎁 Resultado del sorteo:\n\n" + resultado.join("\n");
    alert(mensaje);
}

// Función para reiniciar la lista
function reiniciarLista() {
    amigos = [];
    actualizarLista();
    // alert("La lista ha sido reiniciada.");
}

// Event listener para detectar la tecla "Enter" en el input
document.getElementById("amigo").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evitar que se envíe el formulario (si lo hubiera)
        agregarAmigo(); // Llamar a la función agregarAmigo
    }
});
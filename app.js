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

    let asignaciones = {};
    let amigosMezclados = mezclarArray([...amigos]); // Mezclar la lista de amigos

    // Asignar a cada persona el siguiente en la lista mezclada
    for (let i = 0; i < amigosMezclados.length; i++) {
        let amigo = amigosMezclados[i];
        let elegido = amigosMezclados[(i + 1) % amigosMezclados.length];

        // Si el elegido es el mismo, reiniciar el sorteo
        if (elegido === amigo) {
            return sortearAmigo();
        }

        asignaciones[amigo] = elegido; // Guardar la asignación
    }

    // Mostrar los resultados
    let resultado = [];
    for (let amigo in asignaciones) {
        resultado.push(`➤ A ${amigo} le ha tocado ${asignaciones[amigo]}.`);
    }

    mostrarResultado(resultado);
}

// Función para mezclar un array
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
    }
    return array;
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
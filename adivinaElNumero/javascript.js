// Variables globales para el juego
let max = 0;               // Rango máximo del número secreto, depende de la dificultad
let numeroSecreto = 0;     // Número secreto a adivinar
let intentos = 0;          // Número de intentos restantes
let recordIntentos = null; // Récord de intentos (menor número de intentos en que se ha adivinado)

// Ejecuta el código cuando el contenido de la página se haya cargado completamente
document.addEventListener("DOMContentLoaded", function() {

    // Elementos HTML que se usarán en el juego
    const dificultad = document.getElementById('selectorDificultad');     // Selector de dificultad
    const valueNumeroUsuario = document.getElementById('txNumeroUsuario'); // Input donde el usuario introduce el número
    const btnAdivinar = document.getElementById('btnAdivinar');           // Botón para intentar adivinar
    const btnReiniciar = document.getElementById('btnReiniciar');         // Botón para reiniciar el juego
    const mensajeResultado = document.getElementById('mensajeResultado'); // Muestra el resultado del intento
    const mensajeRecord = document.getElementById('mensajeRecord');       // Muestra el récord de intentos

    // Evento para actualizar la dificultad del juego cuando se cambia el selector
    dificultad.addEventListener("change", function() {
        validarDificultad();                  // Llama a la función para establecer el nivel
        numeroSecreto = getRandomInt(max);    // Genera un nuevo número secreto dentro del rango
        console.log("Numero secreto: " + numeroSecreto);
        console.log("Quedan: " + intentos + " intentos");
    });

    // Función que establece el rango y número de intentos según la dificultad seleccionada
    function validarDificultad() {
        if (dificultad.value === "facil") {
            max = 10;
            intentos = 5;
        } else if (dificultad.value === "medio") {
            max = 50;
            intentos = 7;
        } else {
            max = 100;
            intentos = 10;
        }
        return max;
    }

    // Evento del botón para intentar adivinar el número
    btnAdivinar.addEventListener("click", function() {
        const numeroUsuario = parseInt(valueNumeroUsuario.value); // Obtiene el número introducido por el usuario
        compruebaResultado(numeroUsuario, numeroSecreto);         // Llama a la función para verificar el intento
        console.log("Quedan: " + intentos + " intentos");
    });

    // Evento del botón de reinicio
    btnReiniciar.addEventListener("click", reiniciarJuego);

    // Función que verifica el número introducido por el usuario y da feedback
    function compruebaResultado(numeroUsuario, numeroSecreto) {
        if (intentos !== 0) { // Comprueba si quedan intentos
            if (numeroUsuario > numeroSecreto) {
                mensajeResultado.textContent = "El número introducido es mayor.";
                intentos--; // Reduce el número de intentos
            } else if (numeroUsuario < numeroSecreto) {
                mensajeResultado.textContent = "El número introducido es menor.";
                intentos--;
            } else if (numeroSecreto === numeroUsuario) { // Si el usuario adivina correctamente
                mensajeResultado.textContent = "Enhorabuena, adivinaste el número.";
                
                // Calcula los intentos usados según la dificultad y actualiza el récord si es necesario
                let intentosUsados = dificultad.value === "facil" ? 5 - intentos : dificultad.value === "medio" ? 7 - intentos : 10 - intentos;
                if (recordIntentos === null || intentosUsados < recordIntentos) {
                    recordIntentos = intentosUsados;
                    mensajeRecord.textContent = `Récord de intentos: ${recordIntentos + 1}`; // Muestra el récord actualizado
                }

                mostrarBotonReiniciar(); // Muestra el botón de reinicio
            }
        }

        // Si el usuario se queda sin intentos y no ha acertado
        if (intentos === 0 && numeroUsuario !== numeroSecreto) {
            alert("Lo siento, no te quedan intentos. El número era " + numeroSecreto);
            mostrarBotonReiniciar(); // Muestra el botón de reinicio
        }
    }

    // Función que habilita el botón de reinicio y desactiva el de adivinar
    function mostrarBotonReiniciar() {
        btnAdivinar.disabled = true;           // Desactiva el botón de adivinar
        btnReiniciar.style.display = "inline"; // Muestra el botón de reinicio
    }

    // Función para reiniciar el juego y restablecer el estado inicial
    function reiniciarJuego() {
        btnReiniciar.style.display = "none"; // Oculta el botón de reinicio
        btnAdivinar.disabled = false;        // Habilita el botón de adivinar
        numeroSecreto = getRandomInt(max);   // Genera un nuevo número secreto
        intentos = dificultad.value === "facil" ? 5 : dificultad.value === "medio" ? 7 : 10; // Restablece los intentos según dificultad
        valueNumeroUsuario.value = "";       // Limpia el input de número
        mensajeResultado.textContent = "";   // Limpia el mensaje de resultado
        console.log("Juego reiniciado. Número secreto:", numeroSecreto);
    }
});

// Función para generar un número aleatorio entre 1 y el valor máximo
function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

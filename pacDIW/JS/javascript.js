// Escucha el evento "DOMContentLoaded" para asegurarse de que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function() {
    
    // Obtiene el elemento de audio con el ID "cancion"
    const cancion = document.getElementById("cancion");

    // Array de mensajes de estado para mostrar secuencialmente
    const array = ["JOINING SERVER", "PREPARING ASSETS", "ESTABLISHING CONNECTION"];
    const estado = document.getElementById("estado"); // Elemento donde se mostrarán los mensajes de estado
    const muted = document.getElementById("muted"); // Elemento donde se mostrará si el audio está silenciado o no

    // Array para los estados de silencio de audio
    const array2 = ["MUTED", "UNMUTED"];
    let i = 0; // Índice para el array de estado
    let j = 0; // Índice para el array de silencio de audio

    // Función para alternar el estado de "muted" entre "MUTED" y "UNMUTED"
    function modificarSonido() {
        muted.textContent = array2[j]; // Cambia el texto en el elemento "muted"
        j = (j + 1) % array2.length; // Alterna entre 0 y 1
    }

    // Función para alternar los mensajes de estado en el elemento "estado"
    function modificarEstado() {
        estado.textContent = array[i]; // Cambia el texto en el elemento "estado"
        i = (i + 1) % array.length; // Alterna los mensajes en el array
    }
    // Llama a modificarEstado cada 3000ms (3 segundos) para actualizar el mensaje de estado
    setInterval(modificarEstado, 3000);

    // Función para cambiar la fuente de la canción
    function cambiarCancion(src) {
        cancion.src = src; // Cambia la ruta de la canción
        cancion.onload; // Recarga el audio
        cancion.onplay; // Reproduce el audio
    }

    // Escucha el evento de "keydown" (presionar una tecla) en la ventana
    window.addEventListener("keydown", (event) => {
        console.log(event); // Imprime el evento en la consola para depuración

        switch (event.key) {
            case "ArrowUp": // Sube el volumen de la canción
                cancion.volume = Math.min(1, cancion.volume + 0.1); // Aumenta el volumen un 10%
                break;
            case "ArrowDown": // Baja el volumen de la canción
                cancion.volume = Math.max(0, cancion.volume - 0.1); // Disminuye el volumen un 10%
                break;
            case "ArrowLeft": // Cambia la canción a "interestelar.mp3"
                src = "/AUDIO/interestelar.mp3";
                cambiarCancion(src);
                break;
            case "ArrowRight": // Cambia la canción a "time.mp3"
                src = "/AUDIO/time.mp3";
                cambiarCancion(src);
                break;
            case " ": // Alterna el estado de silencio de la canción (mute/unmute) al presionar la barra espaciadora
                cancion.muted = !cancion.muted; // Cambia el estado de muted
                modificarSonido(); // Actualiza el texto "MUTED" o "UNMUTED"
                break;
        }
    });
});

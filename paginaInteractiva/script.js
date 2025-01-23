document.addEventListener('DOMContentLoaded', () => { // Espera a que el contenido de la página se haya cargado completamente.
    const btnCambiarTema = document.getElementById('btnCambiarTema'); // Obtiene el botón para cambiar el tema.
    const btnAumentarTexto = document.getElementById('btnAumentarTexto'); // Obtiene el botón para aumentar el tamaño del texto.
    const btnArriba = document.getElementById('btnArriba'); // Obtiene el botón para desplazarse hacia arriba.
    const btnCambiarColor = document.getElementById('btnCambiarColor'); // Obtiene el botón para cambiar el color de fondo.
    const btnContador = document.getElementById('btnContador'); // Obtiene el botón para el contador de clics.
    const contadorValor = document.getElementById('contadorValor'); // Obtiene el elemento donde se muestra el valor del contador.
    const btnLeerPagina = document.getElementById('leerPagina'); // Obtiene el botón para leer el contenido de la página.
    let contador = 0; // Inicializa el contador de clics a cero.

    // Función para aplicar el tema seleccionado y guardarlo en el almacenamiento local.
    const aplicarTema = (tema) => {
        document.body.className = tema; // Cambia la clase del cuerpo del documento al tema seleccionado.
        localStorage.setItem('tema', tema); // Guarda el tema seleccionado en el almacenamiento local.
    };
    
    // Añade un evento de clic al botón de cambiar tema para alternar entre los temas claro y oscuro.
    btnCambiarTema.addEventListener('click', () => {
        const temaActual = document.body.className === 'oscuro' ? 'claro' : 'oscuro'; // Determina el tema actual y lo cambia.
        aplicarTema(temaActual); // Aplica el nuevo tema.
    });

    const guardarTema = localStorage.getItem('tema') || 'claro'; // Obtiene el tema guardado en el almacenamiento local o usa el tema claro por defecto.
    aplicarTema(guardarTema); // Aplica el tema guardado.

    // Añade un evento de clic al botón de aumentar texto para alternar el tamaño del texto.
    btnAumentarTexto.addEventListener('click', () => {
        document.body.classList.toggle('btnAumentarTexto'); // Alterna la clase del cuerpo del documento para aumentar el texto.
    });

    // Añade un evento de clic al botón de cambiar color para generar un color aleatorio y aplicarlo al fondo.
    btnCambiarColor.addEventListener('click', () => {
        const colorAleatorio = `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Genera un color hexadecimal aleatorio.
        document.getElementById('contenido').style.backgroundColor = colorAleatorio; // Aplica el color generado al fondo del contenido.
    });

    // Añade un evento de clic al botón del contador para incrementar el valor del contador y mostrarlo.
    btnContador.addEventListener('click', () => {
        contador++; // Incrementa el contador.
        contadorValor.textContent = contador; // Actualiza el valor mostrado del contador.
    });

    // Añade un evento de desplazamiento para mostrar u ocultar el botón de ir arriba según la posición del desplazamiento.
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) { // Si se desplaza más de 100 píxeles, muestra el botón.
            btnArriba.style.display = 'block';
        } else { // Si se desplaza menos de 100 píxeles, oculta el botón.
            btnArriba.style.display = 'none';
        }
    });

    // Añade un evento de clic al botón de ir arriba para desplazar suavemente la página hacia arriba.
    btnArriba.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplaza la página hacia arriba con un efecto suave.
    });

    // Crea y añade un elemento de barra de progreso de lectura al cuerpo del documento.
    const progresoLectura = document.createElement('div');
    progresoLectura.id = 'progreso-lectura';
    document.body.appendChild(progresoLectura);

    // Añade un evento de desplazamiento para actualizar la barra de progreso de lectura según la posición del desplazamiento.
    window.addEventListener('scroll', () => {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight; // Calcula la altura total de desplazamiento.
        const progreso = (window.scrollY / scrollTotal) * 100; // Calcula el porcentaje de progreso de lectura.
        progresoLectura.style.width = `${progreso}%`; // Actualiza el ancho de la barra de progreso.
    });

    // Función para mostrar un saludo dinámico según la hora del día.
    const saludarSegunHora = () => {
        const horas = new Date().getHours(); // Obtiene la hora actual.
        let saludo;

        if (horas < 12) { // Si es antes de las 12, muestra "Buenos días".
            saludo = 'Buenos días';
        } else if (horas < 21) { // Si es antes de las 21, muestra "Buenas tardes".
            saludo = 'Buenas tardes';
        } else { // Si es después de las 21, muestra "Buenas noches".
            saludo = 'Buenas noches';
        }

        document.getElementById('mensajeDinamico').textContent = saludo; // Actualiza el mensaje dinámico con el saludo.
    };

    saludarSegunHora(); // Llama a la función para mostrar el saludo dinámico.

    let leyendo = false; // Variable para controlar si se está leyendo la página.
    let utterance; // Declaración para el objeto SpeechSynthesisUtterance.

    // Añade un evento de clic al botón de leer página para iniciar o detener la lectura del contenido.
    btnLeerPagina.addEventListener('click', () => {
        if (leyendo) { // Si ya está leyendo, detiene la lectura.
            speechSynthesis.cancel();
            leyendo = false;
            btnLeerPagina.textContent = "Leer página"; // Cambia el texto del botón a "Leer página".
        } else { // Si no está leyendo, inicia la lectura.
            const texto = document.body.innerText; // Obtiene el texto del contenido de la página.
            utterance = new SpeechSynthesisUtterance(texto); // Crea un objeto de síntesis de voz con el texto.
            utterance.lang = 'es-ES'; // Establece el idioma de la síntesis de voz a español.
            speechSynthesis.speak(utterance); // Inicia la lectura en voz alta del texto.
            leyendo = true;
            btnLeerPagina.textContent = "Detener lectura"; // Cambia el texto del botón a "Detener lectura".
        }
    });
});


// document.addEventListener('DOMContentLoaded', () => {
//     const btnCambiarTema = document.getElementById('btnCambiarTema');
//     const btnAumentarTexto = document.getElementById('btnAumentarTexto');
//     const btnArriba = document.getElementById('btnArriba');
//     const btnCambiarColor = document.getElementById('btnCambiarColor');
//     const btnContador = document.getElementById('btnContador');
//     const contadorValor = document.getElementById('contadorValor');
//     const btnLeerPagina = document.getElementById('leerPagina');
//     let contador = 0;

//     // Cambio de tema
//     const aplicarTema = (tema) => {
//         document.body.className = tema;
//         localStorage.setItem('tema', tema);
//     };
    
//     btnCambiarTema.addEventListener('click', () => {
//         const temaActual = document.body.className === 'oscuro' ? 'claro' : 'oscuro';
//         aplicarTema(temaActual);
//     });

//     const guardarTema = localStorage.getItem('tema') || 'claro';
//     aplicarTema(guardarTema);

//     // Aumentar texto
//     btnAumentarTexto.addEventListener('click', () => {
//         document.body.classList.toggle('btnAumentarTexto');
//     });

//     // Generador de colores aleatorios
//     btnCambiarColor.addEventListener('click', () => {
//         const colorAleatorio = `#${Math.floor(Math.random()*16777215).toString(16)}`;
//         document.getElementById('contenido').style.backgroundColor = colorAleatorio;
//     });

//     // Contador de clics
//     btnContador.addEventListener('click', () => {
//         contador++;
//         contadorValor.textContent = contador;
//     });

//     // Botón "Ir arriba"
//     window.addEventListener('scroll', () => {
//         if (window.scrollY > 100) {
//             btnArriba.style.display = 'block';
//         } else {
//             btnArriba.style.display = 'none';
//         }
//     });

//     btnArriba.addEventListener('click', () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     });

//     // Barra de progreso de lectura
//     const progresoLectura = document.createElement('div');
//     progresoLectura.id = 'progreso-lectura';
//     document.body.appendChild(progresoLectura);

//     window.addEventListener('scroll', () => {
//         const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
//         const progreso = (window.scrollY / scrollTotal) * 100;
//         progresoLectura.style.width = `${progreso}%`;
//     });

//     // Mensaje dinámico
//     const saludarSegunHora = () => {
//         const horas = new Date().getHours();
//         let saludo;

//         if (horas < 12) {
//             saludo = 'Buenos días';
//         } else if (horas < 21) {
//             saludo = 'Buenas tardes';
//         } else {
//             saludo = 'Buenas noches';
//         }

//         document.getElementById('mensajeDinamico').textContent = saludo;
//     };

//     saludarSegunHora();

//     let leyendo = false;
//     let utterance;

//     btnLeerPagina.addEventListener('click', () => {
//         if (leyendo) {
//             speechSynthesis.cancel();
//             leyendo = false;
//             btnLeerPagina.textContent = "Leer página";
//         } else {
//             const texto = document.body.innerText;
//             utterance = new SpeechSynthesisUtterance(texto);
//             utterance.lang = 'es-ES';
//             speechSynthesis.speak(utterance);
//             leyendo = true;
//             btnLeerPagina.textContent = "Detener lectura";
//         }
//     });

// });



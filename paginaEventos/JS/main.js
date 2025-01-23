// Cambiar entre formularios de login y registro
function cambiarFormulario() {
    const formularioLogin = document.getElementById('formularioLogin'); // Obtener el formulario de login
    const formularioRegistro = document.getElementById('formularioRegistro'); // Obtener el formulario de registro
    // Verificar cuál formulario está visible y alternar la visibilidad
    if (formularioLogin.style.display === 'none') {
        formularioLogin.style.display = 'block';
        formularioRegistro.style.display = 'none';
    } else {
        formularioLogin.style.display = 'none';
        formularioRegistro.style.display = 'block';
    }
}

// Validar formato de email
function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar formato de email
    return regexEmail.test(email); // Retorna true si el email es válido, de lo contrario false
}

// Validar formato de contraseña
function validarContrasena(contrasena) {
    // Expresión regular para validar que la contraseña tenga al menos 8 caracteres, incluyendo minúsculas, mayúsculas, números y caracteres especiales
    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regexContrasena.test(contrasena); // Retorna true si la contraseña es válida, de lo contrario false
}

// Registro de usuario
function registrarUsuario() {
    const correo = document.getElementById('correoRegistro').value; // Obtener el email ingresado
    const contrasena = document.getElementById('contrasenaRegistro').value; // Obtener la contraseña ingresada
    const confirmarContrasena = document.getElementById('confirmarContrasenaRegistro').value; // Obtener la confirmación de la contraseña

    // Validar formato de email
    if (!validarEmail(correo)) {
        alert('Por favor, ingrese un correo electrónico válido');
        return;
    }

    // Validar formato de contraseña
    if (!validarContrasena(contrasena)) {
        alert('La contraseña debe tener al menos 8 caracteres, incluyendo minúsculas, mayúsculas, números y caracteres especiales');
        return;
    }

    // Validar que las contraseñas coincidan
    if (contrasena !== confirmarContrasena) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Obtener lista de usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    // Verificar si el usuario ya existe
    const usuarioExistente = usuarios.some(usuario => usuario.correo === correo);

    if (usuarioExistente) {
        alert('El usuario ya existe');
        return;
    }

    // Agregar el nuevo usuario a la lista y guardar en localStorage
    usuarios.push({ correo, contrasena });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Registrado con éxito');
    cambiarFormulario(); // Alternar al formulario de login
}

// Inicio de sesión
function iniciarSesion() {
    const correo = document.getElementById('correoLogin').value; // Obtener el email ingresado
    const contrasena = document.getElementById('contrasenaLogin').value; // Obtener la contraseña ingresada
    // Obtener lista de usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    // Buscar el usuario con las credenciales ingresadas
    const usuario = usuarios.find(usuario => usuario.correo === correo && usuario.contrasena === contrasena);

    // Validar credenciales
    if (!usuario) {
        alert('Credenciales incorrectas');
        return;
    }

    // Guardar usuario actual en localStorage
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    // Redirigir al panel de administración
    window.location.href = 'admin.html';
}

// Cargar usuarios en el panel de administración
function cargarUsuarios() {
    // Obtener lista de usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    // Obtener el cuerpo de la tabla de usuarios
    const cuerpoTablaUsuarios = document.querySelector('#tablaUsuarios tbody');
    // Limpiar el contenido del cuerpo de la tabla
    cuerpoTablaUsuarios.innerHTML = '';

    // Recorrer la lista de usuarios y agregarlos a la tabla
    usuarios.forEach(usuario => {
        const fila = document.createElement('tr'); // Crear una fila
        const celdaCorreo = document.createElement('td'); // Crear una celda para el email
        celdaCorreo.textContent = usuario.correo; // Establecer el contenido de la celda
        fila.appendChild(celdaCorreo); // Agregar la celda a la fila
        cuerpoTablaUsuarios.appendChild(fila); // Agregar la fila al cuerpo de la tabla
    });

    // Inicializar DataTable en la tabla de usuarios con configuración en español y opción para filtrar por 5 registros por página
    $('#tablaUsuarios').DataTable({
        pageLength: 5, // Establecer 5 registros por página como opción predeterminada
        lengthMenu: [3, 5, 10, 25, 50, 75, 100], // Agregar opción de mostrar 5 registros por página
        language: {
            processing: "Procesando...",
            search: "Buscar:",
            lengthMenu: "Mostrar _MENU_ registros",
            info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
            infoFiltered: "(filtrado de un total de _MAX_ registros)",
            loadingRecords: "Cargando...",
            zeroRecords: "No se encontraron resultados",
            emptyTable: "Ningún dato disponible en esta tabla",
            paginate: {
                first: "Primero",
                previous: "Anterior",
                next: "Siguiente",
                last: "Último"
            },
            aria: {
                sortAscending: ": Activar para ordenar la columna de manera ascendente",
                sortDescending: ": Activar para ordenar la columna de manera descendente"
            }
        }
    });
}

// Cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('usuarioActual'); // Eliminar el usuario actual del localStorage
    window.location.href = 'index.html'; // Redirigir a la página de inicio de sesión
}

// Ejecutar la función cargarUsuarios cuando el documento está listo
if (window.location.pathname.endsWith('admin.html')) {
    document.addEventListener('DOMContentLoaded', cargarUsuarios); // Cargar los usuarios al cargar la página
}
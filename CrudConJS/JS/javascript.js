//EL CÓDIGO QUE APARECE COMPLETAMENTE COMENTADO SIN FUNCIONALIDAD, ES EL DE ANTES DE PEDIRLE A CHATGPT
//QUE ME COMENTARA TODO MI CÓDIGO.




// document.addEventListener("DOMContentLoaded", function () {
//   const tabla = document.querySelector("table tbody"); 
//   let arrTarea = [];
//   const btnCrear = document.getElementById("btnCrear");


//   tabla.addEventListener("click", async function (event) {
//     if (event.target.classList.contains("btnEditar")) {

//       const fila = event.target.closest("tr");
//       const indice = fila.querySelector("td:first-child").textContent;
//       const valorActual = arrTarea[indice];

//       const { value: formValues } = await Swal.fire({
//         title: "Editar tarea",
//         html: 
//           <input id="swal-input1" class="swal2-input" value="${valorActual}">
//         ,
//         focusConfirm: false,
//         preConfirm: () => {
//           return document.getElementById("swal-input1").value;
//         },
//       });

//       if (formValues) {
//         arrTarea[indice] = formValues; 
//         fila.querySelector("td:nth-child(2)").textContent = formValues;
//         Swal.fire("Tarea actualizada", Nueva tarea: ${formValues}, "success");
//       }
//     }

//     if (event.target.classList.contains("btnEliminar")) {
//       Swal.fire({
//         title: "¿Estás seguro?",
//         text: "¡No podrás revertir esta acción!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Sí, eliminar",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           const fila = event.target.closest("tr");
//           const indice = fila.querySelector("td:first-child").textContent;
//           arrTarea.splice(indice, 1);
//           fila.remove();
//           Swal.fire("Eliminado", "La tarea ha sido eliminada.", "success");
//         }
//       });
//     }
//   });

//   btnCrear.addEventListener("click", async function () {
//     const { value: txtFormulario } = await Swal.fire({
//       title: "Crear tarea",
//       html: 
//         <input id="swal-input1" class="swal2-input">
//       ,
//       focusConfirm: false,
//       preConfirm: () => {
//         return document.getElementById("swal-input1").value;
//       },
//     });

//     if (txtFormulario) {
//       arrTarea.push(txtFormulario);
//       mostrarTabla();
//       Swal.fire("Tarea creada", Nueva tarea: ${txtFormulario}, "success");
//     }
//   });

//   function mostrarTabla() {
//     tabla.innerHTML = "";
//     arrTarea.forEach((tarea, indice) => {
//       const item = document.createElement("tr");
//       item.innerHTML = 
//         <td>${indice}</td>
//         <td>${tarea}</td>
//         <td>
//           <button type="button" class="btn btn-primary btnEditar">Editar</button>
//           <button type="button" class="btn btn-danger btnEliminar">Eliminar</button>
//         </td>;
//       tabla.appendChild(item);
//     });
//   }
// });



document.addEventListener("DOMContentLoaded", function () {
  // Selecciona el cuerpo de la tabla donde se agregarán las tareas.
  const tabla = document.querySelector("table tbody"); 
  
  // Array que almacenará las tareas creadas.
  let arrTarea = []; 
  
  // Botón que permite crear nuevas tareas.
  const btnCrear = document.getElementById("btnCrear"); 

  // Escucha clics dentro de la tabla para manejar eventos "Editar" y "Eliminar".
  tabla.addEventListener("click", async function (event) {
    // Si se hace clic en un botón con la clase "btnEditar".
    if (event.target.classList.contains("btnEditar")) {
      
      // Encuentra la fila que contiene el botón clickeado.
      const fila = event.target.closest("tr"); 

      // Obtiene el índice de la tarea desde la primera celda de la fila.
      const indice = fila.querySelector("td:first-child").textContent;

      // Obtiene el valor actual de la tarea desde el array usando el índice.
      const valorActual = arrTarea[indice];

      // Muestra un cuadro de diálogo con un campo para editar la tarea.
      const { value: formValues } = await Swal.fire({
        title: "Editar tarea",
        html: `
          <input id="swal-input1" class="swal2-input" value="${valorActual}">
        `,
        focusConfirm: false,
        preConfirm: () => {
          // Devuelve el valor ingresado en el campo de texto.
          return document.getElementById("swal-input1").value;
        },
      });

      // Si el usuario ingresó un valor y confirmó.
      if (formValues) {
        // Actualiza la tarea en el array.
        arrTarea[indice] = formValues; 

        // Actualiza el texto de la tarea en la tabla.
        fila.querySelector("td:nth-child(2)").textContent = formValues;

        // Muestra un mensaje de éxito.
        Swal.fire("Tarea actualizada", `Nueva tarea: ${formValues}`, "success");
      }
    }

    // Si se hace clic en un botón con la clase "btnEliminar".
    if (event.target.classList.contains("btnEliminar")) {
      // Muestra un cuadro de confirmación para eliminar la tarea.
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
      }).then((result) => {
        // Si el usuario confirma la eliminación.
        if (result.isConfirmed) {
          // Encuentra la fila que contiene el botón clickeado.
          const fila = event.target.closest("tr"); 

          // Obtiene el índice de la tarea desde la primera celda de la fila.
          const indice = fila.querySelector("td:first-child").textContent;

          // Elimina la tarea del array.
          arrTarea.splice(indice, 1); 

          // Elimina la fila correspondiente de la tabla.
          fila.remove();

          // Muestra un mensaje de confirmación.
          Swal.fire("Eliminado", "La tarea ha sido eliminada.", "success");
        }
      });
    }
  });

  // Evento que se ejecuta al hacer clic en el botón "Crear tarea".
  btnCrear.addEventListener("click", async function () {
    // Muestra un cuadro de diálogo para ingresar una nueva tarea.
    const { value: txtFormulario } = await Swal.fire({
      title: "Crear tarea",
      html: `
        <input id="swal-input1" class="swal2-input">
      `,
      focusConfirm: false,
      preConfirm: () => {
        // Devuelve el valor ingresado en el campo de texto.
        return document.getElementById("swal-input1").value;
      },
    });

    // Si el usuario ingresó un valor y confirmó.
    if (txtFormulario) {
      // Agrega la nueva tarea al array.
      arrTarea.push(txtFormulario);

      // Actualiza la tabla para mostrar la nueva tarea.
      mostrarTabla();

      // Muestra un mensaje de confirmación.
      Swal.fire("Tarea creada", `Nueva tarea: ${txtFormulario}`, "success");
    }
  });

  // Función que renderiza la tabla con las tareas almacenadas en arrTarea.
  function mostrarTabla() {
    // Limpia el contenido de la tabla.
    tabla.innerHTML = ""; 

    // Itera sobre las tareas en el array y genera filas en la tabla.
    arrTarea.forEach((tarea, indice) => {
      const item = document.createElement("tr"); // Crea una nueva fila.
      item.innerHTML = `
        <td>${indice}</td> <!-- Índice de la tarea -->
        <td>${tarea}</td> <!-- Descripción de la tarea -->
        <td> <!-- Botones para editar y eliminar -->
          <button type="button" class="btn btn-primary btnEditar">Editar</button>
          <button type="button" class="btn btn-danger btnEliminar">Eliminar</button>
        </td>`;
      tabla.appendChild(item); // Agrega la fila a la tabla.
    });
  }
});

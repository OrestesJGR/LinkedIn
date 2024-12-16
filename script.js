$(document).ready(function () {
    let arrayTarea = [];
    let arrayCompletas = [];
    let arrayPendientes = [];
    let arrayTodas = "todas";

    mostrarTabla();

    $("#tabla").on("click", "#btnEditar", function () {
        const indice = $(this).val();
        const tareaActual = arrayTarea[indice];
        const nuevoValor = prompt("Edita la tarea:", tareaActual);

        if (nuevoValor !== null && nuevoValor.trim() !== "") {
            const tareaTexto = arrayTarea[indice];

            arrayTarea[indice] = nuevoValor.trim();
            if (arrayCompletas.includes(tareaTexto)) {
                arrayCompletas = arrayCompletas.map(t =>
                    t === tareaTexto ? nuevoValor.trim() : t
                );
            }
            if (arrayPendientes.includes(tareaTexto)) {
                arrayPendientes = arrayPendientes.map(t =>
                    t === tareaTexto ? nuevoValor.trim() : t
                );
            }
            mostrarTabla(arrayTodas);
        } else if (nuevoValor === "") {
            alert("El valor no puede estar vacío.");
        }
    });

    $("#tabla").on("click", "#btnEliminar", function () {
        const indice = $(this).data("indice");
        const tareaTexto = arrayTarea[indice];

        arrayTarea.splice(indice, 1);
        arrayCompletas = arrayCompletas.filter(t => t !== tareaTexto);
        arrayPendientes = arrayPendientes.filter(t => t !== tareaTexto);

        mostrarTabla(arrayTodas);
    });

    $("#tabla").on("click", "#btnCompletar", function () {
        const indice = $(this).data("indice");
        const tareaTexto = $(this).closest("tr").find(".tarea").text().trim();
    
        if (arrayCompletas.includes(tareaTexto)) {
            arrayCompletas = arrayCompletas.filter(t => t !== tareaTexto);
            arrayPendientes.push(tareaTexto);
        } else {
            arrayPendientes = arrayPendientes.filter(t => t !== tareaTexto);
            arrayCompletas.push(tareaTexto);
        }
    
        mostrarTabla(arrayTodas);
    });
    

    $("#btnAnadir").click(function () {
        const descripcion = $("#txTarea").val().trim();
        if (descripcion) {
            arrayTarea.push(descripcion);
            arrayPendientes.push(descripcion);
            $("#txTarea").val("");
            mostrarTabla(arrayTodas);
        } else {
            alert("Añada bien la tarea, por favor.");
        }
    });

    $("#filtroTodas").click(function () {
        arrayTodas = "todas";
        mostrarTabla("todas");
    });

    $("#filtroCompletadas").click(function () {
        arrayTodas = "completadas";
        mostrarTabla("completadas");
    });

    $("#filtroPendientes").click(function () {
        arrayTodas = "pendientes";
        mostrarTabla("pendientes");
    });

    function mostrarTabla(filtro = "todas") {
        $("#tabla").html("");
        let tareasFiltradas = [];
    
        if (filtro === "completadas") {
            tareasFiltradas = arrayCompletas;
        } else if (filtro === "pendientes") {
            tareasFiltradas = arrayPendientes;
        } else {
            tareasFiltradas = arrayTarea;
        }
    
        if (tareasFiltradas.length === 0) {
            const item = $("<tr>").html("<td>No hay tareas disponibles</td>");
            $("#tabla").append(item);
        } else {
            for (let tareaTexto of tareasFiltradas) {
                const completa = arrayCompletas.includes(tareaTexto);
                const id = arrayTarea.indexOf(tareaTexto);
    
                const item = $(`
                    <tr>
                        <td class="tarea ${completa ? "tachado" : ""}">
                            ${tareaTexto}
                        </td>
                        <td>
                            <button type="button" class="btn btn-success" id="btnCompletar" data-indice="${id}">
                                Completar
                            </button>
                            <button type="button" class="btn btn-warning ms-1" id="btnEditar" value="${id}">
                                Editar
                            </button>
                            <button type="button" class="btn btn-danger ms-1" id="btnEliminar" data-indice="${id}">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                `);
                $("#tabla").append(item);
            }
        }
    }
});
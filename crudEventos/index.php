<?php
include 'procesar.php';

// Variables de filtro, orden y dirección
$filtro = isset($_GET['filtro']) ? $_GET['filtro'] : '';
$orden = isset($_GET['orden']) ? $_GET['orden'] : 'nombre_evento';
$direccion = isset($_GET['direccion']) ? $_GET['direccion'] : 'asc';

// Paginación
$limit = 3; // Número de eventos por página
$pagina = isset($_GET['pagina']) ? (int)$_GET['pagina'] : 1;
$offset = ($pagina - 1) * $limit;
$totalEventos = contarEventos($conn, $filtro);
$totalPaginas = ceil($totalEventos / $limit);

$eventos = listarEventos($conn, $filtro, $orden, $direccion, $limit, $offset);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Gestión de Eventos Deportivos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="container mt-5">
<form method="GET">
    <input type="text" id="filtro" name="filtro" placeholder="Buscar" value="<?php echo htmlspecialchars($filtro); ?>">
    <button class="btn btn-primary">Buscar</button>
</form>

<!-- EVENTOS DEPORTIVOS -->
<h2>Listado de Eventos</h2>
<table class="table table-striped table-bordered table-hover">
    <thead>
        <tr>
            <th><?php echo generarEnlace('nombre_evento', $orden, $direccion, $filtro, 'Nombre');?></th>
            <th><?php echo generarEnlace('tipo_deporte', $orden, $direccion, $filtro, 'Deporte');?></th>
            <th><?php echo generarEnlace('fecha', $orden, $direccion, $filtro, 'Fecha');?></th>
            <th><?php echo generarEnlace('hora', $orden, $direccion, $filtro, 'Hora');?></th>
            <th><?php echo generarEnlace('ubicacion', $orden, $direccion, $filtro, 'Ubicación');?></th>
            <th><?php echo generarEnlace('organizador', $orden, $direccion, $filtro, 'Organizador');?></th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
    <?php
    while ($evento = $eventos->fetch_assoc()) {
        echo "<tr>
                <td>{$evento['nombre_evento']}</td>
                <td>{$evento['tipo_deporte']}</td>
                <td>{$evento['fecha']}</td>
                <td>{$evento['hora']}</td>
                <td>{$evento['ubicacion']}</td>
                <td>{$evento['organizador']}</td>
                <td>
                    <a href='formularioEvento.php?id={$evento['id']}' class='btn btn-warning btn-sm'>Editar</a>
                    <form action='procesar.php' method='POST' style='display:inline;'>
                        <input type='hidden' name='accion' value='eliminarEvento'>
                        <input type='hidden' name='id' value='{$evento['id']}'>
                        <button type='submit' class='btn btn-danger btn-sm' onclick='return confirm(\"¿Estás seguro de que deseas eliminar este evento?\");'>Eliminar</button>
                    </form>
                </td>
            </tr>";
    }
    ?>
    </tbody>
</table>

<!-- Paginación -->
<nav aria-label="Paginación">
    <ul class="pagination">
        <?php if ($pagina > 1): ?>
            <li class="page-item">
                <a class="page-link" href="?pagina=<?php echo $pagina - 1; ?>&filtro=<?php echo $filtro; ?>&orden=<?php echo $orden; ?>&direccion=<?php echo $direccion; ?>">Anterior</a>
            </li>
        <?php endif; ?>
        
        <?php for ($i = 1; $i <= $totalPaginas; $i++): ?>
            <li class="page-item <?php echo ($i == $pagina) ? 'active' : ''; ?>">
                <a class="page-link" href="?pagina=<?php echo $i; ?>&filtro=<?php echo $filtro; ?>&orden=<?php echo $orden; ?>&direccion=<?php echo $direccion; ?>"><?php echo $i; ?></a>
            </li>
        <?php endfor; ?>
        
        <?php if ($pagina < $totalPaginas): ?>
            <li class="page-item">
                <a class="page-link" href="?pagina=<?php echo $pagina + 1; ?>&filtro=<?php echo $filtro; ?>&orden=<?php echo $orden; ?>&direccion=<?php echo $direccion; ?>">Siguiente</a>
            </li>
        <?php endif; ?>
    </ul>
</nav>

<a href="formularioEvento.php" class="btn btn-primary">Añadir Evento</a>

<!-- ORGANIZADORES -->
<h2 class="mt-5">Listado de Organizadores</h2>
<table class="table table-striped table-bordered table-hover">
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
    <?php
    $organizadores = listarOrganizadores($conn);
    while ($organizador = $organizadores->fetch_assoc()) {
        echo "<tr>
                <td>{$organizador['nombre']}</td>
                <td>{$organizador['email']}</td>
                <td>{$organizador['telefono']}</td>
                <td>
                    <form action='procesar.php' method='POST' style='display:inline;'>
                        <input type='hidden' name='accion' value='eliminarOrganizador'>
                        <input type='hidden' name='id' value='{$organizador['id']}'>
                        <button type='submit' class='btn btn-danger btn-sm' onclick='return confirm(\"¿Estás seguro de que deseas eliminar este organizador?\");'>Eliminar</button>
                    </form>
                </td>
            </tr>";
    }
    ?>
    </tbody>
</table>
<a href="formularioOrganizador.php" class="btn btn-primary">Añadir Organizador</a>

</div>

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>
</body>
</html>

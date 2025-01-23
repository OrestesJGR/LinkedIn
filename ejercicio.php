<?php
// URL de la API para obtener la lista de Pokémon
$url = 'https://pokeapi.co/api/v2/pokemon?limit=10';

// Obtener los datos de la API
$valores = file_get_contents($url);

// Verificar si los datos se obtuvieron correctamente
if ($valores !== false) {
    // Decodificar el JSON en un array asociativo
    $data = json_decode($valores, true);

    // Verificar si la decodificación fue exitosa
    if (is_array($data) && isset($data['results'])) {
        // Comenzar la tabla HTML
        echo '<table border="1">';
        echo '<tr><th>Nombre</th><th>ID</th><th>Altura</th><th>Peso</th><th>Tipos</th></tr>';

        // Recorrer los datos y crear filas de la tabla
        foreach ($data['results'] as $pokemon) {
            // Obtener detalles adicionales de cada Pokémon
            $valorEspecifico = file_get_contents($pokemon['url']);
            if ($valorEspecifico !== false) {
                $detalles = json_decode($valorEspecifico, true);
                if (is_array($detalles)) {
                    echo '<tr>';
                    echo '<td>' . htmlspecialchars($pokemon['name']) . '</td>'; // Nombre
                    echo '<td>' . htmlspecialchars($detalles['id']) . '</td>'; // ID
                    echo '<td>' . htmlspecialchars($detalles['height']) . '</td>'; // Altura
                    echo '<td>' . htmlspecialchars($detalles['weight']) . '</td>'; // Peso

                    // Tipos como una lista separada por comas
                    echo '<td>';
                    $types = [];
                    foreach ($detalles['types'] as $type) {
                        $types[] = htmlspecialchars($type['type']['name']);
                    }
                    echo implode(', ', $types);
                    echo '</td>';

                    echo '</tr>';
                }
            }
        }

        // Cerrar la tabla HTML
        echo '</table>';
    } else {
        echo 'Error al decodificar los datos JSON.';
    }
} else {
    echo 'Error al obtener los datos de la API.';
}
?>

<?php

    require_once 'Coche.php';
    require_once 'Concesionario.php';

    $coche = new Coche("Kia ", "Sportage ", "Blanco ", 5);
    $concesionario = new Concesionario();
    $concesionario->mostrarVehiculo($coche);

?>
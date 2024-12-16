<?php

$inventario = [
    "ropa" => [
        [
            "nombre" => "camiseta",
            "precio" => 56,
            "cantidad" => 15
        ],
    ],
    "alimentos" => [
        [
            "nombre" => "pizza",
            "precio" => 2,85,
            "cantidad" => 30
        ],
    ],
    "electronica" => [
        [
            "nombre" => "televisor",
            "precio" => 850,
            "cantidad" => 9
        ],
    ]
];
$carrito = [];
    function agregarAlCarrito($categoría, $producto, $cantidad) {
        global $inventario, $carrito;
    
        if (!isset($inventario[$categoría])) {
            echo "La categoría seleccionada no existe.<br>";
            return;
        }

        foreach ($inventario[$categoría] as &$objeto) {
            if ($objeto["nombre"] === $producto) {
                if ($objeto["cantidad"] >= $cantidad) {
                    $carrito[] = [
                        "producto" => $producto,
                        "cantidad" => $cantidad,
                        "precio" => $objeto["precio"]
                    ];
    
                    $objeto["cantidad"] -= $cantidad;
    
                    echo "Se ha agregado $cantidad de $producto al carrito.<br>";
                } else {
                    echo "No hay suficiente stock del producto seleccionado.<br>";
                }
                return;
            }
        }
    
        echo "El producto seleccionado no existe.<br>";
    }

    function mostrarCarrito() {
        global $carrito;
    
        if (empty($carrito)) {
            echo "El carrito está vacío.<br>";
            return;
        }
    
        $total = 0;
        echo "<h3>Productos en el carrito:</h3>";
        echo "<ul>";
        foreach ($carrito as $objeto) {
            $subtotal = $objeto["precio"] * $objeto["cantidad"];
            $total += $subtotal;
            echo "<li>{$objeto['producto']} - Precio: €{$objeto['precio']} - Cantidad: {$objeto['cantidad']} - Subtotal: €{$subtotal}</li>";
        }
        echo "</ul>";
    
        if ($total > 100) {
            $descuento = $total * 0.10;
            $total -= $descuento;
            echo "¡Descuento del 10% aplicado!<br>";
        }
    
        echo "Total de la compra: €{$total}<br>";
    }

    agregarAlCarrito("ropa","camiseta",1);
    mostrarCarrito();


    ?>

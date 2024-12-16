<?php

    require_once "Vehiculo";

    class Camion extends Vehiculo {
        public float $capacidad;


        public function setCapacidad($capacidad){
            $this->capacidad = $capacidad;
        }

        public function getCapacidad(){
            return $this->capacidad;
        }    

        public function __construct(string $marca, string $modelo, string $color, int $capacidad){
            parent::__construct($marca, $modelo, $color);
            $this->capacidad=$capacidad;
        }

        public function mover(){
            
        }
        public function detener(){
            
        }

        public function obtenerInformacion(): string {
            return parent::obtenerInformacion() . "Capacidad: " . $this->capacidad;
        }
    }
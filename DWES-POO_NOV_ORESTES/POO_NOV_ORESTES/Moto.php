<?php

    class Moto extends Vehiculo{
        public int $cilindrada;
    

        public function setCilindrada($cilindrada){
            $this->cilindrada = $cilindrada;
        }

        public function getCilindrada(){
            return $this->cilindrada;
        }

        public function __construct(string $marca, string $modelo, string $color, int $cilindrada){
            parent::__construct($marca, $modelo, $color);
            $this->cilindrada=$cilindrada;
        }

        public function mover(){
            
        }
        public function detener(){
            
        }

        public function obtenerInformacion(): string {
            return parent::obtenerInformacion() . "Cilindrada: " . $this->cilindrada;
        }
    }
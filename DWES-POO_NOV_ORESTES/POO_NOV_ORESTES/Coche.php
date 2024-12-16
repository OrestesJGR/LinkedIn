<?php
    require_once 'Vehiculo.php'; 
    class Coche extends Vehiculo{
        public int $numeroPuertas;

        public function __construct(string $marca, string $modelo, string $color, int $numeroPuertas) {
            parent::__construct($marca, $modelo, $color);
            $this->numeroPuertas = $numeroPuertas;
        }

        public function __toString(): string {
            return "Marca: {$this->marca}, Modelo: {$this->modelo}, Color: {$this->color}";
        }

        public function __get($name) {
            if (property_exists($this, $name)) {
                return $this->$name;
            } else {
                return "La propiedad '{$name}' no existe o no es accesible.";
            }
        }

        public function getMarca(){
            return $this->marca;
        }

        public function getModelo(){
            return $this->modelo;
        }

        public function getColor(){
            return $this->color;
        }

        public function getNumeroPuertas(){
            return $this->numeroPuertas;
        }

        public function setMarca(string $marca){
            $this->marca = $marca;
            return $this;
        }

        public function setModelo(string $modelo){
            $this->modelo = $modelo;
            return $this;
        }

        public function setColor(string $color){
            $this->color = $color;
            return $this;
        }

        public function setNumeroPuertas(int $numeroPuertas) {
            $this->numeroPuertas = $numeroPuertas;
            return $this;
        }

        public function obtenerInformacion(): string {
            return parent :: obtenerInformacion() . "NumeroPuertas: {$this->numeroPuertas}";
        }

        public function mover(){

        }

        public function detener(){

        }
        
    }

    //  $ob1 = new Coche($marca, $modelo, $color, $numeroPuertas);
    //  $ob1->setMarca("Kia")->setModelo("Sportage")->setColor("Blanco")->setNumeroPuertas(5);
    


?>

//POO



class Viaje {
    constructor(codigo, destino, precio, disponibilidad = true) {
        this.codigo = codigo;
        this.destino = destino;
        this.precio = precio;
        this.disponibilidad = disponibilidad;
    }

    getInfo() {
        return `Viaje [${this.codigo}] a ${this.destino}, precio: ${this.precio} euros`;
    }
}

class Vuelo extends Viaje{
    constructor(codigo, destino, precio, aerolinea, duracion) {
        super(codigo, destino, precio);
        this.aerolinea = aerolinea;
        this.duracion = duracion;
    }

    getInfo() {
        return `${super.getInfo()}, Aerolínea: ${this.aerolinea}, Duración: ${this.duracion} horas`;
    }
}

class Hotel extends Viaje{
    constructor(codigo, destino, precio, estrellas, tipoHabitacion) {
        super(codigo, destino, precio);
        this.estrellas = estrellas;
        this.tipoHabitacion = tipoHabitacion;
    }

    getInfo() {
        return `${super.getInfo()}, Hotel ${this.estrellas} estrellas, Habitación: ${this.tipoHabitacion}`;
    }
}

class Paquete extends Viaje{
    constructor(codigo, destino, precio, vuelo, hotel) {
        super(codigo, destino, precio);
        this.vuelo = vuelo;
        this.hotel = hotel;
    }

    getInfo() {
        return `${super.getInfo()}\n - Vuelo: ${this.vuelo.getInfo()}\n - Hotel: ${this.hotel.getInfo()}`;
    }
}

class Cliente{
    constructor(nombre, apellido, email, telefono) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
    }

    getResumen() {
        return `Cliente: ${this.nombre} ${this.apellido}, Email: ${this.email}, Teléfono: ${this.telefono}`;
    }
}

class Reserva{

    constructor(cliente, viaje, fecha) {
        this.cliente = cliente;
        this.viaje = viaje;
        this.fecha = fecha;
    }

    

    getResumen() {
        return `${this.cliente.getResumen()}\nReservó: ${this.viaje.getInfo()}`;
    }
}

// Crear instancias
const cliente1 = new Cliente("Ana", "Pérez", "ana.perez@gmail.com", "123456789");
const vuelo1 = new Vuelo("V001", "París", 200, "Air France", 2.5);
const hotel1 = new Hotel("H001", "París", 100, 4, "Doble");
const paquete1 = new Paquete("P001", "París", 280, vuelo1, hotel1);
 
// Crear una reserva
const reserva1 = new Reserva(cliente1, paquete1);
 
console.log(cliente1.getResumen());
console.log(vuelo1.getInfo());
console.log(paquete1.getInfo());
console.log(reserva1.getResumen());


//JAVASCRIPT
    

    let arrayClientes = localStorage.getItem('Cliente') ? JSON.parse(localStorage.getItem('Cliente')) : [];
    let arrayViajes = localStorage.getItem('Viaje') ? JSON.parse(localStorage.getItem('Viaje')): [];
    let arrayReservas = localStorage.getItem('Reserva') ? JSON.parse(localStorage.getItem('Reserva')) : [];


    function tablaCliente(){
        let tabla1 = document.getElementById("tabla1");
        tabla1.innerHTML = "";
        
        for(let i = 0; i <arrayClientes.length; i++){
        tabla1.innerHTML+=`
                <tr>
                    <td>${arrayClientes[i].nombre}</td>
                    <td>${arrayClientes[i].apellido}</td>
                    <td>${arrayClientes[i].email}</td>
                    <td>${arrayClientes[i].telefono}</td>
                    <td><button type="button" class="btn btn-danger btn-sm" onclick="eliminarCliente(${i})">Eliminar</button></td>
                </tr>`
        }
        actualizarSelCliente();
    }
    
    function eliminarCliente(indice1){
        if(indice1 >= 0 && indice1 < arrayClientes.length){
            arrayClientes.splice(indice1, 1);
            tablaCliente();
        }
        localStorage.setItem('Cliente', JSON.stringify(arrayClientes));
        
    }

    function tablaViaje(){
        let tabla2 = document.getElementById("tabla2");
        tabla2.innerHTML = "";

        for(let i = 0; i < arrayViajes.length; i++ ){
            tabla2.innerHTML+=`
                <tr>
                    <td>${arrayViajes[i].codigo}</td>
                    <td>${arrayViajes[i].destino}</td>
                    <td>${arrayViajes[i].precio}</td>
                    <td>${arrayViajes[i].disponibilidad}</td>
                    <td><button type="button" class="btn btn-danger btn-sm" onclick="eliminarViaje(${i})">Eliminar</button></td>
                </tr>`
        }
        actualizarSelViaje();
    }

    function eliminarViaje(indice2){
        if(indice2 >= 0 && indice2 < arrayViajes.length){
            arrayViajes.splice(indice2, 1);
            tablaViaje();
        }
        localStorage.setItem('Viaje', JSON.stringify(arrayViajes));
    }

    function tablaReserva(){
        let tabla3 = document.getElementById("tabla3");
        tabla3.innerHTML = "";

        for(let i = 0; i < arrayReservas.length; i++ ){
            tabla3.innerHTML+=`
                <tr>
                    <td>${arrayReservas[i].cliente.nombre} ${arrayReservas[i].cliente.apellido}</td>
                    <td>${arrayReservas[i].viaje.destino}</td>
                    <td>${arrayReservas[i].fecha}</td>
                    <td><button type="button" class="btn btn-danger btn-sm" onclick="eliminarReserva(${i})">Eliminar</button></td>
                </tr>`
            console.table(arrayReservas);
        }
    }


    function actualizarSelCliente(){
        let selCliente = document.getElementById("selCliente");
        selCliente.innerHTML = "";

        for(let i = 0; i < arrayClientes.length; i++){
            selCliente.innerHTML+=`<option value="${i}">${arrayClientes[i].nombre} ${arrayClientes[i].apellido}</options> `;
        }
    }

    function actualizarSelViaje(){
        let selViaje = document.getElementById("selViaje");
        selViaje.innerHTML = "";

        for(let i = 0; i < arrayViajes.length; i++){
            selViaje.innerHTML+=`<option value="${i}">${arrayViajes[i].destino}</options> `;
        }
    }
    
    function eliminarReserva(indice3){
        if(indice3 >= 0 && indice3 < arrayReservas.length){
            arrayReservas.splice(indice3, 1);
            tablaReserva();
        }
        localStorage.setItem('Reserva', JSON.stringify(arrayReservas));
    }

    function clienteRepetido(email, telefono){
        return arrayClientes.some(cliente => cliente.email === email || cliente.telefono === telefono);
    }

    function viajeRepetido(codigo){
        return arrayViajes.some(viaje => viaje.codigo === codigo);
    }


    //DOM

document.addEventListener("DOMContentLoaded", function() {

    
    let btnAnadirCliente = document.getElementById("btnAnadirCliente");
    let btnAnadirViaje = document.getElementById("btnAnadirViaje");
    let btnCrearReserva = document.getElementById("btnCrearReserva");
    
    btnAnadirCliente.addEventListener("click", function(){
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    
        if(nombre && apellido && email && telefono){
            if(clienteRepetido(email, telefono)){
                alert("Este cliente ya existe.");
            }else{
                let nuevoCliente = new Cliente(nombre, apellido, email, telefono);
            arrayClientes.push(nuevoCliente);
            tablaCliente();
            console.table(arrayClientes);  

            localStorage.setItem("Cliente", JSON.stringify(arrayClientes));
            }
        }else {
            alert("Por favor, completa todos los campos");
        }
    });

    btnAnadirViaje.addEventListener("click", function(){
        let codigo = document.getElementById("codigo").value;
        let destino = document.getElementById("destino").value;
        let precio = document.getElementById("precio").value;
        let selector = document.getElementById("selector").value;

        if(codigo && destino && precio && selector){
            if(viajeRepetido(codigo)){
                alert("Este viaje ya existe");
            }else{
                let nuevoViaje = new Viaje(codigo, destino, precio, selector);
                arrayViajes.push(nuevoViaje);
                tablaViaje();
                console.table(arrayViajes);
                localStorage.setItem("Viaje", JSON.stringify(arrayViajes));
            }
        }else{
            alert("Por favor, completa todos los campos");
        }

        
         
    });

    
    btnCrearReserva.addEventListener("click", function(){
        let selCliente = document.getElementById("selCliente").value;
        let selViaje = document.getElementById("selViaje").value;

        let cliente = arrayClientes[selCliente];
        let viaje = arrayViajes[selViaje];

        const date = new Date();
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        
        let nuevaReserva = new Reserva(cliente, viaje, formattedDate);
        arrayReservas.push(nuevaReserva);
        console.table(arrayReservas);

        localStorage.setItem("Reserva", JSON.stringify(arrayReservas));
        
        
        tablaReserva();
    });



    tablaCliente();
    tablaViaje();
    
});
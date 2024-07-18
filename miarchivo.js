let usuario;

function obtenerNombreUsuario() {
    let nombre;
    while (true) {
        nombre = prompt("Ingrese su nombre");
        if (nombre && isNaN(nombre)) {
            break;
        } else {
            alert("Por favor, ingrese un nombre válido (no un número).");
        }
    }
    return nombre;
}

usuario = obtenerNombreUsuario();


const vino1 = { nombre: "Malbec 1893", precio: 12000 };
const vino2 = { nombre: "Malbec Piuke", precio: 10000 };
const vino3 = { nombre: "Tinto Clasico Tornaghi", precio: 8000 };
const vino4 = { nombre: "Tinto Dulce Carlon Tornaghi", precio: 9000 };
const vino5 = { nombre: "Blanco Piuke", precio: 11000 };
const vino6 = { nombre: "Blanco Torrones Familia Tornaghi", precio: 13000 };

let total = 0; 
let carrito = ""; 


function agregarAlCarrito(vino) {
    carrito += vino.nombre ;
    total += vino.precio;
}

let producto;
do {
    producto = parseInt(prompt(usuario + ", seleccione el Vino que usted quiere comprar:\n" + "1. " + vino1.nombre + " - $" + vino1.precio + "\n" + "2. " + vino2.nombre + " - $" + vino2.precio + "\n" + "3. " + vino3.nombre + " - $" + vino3.precio + "\n" + "4. " + vino4.nombre + " - $" + vino4.precio + "\n" + "5. " + vino5.nombre + " - $" + vino5.precio + "\n" + "6. " + vino6.nombre + " - $" + vino6.precio + "\n" +"0. Terminar compra"));

    switch (producto) {
        case 1:
            agregarAlCarrito(vino1);
            break;
        case 2:
            agregarAlCarrito(vino2);
            break;
        case 3:
            agregarAlCarrito(vino3);
            break;
        case 4:
            agregarAlCarrito(vino4);
            break;
        case 5:
            agregarAlCarrito(vino5);
            break;
        case 6:
            agregarAlCarrito(vino6);
            break;
        case 0:
            break;
        default:
            alert("No seleccionaste un Vino válido");
            break;
    }
} while (producto !== 0);

alert("Gracias por tu compra, " + usuario + ".\n" + "El monto total es: $" + total + "\n" +"Productos en tu carrito:\n" + carrito);

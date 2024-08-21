let total = 0;
let carrito = [];

const vino1 = { nombre: "Malbec 1893", precio: 12000 };
const vino2 = { nombre: "Malbec Piuke", precio: 10000 };
const vino3 = { nombre: "Tinto Clasico Tornaghi", precio: 8000 };
const vino4 = { nombre: "Tinto Dulce Carlon Tornaghi", precio: 9000 };
const vino5 = { nombre: "Blanco Piuke", precio: 11000 };
const vino6 = { nombre: "Blanco Torrones Familia Tornaghi", precio: 13000 };

const vinos = [vino1, vino2, vino3, vino4, vino5, vino6];

function agregarAlCarrito(vino) {
    carrito.push(vino);
    total += vino.precio;
    mostrarCarrito();
}

function mostrarCarrito() {
    let carritoDiv = document.getElementById('carrito');
    let resumen = "Productos en tu carrito:\n";
    carrito.forEach(vino => {
        resumen += vino.nombre + " - $" + vino.precio + "\n";
    });
    resumen += "\nMonto total: $" + total + "\nMuchas gracias, vuelva pronto!";
    carritoDiv.textContent = resumen;
}

function buscarVinoPorNombre(nombre) {
    return vinos.find(vino => vino.nombre.toLowerCase().includes(nombre.toLowerCase()));
}

function filtrarVinosPorPrecio(maxPrecio) {
    return vinos.filter(vino => vino.precio <= maxPrecio);
}

document.getElementById('iniciarCompra').addEventListener('click', () => {
    let producto;
    do {
        producto = parseInt(prompt("Seleccione el Vino que desea comprar:\n" + 
            "1. " + vino1.nombre + " - $" + vino1.precio + "\n" +
            "2. " + vino2.nombre + " - $" + vino2.precio + "\n" +
            "3. " + vino3.nombre + " - $" + vino3.precio + "\n" +
            "4. " + vino4.nombre + " - $" + vino4.precio + "\n" +
            "5. " + vino5.nombre + " - $" + vino5.precio + "\n" +
            "6. " + vino6.nombre + " - $" + vino6.precio + "\n" +
            "0. Terminar compra"));

        switch (producto) {
            case 1: agregarAlCarrito(vino1); break;
            case 2: agregarAlCarrito(vino2); break;
            case 3: agregarAlCarrito(vino3); break;
            case 4: agregarAlCarrito(vino4); break;
            case 5: agregarAlCarrito(vino5); break;
            case 6: agregarAlCarrito(vino6); break;
            case 0: break;
            default: alert("No seleccionaste un Vino válido"); break;
        }
    } while (producto !== 0);

    mostrarCarrito();
});

document.getElementById('buscarPorNombre').addEventListener('click', () => {
    let nombre = prompt("Ingrese el nombre del vino que desea buscar:");
    let vinoEncontrado = buscarVinoPorNombre(nombre);
    if (vinoEncontrado) {
        alert("Vino encontrado:\n" + vinoEncontrado.nombre + " - $" + vinoEncontrado.precio);
    } else {
        alert("No se encontró un vino con ese nombre.");
    }
});

document.getElementById('filtrarPorPrecio').addEventListener('click', () => {
    let maxPrecio = parseInt(prompt("Ingrese el precio máximo:"));
    let vinosFiltrados = filtrarVinosPorPrecio(maxPrecio);
    if (vinosFiltrados.length > 0) {
        let mensaje = "Vinos encontrados:\n";
        vinosFiltrados.forEach(vino => {
            mensaje += vino.nombre + " - $" + vino.precio + "\n";
        });
        alert(mensaje);
    } else {
        alert("No se encontraron vinos por debajo de ese precio.");
    }
});

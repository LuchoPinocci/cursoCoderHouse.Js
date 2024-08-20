let totalCarrito = 0;
let itemsCarrito = JSON.parse(localStorage.getItem('carritoGuardado')) || [];
let vistaActual = 'tienda'; // Puede ser 'tienda' o 'resultados'

const vino1 = { nombre: "Malbec 1893", precio: 12000 };
const vino2 = { nombre: "Malbec Piuke", precio: 10000 };
const vino3 = { nombre: "Tinto Clasico Tornaghi", precio: 8000 };
const vino4 = { nombre: "Tinto Dulce Carlon Tornaghi", precio: 9000 };
const vino5 = { nombre: "Blanco Piuke", precio: 11000 };
const vino6 = { nombre: "Blanco Torrones Familia Tornaghi", precio: 13000 };

const vinos = [vino1, vino2, vino3, vino4, vino5, vino6];

function agregarAlCarrito(indice) {
    const vinoSeleccionado = vinos[indice];
    itemsCarrito.push(vinoSeleccionado);
    totalCarrito += vinoSeleccionado.precio;
    actualizarLocalStorage();
    mostrarCarrito();
}

function mostrarCarrito() {
    const carritoDiv = document.getElementById('resumen-carrito');
    let resumen = '';
    itemsCarrito.forEach(item => {
        resumen += `${item.nombre} - $${item.precio}<br>`;
    });
    resumen += `<br><strong>Total: $${totalCarrito}</strong><br>¡Muchas gracias por tu compra!`;
    carritoDiv.innerHTML = resumen;
}

function actualizarLocalStorage() {
    localStorage.setItem('carritoGuardado', JSON.stringify(itemsCarrito));
    localStorage.setItem('totalMonto', totalCarrito);
}

function buscarPorNombre(terminoBusqueda) {
    return vinos.filter(item => item.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()));
}

function filtrarPorPrecio(precioMaximo) {
    return vinos.filter(item => item.precio <= precioMaximo);
}

function renderizarProductos() {
    const contenedorProductos = document.getElementById('contenedor-productos');
    contenedorProductos.innerHTML = '';
    vinos.forEach((item, index) => {
        const divProducto = document.createElement('div');
        divProducto.innerHTML = `<strong>${item.nombre}</strong> - $${item.precio} <button onclick="agregarAlCarrito(${index})">Agregar</button>`;
        contenedorProductos.appendChild(divProducto);
    });
}

document.getElementById('boton-buscar').addEventListener('click', () => {
    const terminoBusqueda = document.getElementById('entrada-busqueda').value.toLowerCase();
    const vinosEncontrados = buscarPorNombre(terminoBusqueda);
    vistaActual = 'resultados';
    const resultadosDiv = document.getElementById('resultados-busqueda');
    if (vinosEncontrados.length > 0) {
        let mensaje = 'Vinos encontrados:<br>';
        vinosEncontrados.forEach(item => {
            mensaje += `${item.nombre} - $${item.precio}<br>`;
        });
        resultadosDiv.innerHTML = mensaje;
    } else {
        resultadosDiv.innerHTML = 'No se encontró ningún vino con ese nombre.';
    }
    document.getElementById('boton-volver').style.display = 'inline';
});

document.getElementById('boton-filtrar').addEventListener('click', () => {
    const precioMaximo = parseInt(document.getElementById('entrada-precio').value);
    const vinosFiltrados = filtrarPorPrecio(precioMaximo);
    vistaActual = 'resultados';
    const resultadosDiv = document.getElementById('resultados-busqueda');
    if (vinosFiltrados.length > 0) {
        let mensaje = 'Vinos filtrados:<br>';
        vinosFiltrados.forEach(item => {
            mensaje += `${item.nombre} - $${item.precio}<br>`;
        });
        resultadosDiv.innerHTML = mensaje;
    } else {
        resultadosDiv.innerHTML = 'No se encontraron vinos por debajo de ese precio.';
    }
    document.getElementById('boton-volver').style.display = 'inline';
});

document.getElementById('boton-vaciar-carrito').addEventListener('click', () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres vaciar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'No, mantener'
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            itemsCarrito = [];
            totalCarrito = 0;
            actualizarLocalStorage();
            mostrarCarrito();
            Swal.fire({
                title: 'Carrito vacío',
                text: 'Tu carrito ha sido vaciado.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    });
});

document.getElementById('boton-volver').addEventListener('click', () => {
    vistaActual = 'tienda';
    document.getElementById('resultados-busqueda').innerHTML = '';
    document.getElementById('boton-volver').style.display = 'none';
    renderizarProductos();
});

if (localStorage.getItem('totalMonto')) {
    totalCarrito = parseInt(localStorage.getItem('totalMonto'));
}
mostrarCarrito();
if (vistaActual === 'tienda') {
    renderizarProductos();
    document.getElementById('boton-volver').style.display = 'none';
}

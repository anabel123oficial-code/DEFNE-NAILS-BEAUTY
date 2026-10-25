
const productos = [
    { nombre: "Uñas Rosadas", precio: 500, imagen: "uñas rosadas.jpeg" },
    { nombre: "Uñas Amarillas", precio: 600, imagen: "uñas amarillas.jpeg" },
    { nombre: "Uñas Azules", precio: 650, imagen: "uñas azules.jpeg" },
    { nombre: "Uñas Doradas", precio: 700, imagen: "uñas doradas.jpeg" },

    { nombre: "Uñas Blancas", precio: 550, imagen: "uñas blancas.jpeg" },
    { nombre: "Uñas Caracol Naranja", precio: 650, imagen: "uñas caracol del color naraja.jpeg" },
    { nombre: "Uñas con Bordes Dorados", precio: 700, imagen: "uñas con bordes dorados.jpeg" },
    { nombre: "Uñas con Corazones", precio: 550, imagen: "uñas con corazones.jpeg" },

    { nombre: "Uñas con Ramas Verdes", precio: 750, imagen: "uñas con decoracion de ramas verdes .jpeg" },
    { nombre: "Uñas Amarillas y Transparentes", precio: 600, imagen: "uñas con diseño amarillo y transparente.jpeg" },
    { nombre: "Uñas con Flores Rosadas", precio: 650, imagen: "uñas con flores rosadas.jpeg" },
    { nombre: "Uñas con Piedras Blancas", precio: 550, imagen: "uñas con piedras blancas.jpeg" },

    { nombre: "Uñas de Bordes de Colores", precio: 750, imagen: "uñas de bordes de colores.jpeg" },
    { nombre: "Uñas de Corazones Rosados", precio: 700, imagen: "uñas de corazones rosados.jpeg" },
    { nombre: "Uñas de Mate Marrón", precio: 600, imagen: "uñas de matel marron.jpeg" },
    { nombre: "Uñas Doradas Decoradas", precio: 650, imagen: "uñas doradas.jpeg" },

    { nombre: "Uñas Moradas", precio: 800, imagen: "uñas moradas.jpeg" },
    { nombre: "Uñas Rosas con Brillos", precio: 800, imagen: "uñas rosa con brillos.jpeg" },
    { nombre: "Uñas Rosadas Clásicas", precio: 600, imagen: "uñas rosadas.jpeg" },
    { nombre: "Uñas Amarillas, Rosas y Negras", precio: 900, imagen: "uñas color amarilos con rosa y punto negro.jpeg" }
];

let carrito = [];

const catalogo = document.getElementById("catalogo");

productos.forEach((producto, indice) => {
    catalogo.innerHTML += `
        <div class="producto">
            <img src="imagenes/${producto.imagen}"
                 alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="precio">
                RD$${producto.precio.toLocaleString("es-DO")}
            </p>
            <button class="boton-elegir"
                    onclick="agregarCarrito(${indice})">
                Elegir diseño
            </button>
        </div>
    `;
});

function agregarCarrito(indice) {
    carrito.push(productos[indice]);
    mostrarCarrito();

    document.getElementById("mensaje").textContent =
        "¡Diseño agregado correctamente!";
}

function mostrarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const cantidad = document.getElementById("cantidad");
    const totalElemento = document.getElementById("total");

    lista.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = "<li>Tu carrito está vacío.</li>";
    }

    carrito.forEach((producto, indice) => {
        total += producto.precio;

        lista.innerHTML += `
            <li>
                ${producto.nombre} - RD$${producto.precio.toLocaleString("es-DO")}
                <button class="boton-vaciar"
                        onclick="eliminarProducto(${indice})">
                    Eliminar
                </button>
            </li>
        `;
    });

    cantidad.textContent = carrito.length;
    totalElemento.textContent =
        "RD$" + total.toLocaleString("es-DO");
}

function eliminarProducto(indice) {
    carrito.splice(indice, 1);
    mostrarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();

    document.getElementById("mensaje").textContent =
        "El carrito ha sido vaciado.";
}

function irAlPago() {
    if (carrito.length === 0) {
        document.getElementById("mensaje").textContent =
            "Primero debes elegir un diseño.";
        return;
    }

    const total = carrito.reduce(
        (suma, producto) => suma + producto.precio, 0
    );

    localStorage.setItem("totalCompra", total);
    localStorage.setItem("productosCompra", JSON.stringify(carrito));

    window.location.href = "formulario de pago.html";
}

document.getElementById("pagar").addEventListener("click", irAlPago);
document.getElementById("completar").addEventListener("click", irAlPago);
document.getElementById("vaciar").addEventListener("click", vaciarCarrito);

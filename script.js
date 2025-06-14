// aca se van a almacenar todos los productos
let carrito = [];

// recuperamos el carrito del localStorage (si existe)
let carritoGuardado = localStorage.getItem("carrito");

if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
}

const botones = document.querySelectorAll("button");
const lista = document.querySelector(".lista-productos");
const total = document.getElementById("total");
const botonVaciarCarrito = document.getElementById("vaciar-carrito");
const iconoCarrito = document.querySelector(".fa-cart-shopping");
const infoCarrito = document.querySelector(".info-carrito");
const contadorCarrito = document.getElementById("contador-carrito");
const botonPagar = document.getElementById("boton-pagar");
const contenedorProductos = document.getElementById("contenedor-productos");

// mostramos el carrito actualizado al iniciar
actualizarCarrito();

// traemos los productos desde el json
fetch("productos.json")
    .then(res => res.json())
    .then(data => {
        data.forEach(producto => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}">
                <h2>${producto.nombre}</h2>
                <p>$${producto.precio.toLocaleString()}</p>
                <div class="contenedor-boton">
                    <button class="boton-agregar">Agregar al carrito</button>
                </div>
            `;

            contenedorProductos.appendChild(card);

            const boton = card.querySelector("button");
            boton.addEventListener("click", () => {
                carrito.push({ nombre: producto.nombre, precio: producto.precio });
                localStorage.setItem("carrito", JSON.stringify(carrito));
                actualizarCarrito();

                Toastify({
                    text: "Producto agregado!",
                    backgroundColor: "#452b1a",
                    duration: 2000,
                }).showToast();
            });
        });
    });

// vaciar el carrito
botonVaciarCarrito.addEventListener("click", () => {
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
});

// mostrar u ocultar el carrito al hacer click en el icono
iconoCarrito.addEventListener("click", () => {
    infoCarrito.classList.toggle("mostrar-carrito");
});

// cerrar el carrito si se hace click fuera de el
document.addEventListener("click", (e) => {
    if (!infoCarrito.contains(e.target) && !iconoCarrito.contains(e.target)) {
        infoCarrito.classList.remove("mostrar-carrito");
    }
});

// funcion para actualizar el contenido del carrito
function actualizarCarrito() {
    lista.innerHTML = "";
    let totalprecio = 0;

    carrito.forEach(producto => {
        let item = document.createElement("li");
        item.textContent = producto.nombre + " - $" + producto.precio.toLocaleString();
        lista.appendChild(item);
        totalprecio += producto.precio;
    });

    total.textContent = "Total: $" + totalprecio.toLocaleString();
    contadorCarrito.textContent = carrito.length;
}


botonPagar.addEventListener("click", () => {
    // si el carrrito esta vacio, le mostramos una alerta
    if (carrito.length === 0) {
        Swal.fire({
            title: "El carrito esta vacio",
            text: "Agrega productos al carrito para poder pagar.",
            icon: "error"
        });
        return;
    }

    Swal.fire({
        title: 'Procesando pago...',
        didOpen: () => {
            // icono de cargando el pago
            Swal.showLoading();
        },
    });

    // usamos un setTimeout para simular un tiempo de procesamiento del pago
    setTimeout(() => {
        Swal.fire({
            icon: 'success',
            title: '¡Pago realizado con éxito!',
            text: 'Gracias por tu compra.',
        });

        // vaciamos el carrito cuando se haya realizado el pago
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarCarrito();

        // ocultamos el carrito
        infoCarrito.classList.remove("mostrar-carrito");
    }, 3000);
});

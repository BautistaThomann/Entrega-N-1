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

// mostramos el carrito actualizado al iniciar
actualizarCarrito();

// manejamos el evento de click en los botones de productos
botones.forEach(boton => {
    if (boton.id !== "vaciar-carrito") {
        boton.addEventListener("click", () => {
            let card = boton.closest(".card");
            let producto = card.querySelector("h2").textContent;
            let precioTexto = card.querySelector("p").textContent;
            let precio = parseInt(precioTexto.replace("$", "").replace(".", ""));

            carrito.push({ nombre: producto, precio: precio });

            localStorage.setItem("carrito", JSON.stringify(carrito));

            actualizarCarrito();

            // usamos Toastify para mostrar un mensaje de que se agrego un producto al carrito
            Toastify({

                text: "Producto agregado!",
                backgroundColor: "#452b1a",
                duration: 2000,

            }).showToast();

        });
    }

});

// vaciar el carrito
botonVaciarCarrito.addEventListener("click", () => {
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
});

// mostrar u ocultar el carrito al hacer click en el ícono
iconoCarrito.addEventListener("click", () => {
    infoCarrito.classList.toggle("mostrar-carrito");
});

// cerrar el carrito si se hace click fuera de el
document.addEventListener("click", (e) => {
    if (!infoCarrito.contains(e.target) && !iconoCarrito.contains(e.target)) {
        infoCarrito.classList.remove("mostrar-carrito");
    }
});

// función para actualizar el contenido del carrito
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
            // cargando el pago icono
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

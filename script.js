// aca se van a almacenar todos los productos
let carrito = [];

let carritoGuardado = localStorage.getItem("carrito");

if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
}

const botones = document.querySelectorAll("button");
const lista = document.getElementById("lista");
const total = document.getElementById("total");
const botonVaciarCarrito = document.getElementById("vaciar-carrito");

actualizarCarrito();

botones.forEach(boton => {
    // si el boton no es el de vaciar carrito, entonces agrega el producto al carrito
    if (boton.id !== "vaciar-carrito") {
        boton.addEventListener("click", () => {
            let card = boton.closest(".card");
            let producto = card.querySelector("h2").textContent;
            let precioTexto = card.querySelector("p").textContent;

            // hacemos que el precio que se muestra en el html pase a numero entero
            let precio = parseInt(precioTexto.replace("$", "").replace(".", ""));

            // agregamos el producto al array carrito
            carrito.push({ nombre: producto, precio: precio });

            // guardamos el carrito en el localStorage, convirtiendolo a texto
            localStorage.setItem("carrito", JSON.stringify(carrito));

            // actualizamos el carrito
            actualizarCarrito();
            alert("¡Agregaste un producto al carrito!")
        });
    }
});

botonVaciarCarrito.addEventListener("click", () => {
    // si se hace click en el boton "vaciar carrito", el array carrito se va a vaciar
    carrito = []
    // borramos el carrito del localStorage
    localStorage.removeItem("carrito");
    // actualizamos el carrito
    actualizarCarrito();
});

function actualizarCarrito() {
    // borra todo
    lista.innerHTML = "";
    let totalprecio = 0;

    carrito.forEach(producto => {
        let item = document.createElement("li");
        item.textContent = producto.nombre + " - $" + producto.precio.toLocaleString();
        lista.appendChild(item);
        totalprecio = totalprecio + producto.precio;
    });

    total.textContent = "Total: $" + totalprecio.toLocaleString();

};

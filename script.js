const carrito = [];
let precioRemera = 20000;
let precioBuzo = 40000;
let precioPantalon = 30000;
let precioCampera = 45000;

while (true) {
    let nombreProducto = parseInt(prompt("Tenemos: 1-Remeras | 2-Pantalones | 3-Buzos | 4-Camperas \nIngrese el número de la prenda que desea comprar: "));

    // creamos los condicionales para establecer el precio de la prenda según eliga el usuario, pongo los condicionales aca para corroborar que el usuario ingrese el número de prenda correcto, porque sino va a mostrar los demas prompt (talle y cantidad)
    if (nombreProducto == 1) {
        precio = precioRemera,
            nombreProducto = "Remera";
    } else if (nombreProducto == 2) {
        precio = precioPantalon,
            nombreProducto = "Pantalon";
    } else if (nombreProducto == 3) {
        precio = precioBuzo,
            nombreProducto = "Buzo";
    } else if (nombreProducto == 4) {
        precio = precioCampera,
            nombreProducto = "Campera";
    } else {
        alert("Producto invalido, ingrese nuevamente el producto");
        continue;
    };

    let talle = prompt("Ingrese el talle de la prenda: ").toUpperCase();
    let cantidad = parseInt(prompt("Ingrese la cantidad: "));



    // creamos el objeto producto para almacenar cada producto
    let producto = {
        nombreProducto: nombreProducto,
        talle: talle,
        precio: precio,
        cantidad: cantidad,
    };

    // hacemos que cada producto que agregue el usuario se va a agregar al array carrito
    carrito.push(producto);

    let pregunta = prompt("Desea agregar mas productos al carrito? ").toLowerCase();

    if (pregunta != "si") {
        break;
    };

};

console.log("---------------------------------- \nProductos del carrito: ");

// recorremos el array carrito, y mostramos cada producto con sus respectivas caracteristicas
for (let i = 0; i < carrito.length; i++) {
    let prod = carrito[i];
    console.log("Producto " + (i + 1) + ": " + prod.nombreProducto + "\n$" + prod.precio + "\nTalle:" + prod.talle + "\ncantidad:" + prod.cantidad);
};

// calculamos el total de todo con una funcion
function calcularTotal() {
    let total = 0
    for (let i = 0; i < carrito.length; i++) {
        total = total + carrito[i].precio * carrito[i].cantidad;

    }
    return total;
}

// invocamos a la funcion que calcula el total
let total = calcularTotal();

console.log("---------------------------------- \nTotal a pagar: $" + total);

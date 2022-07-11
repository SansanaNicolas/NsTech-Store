import { mostrarProductos, obtenerCarritoStorage, renderProductosCarrito, actualizarCarrito} from "./app.js";
import { productos } from "./stock.js";

document.addEventListener("DOMContentLoaded", () => {

    mostrarProductos(productos);

    if (localStorage.getItem("carrito")) {
        const carritoStorage = obtenerCarritoStorage();
        renderProductosCarrito(carritoStorage);
        actualizarCarrito(carritoStorage);
      }

})



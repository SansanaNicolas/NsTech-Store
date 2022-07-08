// import { carritoIndex } from "/carritoIndex.js";

const contadorCarrito = document.getElementById("contador-carrito");
let contador = 0;

function pintarContador() {
    contadorCarrito.textContent = contador;
}

export const mostrarProductos = (productos) => {

    const contenedorProductos = document.getElementById("main");

 productos.forEach(element => {
    const prod1 = document.createElement("div");
    prod1.classList.add("card");
    prod1.innerHTML = `<div class="prod1">
                              <h3>Nombre: ${element.nombre}</h3>
                              <b>$${element.precio}</b>
                              <img class="img" src=${element.img}>
                              <button id="agregar${element.id}" type="button"> Agregar al carrito </button>
                        </div>`;
                 
    contenedorProductos.appendChild(prod1);   


    const boton = document.getElementById(`agregar${element.id}`);

    boton.addEventListener('click', () => {
   alert("agregado con exito!");
   contador++;
   pintarContador();

});
});
};

export const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"))
    return carritoStorage;
  }
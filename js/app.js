

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
                              <div class="card__titulo">
                                <h3>${element.nombre}</h3>
                              </div>
                              <div class="card__img">
                                <img class="img" src=${element.img}>
                              </div>
                              <div class="card__precio">
                                <b>$ ${element.precio}</b>
                              </div>
                              <div class="card__btn">
                                <button id="agregar${element.id}" type="button" class="btn__style"> Agregar al carrito </button>
                              </div>
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


  // modal

  const abrirModal = document.getElementById("cesta-carrito");
  const cerrarModal = document.getElementById("cerrar-carrito");
  const limpiarCarrito = document.getElementById("limpiar-carrito");
  const modal = document.querySelector(".modal");

  abrirModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("modal-mostrar");
  })

  cerrarModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("modal-mostrar");
  })

  limpiarCarrito.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
  })
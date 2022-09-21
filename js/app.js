import { productos } from "./stock.js";

const contadorCarrito = document.getElementById("contador-carrito");
const precioTotal = document.getElementById('precioTotal');



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
      carritoIndex(element.id);
      swal.fire({
        title: "Genial",
        text: "El producto ha sido añadido al carrito",
        icon: "success",
        confirm: "Ok",
        timer: 2000
      })

});
});
};

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
    swal.fire({
      title: "¿Esta seguro de vaciar el carrito?",
      icon: "warning",
      showCancelButton: true,
      buttons: true,
      dangerMode: true
    }).then( (result) =>  {
      if (result.isConfirmed) {
        location.reload();
        localStorage.clear();
        swal.fire({
          title: "borrado",
          icon: "sucess",
          text: "El producto ha sido borrado"
        })
      }
    })
  })

  
  // carro

  const carritoIndex = (productoId) => {
    let carritoDeCompras = [];
    if (localStorage.getItem("carrito")) {
      carritoDeCompras = obtenerCarritoStorage();
    }
    let productoRepetido = carritoDeCompras.find(producto => producto.id == productoId);
    contarProductosRepetidos(productoRepetido, productoId, carritoDeCompras);
    }

    
  export const actualizarCarrito = (carritoDeCompras) => {
    contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad, 0);
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
  }

    
  
    const contarProductosRepetidos = (prodRepetido, productoId, carritoDeCompras) => {
      if (prodRepetido) {
        prodRepetido.cantidad++
        document.getElementById(`cantidad${prodRepetido.id}`).innerHTML = `<p id=cantidad${prodRepetido.id}>Cantidad:${prodRepetido.cantidad}</p>`;
        actualizarCarrito(carritoDeCompras);
      } else {
        agregarProductoAlCarrito(productoId, carritoDeCompras);
      }
    }

    const agregarProductoAlCarrito = (productoId, carritoDeCompras) => {
    const contenedor = document.getElementById('carrito-contenedor');
    const producto = productos.find(producto => producto.id == productoId);
    carritoDeCompras.push(producto);
  
    producto.cantidad = 1;
  
    const div = document.createElement('div');
    div.classList.add('productoEnCarrito');
    div.innerHTML = ` <p>${producto.nombre}</p>
                      <p>Precio:${producto.precio}</p>
                      <p id=cantidad${producto.id}>Cantidad:${producto.cantidad}</p>
                      <button id=eliminar${producto.id} value="${producto.id}">X</button>
                    `
      contenedor.appendChild(div);
    actualizarCarrito(carritoDeCompras);
  };

  export const eliminarProductoCarrito = (productoId) => {
    const carritoStorage = obtenerCarritoStorage();
    const carritoActualizado = carritoStorage.filter(el => el.id != productoId);
  
    actualizarCarrito(carritoActualizado);
    renderProductosCarrito(carritoActualizado);
  };

  export const renderProductosCarrito = (carritoDeCompras) => {
    const contenedor = document.getElementById('carrito-contenedor');
  
    contenedor.innerHTML = "";
  
    carritoDeCompras.forEach(producto => {
      const div = document.createElement('div');
      div.classList.add('productoEnCarrito');
      div.innerHTML = ` <p>${producto.nombre}</p>
                        <p>Precio:${producto.precio}</p>
                        <p id=cantidad${producto.id}>Cantidad:${producto.cantidad}</p>
                        <button id=eliminar${producto.id} class="btn waves-effect waves-light boton-eliminar" value="${producto.id}">X</button>
                      `
      contenedor.appendChild(div);
    });
  };

  export const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"))
    return carritoStorage;
  }

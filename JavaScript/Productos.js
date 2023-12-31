/* Todas las funcionalidades son las mismas a las explicadas en el archivo main.js */
const verifico = JSON.parse(localStorage.getItem("compra"))
if (!verifico) {
    let contenedorVerificacion = document.getElementById("contenedorDeTodo")
    let remplazaHTML = document.createElement("div")
    remplazaHTML.innerHTML = ` <p id="vacio" class="estilo">No hay productos en su carrito por el momento</p>`
    contenedorVerificacion.appendChild(remplazaHTML)
    contadorsito()
} else {
    for (const muestro of verifico) {
        let contenedorVerificacionTrue = document.getElementById("contenedorDeTodo")
        let htmlRemplazo = document.createElement("div")
        htmlRemplazo.id = `${muestro.id}-div`
        htmlRemplazo.classList.add("contenedorProductosCarrito")
        htmlRemplazo.innerHTML = `<p class="estilo" id="cantidad-${muestro.id}">Producto: ${muestro.nombre} x${muestro.cantidad} <br> Precio x unidad: $${muestro.precio}</p>
        <button id="${muestro.id}" class="boton-elimino bg-dark fa-solid fa-x"></button>
        <div class="linea2"></div>
        `
        contenedorVerificacionTrue.appendChild(htmlRemplazo)
        eliminarElementos()
        contadorsito()
    }
}


function contadorsito() {
    let numero = 0
    let precioTotal = 0
    let contador = document.getElementById("notificacion")
    let totalPrecio = document.getElementById("totalPrecio")
    const carritoAux = JSON.parse(localStorage.getItem("compra")) || []
    if (carritoAux.length !== 0) {
        for (const numeritos of carritoAux) {
            numero += numeritos.cantidad
            precioTotal += numeritos.precio * numeritos.cantidad
        }
        contador.innerText = numero
        totalPrecio.innerHTML = `Total: $${precioTotal}`
    } else {
        contador.innerText = 0
        totalPrecio.innerHTML = `Total: $0`
    }
}


let compruebo2 = []

function agregaCarrito() {
    fetch("../Productos2.json")
    .then((response) => response.json())
    .then(productos => {
        let carrito = []
        let botones = document.getElementsByClassName('boton_carrito')
        for (const boton of botones) {
            boton.onclick = (e) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Producto agregado al carrito con exito',
                })
                let compraProductos = productos.find((el) => el.id === parseInt(e.target.id))
                let compruebo = JSON.parse(localStorage.getItem("compra"))
                if (compruebo) {
                    const compruebo2 = JSON.parse(localStorage.getItem("compra"))
                    let indice = compruebo2.findIndex((el) => el.id === parseInt(e.target.id))
                    if (indice !== -1) {
                        compruebo2[indice].cantidad++
                        localStorage.setItem("compra", JSON.stringify(compruebo2))
                        let muestroCarrito = document.getElementById(`cantidad-${compruebo2[indice].id}`)
                        muestroCarrito.innerText = `Producto: ${compruebo2[indice].nombre} x${compruebo2[indice].cantidad} \n  Precio x unidad: $${compruebo2[indice].precio}`
                        contadorsito()
                        eliminarElementos()

                    } else {
                        compruebo2.push(compraProductos)
                        localStorage.setItem("compra", JSON.stringify(compruebo2))
                        let indice2 = compruebo2.findIndex((el) => el.id === parseInt(e.target.id))
                        let muestroCarrito = document.getElementById("contenedorDeTodo")
                        let carritoMostrado = document.createElement("div")
                        carritoMostrado.id = `${compruebo2[indice2].id}-div`
                        carritoMostrado.classList.add("contenedorProductosCarrito")
                        carritoMostrado.innerHTML = ` <p class="estilo" id="cantidad-${compruebo2[indice2].id}">Producto: ${compruebo2[indice2].nombre} x${compruebo2[indice2].cantidad} <br> Precio x unidad: $${compruebo2[indice2].precio}</p>
                        <button id="${compruebo2[indice2].id}" class="boton-elimino bg-dark fa-solid fa-x"></button>
                        <br>
                        <div class="linea2"></div>`
                        muestroCarrito.appendChild(carritoMostrado)
                        contadorsito()
                        eliminarElementos()
                    }
                } else {
                    carrito.push(compraProductos)
                    localStorage.setItem("compra", JSON.stringify(carrito))
                    let muestroCarrito = document.getElementById("contenedorDeTodo")
                    let carritoMostrado = document.createElement("div")
                    carritoMostrado.id = `${carrito[0].id}-div` 
                    carritoMostrado.classList.add("contenedorProductosCarrito")
                    muestroCarrito.innerHTML = ``
                    carritoMostrado.innerHTML = ` <p class="estilo" id="cantidad-${carrito[0].id}">Producto: ${carrito[0].nombre} x${carrito[0].cantidad} <br> Precio x unidad: $${carrito[0].precio}</p>
                    <button id="${carrito[0].id}" class="boton-elimino bg-dark fa-solid fa-x"></button>
                    <br>
                    <div class="linea2"></div>
                    `
                    muestroCarrito.appendChild(carritoMostrado)
                    contadorsito()
                    carrito = []
                    eliminarElementos()

                }
                const carritoGuardado = JSON.parse(localStorage.getItem("compra")) || []
                if (carritoGuardado.length > 0) {
                    let vacio = document.getElementById("vacio")
                    let vacioS = document.getElementById("contenedorDeTodo")
                    if (vacio) {
                        vacioS.removeChild(vacio)
                    }
                }
            }
        }
    })
}


let botonLimpiarCarrito = document.getElementById('finalCompra')
botonLimpiarCarrito.onclick = () => {
    const carritoCompruebo = JSON.parse(localStorage.getItem("compra"))
    if (carritoCompruebo) {
        Swal.fire({
            icon:'success',
            title: 'Procesando compra...',
            timer: 1600,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
            }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
            })
        setTimeout(() => {
            localStorage.removeItem('compra')
            contadorsito()
            let vaciar = document.getElementById("contenedorDeTodo")
            vaciar.innerHTML = `
                <p class="estilo" id="vacio">No hay productos en su carrito por el momento</p>
                `
            window.location.href = "TarjetaPagar.html";
        }, 1600);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'No hay productos en el carrito!',
        })
    }
}

function eliminarElementos() {
    let botoncito = document.getElementsByClassName("boton-elimino")
    for (const boton of botoncito) {
        boton.onclick = (e) => {
            console.log("se que apretaste el boton")
            let carritoEliminar = JSON.parse(localStorage.getItem("compra"))
            console.log(carritoEliminar)
            let index = carritoEliminar.findIndex((el) => el.id === parseInt(e.target.id))
            let cantidadElimino = carritoEliminar[index].cantidad
            if (carritoEliminar.length === 1 && cantidadElimino === 1) {
                console.log("quiero vaciar el local storage")
                localStorage.removeItem('compra')
                carritoEliminar = []
                let vaciar = document.getElementById("contenedorDeTodo")
                vaciar.classList.add('removing');
                setTimeout(() => {
                    vaciar.innerHTML = `
                    <p class="estilo" id="vacio">No hay productos en su carrito por el momento</p>
                    `
                    vaciar.classList.remove('removing')
                }, 500);
                
                contadorsito()
            } else if (cantidadElimino > 1) {

                console.log("quiero descontarle a la cantidad")
                let animacionDescontar = document.getElementById(`${e.target.id}-div`)
                animacionDescontar.classList.add('descontar');
                setTimeout(() => {
                    carritoEliminar[index].cantidad--
                    localStorage.setItem("compra", JSON.stringify(carritoEliminar))
                    contadorsito()
                    let modificarCantidad = document.getElementById(`cantidad-${carritoEliminar[index].id}`)
                    modificarCantidad.innerText = `Producto: ${carritoEliminar[index].nombre} x${carritoEliminar[index].cantidad} \n  Precio x unidad: $${carritoEliminar[index].precio}
                    `
                    animacionDescontar.classList.remove('descontar');
                }, 300);
                
            } else {
                console.log("quiero borrar el div")
                carritoEliminar.splice(index, 1)
                localStorage.setItem("compra", JSON.stringify(carritoEliminar))
                let divProducto = document.getElementById(`${e.target.id}-div`)
                divProducto.classList.add('removing');
                if (divProducto) {
                    console.log("voy a entrar al settimeout")
                    setTimeout(() => {
                        divProducto.remove(); 
                    }, 500);
                    contadorsito()
                }
            }
        }
    }
}
function agregarProducto2() {
    fetch("../Productos2.json")
    .then((response) => response.json())
    .then(productos2 => {
        let container2 = document.getElementById('container_item2')
        for (const producto of productos2) {
            let card2 = document.createElement('div')
            card2.classList.add("item")
            card2.innerHTML = `
                    <figure>
                    <img src="../Imagenes/imagenes productos/${producto.img}" alt="${producto.tipo}">
                    </figure>
                    <div class="info-product">
                        <p>${producto.nombre}</p>
                        <p class="price">$${producto.precio}</p>
                        <button class="boton_carrito" id="${producto.id}">Añadir al carrito</button>
                    </div>
            `
            container2.appendChild(card2)
        }
    })
}
agregarProducto2()
agregaCarrito()


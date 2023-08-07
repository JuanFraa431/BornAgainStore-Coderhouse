/* Funcion que verifica que que el localStorage este vacio al momento de entrar en la pagina, si ya habia elementos, los coloca dentro del carrito que se muestra */
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

/* Funcion que permite tener un contador en tiempo real de la cantidad de elementos cargados en el carrito */
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


/* Funcion para agregar productos al contenedor del carrito, verifica que alla elementos,que sean nuevos o que se repitan y se vuelven a sumar a la cantidad  */
function agregaCarrito() {
    fetch("./Productos.json")
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
                    carritoMostrado.innerHTML = `<p class="estilo" id="cantidad-${carrito[0].id}">Producto: ${carrito[0].nombre} x${carrito[0].cantidad} <br> Precio x unidad: $${carrito[0].precio}</p>
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


/* esta funcion permite poder procesar la compra y simular una carga de tarjeta, en si elimina del localStorage los elementos del carrito */
let botonLimpiarCarrito = document.getElementById('finalCompra')
botonLimpiarCarrito.onclick = () => {
    const carritoCompruebo = JSON.parse(localStorage.getItem("compra"))
    if (carritoCompruebo) {
        let timerInterval
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
            window.location.href = "./Pages/TarjetaPagar.html";
        }, 1600);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'No hay productos en el carrito!',
        })
    }
}


/* Funcion que permite borrar elemento x elemento del localStorage y del contenedor visual del carrito */
function eliminarElementos() {
    let botoncito = document.getElementsByClassName("boton-elimino")
    for (const boton of botoncito) {
        boton.onclick = (e) => {
            let carritoEliminar = JSON.parse(localStorage.getItem("compra"))
            let index = carritoEliminar.findIndex((el) => el.id === parseInt(e.target.id))
            let cantidadElimino = carritoEliminar[index].cantidad
            if (carritoEliminar.length === 1 && cantidadElimino === 1) {
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
                carritoEliminar.splice(index, 1)
                localStorage.setItem("compra", JSON.stringify(carritoEliminar))
                let divProducto = document.getElementById(`${e.target.id}-div`)
                divProducto.classList.add('removing');
                if (divProducto) {
                    setTimeout(() => {
                        divProducto.remove(); 
                    }, 500);
                    contadorsito()
                }
            }
        }
    }
}

/* funcion que permite verificar si hay una sesion iniciada y cerrar sesion de la misma*/
function userActivo() {
    const usuarioIniciado = JSON.parse(localStorage.getItem("userActivo"))
    let contenedorSesion = document.getElementById('sesionIniciada')
    if (usuarioIniciado !== -1) {
        contenedorSesion.style.display = "grid"
        contenedorSesion.innerHTML = `<img  id="ImagenSesion" src="Imagenes/imagen-sesion.png" alt="">
        <p class="nombreSesion">${usuarioIniciado.nombre}</p>
        <button class="btn btn-danger" id="btn-CerrarSesion">Cerrar Sesion</button>`
    }else {
        contenedorSesion.style.display = "none"
    }
    const botonCerrarSesion = document.getElementById("btn-CerrarSesion")
    botonCerrarSesion.onclick = (e) => {
        let timerInterval
		Swal.fire({
        icon:'success',
		title: 'Cerrando sesion...',
		timer: 2000,
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
            localStorage.removeItem('userActivo')
            location.reload()
        }, 2000);
    }
}

/* Funcion para solucionar un error de consola */
function ejecutrarSiExiste() {
    if (localStorage.getItem("userActivo") !== null ) {
        userActivo()
    }else {
        console.log("todavia no inicio sesion")
    }
}

/* Funcion que muestra los productos en el index atravez de un fetch de los productos que se encuentran en el .json */
function agregarProducto() {
    fetch("./Productos.json")
    .then((response) => response.json())
    .then(productos => {
    let container = document.getElementById('container_item')
    for (const product of productos) {
        let card = document.createElement('div')
        card.classList.add("item")
        card.innerHTML = `
                <figure>
                    <img src="Imagenes/imagenes productos/${product.img}" alt="${product.tipo}" >
                </figure>
                <div class="info-product">
                    <p>${product.nombre}</p>
                    <p class="price">$${product.precio}</p>
                    <button class="boton_carrito" id="${product.id}">Añadir al carrito</button>
                </div>
        `
        container.appendChild(card)
        }
    })
}
ejecutrarSiExiste() 
agregarProducto()
agregaCarrito()



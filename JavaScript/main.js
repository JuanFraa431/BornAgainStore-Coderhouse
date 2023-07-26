function cargarProductos() {
    const productos = [];
    class producto {
        constructor(nombre, precio, stock, id, tipo, img, cantidad) {
            this.nombre = nombre;
            this.precio = precio;
            this.stock = stock;
            this.id = id;
            this.tipo = tipo;
            this.img = img;
            this.cantidad = cantidad;
        }
    }

    let buzoHombre = new producto("Buzo Hombre", 14000, 10, 1, "Buzo", "producto1.jpg", 1)
    let gorro = new producto("Gorro", 7000, 15, 2, "Gorro", "producto2.jpg", 1)
    let babuchaHombre = new producto("babucha Hombre", 7000, 15, 3, "Babucha", "producto3.webp", 1)
    let buzoHombre2 = new producto("Buzo Hombre", 14000, 10, 4, "Buzo", "producto4.jpg", 1)
    let remeraHombre = new producto("Remera Hombre", 8000, 20, 5, "Gorro", "producto5.jpg", 1)
    let buzoHombre3 = new producto("Buzo Hombre", 14000, 7, 6, "Buzo", "producto6.jpg", 1)
    let jeanHombre = new producto("Jean Hombre", 20000, 5, 7, "Jean", "producto7.webp", 1)
    let buzoHombre4 = new producto("Buzo Hombre", 14000, 3, 8, "Buzo", "producto8.jpg", 1)
    let remeraHombre2 = new producto("Remera Hombre", 8000, 20, 9, "Gorro", "producto9.jpg", 1)
    let buzoHombre5 = new producto("Buzo Hombre", 14000, 8, 10, "Buzo", "producto10.jpg", 1)
    

    productos.push(buzoHombre, gorro, babuchaHombre, buzoHombre2, remeraHombre, buzoHombre3, jeanHombre, buzoHombre4, remeraHombre2, buzoHombre5)
    return productos
}


const verifico = JSON.parse(localStorage.getItem("compra"))
if (!verifico){
    let contenedorVerificacion = document.getElementById("contenedorDeTodo")
    let remplazaHTML = document.createElement("div")
    remplazaHTML.innerHTML =` <p id="vacio" class="estilo">No hay productos en su carrito por el momento</p>`
    contenedorVerificacion.appendChild(remplazaHTML)
    contadorsito()
}else {
    for (const muestro of verifico) {
        let contenedorVerificacionTrue = document.getElementById("contenedorDeTodo")
        let htmlRemplazo = document.createElement("div")
        htmlRemplazo.innerHTML= `<p class="estilo" id="cantidad-${muestro.id}">Producto: ${muestro.nombre} x${muestro.cantidad} <br> Precio Final: $${muestro.precio * muestro.cantidad}</p>
        <div class="linea2"></div>
        `
        contenedorVerificacionTrue.appendChild(htmlRemplazo)
        contadorsito()
    }
}


function contadorsito() {
    let numero = 0
    let precioTotal = 0
    let contador = document.getElementById("notificacion")
    let totalPrecio = document.getElementById("totalPrecio")
    const carritoAux = JSON.parse(localStorage.getItem("compra")) || []
    if (carritoAux.length !== 0){
        for (const numeritos of carritoAux){
            numero+= numeritos.cantidad
            precioTotal+= numeritos.precio * numeritos.cantidad
        }
        contador.innerText = numero
        totalPrecio.innerHTML = `Total:$${precioTotal}`
    }else {
        contador.innerText = 0
        totalPrecio.innerHTML =`Total:$0`
    }
}


let compruebo2 = []

function agregaCarrito() {
    let productos = cargarProductos()
    let carrito = []
    let botones = document.getElementsByClassName('boton_carrito')
    for (const boton of botones) {
        boton.onclick = (e) => {
            swal({
                title: 'Producto agregado al carrito con exito',
                //text: muestro,
                icon: 'success',
            })
            let compraProductos = productos.find((el) => el.id === parseInt(e.target.id))
            let compruebo =  JSON.parse(localStorage.getItem("compra"))
            if (compruebo) {
                console.log(compruebo, "esto es compruebo")
                const compruebo2 = JSON.parse(localStorage.getItem("compra"))
                let indice = compruebo2.findIndex((el) => el.id === parseInt(e.target.id))
                if (indice !== -1){
                    compruebo2[indice].cantidad++
                    localStorage.setItem("compra", JSON.stringify(compruebo2))
                    let muestroCarrito = document.getElementById(`cantidad-${compruebo2[indice].id}`)
                    muestroCarrito.innerText=`Producto: ${compruebo2[indice].nombre} x${compruebo2[indice].cantidad} \n  Precio Final: $${compruebo2[indice].precio * compruebo2[indice].cantidad}`
                    contadorsito()
                    

                }else {
                    compruebo2.push(compraProductos)
                    localStorage.setItem("compra", JSON.stringify(compruebo2))
                    let indice2 = compruebo2.findIndex((el) => el.id === parseInt(e.target.id))
                    let muestroCarrito= document.getElementById("contenedorDeTodo")
                    let carritoMostrado = document.createElement("div")
                    carritoMostrado.innerHTML=` <p class="estilo" id="cantidad-${compruebo2[indice2].id}">Producto: ${compruebo2[indice2].nombre} x${compruebo2[indice2].cantidad} <br> Precio Final: $${compruebo2[indice2].precio * compruebo2[indice2].cantidad}</p>
                    <div class="linea2"></div>`
                    muestroCarrito.appendChild(carritoMostrado)
                    contadorsito()
                    
                } 
            }else {
                carrito.push(compraProductos)
                console.log("paso algo al local storage por primera vez")
                localStorage.setItem("compra", JSON.stringify(carrito))
                let muestroCarrito = document.getElementById("contenedorDeTodo")
                let carritoMostrado = document.createElement("div")
                muestroCarrito.innerHTML =``
                carritoMostrado.innerHTML=` <p class="estilo" id="cantidad-${carrito[0].id}">Producto: ${carrito[0].nombre} x${carrito[0].cantidad} <br> Precio Final: $${carrito[0].precio * carrito[0].cantidad}</p>
                <div class="linea2"></div>
                `
                muestroCarrito.appendChild(carritoMostrado)
                contadorsito()
                carrito = []
            }
            console.log(compruebo2, "hola este es compruebo2") 
            const carritoGuardado =  JSON.parse(localStorage.getItem("compra")) || []
            if (carritoGuardado.length > 0){
                let vacio = document.getElementById("vacio")
                let vacioS = document.getElementById("contenedorDeTodo")
                if (vacio){
                    vacioS.removeChild(vacio)
                }
            }
        }
    } 
}


    let botonLimpiarCarrito = document.getElementById('finalCompra')
    botonLimpiarCarrito.onclick = () => {
        swal({
            title: 'Su compra se ha procesado correctamente',
            icon: 'success',
        })
    localStorage.clear()
    contadorsito() 
    let vaciar = document.getElementById("contenedorDeTodo")
    vaciar.innerHTML = `
        <p class="estilo" id="vacio">No hay productos en su carrito por el momento</p>
    `
    } 





function agregarProducto() {
    let productos = cargarProductos()
    let container = document.getElementById('container_item')
    for (const product of productos) {
        let card = document.createElement('div')
        card.classList.add("item")
        card.innerHTML = `
                <figure>
                    <img src="Imagenes/imagenes productos/${product.img}" alt="Buzo Hombre" >
                </figure>
                <div class="info-product">
                    <p>${product.nombre}</p>
                    <p class="price">$${product.precio}</p>
                    <button class="boton_carrito" id="${product.id}">Añadir al carrito</button>
                </div>
        `
        container.appendChild(card)
    }
}
cargarProductos()
agregarProducto()
agregaCarrito()

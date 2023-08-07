/* tarjeta */
const tarjeta = document.querySelector('#tarjeta'),
	btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
	formulario = document.querySelector('#formulario-tarjeta'),
	numeroTarjeta = document.querySelector('#tarjeta .numero'),
	nombreTarjeta = document.querySelector('#tarjeta .nombre'),
	logoMarca = document.querySelector('#logo-marca'),
	firma = document.querySelector('#tarjeta .firma p'),
	mesExpiracion = document.querySelector('#tarjeta .mes'),
	yearExpiracion = document.querySelector('#tarjeta .year');
ccv = document.querySelector('#tarjeta .ccv');

/* Dar vuelta la tarjeta para mostrar el frente. */
const mostrarFrente = () => {
	if (tarjeta.classList.contains('active')) {
		tarjeta.classList.remove('active');
	}
}

/* Rotacion de la tarjeta */
tarjeta.addEventListener('click', () => {
	tarjeta.classList.toggle('active');
});



/*  Select del mes generado dinamicamente. */
for (let i = 1; i <= 12; i++) {
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectMes.appendChild(opcion);
}

/* Select del año generado dinamicamente. */
const yearActual = new Date().getFullYear();
for (let i = yearActual; i <= yearActual + 8; i++) {
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectYear.appendChild(opcion);
}

/* Input numero de tarjeta */
formulario.inputNumero.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNumero.value = valorInput
		/* Eliminar espacios en blanco */
		.replace(/\s/g, '')
		 /* Eliminar las letras */
		.replace(/\D/g, '')
		/* Poner espacio cada cuatro numeros */
		.replace(/([0-9]{4})/g, '$1 ')
		/*  Eliminar el ultimo espaciado */
		.trim();

	numeroTarjeta.textContent = valorInput;

	if (valorInput == '') {
		numeroTarjeta.textContent = '#### #### #### ####';

		logoMarca.innerHTML = '';
	}

	if (valorInput[0] == 4) {
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = '../Imagenes/logos/visa.png';
		logoMarca.appendChild(imagen);
	} else if (valorInput[0] == 5) {
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = '../Imagenes/logos/mastercard.png';
		logoMarca.appendChild(imagen);
	}

	/*  Dar vuelta la tarjeta para que el usuario vea el frente. */
	mostrarFrente();
});

/*  Input nombre de tarjeta */
formulario.inputNombre.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
	nombreTarjeta.textContent = valorInput;
	firma.textContent = valorInput;

	if (valorInput == '') {
		nombreTarjeta.textContent = 'Jhon Doe';
	}

	mostrarFrente();
});

/*  Select mes */
formulario.selectMes.addEventListener('change', (e) => {
	mesExpiracion.textContent = e.target.value;
	mostrarFrente();
});

/*  Select Año */
formulario.selectYear.addEventListener('change', (e) => {
	yearExpiracion.textContent = e.target.value.slice(2);
	mostrarFrente();
});

/* CCV */
formulario.inputCCV.addEventListener('keyup', () => {
	if (!tarjeta.classList.contains('active')) {
		tarjeta.classList.toggle('active');
	}

	formulario.inputCCV.value = formulario.inputCCV.value
	/* Eliminar los espacios */
		.replace(/\s/g, '')
		/*  Eliminar las letras */
		.replace(/\D/g, '');

	ccv.textContent = formulario.inputCCV.value;
});

function volverindex() {
	let cancelarCompra = document.getElementById('cancelar')
	cancelarCompra.onclick = () => {
		let timerInterval
		Swal.fire({
		icon:'error',
		title: 'Cancelando compra...',
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
            window.location.href = "../index.html";
        }, 1600);
    }
}
function pagarYVolverindex() {
	let cancelarCompra = document.getElementById('pagar')
	cancelarCompra.onclick = () => {
		let timerInterval
		Swal.fire({
		icon:'success',
		title: 'Realizando el pago...',
		timer: 3000,
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
            window.location.href = "../index.html";
        }, 3000);
    }
}
pagarYVolverindex()
volverindex()



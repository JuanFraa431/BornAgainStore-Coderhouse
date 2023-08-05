
// Esperamos a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Obtenemos el formulario y los campos de entrada
    const loginForm = document.getElementById('form__sesion');
    const email2Input = document.getElementById('recuadro__email');
    const passwordInput = document.getElementById('recuadro__pass');

    // Evento de envío del formulario
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que se envíe el formulario

        // Obtenemos los valores de los campos de entrada
        const email2Value = email2Input.value.trim().toLowerCase();
        const passwordValue = passwordInput.value.trim();
        let usuarioActivo = JSON.parse(localStorage.getItem('userActivo'))
        // Comprobar si los campos están vacíos
        if (email2Value === '' || passwordValue === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Debes ingresar un email y una contraseña!',
            })
            return;
        }else if (usuarioActivo !== null) {
            let timerInterval
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Primero debes cerrar sesion en el inicio!',
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
                window.location.href = '../index.html';
            }, 3000);
        }else {
            let usuarioEistente = JSON.parse(localStorage.getItem('users')) || [];
            if (usuarioEistente === []) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'No hay ningun usuario creado hasta el momento, porfavor, primero cree una cuenta!',
                })

            }else {
                const index = usuarioEistente.findIndex((el) => el.email === email2Input.value)
                if (index !== -1) {
                    if (usuarioEistente[index].email === email2Value && usuarioEistente[index].password === passwordValue) {
                        const mensaje = '¡Hola, ' + usuarioEistente[index].nombre + '!\n' + '¡Bienvenido denuevo a BornAgainStore!\n';
                        let timerInterval
                        Swal.fire({
                            icon: 'success',
                            title: 'Inicio de sesion exitoso',
                            text: mensaje,
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
                        let Arrayaux = usuarioEistente[index]
                        localStorage.setItem('userActivo', JSON.stringify(Arrayaux));
                        Arrayaux = []
                        setTimeout(() => {
                            window.location.href = '../index.html';
                        }, 3000);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error...',
                            text: 'El usuario o la contraseña no son correctos!',
                        })
                    }
                }
            }
        }
    });
});

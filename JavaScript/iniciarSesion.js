/* Funcion para extraer los id de inputs */
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('form__sesion');
    const email2Input = document.getElementById('recuadro__email2');
    const passwordInput = document.getElementById('recuadro__pass');

    /* Evento de envío del formulario */
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que se envíe el formulario

        /* Trae los valores de los campos de entrada de los inputs*/
        const email2Value = email2Input.value.trim().toLowerCase();
        const passwordValue = passwordInput.value.trim();
        let usuarioActivo = JSON.parse(localStorage.getItem('userActivo'))
        /* Comprueba si los campos están vacíos */
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
            /* Verifica que almenos exista un usuario creado con antelacion */
            if (usuarioEistente === []) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'No hay ningun usuario creado hasta el momento, porfavor, primero cree una cuenta!',
                })

            }else {
                /* Encuentra el indice del email ingresado, y lo busca dentro del array del localStorage */
                const index = usuarioEistente.findIndex((el) => el.email === email2Input.value)
                if (index !== -1) {
                    /* Comprueba que los valores ingresados coincidan con los que ya estan cargados en el localStorage */
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
                    }
                }else { /* Si la contraseña o el email esta mal avisa al usuario q verifique */
                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'El usuario o la contraseña no son correctos!',
                    })
                }
            }
        }
    });
});

// Esperamos a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Obtenemos el formulario y los campos de entrada
    const loginForm = document.getElementById('form__sesion');
    const nameInput = document.getElementById('nombreYApellidoUnete');
    const emailInput = document.getElementById('recuadroUnete__email');
    const telefonoInput = document.getElementById('recuadroUnete__Tel');
    const passwordInput = document.getElementById('recuadroUnete__pass');
    const passwordConfirmInput = document.getElementById('recuadroUnete__confirmPass');

    // Evento de envío del formulario
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que se envíe el formulario

        // Obtenemos los valores de los campos de entrada
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim().toLowerCase();
        const telValue = telefonoInput.value.trim();
        const passwordValue = passwordInput.value.trim();
        const passwordConfirmValue = passwordConfirmInput.value.trim();

        // Comprobar si los campos están vacíos
        if (nameValue === '' || emailValue === '' || passwordValue === '' || passwordConfirmValue === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Debes llenar todos los campos!',
            })
        }
        if(nameValue !== '' && emailValue !== '' && passwordValue !== '' && passwordConfirmValue !== '' && passwordValue === passwordConfirmValue ) {
            let timerInterval
                Swal.fire({
                icon:'success',
                title: 'Creando usuario, porfavor aguarde...',
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
                // Obtener el array de usuarios del localStorage (si existe)
                let users = JSON.parse(localStorage.getItem('users')) || [];

                // Agregar el nuevo usuario al array
                users.push({nombre: nameValue, email: emailValue, telefono: telValue, password: passwordValue});
                // Almacenar el array actualizado en el localStorage
                localStorage.setItem('users', JSON.stringify(users));

                // Redirigir al usuario a otra página después del inicio de sesión exitoso
                window.location.href = '../index.html';
            }, 3000);
            
        }else {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Las contraseñas deben coincidir!',
            })
        }
        return;
    });
});

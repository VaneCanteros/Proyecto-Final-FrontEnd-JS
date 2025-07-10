// Espera a que el DOM esté completamente cargado antes de ejecutar 
document.addEventListener("DOMContentLoaded", () => {
    // Obtiene el botón de envío del formulario por su ID.
    let btn = document.getElementById("enviar");

    // Asigna una función al evento 'click' del botón.
    btn.addEventListener("click", manejarEnvio);
});

// Función que se ejecuta cuando se hace clic en el botón de enviar.
function manejarEnvio(event) {
    limpiarErrores(); // Limpia cualquier mensaje de error previo.

    // Obtiene los valores ingresados por el usuario en los campos del formulario.
    let nombre = obtenerValor("nombre");
    let email = obtenerValor("email");
    let mensaje = obtenerValor("mensaje");

    let hayErrores = false; // Flag para verificar si hubo errores de validación.

    // Valida el campo nombre.
    if (!esNombreValido(nombre)) {
        mostrarError("error-nombre", "El nombre debe tener al menos 3 caracteres.");
        hayErrores = true;
    }

    // Valida el campo email.
    if (!esEmailValido(email)) {
        mostrarError("error-email", "El correo electrónico no es válido.");
        hayErrores = true;
    }

    // Valida el campo mensaje.
    if (!esMensajeValido(mensaje)) {
        mostrarError("error-mensaje", "El mensaje debe tener al menos 10 caracteres.");
        hayErrores = true;
    }

    // Si hay errores, se previene el envío del formulario.
    if (hayErrores) {
        event.preventDefault();
    }
}

// Función que obtiene y limpia el valor de un campo de entrada.
function obtenerValor(idCampo) {
    return document.getElementById(idCampo).value.trim();
}

// Verifica si el nombre ingresado tiene al menos 3 caracteres.
function esNombreValido(nombre) {
    return nombre.length >= 3;
}

// Verifica que el correo electrónico tenga un formato válido usando una expresión regular básica.
function esEmailValido(email) {
    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return regex.test(email);
}

// Verifica si el mensaje tiene al menos 10 caracteres.
function esMensajeValido(mensaje) {
    return mensaje.length >= 10;
}

// Muestra un mensaje de error en el span correspondiente.
function mostrarError(idSpan, mensaje) {
    const span = document.getElementById(idSpan);
    span.textContent = mensaje;
}

// Limpia todos los mensajes de error antes de una nueva validación.
function limpiarErrores() {
    ["error-nombre", "error-email", "error-mensaje"].forEach(id => {
        document.getElementById(id).textContent = "";
    });
}

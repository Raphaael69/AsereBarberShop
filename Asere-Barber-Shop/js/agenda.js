// ========== LOGIN (index) ==========
document.addEventListener("DOMContentLoaded", function () {

    // Mostrar / ocultar login
    const btnLogin = document.getElementById("btn-mostrar-login");
    if (btnLogin) {
        btnLogin.addEventListener("click", function (e) {
            e.preventDefault();
            const loginBox = document.getElementById("login-box");
            if (loginBox.style.display === "block") {
                loginBox.style.display = "none";
            } else {
                loginBox.style.display = "block";
            }
        });
    }

    // Evitar que el formulario de login recargue la página
    const formLogin = document.getElementById("form-login");
    if (formLogin) {
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Función de iniciar sesión todavía no está activa");
        });
    }

    // ========== AGENDA (sucursal) ==========
    const formReserva = document.getElementById("form-reserva");
    if (formReserva) {
        formReserva.addEventListener("submit", function (e) {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value;
            const telefono = document.getElementById("telefono").value;
            const correo = document.getElementById("correo").value;
            const barbero = document.querySelector('input[name="barbero"]:checked').value;
            const fecha = document.getElementById("fecha").value;
            const hora = document.getElementById("hora").value;
            const agregaCejas = document.getElementById("agregar-cejas") ? document.getElementById("agregar-cejas").checked : false;

            let extra = "";
            if (agregaCejas) {
                extra = "\n+ Perfilado de Cejas (+$5.000)";
            }

            alert(
                "✅ Reserva confirmada\n\n" +
                "Servicio: " + servicioSeleccionado + extra + "\n" +
                "Barbero: " + barbero + "\n" +
                "Fecha: " + fecha + "\n" +
                "Hora: " + hora + "\n" +
                "Cliente: " + nombre
            );
        });
    }
});

// Variables y funciones de la agenda (sucursal)
let servicioSeleccionado = "";

function abrirAgenda(nombre) {
    servicioSeleccionado = nombre;

    document.getElementById("agenda").style.display = "block";
    document.getElementById("paso-calendario").style.display = "block";
    document.getElementById("paso-barberos").style.display = "none";
    document.getElementById("paso-formulario").style.display = "none";

    document.getElementById("agenda").scrollIntoView({ behavior: "smooth" });
}

function irABarberos() {
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;

    if (!fecha || !hora) {
        alert("Por favor selecciona fecha y hora");
        return;
    }

    document.getElementById("paso-calendario").style.display = "none";
    document.getElementById("paso-barberos").style.display = "block";
}

function irAFormulario() {
    const barbero = document.querySelector('input[name="barbero"]:checked');

    if (!barbero) {
        alert("Por favor elige un barbero");
        return;
    }

    document.getElementById("paso-barberos").style.display = "none";
    document.getElementById("paso-formulario").style.display = "block";
}
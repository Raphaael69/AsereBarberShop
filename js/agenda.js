let servicioSeleccionado = "";

function abrirAgenda(nombre) {
    servicioSeleccionado = nombre;

    // Mostrar la caja de agenda
    document.getElementById("agenda").style.display = "block";

    // Mostrar solo el paso del calendario
    document.getElementById("paso-calendario").style.display = "block";
    document.getElementById("paso-barberos").style.display = "none";
    document.getElementById("paso-formulario").style.display = "none";

    // Bajar hasta la agenda
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

// Cuando se envía el formulario
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-reserva");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value;
            const telefono = document.getElementById("telefono").value;
            const correo = document.getElementById("correo").value;
            const barbero = document.querySelector('input[name="barbero"]:checked').value;
            const fecha = document.getElementById("fecha").value;
            const hora = document.getElementById("hora").value;

            alert(
                "✅ Reserva confirmada\n\n" +
                "Servicio: " + servicioSeleccionado + "\n" +
                "Barbero: " + barbero + "\n" +
                "Fecha: " + fecha + "\n" +
                "Hora: " + hora + "\n" +
                "Cliente: " + nombre
            );
        });
    }
});
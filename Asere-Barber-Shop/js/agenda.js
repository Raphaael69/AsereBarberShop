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

    // Mantener la sesión iniciada al recargar o volver a la página, y opción de cerrar sesión
    const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
    const usuarioGuardado = localStorage.getItem("asereUsuario");

    if (usuarioGuardado && btnLogin) {
        btnLogin.textContent = usuarioGuardado;
        if (btnCerrarSesion) {
            btnCerrarSesion.style.display = "inline-block";
        }
    }

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.removeItem("asereUsuario");
            location.reload();
        });
    }

    // Evitar que el formulario de login recargue la página
    const formLogin = document.getElementById("form-login");
    if (formLogin) {
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();

            const usuario = document.getElementById("usuario").value;

            // Guardamos que la persona ya inició sesión (para reconocerlo en otras páginas, como sucursal.html)
            localStorage.setItem("asereUsuario", usuario);

            // Ocultar el formulario de login
            document.getElementById("login-box").style.display = "none";

            // Reemplazar "Iniciar sesión" por el nombre de quien inició sesión
            const btnLogin = document.getElementById("btn-mostrar-login");
            if (btnLogin) {
                btnLogin.textContent = usuario;
            }

            // Mostrar la opción de cerrar sesión
            const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
            if (btnCerrarSesion) {
                btnCerrarSesion.style.display = "inline-block";
            }

            // Volver al inicio de la página
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    const linkCrearCuenta = document.querySelector("#login-box .texto-crear a");
    if (linkCrearCuenta) {
        linkCrearCuenta.addEventListener("click", function (e) {
            e.preventDefault();
            document.getElementById("login-box").style.display = "none";
            document.getElementById("registro-box").style.display = "block";
        });
    }

    const formRegistroIndex = document.getElementById("form-registro-index");
    if (formRegistroIndex) {
        formRegistroIndex.addEventListener("submit", function (e) {
            e.preventDefault();

            const nombre = document.getElementById("registro-nombre").value;
            const apellido = document.getElementById("registro-apellido").value;
            const rut = document.getElementById("registro-rut").value;
            alert("¡Cuenta creada exitosamente, " + nombre + " " + apellido + " ! Ahora puedes iniciar sesión.");

            formRegistroIndex.reset();
            document.getElementById("registro-box").style.display = "none";
            document.getElementById("login-box").style.display = "block";
        });
    }

    // login dentro de la reserva (sucursal) 
    const formLoginReserva = document.getElementById("form-login-reserva");
        if (formLoginReserva) {
            formLoginReserva.addEventListener("submit", function (e) {
                e.preventDefault();

                const usuario = document.getElementById("usuario-reserva").value;
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
                "Cliente: " + usuario
                );
            });
        }

    const btnCrearCuenta = document.getElementById("btn-crear-cuenta");
    if (btnCrearCuenta) {
        btnCrearCuenta.addEventListener("click", function (e) {
            e.preventDefault();
            document.getElementById("paso-login").style.display = "none";
            document.getElementById("paso-formulario").style.display = "block";
        });
    }
// ====================================================================

    // ========== AGENDA (sucursal) ==========
    const formReserva = document.getElementById("form-reserva");
    if (formReserva) {
        formReserva.addEventListener("submit", function (e) {
            e.preventDefault();

                const rut = document.getElementById("rut").value.trim();

                 if (!validarRut(rut)) {
                    alert("El RUT ingresado no es válido.");
                    return;
                }

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

// Validación de RUT (dígito verificador)
function calcularDigitoVerificador(cuerpoRut) {
    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpoRut.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpoRut.charAt(i)) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const resto = suma % 11;
    const resultado = 11 - resto;

    if (resultado === 11) return "0";
    if (resultado === 10) return "K";
    return resultado.toString();
}

function validarRut(rutCompleto) {
    const rutLimpio = rutCompleto.replace(/\./g, "").replace(/-/g, "").toUpperCase();

    if (rutLimpio.length < 2) return false;

    const cuerpo = rutLimpio.slice(0, -1);
    const dvIngresado = rutLimpio.slice(-1);

    if (!/^\d+$/.test(cuerpo)) return false;

    const dvCalculado = calcularDigitoVerificador(cuerpo);

    return dvIngresado === dvCalculado;
}

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

    // Si la persona ya inició sesión (arriba a la derecha en index.html), confirmamos directo la reserva
    const usuarioLogueado = localStorage.getItem("asereUsuario");
    if (usuarioLogueado) {
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
            "Barbero: " + barbero.value + "\n" +
            "Fecha: " + fecha + "\n" +
            "Hora: " + hora + "\n" +
            "Cliente: " + usuarioLogueado
        );
    } else {
        document.getElementById("paso-login").style.display = "block";
    }
}

// Puntos y guion automático del RUT mientras se escribe 
function formatearRut(valor) {
    
    let limpio = valor.replace(/[^0-9kK]/g, "").toUpperCase();

    // Máximo 9 caracteres 
    limpio = limpio.slice(0, 9);

    if (limpio.length <= 1) {
        return limpio; 
    }

    // Separa el cuerpo del dígito verificador 
    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1);

    // Le agrega los puntos al cuerpo de derecha a izquierda cada 3 dígitos
    let cuerpoConPuntos = "";
    let contador = 0;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        cuerpoConPuntos = cuerpo.charAt(i) + cuerpoConPuntos;
        contador++;
        if (contador % 3 === 0 && i !== 0) {
            cuerpoConPuntos = "." + cuerpoConPuntos;
        }
    }

    // Arma el RUT final con el guion
    return cuerpoConPuntos + "-" + dv;
}

document.addEventListener("DOMContentLoaded", function () {
    const inputRut = document.getElementById("rut");

    if (inputRut) {
        inputRut.addEventListener("input", function () {
            inputRut.value = formatearRut(inputRut.value);
        });
    }
});
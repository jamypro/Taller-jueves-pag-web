document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById('formularioContacto');
  if (!formulario) return;
  const inputNombre = document.getElementById('nombre');
  const inputEmail = document.getElementById('email');
  const inputAsunto = document.getElementById('asunto');
  const inputMensaje = document.getElementById('mensaje');
  const btnEnviar = document.getElementById('btnEnviar');
  const alertaExito = document.getElementById('alertaExito');
  const estadoValidacion = {
    nombre: false,
    email: false,
    asunto: false,
    mensaje: false
  };

  function validarNombre() {
    const valor = inputNombre.value.trim();
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;

    if (regexNombre.test(valor)) {
      marcarValido(inputNombre, 'error-nombre');
      estadoValidacion.nombre = true;
    } else {
      marcarInvalido(inputNombre, 'error-nombre');
      estadoValidacion.nombre = false;
    }
    comprobarFormularioGeneral();
  }

  function validarEmail() {
    const valor = inputEmail.value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regexEmail.test(valor)) {
      marcarValido(inputEmail, 'error-email');
      estadoValidacion.email = true;
    } else {
      marcarInvalido(inputEmail, 'error-email');
      estadoValidacion.email = false;
    }
    comprobarFormularioGeneral();
  }

  function validarAsunto() {
    if (inputAsunto.value !== "") {
      marcarValido(inputAsunto, 'error-asunto');
      estadoValidacion.asunto = true;
    } else {
      marcarInvalido(inputAsunto, 'error-asunto');
      estadoValidacion.asunto = false;
    }
    comprobarFormularioGeneral();
  }

  function validarMensaje() {
    const valor = inputMensaje.value.trim();

    if (valor.length >= 20) {
      marcarValido(inputMensaje, 'error-mensaje');
      estadoValidacion.mensaje = true;
    } else {
      marcarInvalido(inputMensaje, 'error-mensaje');
      estadoValidacion.mensaje = false;
    }
    comprobarFormularioGeneral();
  }
  
  /**
   * marcarValido() — Aplica clases CSS visuales de "éxito" (verde)
   * @param {HTMLElement} input 
   * @param {string} idError 
   */
  function marcarValido(input, idError) {
    input.classList.remove('invalido');
    input.classList.add('valido');
    document.getElementById(idError).classList.remove('visible');
  }

  function marcarInvalido(input, idError) {
    input.classList.remove('valido');
    input.classList.add('invalido');
    document.getElementById(idError).classList.add('visible');
  }

  function comprobarFormularioGeneral() {
    if (estadoValidacion.nombre && estadoValidacion.email && estadoValidacion.asunto && estadoValidacion.mensaje) {
      btnEnviar.disabled = false;
    } else {
      btnEnviar.disabled = true;
    }
  }

  inputNombre.addEventListener('blur', validarNombre);
  inputEmail.addEventListener('blur', validarEmail);
  inputAsunto.addEventListener('blur', validarAsunto);
  inputMensaje.addEventListener('blur', validarMensaje);

  inputNombre.addEventListener('input', function() {
    if (this.classList.contains('invalido')) validarNombre();
  });
  inputEmail.addEventListener('input', function() {
    if (this.classList.contains('invalido')) validarEmail();
  });
  inputAsunto.addEventListener('change', validarAsunto);
  inputMensaje.addEventListener('input', function() {
    if (this.classList.contains('invalido')) validarMensaje();
  });

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    if (btnEnviar.disabled) return;

    // Cambiamos el estado del botón para indicar que está procesando
    const textoOriginal = btnEnviar.innerHTML;
    btnEnviar.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Enviando...';
    btnEnviar.disabled = true;

    setTimeout(() => {
      alertaExito.classList.remove('d-none');
      alertaExito.classList.add('fade-in');
      formulario.reset();
      [inputNombre, inputEmail, inputAsunto, inputMensaje].forEach(input => {
        input.classList.remove('valido');
      });
      estadoValidacion.nombre = false;
      estadoValidacion.email = false;
      estadoValidacion.asunto = false;
      estadoValidacion.mensaje = false;
      comprobarFormularioGeneral();

      btnEnviar.innerHTML = textoOriginal;

      setTimeout(() => {
        alertaExito.classList.add('d-none');
        alertaExito.classList.remove('fade-in');
      }, 5000);

    }, 1500);
  });
});
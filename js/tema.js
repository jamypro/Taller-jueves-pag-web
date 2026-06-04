const CLAVE_TEMA = 'tema-goretti';

const TEMA_OSCURO = 'oscuro';
const TEMA_CLARO  = 'claro';

const CLASE_OSCURO = 'modo-oscuro';

(function () {
  const temaGuardado = localStorage.getItem(CLAVE_TEMA);

  if (temaGuardado === TEMA_OSCURO) {
    document.body.classList.add(CLASE_OSCURO);
  }
})(); 

function inicializarTema() {

  const botonTema = document.getElementById('botonTema');

  if (!botonTema) return;

  actualizarIcono();

  botonTema.addEventListener('click', function () {
    alternarTema();
  });

  document.addEventListener('keydown', function (evento) {
    if (evento.altKey && evento.key === 't') {
      alternarTema();
    }
  });
}

function alternarTema() {

  const estaOscuro = document.body.classList.toggle(CLASE_OSCURO);

  if (estaOscuro) {
    localStorage.setItem(CLAVE_TEMA, TEMA_OSCURO);
  } else {
    localStorage.setItem(CLAVE_TEMA, TEMA_CLARO);
  }

  actualizarIcono();

  if (typeof window.ajustarOla === 'function') {
    window.ajustarOla();
  }

  const botonTema = document.getElementById('botonTema');
  if (botonTema) {
    botonTema.style.transform = 'rotate(360deg) scale(1.2)';

    setTimeout(function () {
      botonTema.style.transform = '';
    }, 300);
  }
}

function actualizarIcono() {
  const iconoTema = document.getElementById('iconoTema');

  if (!iconoTema) return;

  const esModoOscuro = document.body.classList.contains(CLASE_OSCURO);

  if (esModoOscuro) {
    iconoTema.className = 'bi bi-sun-fill';

    const botonTema = document.getElementById('botonTema');
    if (botonTema) {
      botonTema.setAttribute('title', 'Activar modo claro');
      botonTema.setAttribute('aria-label', 'Activar modo claro');
    }
  } else {
    iconoTema.className = 'bi bi-moon-stars-fill';

    const botonTema = document.getElementById('botonTema');
    if (botonTema) {
      botonTema.setAttribute('title', 'Activar modo oscuro');
      botonTema.setAttribute('aria-label', 'Activar modo oscuro');
    }
  }
}

window.obtenerTemaActual = function () {
  return document.body.classList.contains(CLASE_OSCURO) ? TEMA_OSCURO : TEMA_CLARO;
};

function respetarPreferenciaSistema() {
  const temaGuardado = localStorage.getItem(CLAVE_TEMA);

  if (temaGuardado !== null) return;

  const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (prefiereOscuro) {
    document.body.classList.add(CLASE_OSCURO);
    localStorage.setItem(CLAVE_TEMA, TEMA_OSCURO);
    actualizarIcono();
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (evento) {
    const preferenciActual = localStorage.getItem(CLAVE_TEMA);
    if (preferenciActual !== null) return; 

    if (evento.matches) {
      document.body.classList.add(CLASE_OSCURO);
    } else {
      document.body.classList.remove(CLASE_OSCURO);
    }
    actualizarIcono();
  });
}

document.addEventListener('DOMContentLoaded', function () {
  inicializarTema();

  respetarPreferenciaSistema();

  const temaActual = document.body.classList.contains(CLASE_OSCURO) ? '🌙 Oscuro' : '☀️ Claro';
  console.log(`🎨 tema.js cargado. Tema actual: ${temaActual}`);
  console.log('💾 Preferencia guardada en localStorage con la clave:', CLAVE_TEMA);
});

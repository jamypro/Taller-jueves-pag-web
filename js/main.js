function marcarNavbarActivo() {

  const paginaActual = window.location.pathname.split('/').pop() || 'index.html';

  const linksNavbar = document.querySelectorAll('.nav-link');

  linksNavbar.forEach((link) => {

    link.classList.remove('active');

    const hrefLink = link.getAttribute('href');
    if (!hrefLink) return; 

    const nombreArchivo = hrefLink.split('/').pop();

    if (nombreArchivo === paginaActual) {
      link.classList.add('active');

      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function inicializarBotonArriba() {

  const botonArriba = document.getElementById('botonArriba');

  if (!botonArriba) return;

  window.addEventListener('scroll', function () {

    if (window.scrollY > 300) {
      botonArriba.classList.add('visible');
    } else {
      botonArriba.classList.remove('visible');
    }

  });

  botonArriba.addEventListener('click', function () {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function inicializarNavbarScroll() {

  const navbar = document.getElementById('barraNavegacion');
  if (!navbar) return;

  let ultimoScroll = window.scrollY;

  window.addEventListener('scroll', function () {
    const scrollActual = window.scrollY;

    if (scrollActual <= 50) {
      navbar.classList.remove('navbar-oculto');
      navbar.classList.remove('navbar-scrolled');
    } 
    else {
      navbar.classList.add('navbar-scrolled');
      
      if (scrollActual > ultimoScroll) {
        navbar.classList.add('navbar-oculto');
      } else {
        navbar.classList.remove('navbar-oculto');
      }
    }

    ultimoScroll = scrollActual <= 0 ? 0 : scrollActual;
  });
}

function inicializarAnimaciones() {

  const configuracionObserver = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observadorAnimaciones = new IntersectionObserver(
    function (entradas, observador) {

      entradas.forEach(function (entrada) {

        if (entrada.isIntersecting) {

          const elemento = entrada.target; 

          const tipoAnimacion = elemento.dataset.animacion || 'fade-in';

          const numeroRetraso = elemento.dataset.retraso;

          elemento.classList.add(tipoAnimacion);

          if (numeroRetraso) {
            elemento.classList.add(`retraso-${numeroRetraso}`);
          }

          observador.unobserve(elemento);
        }

      }); 

    }, 
    configuracionObserver
  );

  const elementosAAnimar = document.querySelectorAll('.animacion-entrada');

  elementosAAnimar.forEach(function (elemento) {
    observadorAnimaciones.observe(elemento);
  });

  console.log(`👁️ IntersectionObserver: vigilando ${elementosAAnimar.length} elementos para animar.`);
}

function inicializarMenuMovil() {

  const menuNavegacion = document.getElementById('menuNavegacion');
  if (!menuNavegacion) return;

  const linksMenu = menuNavegacion.querySelectorAll('.nav-link');

  linksMenu.forEach(function (link) {
    link.addEventListener('click', function () {
      if (menuNavegacion.classList.contains('show')) {
        const instanciaColapso = bootstrap.Collapse.getInstance(menuNavegacion);
        if (instanciaColapso) {
          instanciaColapso.hide();
        }
      }

    });
  });
}

function inicializarTooltips() {
  const elementosTooltip = document.querySelectorAll('[data-bs-toggle="tooltip"]');

  elementosTooltip.forEach(function (elemento) {
    new bootstrap.Tooltip(elemento);
  });
}

function actualizarAnoFooter() {
  const elementoAno = document.getElementById('anoActual');

  if (elementoAno) {

    elementoAno.textContent = new Date().getFullYear();
  }
}

function inicializarScrollSuave() {

  const linksAncla = document.querySelectorAll('a[href^="#"]');

  linksAncla.forEach(function (link) {
    link.addEventListener('click', function (evento) {

      const destino = link.getAttribute('href');

      if (destino === '#') {
        evento.preventDefault(); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const elementoDestino = document.querySelector(destino);

      if (elementoDestino) {
        evento.preventDefault(); 

        const posicionElemento = elementoDestino.getBoundingClientRect().top + window.scrollY - 80;

        window.scrollTo({
          top: posicionElemento,
          behavior: 'smooth'
        });
      }

    });
  });
}

document.addEventListener('DOMContentLoaded', function () {

  marcarNavbarActivo();        
  inicializarBotonArriba();    
  inicializarNavbarScroll();   
  inicializarAnimaciones();    
  inicializarMenuMovil();      
  inicializarTooltips();       
  actualizarAnoFooter();       
  inicializarScrollSuave();    

  console.log('✅ main.js cargado correctamente.');
  console.log('📄 Página actual:', window.location.pathname.split('/').pop() || 'index.html');
});

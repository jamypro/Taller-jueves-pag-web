
document.addEventListener('DOMContentLoaded', function () {


  const itemsGaleria = document.querySelectorAll('.galeria-item');

  const botonesFiltro = document.querySelectorAll('.filtro-btn');

 
  let itemsVisibles = Array.from(itemsGaleria);

 
  let indiceActual = 0;

 
  const modalElemento = document.getElementById('modalGaleria');
  let modalInstancia = null;


  if (modalElemento) {
    modalInstancia = new bootstrap.Modal(modalElemento);
  } else {
   
    return;
  }

  
  const imagenModal = document.getElementById('imagenModal');
  const textoModal = document.getElementById('textoModal');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');



  botonesFiltro.forEach(boton => {
    boton.addEventListener('click', function () {

     
      botonesFiltro.forEach(b => b.classList.remove('activo'));

     
      this.classList.add('activo');

      
      const filtro = this.dataset.filtro;

      
      itemsVisibles = [];

     
      itemsGaleria.forEach(item => {

        
        const categoriaItem = item.dataset.categoria;

        
        if (filtro === 'todas' || filtro === categoriaItem) {
          
          item.classList.remove('oculto');
          
          itemsVisibles.push(item);

          
          item.style.animation = 'none';
          item.offsetHeight;
          item.style.animation = null;

        } else {
          // Si no coincide, la ocultamos
          item.classList.add('oculto');
        }
      });

    });
  });


  
  itemsGaleria.forEach(item => {
    item.addEventListener('click', function () {

    
      const img = this.querySelector('img');
      
      const texto = this.querySelector('.overlay-texto').textContent;

     
      indiceActual = itemsVisibles.indexOf(this);

      
      actualizarModal(img.src, texto);

      
      modalInstancia.show();

    });
  });

  
  function cargarImagenPorIndice(nuevoIndice) {
    
    if (nuevoIndice >= 0 && nuevoIndice < itemsVisibles.length) {
     
      indiceActual = nuevoIndice;

      
      const elemento = itemsVisibles[indiceActual];

      
      const imgSrc = elemento.querySelector('img').src;
      const texto = elemento.querySelector('.overlay-texto').textContent;

      
      imagenModal.classList.add('cargando');

      
      setTimeout(() => {
        actualizarModal(imgSrc, texto);
        imagenModal.classList.remove('cargando');
      }, 150);
    }
  }

  
  btnNext.addEventListener('click', function () {
    
    const proximoIndice = (indiceActual + 1) % itemsVisibles.length;
    cargarImagenPorIndice(proximoIndice);
  });

  
  btnPrev.addEventListener('click', function () {
    
    const anteriorIndice = (indiceActual - 1 + itemsVisibles.length) % itemsVisibles.length;
    cargarImagenPorIndice(anteriorIndice);
  });

  
  function actualizarModal(src, texto) {
    imagenModal.src = src;
    imagenModal.alt = texto;
    textoModal.textContent = texto;
  }

  document.addEventListener('keydown', function (evento) {

    
    const modalAbierto = modalElemento.classList.contains('show');

    
    if (!modalAbierto) return;

    
    switch (evento.key) {

      case 'ArrowRight': 
       
        btnNext.click();
        break;

      case 'ArrowLeft': 
        btnPrev.click();
        break;

      case 'Escape':     
       
        modalInstancia.hide();
        break;

    }
  });

});

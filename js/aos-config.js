// =====================================================
// AOS — Animaciones al hacer scroll
// Solo fade-up sutil, una sola vez por elemento. Se anima cada bloque o
// grilla entera (no cada tarjeta), así el movimiento de AOS no pisa el
// efecto hover de las tarjetas. Los selectores se editan acá y el HTML
// queda limpio.
// El hero y el contenido de arriba de cada página no se animan: tienen que
// verse apenas carga.
// =====================================================

var AOS_ELEMENTOS = [
  '.seccion-header',
  '.destacados__grid',
  '.categorias__grid',
  '.relacionados__grid',
  '.valores__grid',
  '.envios-nota',
  '.cta__box'
];

function aplicarAtributos() {
  for (var s = 0; s < AOS_ELEMENTOS.length; s++) {
    var elementos = document.querySelectorAll(AOS_ELEMENTOS[s]);
    for (var e = 0; e < elementos.length; e++) {
      if (!elementos[e].hasAttribute('data-aos')) {
        elementos[e].setAttribute('data-aos', 'fade-up');
      }
    }
  }
}

function configurarAOS() {
  if (typeof AOS === 'undefined') return;

  aplicarAtributos();

  if (window.__aosIniciado) {
    AOS.refreshHard();
  } else {
    window.__aosIniciado = true;
    AOS.init({
      duration: 600,
      offset: 40,
      easing: 'ease-out-cubic',
      once: true,
      // Con "reducir movimiento" no se anima nada
      disable: function() {
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      }
    });
  }
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() { configurarAOS(); });
} else {
  configurarAOS();
}

// Re-evaluar tras cargas dinámicas (productos relacionados se arman con JS)
window.addEventListener('load', function() {
  if (typeof AOS !== 'undefined') {
    configurarAOS();
  }
});

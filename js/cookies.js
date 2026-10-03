// =====================================================
// AVISO DE COOKIES
// El sitio no usa cookies de seguimiento: el aviso solo informa y guarda
// en localStorage que el visitante ya lo vio.
// El banner arranca con el atributo hidden, así no se ve, no deja sombra
// y no recibe el foco hasta que se muestra.
// =====================================================
document.addEventListener('DOMContentLoaded', function() {
  const CLAVE = 'sebtech_cookies_aceptadas';
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  // Si ya lo vio (con este aviso o con el anterior de aceptar/rechazar), no mostrar.
  // localStorage puede fallar en modo privado: en ese caso se muestra igual.
  var yaVisto = null;
  try { yaVisto = localStorage.getItem(CLAVE); } catch (e) {}
  if (yaVisto !== null) return;

  function ocultar() {
    banner.classList.remove('is-visible');
    setTimeout(function() {
      banner.hidden = true;
    }, 350);
  }

  // Mostrar el banner luego de un pequeño delay
  setTimeout(function() {
    banner.hidden = false;
    banner.getBoundingClientRect(); // fuerza el layout para que corra la transición
    banner.classList.add('is-visible');
  }, 800);

  var btnEntendido = banner.querySelector('[data-cookie="entendido"]');
  if (btnEntendido) {
    btnEntendido.addEventListener('click', function() {
      try { localStorage.setItem(CLAVE, 'true'); } catch (e) {}
      ocultar();
    });
  }
});

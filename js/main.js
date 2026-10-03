document.addEventListener('DOMContentLoaded', () => {
  const boton = document.querySelector('.header__toggle');
  const menu = document.querySelector('.header__nav');

  if (boton && menu) {
    // En celular el menú ocupa toda la pantalla: mientras está abierto la
    // página de atrás no scrollea ni recibe el foco del teclado (inert)
    const fondo = document.querySelectorAll('main, footer');

    const actualizar = (abierto) => {
      menu.classList.toggle('is-open', abierto);
      document.documentElement.classList.toggle('menu-abierto', abierto);
      fondo.forEach((el) => { el.inert = abierto; });
      boton.setAttribute('aria-expanded', abierto);
      boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    };

    boton.addEventListener('click', () => {
      actualizar(!menu.classList.contains('is-open'));
    });

    // Al tocar un link se cierra (importa para los anclas de la misma página)
    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) actualizar(false);
    });

    // Escape cierra el menú y devuelve el foco al botón
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        actualizar(false);
        boton.focus();
      }
    });

    // Si la ventana se agranda hasta mostrar el menú completo, se cierra el panel
    const anchoMenuCompleto = window.matchMedia('(min-width: 900px)');
    anchoMenuCompleto.addEventListener('change', (e) => {
      if (e.matches) actualizar(false);
    });
  }

  // Año del copyright siempre actualizado (el HTML trae uno por si no hay JavaScript)
  document.querySelectorAll('[data-anio-actual]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});

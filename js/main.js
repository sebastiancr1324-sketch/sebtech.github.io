document.addEventListener('DOMContentLoaded', () => {
  const boton = document.querySelector('.header__toggle');
  const menu = document.querySelector('.header__nav');

  if (boton && menu) {
    const actualizar = (abierto) => {
      menu.classList.toggle('is-open', abierto);
      boton.setAttribute('aria-expanded', abierto);
      boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    };

    boton.addEventListener('click', () => {
      actualizar(!menu.classList.contains('is-open'));
    });

    // Escape cierra el menú y devuelve el foco al botón
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        actualizar(false);
        boton.focus();
      }
    });
  }

  // Año del copyright siempre actualizado (el HTML trae uno por si no hay JavaScript)
  document.querySelectorAll('[data-anio-actual]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});

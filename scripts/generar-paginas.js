// =====================================================
// GENERAR PÁGINAS — se ejecuta con `npm run build`
//
// Inserta en cada página el header, el footer y el aviso de cookies a
// partir de partials/, para no tener que editar 11 copias a mano.
// En cada página, el contenido entre <!-- parte:x --> y <!-- /parte:x -->
// se reemplaza: los cambios se hacen en partials/x.html.
//
// Variables de las plantillas:
//   {{inicio}}    enlace a la portada
//   {{raiz}}      prefijo hasta la raíz del sitio (para img/, css/, js/)
//   {{paginas}}   prefijo hasta la carpeta pages/
//   {{actual:x}}  aria-current="page" si la página pertenece a la sección x
// =====================================================

const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const RUTA_SITIO = '/sebtech.github.io/';

const PARTES = ['header', 'footer', 'aviso-cookies'];

// Sección del menú a la que pertenece cada página
const SECCIONES = {
  'index.html': 'inicio',
  'pages/productos.html': 'productos',
  'pages/producto.html': 'productos',
  'pages/envios.html': 'envios',
  'pages/nosotros.html': 'nosotros',
  'pages/faq.html': 'faq'
};

function leer(rel) {
  return fs.readFileSync(path.join(RAIZ, rel), 'utf8');
}

function escribir(rel, contenido) {
  fs.writeFileSync(path.join(RAIZ, rel), contenido);
}

// Prefijos de rutas según dónde está la página
function contextoDe(rel) {
  if (rel === '404.html') {
    // GitHub Pages sirve 404.html en cualquier ruta: necesita rutas absolutas
    return { inicio: RUTA_SITIO, raiz: RUTA_SITIO, paginas: RUTA_SITIO + 'pages/' };
  }
  if (rel.startsWith('pages/')) {
    return { inicio: '../index.html', raiz: '../', paginas: '' };
  }
  return { inicio: 'index.html', raiz: '', paginas: 'pages/' };
}

function seccionDe(rel) {
  if (/^pages\/producto-[a-z0-9-]+\.html$/.test(rel)) return 'productos';
  return SECCIONES[rel] || null;
}

function renderizarParte(plantilla, rel) {
  const ctx = contextoDe(rel);
  const seccion = seccionDe(rel);
  return plantilla
    .replace(/\{\{actual:([a-z]+)\}\}/g, (m, s) => (s === seccion ? ' aria-current="page"' : ''))
    .replace(/\{\{(inicio|raiz|paginas)\}\}/g, (m, clave) => ctx[clave]);
}

function insertarPartes(rel) {
  let html = leer(rel);
  for (const parte of PARTES) {
    const plantilla = leer(`partials/${parte}.html`);
    const patron = new RegExp(`(<!-- parte:${parte}\\b[^>]*-->\\n)[\\s\\S]*?(\\s*<!-- /parte:${parte} -->)`);
    if (!patron.test(html)) {
      throw new Error(`${rel}: falta el marcador <!-- parte:${parte} -->`);
    }
    html = html.replace(patron, (m, abre, cierra) => abre + renderizarParte(plantilla, rel).replace(/\n$/, '') + cierra);
  }
  escribir(rel, html);
}

function paginasDelSitio() {
  const enPages = fs.readdirSync(path.join(RAIZ, 'pages'))
    .filter((f) => f.endsWith('.html'))
    .map((f) => 'pages/' + f);
  return ['index.html', '404.html', ...enPages];
}

const paginas = paginasDelSitio();
paginas.forEach(insertarPartes);
console.log(`Partes compartidas actualizadas en ${paginas.length} páginas.`);

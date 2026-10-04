// =====================================================
// GENERAR PÁGINAS — se ejecuta con `npm run build`
//
// Inserta en cada página el header, el footer y el aviso de cookies a
// partir de partials/, para no tener que editar 11 copias a mano.
// En cada página, el contenido entre <!-- parte:x --> y <!-- /parte:x -->
// se reemplaza: los cambios se hacen en partials/x.html.
//
// Además genera una página fija por producto (pages/producto-<id>.html),
// su imagen para compartir (img/og/<id>.jpg) y el sitemap.xml, a partir
// de js/products.js y de pages/producto.html como plantilla.
//
// Variables de las plantillas:
//   {{inicio}}    enlace a la portada
//   {{raiz}}      prefijo hasta la raíz del sitio (para img/, css/, js/)
//   {{paginas}}   prefijo hasta la carpeta pages/
//   {{actual:x}}  aria-current="page" si la página pertenece a la sección x
//
// También agrega al link de css/main.css una versión (?v=...) que cambia
// con cada cambio del CSS. Por eso `npm run build` compila el CSS primero.
// =====================================================

const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const RUTA_SITIO = '/sebtech.github.io/';
const URL_SITIO = 'https://sebbasv.github.io/sebtech.github.io/';

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
    // \r?\n: en Windows git puede bajar los archivos con saltos de línea CRLF
    const patron = new RegExp(`(<!-- parte:${parte}\\b[^>]*-->\\r?\\n)[\\s\\S]*?(\\s*<!-- /parte:${parte} -->)`);
    if (!patron.test(html)) {
      throw new Error(`${rel}: falta el marcador <!-- parte:${parte} -->`);
    }
    html = html.replace(patron, (m, abre, cierra) => abre + renderizarParte(plantilla, rel).replace(/\r?\n$/, '') + cierra);
  }
  // main.css?v=<huella>: cuando el CSS cambia, cambia el link y el navegador
  // baja el archivo nuevo en lugar de usar el que tenía guardado
  html = html.replace(/(css\/main\.css)(\?v=[0-9a-f]+)?"/g, (m, css) => `${css}?v=${versionCss()}"`);
  escribir(rel, html);
}

let huellaCss;
function versionCss() {
  if (!huellaCss) {
    huellaCss = require('crypto').createHash('sha1').update(leer('css/main.css')).digest('hex').slice(0, 8);
  }
  return huellaCss;
}

function paginasDelSitio() {
  const enPages = fs.readdirSync(path.join(RAIZ, 'pages'))
    .filter((f) => f.endsWith('.html'))
    .map((f) => 'pages/' + f);
  return ['index.html', '404.html', ...enPages];
}

// ---------- Productos ----------

// js/products.js es un script de navegador: se evalúa para leer el array
function cargarProductos() {
  const codigo = leer('js/products.js').replace(/^"use strict";/, '');
  return new Function(`${codigo}; return { productos, formatearPrecio, estaSinStock };`)();
}

function escaparHtml(texto) {
  return String(texto).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function resumir(texto, max = 155) {
  return texto.length > max ? texto.slice(0, max - 3).replace(/\s+\S*$/, '') + '...' : texto;
}

// "../img/X.webp" -> "img/X.webp"
function rutaDesdeRaiz(img) {
  return img.replace(/^(\.\.\/)+/, '');
}

function reemplazarUno(html, patron, valor, rel) {
  if (!patron.test(html)) throw new Error(`plantilla producto.html: no se encontró ${patron} (${rel})`);
  return html.replace(patron, valor);
}

function paginaDeProducto(plantilla, producto, datos) {
  const rel = `pages/producto-${producto.id}.html`;
  const url = URL_SITIO + rel;
  const titulo = `${producto.nombre} | SebTech`;
  const descripcion = resumir(producto.descripcion);
  const descripcionOg = resumir(`${datos.formatearPrecio(producto.precio)} · ${producto.descripcion}`);
  const imagenes = (producto.imagenes || [producto.imagen]).filter(Boolean).map((img) => URL_SITIO + rutaDesdeRaiz(img));
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: producto.nombre,
    description: producto.descripcion,
    image: imagenes,
    category: producto.categoria,
    url
  };
  if (producto.precio !== null) {
    ld.offers = {
      '@type': 'Offer',
      price: producto.precio,
      priceCurrency: 'ARS',
      availability: datos.estaSinStock(producto) ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      url
    };
  }

  // Cada reemplazo usa una función: así un "$" en el texto (por ejemplo un
  // precio como $760.000) no se interpreta como referencia a un grupo.
  let html = plantilla;
  const r = (patron, reemplazo) => { html = reemplazarUno(html, patron, reemplazo, rel); };
  const atributo = (inicio, valor) => r(new RegExp(`(${inicio})[^"]*`), (m, previo) => previo + valor);
  r(/<title>[^<]*<\/title>/, () => `<!-- Página generada por scripts/generar-paginas.js a partir de producto.html: no editar a mano -->\n  <title>${escaparHtml(titulo)}</title>`);
  atributo('<meta name="description" content="', escaparHtml(descripcion));
  atributo('<meta property="og:title" content="', escaparHtml(titulo));
  atributo('<meta property="og:description" content="', escaparHtml(descripcionOg));
  atributo('<meta property="og:url" content="', url);
  atributo('<meta property="og:image" content="', `${URL_SITIO}img/og/${producto.id}.jpg`);
  atributo('<meta property="og:image:alt" content="', escaparHtml(producto.nombre + ' en SebTech'));
  atributo('<link rel="canonical" href="', url);
  r(/<\/head>/, () => `  <script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>\n</head>`);
  r(/<div class="producto-detail" id="producto-contenido">/, () => `<div class="producto-detail" id="producto-contenido" data-producto-id="${producto.id}">`);
  return { rel, html };
}

// Imagen para compartir: la de la marca (img/og-sebtech.jpg) con la foto
// del producto en el recuadro blanco donde va el logo.
async function imagenParaCompartir(producto, destino) {
  const sharp = require('sharp');
  const RECUADRO = { x: 88, y: 125, lado: 380, radio: 28, margen: 30 };
  const foto = rutaDesdeRaiz((producto.imagenes || [producto.imagen])[0]);
  const espacio = RECUADRO.lado - RECUADRO.margen * 2;
  const { data, info } = await sharp(path.join(RAIZ, foto))
    .resize(espacio, espacio, { fit: 'inside' })
    .toBuffer({ resolveWithObject: true });
  const fondoBlanco = Buffer.from(
    `<svg width="${RECUADRO.lado}" height="${RECUADRO.lado}"><rect width="100%" height="100%" rx="${RECUADRO.radio}" fill="#ffffff"/></svg>`
  );
  await sharp(path.join(RAIZ, 'img/og-sebtech.jpg'))
    .composite([
      { input: fondoBlanco, left: RECUADRO.x, top: RECUADRO.y },
      {
        input: data,
        left: RECUADRO.x + Math.round((RECUADRO.lado - info.width) / 2),
        top: RECUADRO.y + Math.round((RECUADRO.lado - info.height) / 2)
      }
    ])
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(path.join(RAIZ, destino));
}

// Borra páginas e imágenes de productos que ya no están en products.js
function borrarSobrantes(carpeta, patron, vigentes) {
  for (const f of fs.readdirSync(path.join(RAIZ, carpeta))) {
    const rel = `${carpeta}/${f}`;
    if (patron.test(f) && !vigentes.includes(rel)) {
      fs.unlinkSync(path.join(RAIZ, rel));
      console.log(`Borrado ${rel} (el producto ya no existe)`);
    }
  }
}

function sitemap(productos) {
  const urls = [
    ['', '1.0'],
    ['pages/productos.html', '0.9'],
    ...productos.map((p) => [`pages/producto-${p.id}.html`, '0.8']),
    ['pages/nosotros.html', '0.7'],
    ['pages/envios.html', '0.7'],
    ['pages/faq.html', '0.6'],
    ['pages/privacy.html', '0.3'],
    ['pages/terms.html', '0.3'],
    ['pages/cookies.html', '0.3']
  ];
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map(([u, prioridad]) => `  <url>\n    <loc>${URL_SITIO}${u}</loc>\n    <priority>${prioridad}</priority>\n  </url>\n`).join('') +
    '</urlset>\n';
}

async function main() {
  // 1. Partes compartidas en las páginas hechas a mano
  const paginas = paginasDelSitio().filter((rel) => !/^pages\/producto-/.test(rel));
  paginas.forEach(insertarPartes);
  console.log(`Partes compartidas actualizadas en ${paginas.length} páginas.`);

  // 2. Una página fija y una imagen para compartir por producto
  const datos = cargarProductos();
  const plantilla = leer('pages/producto.html');
  fs.mkdirSync(path.join(RAIZ, 'img/og'), { recursive: true });
  const paginasProducto = [];
  const imagenesProducto = [];
  for (const producto of datos.productos) {
    const { rel, html } = paginaDeProducto(plantilla, producto, datos);
    escribir(rel, html);
    paginasProducto.push(rel);
    const og = `img/og/${producto.id}.jpg`;
    await imagenParaCompartir(producto, og);
    imagenesProducto.push(og);
  }
  borrarSobrantes('pages', /^producto-[a-z0-9-]+\.html$/, paginasProducto);
  borrarSobrantes('img/og', /\.jpg$/, imagenesProducto);
  console.log(`Páginas de producto generadas: ${paginasProducto.length}.`);

  // 3. Sitemap
  escribir('sitemap.xml', sitemap(datos.productos));
  console.log('sitemap.xml actualizado.');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

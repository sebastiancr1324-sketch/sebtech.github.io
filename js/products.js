"use strict";

const productos = [
  {
    id: "galaxy-tab-s10-fe",
    nombre: "Samsung Galaxy Tab S10 FE+",
    categoria: "tablets",
    precio: 1300000,
    stock: 5,
    descripcion: "Tablet Samsung de 13,1 pulgadas con 128GB de almacenamiento y 8GB de RAM. Pensada para estudio, productividad y entretenimiento: pantalla grande y nítida de 2560x1600, procesador Exynos 1580, batería de 10.090 mAh con carga rápida de 45W y cuatro parlantes con sonido AKG Dolby Atmos. Incluye S Pen para tomar notas y dibujar, y conectividad WiFi con opción de doble SIM.",
    imagenes: [
      "../img/GalaxyTabS10FE1.webp",
      "../img/GalaxyTabS10FE2.webp",
      "../img/GalaxyTabS10FE3.webp",
      "../img/GalaxyTabS10FE4.webp",
      "../img/GalaxyTabS10FE5.webp"
    ],
    especificaciones: [
      "Pantalla de 13,1 pulgadas (2560x1600)",
      "128GB de almacenamiento (expandible con microSD)",
      "8GB de RAM",
      "Procesador Exynos 1580",
      "Batería de 10.090 mAh con carga 45W",
      "Cámara principal 13MP + ultra gran angular 12MP",
      "S Pen incluido",
      "4 parlantes con sonido AKG y Dolby Atmos",
      "WiFi + doble SIM"
    ]
  },
  {
    id: "xiaomi-pad-7",
    nombre: "Xiaomi Pad 7",
    categoria: "tablets",
    precio: 760000,
    stock: 8,
    descripcion: "Tablet Xiaomi de 11,2 pulgadas en color negro (TechnoBox) con 8GB de RAM y 128GB de almacenamiento. Su pantalla 3.2K con tasa de refresco de 144Hz es ideal para ver series, leer y jugar con fluidez. Procesador Snapdragon 7+ Gen 3, batería de 8.850 mAh con carga rápida 45W, parlantes cuádruples con Dolby Atmos y sistema HyperOS. Compatible con lápiz y teclado.",
    imagenes: [
      "../img/Pad7Xiaomi1.webp",
      "../img/Pad7Xiaomi2.webp",
      "../img/Pad7Xiaomi3.webp"
    ],
    especificaciones: [
      "Pantalla de 11,2 pulgadas 3.2K a 144Hz",
      "8GB de RAM",
      "128GB de almacenamiento",
      "Procesador Snapdragon 7+ Gen 3",
      "Batería de 8.850 mAh con carga 45W",
      "Cámara principal 13MP y frontal 8MP",
      "4 parlantes con Dolby Atmos",
      "Sistema HyperOS",
      "Color negro (TechnoBox)"
    ]
  },
  {
    id: "apple-airtag-x4",
    nombre: "Kit Apple AirTag x4",
    categoria: "accesorios",
    precio: 199000,
    stock: 4,
    descripcion: "Pack de 4 localizadores AirTag de Apple de 1ª generación, en color blanco. Encontrá llaves, mochila o valija usando la app Buscar en tu iPhone. Con chip U1 de banda ultrancha y Bluetooth, localización precisa, batería CR2032 reemplazable con duración de hasta un año y resistencia al agua y al polvo IP67.",
    imagenes: [
      "../img/Airtag4u1.webp",
      "../img/Airtag4u2.webp",
      "../img/Airtag4u3.webp",
      "../img/Airtag4u4.webp"
    ],
    especificaciones: [
      "Conjunto de 4 unidades",
      "Chip U1 de banda ultrancha + Bluetooth",
      "Localización precisa con iPhone (11 y posteriores)",
      "Batería CR2032 reemplazable (hasta 1 año)",
      "Resistencia al agua y polvo IP67",
      "Funciona con la app Buscar",
      "Color blanco"
    ]
  },
  {
    id: "lenovo-idea-tab",
    nombre: "Lenovo Idea Tab 5G",
    categoria: "tablets",
    precio: 890000,
    stock: 3,
    descripcion: "Tablet Lenovo de 11 pulgadas con conectividad 5G LTE, 128GB de almacenamiento y 8GB de RAM, en color gris oscuro. Incluye lápiz y teclado para trabajar y estudiar donde sea: escritura a mano, dibujo y tipeo cómodo, con buena autonomía para usarla durante todo el día.",
    imagenes: [
      "../img/LenovoTabIdea1.webp",
      "../img/LenovoTabIdea2.webp",
      "../img/LenovoTabIdea3.webp",
      "../img/LenovoTabIdea4.webp"
    ],
    especificaciones: [
      "Pantalla de 11 pulgadas",
      "Conectividad 5G LTE",
      "128GB de almacenamiento",
      "8GB de RAM",
      "Lápiz táctil incluido",
      "Teclado QWERTY incluido",
      "Color gris oscuro"
    ]
  },
  {
    id: "motorola-edge-50",
    nombre: "Motorola Edge 50",
    categoria: "celulares",
    precio: 750000,
    stock: 10,
    descripcion: "Smartphone Motorola de gama alta con pantalla Edge pOLED de 6,7 pulgadas a 120Hz, 512GB de almacenamiento, 12GB de RAM y dual SIM, en color verde. Procesador Snapdragon 7 Gen 3, batería de 5.000 mAh con carga turbo 68W, cámara triple de 50MP con estabilización óptica, ultra gran angular y telefoto, cámara frontal de 32MP y resistencia al agua IP68.",
    imagenes: [
      "../img/Edge50DualSim1.webp",
      "../img/Edge50DualSim2.webp",
      "../img/Edge50DualSim3.webp",
      "../img/Edge50DualSim4.webp",
      "../img/Edge50DualSim5.webp"
    ],
    especificaciones: [
      "Pantalla Edge pOLED de 6,7 pulgadas a 120Hz",
      "512GB de almacenamiento",
      "12GB de RAM",
      "Procesador Snapdragon 7 Gen 3",
      "Batería de 5.000 mAh con carga turbo 68W",
      "Cámara triple 50MP con OIS + ultrawide + telefoto",
      "Cámara frontal 32MP",
      "Resistencia al agua IP68",
      "Dual SIM",
      "Color verde"
    ]
  },
  {
    id: "apple-airtag-x1",
    nombre: "Apple AirTag x1",
    categoria: "accesorios",
    precio: 95000,
    stock: 1,
    descripcion: "Localizador AirTag de Apple de 1ª generación, de color blanco. Encontrá llaves, mochila o valija usando la app Buscar en tu iPhone. Con chip U1 de banda ultrancha y Bluetooth, batería CR2032 reemplazable con duración de hasta un año y resistencia al agua y al polvo IP67.",
    imagenes: [
      "../img/Airtag1u1.webp",
      "../img/Airtag1u2.webp",
      "../img/Airtag1u3.webp"
    ],
    especificaciones: [
      "Unidad individual",
      "Chip U1 de banda ultrancha + Bluetooth",
      "Localización precisa con iPhone (11 y posteriores)",
      "Batería CR2032 reemplazable (hasta 1 año)",
      "Resistencia al agua y polvo IP67",
      "Funciona con la app Buscar",
      "Color blanco"
    ]
  },
  {
    id: "galaxy-tab-a9",
    nombre: "Samsung Galaxy Tab A9",
    categoria: "tablets",
    precio: null,
    stock: 0,
    descripcion: "Tablet Samsung Galaxy Tab A9, ideal para estudio y entretenimiento. Pantalla grande y liviana, perfecta para ver contenido, navegar y estudiar.",
    imagenes: ["../img/GalaxyTabA9.webp"],
    especificaciones: ["Pantalla grande", "Liviana", "Ideal para estudio"]
  },
  {
    id: "lenovo-tab-m10",
    nombre: "Lenovo Tab M10",
    categoria: "tablets",
    precio: null,
    stock: 0,
    descripcion: "Tablet Lenovo Tab M10 con buena autonomía y rendimiento para uso diario o trabajo.",
    imagenes: ["../img/LenovoTabM10.webp"],
    especificaciones: ["Buena autonomía", "Rendimiento confiable", "Uso diario y trabajo"]
  }
];

function rutaImg(rel) {
  if (!rel) return "";
  if (/^(https?:|data:|blob:)/.test(rel)) return rel;
  var dirActual = location.pathname.slice(0, location.pathname.lastIndexOf("/") + 1);
  var partes = dirActual.split("/").filter(Boolean);
  if (partes.length && partes[partes.length - 1] === "pages") {
    partes.pop();
  }
  var raiz = partes.length ? "/" + partes.join("/") + "/" : "/";
  return raiz + rel.replace(/^\.\.\//g, "");
}

function obtenerImagenPrincipal(producto) {
  if (producto.imagenes && producto.imagenes.length > 0) {
    return rutaImg(producto.imagenes[0]);
  }
  if (producto.imagen) {
    return rutaImg(producto.imagen);
  }
  return "";
}

function obtenerProductoPorId(id) {
  return productos.find(function(p) { return p.id === id; });
}

function obtenerProductosPorCategoria(categoria) {
  return productos.filter(function(p) { return p.categoria === categoria; });
}

// Un producto está sin stock cuando su valor de stock es 0 (o no definido)
function estaSinStock(producto) {
  return (producto.stock === undefined || producto.stock === null || producto.stock === 0);
}

function formatearPrecio(precio) {
  if (precio === null) return "Consultar precio";
  return "$" + precio.toLocaleString("es-AR");
}

function escaparHtml(texto) {
  return String(texto).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Nombre de cada categoría: en plural para los filtros del catálogo y en
// singular para la línea chica de las tarjetas
var CATEGORIAS = {
  celulares: { plural: "Celulares", singular: "Celular" },
  tablets: { plural: "Tablets", singular: "Tablet" },
  auriculares: { plural: "Auriculares", singular: "Auriculares" },
  accesorios: { plural: "Accesorios", singular: "Accesorio" }
};

// Tarjeta de producto: la misma en la portada, el catálogo y los
// relacionados. "prefijo" es la ruta hasta la carpeta pages/
// ("pages/" desde la portada, "" desde las páginas que están en pages/).
function tarjetaProducto(producto, prefijo) {
  var sinStock = estaSinStock(producto);
  var etiqueta = sinStock ? "Próximamente" : producto.etiqueta;
  var categoria = CATEGORIAS[producto.categoria] ? CATEGORIAS[producto.categoria].singular : producto.categoria;
  return '<a href="' + (prefijo || "") + "producto-" + producto.id + '.html" class="card-producto' + (sinStock ? " card-producto--sin-stock" : "") + '">' +
    '<div class="card-producto__media">' +
      (etiqueta ? '<span class="card-producto__badge">' + escaparHtml(etiqueta) + "</span>" : "") +
      '<img src="' + obtenerImagenPrincipal(producto) + '" alt="" loading="lazy" decoding="async">' +
    "</div>" +
    '<div class="card-producto__body">' +
      '<p class="card-producto__categoria">' + escaparHtml(categoria) + "</p>" +
      '<h3 class="card-producto__title">' + escaparHtml(producto.nombre) + "</h3>" +
      '<div class="card-producto__footer">' +
        '<span class="card-producto__price">' + formatearPrecio(producto.precio) + "</span>" +
        '<span class="card-producto__flecha" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>' +
      "</div>" +
    "</div>" +
  "</a>";
}

/*
============================================
  PLANTILLA PARA AGREGAR UN PRODUCTO NUEVO
============================================

Copiá este bloque y pegalo DENTRO del array "productos" al final,
antes del corchete de cierre "]". Recordá agregar una coma ","
después del último producto que ya existe.

  {
    id: "nombre-en-minusculas-sin-espacios",
    nombre: "Modelo Limpio del Producto",
    categoria: "celulares",
    precio: null,
    stock: 0,
    descripcion: "Descripción completa del producto con sus características y especificaciones.",
    imagenes: ["../img/nombre-de-la-imagen1.webp", "../img/nombre-de-la-imagen2.webp"],
    especificaciones: ["Spec 1", "Spec 2", "Spec 3"]
  },

NOTAS:
- "id": identificador único, sin espacios, en minúsculas
- "nombre": nombre limpio y corto (los detalles y specs van en la descripción)
- "categoria": puede ser "celulares", "tablets", "auriculares" o "accesorios"
- "precio": número sin decimales (ej: 150000) o null para "Consultar"
- "stock": número de unidades disponibles. Si es 0 (o no se define),
           el producto pasa automáticamente a "Próximamente" (sin stock)
- "imagenes": array con las imágenes del producto. La primera (la que
              termina en "1") se usa para la card; el resto completa la
              galería de la página del producto. Conviene que tengan fondo
              transparente, como las que ya están.
- "especificaciones": lista de características destacadas
- "etiqueta" (opcional): texto corto que aparece arriba de la foto en la
              tarjeta, por ejemplo etiqueta: "Nuevo" o etiqueta: "Más vendido".
              Los productos sin stock muestran "Próximamente" solos.

ORDEN: los productos se muestran en el orden de este array. Los primeros
4 que tienen stock son los "Destacados" de la portada.

DESPUÉS DE AGREGAR, CAMBIAR O BORRAR UN PRODUCTO:
- Ejecutá `npm run build` en la carpeta del proyecto. Eso crea o actualiza
  la página del producto (pages/producto-<id>.html), su imagen para
  compartir en WhatsApp y redes (img/og/<id>.jpg) y el sitemap.xml.
- Si te olvidás, el producto igual se ve en el sitio (se abre la ficha
  dinámica), pero al compartir el link no aparece su foto.

============================================
*/

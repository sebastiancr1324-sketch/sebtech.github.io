# SebTech

Sitio de SebTech: celulares, tablets y accesorios con envíos a todo CABA.
Es un sitio estático publicado con GitHub Pages en
https://sebbasv.github.io/sebtech.github.io/

## Estructura

| Carpeta / archivo | Qué hay |
|---|---|
| `index.html`, `pages/` | Páginas del sitio |
| `pages/producto-<id>.html` | Una página por producto, **generada** (no editar a mano) |
| `partials/` | Header, footer y aviso de cookies compartidos por todas las páginas |
| `js/products.js` | Catálogo de productos (precios, stock, fotos, descripciones) |
| `scss/` | Estilos fuente; se compilan a `css/main.css` |
| `img/`, `img/og/` | Fotos en WebP e imágenes para compartir en redes |
| `fonts/`, `js/vendor/`, `css/vendor/` | Fuentes y AOS alojados en el sitio |
| `scripts/generar-paginas.js` | Genera partes compartidas, páginas de producto y sitemap |

## Cómo trabajar

Requiere Node.js. La primera vez:

```sh
npm install
```

Después de cualquier cambio en `scss/`, `partials/` o `js/products.js`:

```sh
npm run build
```

Eso compila el CSS, actualiza header/footer/aviso en todas las páginas,
regenera las páginas de producto con sus imágenes para compartir y el
`sitemap.xml`. Los archivos generados se suben al repositorio porque
GitHub Pages los publica tal cual.

- **Cambiar el header, el footer o el aviso de cookies:** editá el archivo
  en `partials/`, no las páginas.
- **Agregar o cambiar un producto:** seguí la plantilla al final de
  `js/products.js` y corré `npm run build`.

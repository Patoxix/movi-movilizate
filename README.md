# Movilízate · Muévete PUCP

Plataforma web del proyecto final de Información y Cultura Digital (1INT38, PUCP 2026-2).
Tema: activismo y ciudadanía en red. Caso: movilizaciones estudiantiles en la PUCP, 2026.

Sitio estático (HTML, CSS y JavaScript, sin herramientas de compilación). Las tipografías (Zilla Slab y Public Sans, licencia SIL OFL) están en `fonts/`. No usa cookies ni analítica.

## Estructura

- Páginas: `index.html` (portada), `que-paso.html`, `versiones.html`, `voces.html`, `muevete.html`, `manifiesto.html`, `glosario.html`, `proyecto.html`, `privacidad.html`. Los textos se editan directamente en cada archivo.
- `js/layout.js`: **aviso importante, menú de tres rayas y pie** (lista de páginas en `PAGINAS`).
- `data/config.js`: **enlace de la encuesta** (`encuestaUrl`). Mientras esté vacío, la página dice «Enlace próximamente».
- `data/linea-tiempo.js`: **la línea de tiempo.** Aquí se agregan o corrigen los hechos.
- `data/publicaciones.js`: **cuentas de Instagram y publicaciones** de Muévete PUCP (se copian a mano, con fecha y enlace).
- `data/chasqui.js` y `js/chasqui.js`: **Chasqui**, el robotsito del chat. Sus preguntas y respuestas se editan en `data/chasqui.js`.
- `img/logo-m.svg`: logo (una M). `css/style.css`: estilos; las tipografías se cambian arriba, en `--titulos` y `--texto`.
- `docs/pendientes.md`: lo que falta según la rúbrica.
- `docs/encuesta-propuesta.md`: preguntas y texto de consentimiento propuestos.

## Reglas del proyecto

- Cada hecho lleva su fuente. Si falta, se marca «por precisar».
- Se muestran las dos versiones (estudiantes y rectorado), cada una atribuida.
- No se suben nombres de estudiantes con procesos abiertos, consentimientos firmados, datos de contacto ni logotipos de la PUCP o de la Federación. El historial de un repositorio no se borra fácil.
- Los testimonios se publican solo con consentimiento informado.

## Publicar en GitHub Pages

Settings → Pages → Source: «Deploy from a branch», rama `main`, carpeta `/ (root)`.
La dirección será `https://patoxix.github.io/movi-movilizate/`.

## Ver el sitio en tu computadora

Desde la carpeta: `python3 -m http.server` y abre `http://localhost:8000`.

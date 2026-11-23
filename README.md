# Movilízate · Muévete PUCP

Plataforma web del proyecto final de Información y Cultura Digital (1INT38, PUCP 2026-2).
Tema: activismo y ciudadanía en red. Caso: movilizaciones estudiantiles en la PUCP, 2026.

Sitio estático (HTML, CSS y JavaScript, sin herramientas de compilación). Las tipografías (Archivo y Source Serif 4, licencia SIL OFL) están en `fonts/`. No usa cookies ni analítica.

## Estructura

- `index.html`: la página (textos de las secciones).
- `data/linea-tiempo.js`: **la línea de tiempo.** Aquí se agregan o corrigen los hechos.
- `css/style.css`: estilos. `js/app.js`: arma la línea de tiempo y el menú.
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

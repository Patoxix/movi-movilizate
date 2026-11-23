/*
  Cuentas y publicaciones de la sección «Muévete PUCP».

  Las publicaciones se copian a mano (texto o resumen, fecha y enlace a la original).
  No se incrusta Instagram porque sus scripts rastrean a quienes visitan la página.

  Para agregar una publicación, copia un bloque dentro de window.PUBLICACIONES:

    {
      cuenta: "fepuc",              // "fepuc" | "copess" | "pucp"
      fecha: "2026-11-20",          // año-mes-día
      texto: "Texto de la publicación, tal como aparece (o un resumen fiel).",
      url: "https://www.instagram.com/p/XXXXXXXX/",   // enlace a la publicación original
      nota: ""                      // opcional: aclaración del grupo
    }

  Regla: no se copian nombres ni rostros de estudiantes con procesos abiertos.
*/
window.CUENTAS = [
  {
    id: "fepuc",
    nombre: "Federación de Estudiantes de la PUCP",
    usuario: "@fepuc.pe",
    tipo: "Federación de estudiantes",
    url: "https://www.instagram.com/fepuc.pe/"
  },
  {
    id: "copess",
    nombre: "Comisión Permanente de Seguridad y Seguimiento del estudiantado PUCP",
    usuario: "@copess.pe",
    tipo: "Comisión (COPESS)",
    url: "https://www.instagram.com/copess.pe/"
  },
  {
    id: "pucp",
    nombre: "Pontificia Universidad Católica del Perú",
    usuario: "@pucp",
    tipo: "Cuenta oficial de la universidad",
    url: "https://www.instagram.com/pucp/"
  }
];

window.PUBLICACIONES = [];

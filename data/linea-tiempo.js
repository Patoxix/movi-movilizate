/*
  Línea de tiempo del caso. Cada evento es un objeto; la página se arma sola.

  Campos:
    fecha     texto que se muestra (ej. "21 de mayo de 2026")
    estado    "hecho" | "por precisar" | "previsto"
    titulo    una frase
    texto     qué pasó, solo con lo que dicen las fuentes y atribuyendo cada versión
    fuentes   [{ medio, titulo, url }]   (vacío si aún falta fuente)
    nota      (opcional) aclaración sobre discrepancias o datos pendientes

  Regla: no se agrega un hecho sin fuente. Si falta, se marca "por precisar".
*/
window.LINEA = [
  {
    fecha: "14 de mayo de 2026",
    estado: "hecho",
    titulo: "Se anuncia el nuevo sistema de pensiones y becas, y empiezan las protestas",
    texto: "La vicerrectora Mónica Bonifaz explicó que, desde el ciclo 2027, las nueve escalas de pago serían reemplazadas por ocho niveles: cuatro de beca parcial con alto subsidio y cuatro escalas regulares. Hubo protestas, ingreso forzado a oficinas administrativas y bloqueos fuera de la universidad. Bonifaz afirmó que «la universidad nunca toma represalias».",
    fuentes: [
      {
        medio: "Diario Correo",
        titulo: "PUCP asegura que nuevo sistema de pensiones mantendrá becas y descarta represalias tras protestas",
        url: "https://diariocorreo.pe/edicion/lima/pucp-asegura-que-nuevo-sistema-de-pensiones-mantendra-becas-y-descarta-represalias-tras-protestas-noticia/"
      }
    ]
  },
  {
    fecha: "Mayo de 2026 (fechas por precisar)",
    estado: "por precisar",
    titulo: "Estudiantes toman el edificio del rectorado",
    texto: "Las movilizaciones culminaron con la toma del edificio rectoral, que según Pressenza duró varios días. La fuente no da las fechas exactas.",
    fuentes: [
      {
        medio: "Pressenza",
        titulo: "Perú: se suspende reforma de pensiones y abren mesa de diálogo en la PUCP",
        url: "https://www.pressenza.com/es/2026/05/peru-se-suspende-reforma-de-pensiones-y-abren-mesa-de-dialogo-en-la-pucp/"
      }
    ],
    nota: "Pendiente: confirmar con una tercera fuente el día de inicio y de fin de la toma."
  },
  {
    fecha: "21 de mayo de 2026",
    estado: "hecho",
    titulo: "Rectorado y estudiantes firman un acuerdo",
    texto: "El Equipo Rectoral elevaría al Consejo Universitario el pedido de suspender el nuevo sistema. Se conformaría una mesa de diálogo sobre pensiones y becas. Los incidentes de las protestas se evaluarían con un enfoque de justicia restaurativa y «no punitiva». El texto no detalla qué pasaría con los procesos disciplinarios.",
    fuentes: [
      {
        medio: "Gestión",
        titulo: "PUCP: rectorado y estudiantes alcanzan acuerdo tras diálogo por nuevo sistema de pensiones",
        url: "https://gestion.pe/peru/pucp-rectorado-y-estudiantes-alcanzan-acuerdo-tras-dialogo-por-nuevo-sistema-de-pensiones-noticia/"
      }
    ],
    nota: "Esta es la fecha clave del conflicto: las dos partes recuerdan de forma distinta qué se acordó sobre los procesos."
  },
  {
    fecha: "22 de mayo de 2026",
    estado: "hecho",
    titulo: "Termina el retiro voluntario del edificio",
    texto: "Según Gestión, el retiro voluntario de las personas que ocupaban el edificio terminaría el viernes 22 de mayo a las 9:00 a. m.",
    fuentes: [
      {
        medio: "Gestión",
        titulo: "PUCP: rectorado y estudiantes alcanzan acuerdo tras diálogo por nuevo sistema de pensiones",
        url: "https://gestion.pe/peru/pucp-rectorado-y-estudiantes-alcanzan-acuerdo-tras-dialogo-por-nuevo-sistema-de-pensiones-noticia/"
      }
    ]
  },
  {
    fecha: "Antes del 18 de noviembre (fecha por precisar)",
    estado: "por precisar",
    titulo: "Se notifican procesos disciplinarios a nueve estudiantes",
    texto: "La vicepresidenta de la Federación de Estudiantes, Consuelo Escobar, dijo que los estudiantes dejaron de asistir a la mesa de diálogo «en el momento en el que se notificaron los procesos disciplinarios». El rector, Julio del Valle Ballón, explicó que son nueve estudiantes y que los procesos son por presuntas agresiones y daños a la infraestructura.",
    fuentes: [
      {
        medio: "Diario Correo",
        titulo: "Estudiantes de la PUCP toman rectorado en protesta por nuevo sistema de pensiones",
        url: "https://diariocorreo.pe/edicion/lima/estudiantes-de-la-pucp-toman-rectorado-en-protesta-por-nuevo-sistema-de-pensiones-noticia/"
      },
      {
        medio: "Gestión",
        titulo: "Estudiantes de la PUCP bloquean accesos por rechazo a nuevo sistema de pensiones",
        url: "https://gestion.pe/peru/estudiantes-de-la-pucp-bloquean-accesos-por-rechazo-a-nuevo-sistema-de-pensiones-noticia/"
      }
    ],
    nota: "Pendiente: la fecha de notificación. Ninguna de las notas consultadas la da."
  },
  {
    fecha: "18 de noviembre de 2026",
    estado: "hecho",
    titulo: "Los estudiantes bloquean cinco de los diez accesos al campus",
    texto: "Los estudiantes dicen que la universidad incumplió lo acordado el 21 de mayo: los procesos disciplinarios y la falta de representación estudiantil. El rectorado rechazó el bloqueo, dijo que las actividades continuaban con normalidad y afirmó que la reforma está suspendida: las nueve escalas de pago se mantienen hasta 2027, sin nuevos aumentos.",
    fuentes: [
      {
        medio: "Diario Correo",
        titulo: "Estudiantes de la PUCP toman rectorado en protesta por nuevo sistema de pensiones",
        url: "https://diariocorreo.pe/edicion/lima/estudiantes-de-la-pucp-toman-rectorado-en-protesta-por-nuevo-sistema-de-pensiones-noticia/"
      }
    ]
  },
  {
    fecha: "19 de noviembre de 2026",
    estado: "hecho",
    titulo: "Segundo día de bloqueo: el rector explica los procesos",
    texto: "Gestión reportó el bloqueo de tres ingresos de la avenida Universitaria, con una banderola que decía «PUCP tomada por el gremio organizado». Las clases continuaron por la avenida Riva Agüero. El rector dijo que la universidad respeta el derecho a la protesta, pero que este no justifica afectar a otras personas o bienes, y que no hay sanciones todavía.",
    fuentes: [
      {
        medio: "Gestión",
        titulo: "Estudiantes de la PUCP bloquean accesos por rechazo a nuevo sistema de pensiones",
        url: "https://gestion.pe/peru/estudiantes-de-la-pucp-bloquean-accesos-por-rechazo-a-nuevo-sistema-de-pensiones-noticia/"
      }
    ],
    nota: "Las notas difieren en el número de accesos: cinco el 18 (Correo) y tres el 19 (Gestión)."
  },
  {
    fecha: "20 de noviembre de 2026",
    estado: "por precisar",
    titulo: "Tercer día de toma de accesos",
    texto: "Según el registro del grupo, la toma de accesos se mantuvo hasta el viernes 20.",
    fuentes: [],
    nota: "Pendiente: documentar este día con una fuente (nota de prensa, comunicado o testimonio con consentimiento)."
  },
  {
    fecha: "Diciembre de 2026 (previsto)",
    estado: "previsto",
    titulo: "Posible informe de la comisión asesora",
    texto: "Según Consuelo Escobar, una comisión asesora prepara un informe que podría presentarse en el último Consejo Universitario del año, previsto para diciembre.",
    fuentes: [
      {
        medio: "Gestión",
        titulo: "Estudiantes de la PUCP bloquean accesos por rechazo a nuevo sistema de pensiones",
        url: "https://gestion.pe/peru/estudiantes-de-la-pucp-bloquean-accesos-por-rechazo-a-nuevo-sistema-de-pensiones-noticia/"
      }
    ]
  }
];

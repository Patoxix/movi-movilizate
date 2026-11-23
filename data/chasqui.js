/*
  Preguntas y respuestas de Chasqui. Cada respuesta la escribe el grupo a partir de las fuentes.

  Campos de cada pregunta:
    id          identificador corto
    pregunta    texto que se muestra como botón
    claves      palabras que, si la persona escribe, activan esta respuesta
    respuesta   lista de párrafos
    fuentes     [{ medio, titulo, url }]  (opcional)
    enlace      { texto, href }           (opcional) página del sitio con más detalle
*/
(function () {
  var CORREO_14 = { medio: "Diario Correo", titulo: "PUCP asegura que nuevo sistema de pensiones mantendrá becas y descarta represalias tras protestas", url: "https://diariocorreo.pe/edicion/lima/pucp-asegura-que-nuevo-sistema-de-pensiones-mantendra-becas-y-descarta-represalias-tras-protestas-noticia/" };
  var CORREO_18 = { medio: "Diario Correo", titulo: "Estudiantes de la PUCP toman rectorado en protesta por nuevo sistema de pensiones", url: "https://diariocorreo.pe/edicion/lima/estudiantes-de-la-pucp-toman-rectorado-en-protesta-por-nuevo-sistema-de-pensiones-noticia/" };
  var GESTION_19 = { medio: "Gestión", titulo: "Estudiantes de la PUCP bloquean accesos por rechazo a nuevo sistema de pensiones", url: "https://gestion.pe/peru/estudiantes-de-la-pucp-bloquean-accesos-por-rechazo-a-nuevo-sistema-de-pensiones-noticia/" };
  var GESTION_21 = { medio: "Gestión", titulo: "PUCP: rectorado y estudiantes alcanzan acuerdo tras diálogo por nuevo sistema de pensiones", url: "https://gestion.pe/peru/pucp-rectorado-y-estudiantes-alcanzan-acuerdo-tras-dialogo-por-nuevo-sistema-de-pensiones-noticia/" };

  window.CHASQUI = {
    saludo: "¡Hola! Soy Chasqui. ¿Qué quieres saber del caso?",
    bienvenida: "Hola, soy Chasqui. Te llevo los hechos del caso con su fuente. Elige una pregunta o escribe la tuya.",
    sinRespuesta: "No tengo una respuesta preparada para eso. Prueba con una de estas preguntas:",
    preguntas: [
      {
        id: "que-pasa",
        pregunta: "¿Qué está pasando en la PUCP?",
        claves: ["pasa", "pasando", "ocurre", "resumen", "conflicto", "protesta", "protestas", "caso"],
        respuesta: [
          "Desde mayo de 2026 hay protestas por el nuevo sistema de pensiones y becas. El 21 de mayo el rectorado y los estudiantes firmaron un acuerdo. El 18 de noviembre los estudiantes bloquearon cinco de los diez accesos al campus (Correo).",
          "Los estudiantes dicen que la universidad incumplió lo acordado. El rectorado dice que la reforma está suspendida."
        ],
        fuentes: [CORREO_18],
        enlace: { texto: "Ver la línea de tiempo", href: "que-paso.html" }
      },
      {
        id: "sistema",
        pregunta: "¿Qué cambiaba el nuevo sistema de pensiones?",
        claves: ["sistema", "pension", "pensiones", "becas", "escalas", "niveles", "cambiaba", "reforma"],
        respuesta: [
          "Según la vicerrectora Mónica Bonifaz, desde el ciclo 2027 las nueve escalas de pago serían reemplazadas por ocho niveles: cuatro de beca parcial con alto subsidio y cuatro escalas regulares."
        ],
        fuentes: [CORREO_14],
        enlace: { texto: "Ver cómo empezó todo", href: "que-paso.html" }
      },
      {
        id: "vigente",
        pregunta: "¿Sigue vigente la reforma?",
        claves: ["vigente", "suspendida", "suspendido", "suspension", "sigue", "2027", "aumento", "aumentos"],
        respuesta: [
          "El rectorado dice que la reforma está suspendida: las nueve escalas de pago se mantienen hasta 2027, sin nuevos aumentos (Correo, 18 de noviembre).",
          "Los estudiantes dicen que la universidad incumplió lo acordado el 21 de mayo, en particular sobre los procesos disciplinarios y la representación estudiantil."
        ],
        fuentes: [CORREO_18],
        enlace: { texto: "Ver las dos versiones", href: "versiones.html" }
      },
      {
        id: "acuerdo",
        pregunta: "¿Qué se acordó el 21 de mayo?",
        claves: ["acuerdo", "acordo", "acordado", "21 de mayo", "mesa", "dialogo", "restaurativa"],
        respuesta: [
          "Según Gestión, el Equipo Rectoral elevaría al Consejo Universitario el pedido de suspender el nuevo sistema, se conformaría una mesa de diálogo y los incidentes se evaluarían con un enfoque de justicia restaurativa «no punitiva».",
          "El texto que encontramos no detalla qué pasaría con los procesos disciplinarios. Por eso las dos partes lo recuerdan distinto."
        ],
        fuentes: [GESTION_21],
        enlace: { texto: "Ver lo que aún no se sabe", href: "versiones.html" }
      },
      {
        id: "procesos",
        pregunta: "¿Por qué hay procesos disciplinarios?",
        claves: ["proceso", "procesos", "disciplinario", "disciplinarios", "nueve", "sancion", "sanciones", "rector"],
        respuesta: [
          "Según el rector Julio del Valle Ballón, son nueve estudiantes, por presuntas agresiones y daños a la infraestructura, y todavía no hay sanciones (Gestión, 19 de noviembre).",
          "Según la vicepresidenta de la Federación, Consuelo Escobar, los estudiantes dejaron de asistir a la mesa de diálogo cuando se notificaron los procesos."
        ],
        fuentes: [GESTION_19, CORREO_18],
        enlace: { texto: "Ver las dos versiones", href: "versiones.html" }
      },
      {
        id: "sancion",
        pregunta: "¿Me pueden sancionar por participar?",
        claves: ["sancionar", "sancionan", "castigo", "represalia", "represalias", "miedo", "riesgo", "expulsar", "participar sin"],
        respuesta: [
          "Hay dos cosas dichas públicamente. La vicerrectora Bonifaz afirmó que «la universidad nunca toma represalias» (Correo, 14 de mayo). El rector dijo que la universidad respeta el derecho a la protesta, pero que este no justifica afectar a otras personas o bienes (Gestión, 19 de noviembre).",
          "Esto no es asesoría legal. Para saber qué reglas se aplican a tu caso, revisa el reglamento disciplinario oficial de la universidad."
        ],
        fuentes: [CORREO_14, GESTION_19]
      },
      {
        id: "clases",
        pregunta: "¿Hay clases durante los bloqueos?",
        claves: ["clases", "clase", "campus", "acceso", "accesos", "ingreso", "bloqueo", "bloqueos", "riva"],
        respuesta: [
          "El rectorado dijo que las actividades continuaban con normalidad. Gestión reportó el 19 de noviembre que las clases siguieron por la avenida Riva Agüero, con tres ingresos de la avenida Universitaria bloqueados.",
          "Las notas no coinciden en el número de accesos: cinco el 18 (Correo) y tres el 19 (Gestión)."
        ],
        fuentes: [GESTION_19, CORREO_18]
      },
      {
        id: "veinte",
        pregunta: "¿Qué pasó el 20 de noviembre?",
        claves: ["20 de noviembre", "viernes", "tercer dia", "ultimo dia"],
        respuesta: [
          "Según el registro del grupo, la toma de accesos se mantuvo hasta el viernes 20. Todavía no tenemos una fuente publicada que lo documente, así que lo marcamos como «por precisar»."
        ],
        enlace: { texto: "Ver la línea de tiempo", href: "que-paso.html" }
      },
      {
        id: "participar",
        pregunta: "¿Cómo puedo participar?",
        claves: ["participar", "participo", "sumarme", "sumo", "unirme", "ayudar", "como puedo", "movilizar"],
        respuesta: [
          "Empieza por informarte: lee la línea de tiempo y las dos versiones. Después conversa con personas que piensan distinto, responde la encuesta y sigue las cuentas oficiales de la Federación, de COPESS y de la universidad para enterarte de asambleas y convocatorias."
        ],
        enlace: { texto: "Ir a Muévete PUCP", href: "muevete.html" }
      },
      {
        id: "convocatoria",
        pregunta: "¿Cuándo es la próxima convocatoria?",
        claves: ["convocatoria", "convocatorias", "asamblea", "asambleas", "proxima", "proximo", "fecha", "cuando", "consejo"],
        respuesta: [
          "No tenemos una convocatoria confirmada que podamos citar. Según Consuelo Escobar, un informe de la comisión asesora podría presentarse en el último Consejo Universitario del año, previsto para diciembre (Gestión).",
          "Las convocatorias las publican las organizaciones en sus cuentas; las más recientes están en Muévete PUCP."
        ],
        fuentes: [GESTION_19],
        enlace: { texto: "Ver publicaciones recientes", href: "muevete.html#publicaciones" }
      },
      {
        id: "redes",
        pregunta: "¿Dónde veo lo que publican la Federación y COPESS?",
        claves: ["instagram", "redes", "federacion", "copess", "comision", "cuenta", "cuentas", "publican", "fepuc"],
        respuesta: [
          "En Muévete PUCP hay enlaces a las cuentas de Instagram de la Federación de Estudiantes, de COPESS y de la universidad, y una lista de publicaciones recientes que el grupo copia con su fecha y enlace."
        ],
        enlace: { texto: "Ir a Muévete PUCP", href: "muevete.html" }
      },
      {
        id: "encuesta",
        pregunta: "¿La encuesta es anónima?",
        claves: ["encuesta", "anonima", "anonimo", "datos", "correo", "nombre", "privacidad"],
        respuesta: [
          "Sí. Es voluntaria y no pedimos nombre ni correo. Los resultados se publicarán de forma agregada, no respuestas individuales."
        ],
        enlace: { texto: "Ver la página de la encuesta", href: "voces.html#encuesta" }
      },
      {
        id: "quien",
        pregunta: "¿Quién hizo esta página?",
        claves: ["quien", "quienes", "grupo", "autores", "hizo", "oficial", "curso", "proyecto"],
        respuesta: [
          "Un grupo de estudiantes del curso Información y Cultura Digital (PUCP, 2026-2). No es un medio oficial de la universidad ni de la Federación de Estudiantes."
        ],
        enlace: { texto: "Ver El proyecto", href: "proyecto.html" }
      },
      {
        id: "tesis",
        pregunta: "¿Qué significa «simpatía sin participación»?",
        claves: ["simpatia", "tesis", "participacion", "apoyo", "apoyan", "indiferencia"],
        respuesta: [
          "Es lo que sostiene el grupo: parte de la comunidad simpatiza con las protestas por las pensiones, pero esa simpatía no se convierte en participación, porque la información llega fragmentada y hay miedo a las sanciones. La encuesta busca comprobarlo."
        ],
        enlace: { texto: "Ver El proyecto", href: "proyecto.html" }
      },
      {
        id: "glosario",
        pregunta: "¿Qué conceptos del curso se usan aquí?",
        claves: ["glosario", "concepto", "conceptos", "castells", "jenkins", "deleuze", "autocomunicacion", "contrapoder"],
        respuesta: [
          "El glosario explica seis: autocomunicación de masas, contrapoder y espacio híbrido (Castells); cultura participativa e inteligencia colectiva (Jenkins); y sociedades de control (Deleuze)."
        ],
        enlace: { texto: "Ver el glosario", href: "glosario.html" }
      }
    ]
  };
})();

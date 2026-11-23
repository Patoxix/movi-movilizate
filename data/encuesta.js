/*
  Encuesta emergente. Aquí se editan las preguntas y las opciones.

  PREGUNTAS PROVISIONALES: son una propuesta para probar el flujo. El grupo las reemplazará.

  Cada pregunta:
    id           nombre corto sin espacios (se usa para enlazar con el formulario de destino)
    tipo         "unica"    elige una opción
                 "multiple" puede marcar varias
                 "abierta"  texto libre
    texto        la pregunta
    opciones     lista de opciones (no aplica a "abierta")
    obligatoria  true o false

  DESTINO (dónde llegan las respuestas). Mientras `url` esté vacía, la encuesta funciona en
  «modo de prueba»: no guarda nada y se lo dice a quien la responde.

  Opción recomendada: un Google Forms del grupo con las mismas preguntas, sin recolección de correos.
    tipo   "google-forms"
    url    dirección que termina en /formResponse
    campos { id_de_pregunta: "entry.123456789", ... }  (un campo por pregunta)
  Las opciones deben escribirse EXACTAMENTE igual que en el formulario de Google.
*/
window.ENCUESTA = {
  titulo: "Encuesta a la comunidad PUCP",
  intro: "Es breve (unos 2 minutos), anónima y voluntaria. No pedimos tu nombre ni tu correo. Los resultados se publicarán de forma agregada.",
  destino: {
    tipo: "google-forms",
    url: "",
    campos: {}
  },
  preguntas: [
    {
      id: "conoce",
      tipo: "unica",
      texto: "¿Conoces lo que ha pasado desde mayo con el nuevo sistema de pensiones?",
      opciones: ["Nada", "Algo", "Bastante", "Mucho"],
      obligatoria: true
    },
    {
      id: "informa",
      tipo: "multiple",
      texto: "¿Cómo te enteras de lo que pasa? Puedes marcar varias.",
      opciones: ["Redes sociales", "Compañeros", "Docentes", "Comunicados de la universidad", "Comunicados de la Federación", "Medios de prensa", "No me entero"],
      obligatoria: true
    },
    {
      id: "apoya",
      tipo: "unica",
      texto: "¿Apoyas las movilizaciones estudiantiles?",
      opciones: ["Sí", "En parte", "No", "No sé"],
      obligatoria: true
    },
    {
      id: "participo",
      tipo: "unica",
      texto: "¿Has participado en alguna?",
      opciones: ["Sí", "No"],
      obligatoria: true
    },
    {
      id: "porque",
      tipo: "multiple",
      texto: "Si no has participado, ¿por qué? Puedes marcar varias.",
      opciones: ["No sabía qué estaba pasando", "Miedo a sanciones", "Falta de tiempo", "No confío en quienes convocan", "No estoy de acuerdo con la forma de protesta", "No me afecta", "Otra razón", "He participado"],
      obligatoria: false
    },
    {
      id: "mas",
      tipo: "abierta",
      texto: "¿Qué te haría participar más? (opcional)",
      obligatoria: false
    }
  ]
};

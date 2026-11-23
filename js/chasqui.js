/* Chasqui: preguntas frecuentes con respuestas escritas por el grupo (data/chasqui.js).
   Todo ocurre en el navegador: lo que se escribe no se guarda ni se envía a ningún servidor. */
(function () {
  "use strict";
  var D = window.CHASQUI;
  if (!D || !D.preguntas || !D.preguntas.length) return;

  var reducido = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, clase, texto) {
    var n = document.createElement(tag);
    if (clase) n.className = clase;
    if (texto) n.textContent = texto;
    return n;
  }
  function leer(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function guardar(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }

  // Robotsito con chullo (dibujo original, formas planas)
  var ROBOT =
    '<svg viewBox="0 0 100 110" aria-hidden="true" focusable="false">' +
    '<rect x="26" y="84" width="48" height="24" rx="9" fill="#14213d"/>' +
    '<circle cx="50" cy="96" r="5" fill="#ffc933"/>' +
    '<rect x="43" y="76" width="14" height="10" fill="#4b5670"/>' +
    '<rect x="20" y="40" width="60" height="40" rx="11" fill="#fff" stroke="#14213d" stroke-width="4"/>' +
    '<circle cx="38" cy="60" r="5.5" fill="#14213d"/><circle cx="62" cy="60" r="5.5" fill="#14213d"/>' +
    '<circle cx="40" cy="58" r="1.8" fill="#fff"/><circle cx="64" cy="58" r="1.8" fill="#fff"/>' +
    '<path d="M41 70 Q50 76 59 70" fill="none" stroke="#14213d" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M15 46 L26 46 L25 72 Q20.5 77 16 72 Z" fill="#e8452c" stroke="#14213d" stroke-width="3.5" stroke-linejoin="round"/>' +
    '<path d="M85 46 L74 46 L75 72 Q79.5 77 84 72 Z" fill="#e8452c" stroke="#14213d" stroke-width="3.5" stroke-linejoin="round"/>' +
    '<path d="M20.5 76 V87 M79.5 76 V87" stroke="#14213d" stroke-width="2.5"/>' +
    '<circle cx="20.5" cy="89" r="3.2" fill="#ffc933" stroke="#14213d" stroke-width="2"/>' +
    '<circle cx="79.5" cy="89" r="3.2" fill="#ffc933" stroke="#14213d" stroke-width="2"/>' +
    '<path d="M14 46 C14 20 30 12 50 12 C70 12 86 20 86 46 Z" fill="#e8452c" stroke="#14213d" stroke-width="4" stroke-linejoin="round"/>' +
    '<path d="M50 21 L55 26 L50 31 L45 26 Z M33 25 L38 30 L33 35 L28 30 Z M67 25 L72 30 L67 35 L62 30 Z" fill="#ffc933" stroke="#14213d" stroke-width="2" stroke-linejoin="round"/>' +
    '<rect x="14" y="38" width="72" height="10" fill="#ffc933" stroke="#14213d" stroke-width="4"/>' +
    '<path d="M18 45 L22 42 L26 45 L30 42 L34 45 L38 42 L42 45 L46 42 L50 45 L54 42 L58 45 L62 42 L66 45 L70 42 L74 45 L78 42 L82 45" fill="none" stroke="#14213d" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<circle cx="50" cy="10" r="6.5" fill="#ffc933" stroke="#14213d" stroke-width="3.5"/>' +
    '</svg>';

  function normal(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
  }

  var raiz = el("div", "chasqui");
  raiz.id = "chasqui";

  var nube = el("div", "chasqui-nube");
  nube.hidden = true;
  var nubeTexto = el("button", "chasqui-nube-texto", D.saludo);
  nubeTexto.type = "button";
  var nubeCerrar = el("button", "chasqui-nube-cerrar", "×");
  nubeCerrar.type = "button";
  nubeCerrar.setAttribute("aria-label", "Cerrar el mensaje de Chasqui");
  nube.appendChild(nubeTexto);
  nube.appendChild(nubeCerrar);

  var panel = el("section", "chasqui-panel");
  panel.id = "chasqui-panel";
  panel.hidden = true;
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Chasqui, preguntas frecuentes");
  var cab = el("div", "chasqui-cab");
  var avatar = el("div", "avatar");
  avatar.innerHTML = ROBOT;
  cab.appendChild(avatar);
  var titulos = el("div");
  titulos.appendChild(el("strong", null, "Chasqui"));
  titulos.appendChild(el("span", null, "Preguntas frecuentes del grupo"));
  cab.appendChild(titulos);
  var cerrar = el("button", "cerrar", "×");
  cerrar.type = "button";
  cerrar.setAttribute("aria-label", "Cerrar el chat");
  cab.appendChild(cerrar);
  panel.appendChild(cab);

  var log = el("div", "chasqui-log");
  log.setAttribute("role", "log");
  log.setAttribute("aria-live", "polite");
  panel.appendChild(log);

  var form = el("form", "chasqui-form");
  var campo = el("input");
  campo.type = "text";
  campo.placeholder = "Escribe tu pregunta…";
  campo.setAttribute("aria-label", "Escribe tu pregunta");
  campo.autocomplete = "off";
  campo.maxLength = 160;
  var enviar = el("button", null, "Enviar");
  enviar.type = "submit";
  form.appendChild(campo);
  form.appendChild(enviar);
  panel.appendChild(form);

  var boton = el("button", "chasqui-boton");
  boton.type = "button";
  boton.setAttribute("aria-label", "Abrir el chat con Chasqui");
  boton.setAttribute("aria-expanded", "false");
  boton.setAttribute("aria-controls", "chasqui-panel");
  boton.innerHTML = ROBOT;

  raiz.appendChild(nube);
  raiz.appendChild(panel);
  raiz.appendChild(boton);
  document.body.appendChild(raiz);

  var preguntadas = {};
  var iniciado = false;
  var sugerenciasActuales = null;

  function bajar() { log.scrollTop = log.scrollHeight; }
  function quitarSugerencias() {
    if (sugerenciasActuales && sugerenciasActuales.parentNode) sugerenciasActuales.parentNode.removeChild(sugerenciasActuales);
    sugerenciasActuales = null;
  }
  function mensajeYo(texto) {
    log.appendChild(el("div", "msg msg-yo", texto));
    bajar();
  }
  function mensajeBot(p) {
    var m = el("div", "msg msg-bot");
    (Array.isArray(p.respuesta) ? p.respuesta : [p.texto || ""]).forEach(function (par) {
      m.appendChild(el("p", null, par));
    });
    if (p.fuentes && p.fuentes.length) {
      var ul = el("ul", "msg-fuentes");
      p.fuentes.forEach(function (s) {
        var li = el("li");
        li.appendChild(document.createTextNode("Fuente: "));
        var a = el("a", null, s.medio + ", «" + s.titulo + "»");
        a.href = s.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        li.appendChild(a);
        ul.appendChild(li);
      });
      m.appendChild(ul);
    }
    if (p.enlace) {
      var e = el("a", "msg-enlace", p.enlace.texto + " →");
      e.href = p.enlace.href;
      m.appendChild(e);
    }
    log.appendChild(m);
    bajar();
  }
  function textoBot(texto) { mensajeBot({ respuesta: [texto] }); }

  function sugerir(lista) {
    quitarSugerencias();
    if (!lista.length) return;
    var caja = el("div", "sugerencias");
    lista.forEach(function (p) {
      var b = el("button", null, p.pregunta);
      b.type = "button";
      b.addEventListener("click", function () { preguntar(p); });
      caja.appendChild(b);
    });
    log.appendChild(caja);
    sugerenciasActuales = caja;
    bajar();
  }
  function pendientes(n, excluir) {
    return D.preguntas.filter(function (p) { return !preguntadas[p.id] && p !== excluir; }).slice(0, n);
  }

  function responderCon(fn) {
    quitarSugerencias();
    if (reducido) { fn(); return; }
    var esc = el("div", "escribiendo");
    esc.innerHTML = "<i></i><i></i><i></i>";
    log.appendChild(esc);
    bajar();
    setTimeout(function () {
      if (esc.parentNode) esc.parentNode.removeChild(esc);
      fn();
    }, 550);
  }

  function preguntar(p) {
    mensajeYo(p.pregunta);
    preguntadas[p.id] = true;
    responderCon(function () {
      mensajeBot(p);
      sugerir(pendientes(5, p));
    });
  }

  function buscar(texto) {
    var t = " " + normal(texto) + " ";
    var mejor = null, puntos = 0;
    D.preguntas.forEach(function (p) {
      var s = 0;
      (p.claves || []).forEach(function (c) {
        var cn = normal(c);
        if (cn && t.indexOf(cn.indexOf(" ") > -1 ? cn : " " + cn) > -1) s += cn.indexOf(" ") > -1 ? 3 : 2;
      });
      normal(p.pregunta).split(" ").forEach(function (w) {
        if (w.length > 4 && t.indexOf(" " + w) > -1) s += 1;
      });
      if (s > puntos) { puntos = s; mejor = p; }
    });
    return puntos >= 2 ? mejor : null;
  }

  function iniciar() {
    if (iniciado) return;
    iniciado = true;
    textoBot(D.bienvenida);
    sugerir(D.preguntas.slice(0, 6));
  }

  function abrir() {
    nube.hidden = true;
    guardar("movi-nube", "1");
    panel.hidden = false;
    boton.setAttribute("aria-expanded", "true");
    boton.setAttribute("aria-label", "Cerrar el chat con Chasqui");
    iniciar();
    setTimeout(function () { campo.focus(); }, 30);
  }
  function cerrarChat() {
    panel.hidden = true;
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-label", "Abrir el chat con Chasqui");
    boton.focus();
  }

  boton.addEventListener("click", function () { if (panel.hidden) abrir(); else cerrarChat(); });
  cerrar.addEventListener("click", cerrarChat);
  nubeTexto.addEventListener("click", abrir);
  nubeCerrar.addEventListener("click", function () { nube.hidden = true; guardar("movi-nube", "1"); });
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape" && !panel.hidden) cerrarChat();
  });
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var texto = campo.value.trim();
    if (!texto) return;
    campo.value = "";
    mensajeYo(texto);
    var p = buscar(texto);
    responderCon(function () {
      if (p) {
        preguntadas[p.id] = true;
        mensajeBot(p);
        sugerir(pendientes(5, p));
      } else {
        textoBot(D.sinRespuesta);
        sugerir(pendientes(5));
      }
    });
  });

  if (leer("movi-nube") !== "1") {
    setTimeout(function () { if (panel.hidden && leer("movi-nube") !== "1") nube.hidden = false; }, reducido ? 800 : 2500);
  }
})();

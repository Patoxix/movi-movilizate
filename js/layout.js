/* Capa común de todas las páginas: aviso importante, cabecera con menú de tres rayas, pie y
   botones de anterior/siguiente. Para agregar o renombrar una página, se edita la lista PAGINAS. */
(function () {
  "use strict";

  var PAGINAS = [
    { href: "index.html", id: "inicio", titulo: "Inicio", desc: "Portada del proyecto" },
    { href: "que-paso.html", id: "que-paso", titulo: "Qué pasó", desc: "Línea de tiempo con fuentes" },
    { href: "versiones.html", id: "versiones", titulo: "Dos versiones", desc: "Estudiantes y rectorado, lado a lado" },
    { href: "voces.html", id: "voces", titulo: "Voces y encuesta", desc: "Entrevista, testimonios, encuesta y videoensayo" },
    { href: "muevete.html", id: "muevete", titulo: "Muévete PUCP", desc: "Cómo participar y qué publican las organizaciones" },
    { href: "manifiesto.html", id: "manifiesto", titulo: "Manifiesto", desc: "Lo que defendemos" },
    { href: "glosario.html", id: "glosario", titulo: "Glosario", desc: "Conceptos del curso" },
    { href: "proyecto.html", id: "proyecto", titulo: "El proyecto", desc: "Tema, tesis y cómo trabajamos" },
    { href: "privacidad.html", id: "privacidad", titulo: "Privacidad", desc: "Qué datos usa (y cuáles no) este sitio" }
  ];
  window.MOVI_PAGINAS = PAGINAS;

  var actual = document.body.getAttribute("data-pagina");

  function el(tag, clase, texto) {
    var n = document.createElement(tag);
    if (clase) n.className = clase;
    if (texto) n.textContent = texto;
    return n;
  }
  function guardar(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  function leer(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }

  /* ---------- Aviso importante (ventana bloqueante) ---------- */
  var aviso = null;
  function yaRespondio() { try { return localStorage.getItem("movi-encuesta") === "1"; } catch (e) { return false; } }
  function cerrarAviso() {
    if (!aviso) return;
    guardar("movi-aviso", "1");
    window.MOVI_MODAL.cerrar(aviso);
    if (aviso.parentNode) aviso.parentNode.removeChild(aviso);
    aviso = null;
  }
  if (leer("movi-aviso") !== "1" && !yaRespondio() && window.MOVI_MODAL) {
    aviso = el("div", "modal modal-aviso");
    aviso.id = "aviso";
    aviso.hidden = true;
    aviso.setAttribute("data-modal", "");
    aviso.setAttribute("role", "dialog");
    aviso.setAttribute("aria-modal", "true");
    aviso.setAttribute("aria-labelledby", "aviso-titulo");
    var caja = el("div", "modal-caja");
    var cerrar = el("button", "modal-cerrar");
    cerrar.type = "button";
    cerrar.setAttribute("aria-label", "Cerrar el aviso y entrar a la página");
    cerrar.innerHTML = '<span class="modal-cerrar-texto">Cerrar</span><span aria-hidden="true">×</span>';
    cerrar.addEventListener("click", cerrarAviso);
    caja.appendChild(cerrar);
    caja.appendChild(el("p", "aviso-etiqueta", "Aviso importante"));
    var h = el("h2", "aviso-titulo", "Antes de entrar");
    h.id = "aviso-titulo";
    h.tabIndex = -1;
    h.setAttribute("data-foco", "");
    caja.appendChild(h);
    caja.appendChild(el("p", "aviso-parrafo", "Este sitio es un proyecto académico del curso Información y Cultura Digital (PUCP, 2026-2). No es un medio oficial de la universidad ni de la Federación de Estudiantes."));
    caja.appendChild(el("p", "aviso-parrafo", "A continuación te invitamos a responder una breve encuesta, anónima y voluntaria, para conocer qué tan informadas están las personas sobre este tema. No pedimos tu nombre ni tu correo."));
    var acciones = el("div", "aviso-acciones");
    var enc = el("button", "boton boton-oscuro", "Responder la encuesta");
    enc.type = "button";
    enc.addEventListener("click", function () {
      if (window.MOVI_ENCUESTA) window.MOVI_ENCUESTA.abrir({ desdeAviso: true, alTerminar: cerrarAviso });
    });
    acciones.appendChild(enc);
    caja.appendChild(acciones);
    caja.appendChild(el("p", "aviso-pie", "Para ver la página, responde la encuesta o cierra este aviso con la ×."));
    aviso.appendChild(caja);
  }

  /* ---------- Cabecera ---------- */
  var cab = el("header", "cabecera");
  var cfila = el("div", "contenedor cabecera-fila");
  var marca = el("a", "marca");
  marca.href = "index.html";
  marca.setAttribute("aria-label", "Movilízate, ir al inicio");
  var logo = el("img");
  logo.src = "img/logo-m.svg";
  logo.alt = "";
  logo.width = 37;
  logo.height = 37;
  marca.appendChild(logo);
  marca.appendChild(el("span", null, "Movilízate"));
  cfila.appendChild(marca);

  var hamb = el("button", "hamb");
  hamb.type = "button";
  hamb.id = "hamb";
  hamb.setAttribute("aria-label", "Abrir menú");
  hamb.setAttribute("aria-expanded", "false");
  hamb.setAttribute("aria-controls", "panel");
  hamb.appendChild(el("span", "hamb-rayas"));
  hamb.firstChild.setAttribute("aria-hidden", "true");
  cfila.appendChild(hamb);
  cab.appendChild(cfila);

  var ancla = document.querySelector(".saltar");
  var referencia = document.body.firstChild;
  if (ancla && ancla.parentNode === document.body) referencia = ancla.nextSibling;
  document.body.insertBefore(cab, referencia);

  /* ---------- Panel lateral ---------- */
  var telon = el("div", "telon");
  var panel = el("nav", "panel");
  panel.id = "panel";
  panel.setAttribute("aria-label", "Principal");
  var pcab = el("div", "panel-cab");
  pcab.appendChild(el("p", null, "Movilízate"));
  var pcerrar = el("button", "panel-cerrar", "×");
  pcerrar.type = "button";
  pcerrar.setAttribute("aria-label", "Cerrar menú");
  pcab.appendChild(pcerrar);
  panel.appendChild(pcab);
  var ul = el("ul");
  PAGINAS.forEach(function (p) {
    var li = el("li");
    var a = el("a");
    a.href = p.href;
    if (p.id === actual) a.setAttribute("aria-current", "page");
    a.appendChild(el("strong", null, p.titulo));
    a.appendChild(el("span", null, p.desc));
    li.appendChild(a);
    ul.appendChild(li);
  });
  panel.appendChild(ul);
  cab.insertAdjacentElement("afterend", telon);
  telon.insertAdjacentElement("afterend", panel);

  function abrir() {
    panel.classList.add("abierto");
    telon.classList.add("abierto");
    document.body.classList.add("menu-abierto");
    hamb.setAttribute("aria-expanded", "true");
    hamb.setAttribute("aria-label", "Cerrar menú");
    var pri = panel.querySelector("a");
    if (pri) setTimeout(function () { pri.focus(); }, 30);
  }
  function cerrarPanel(devolverFoco) {
    panel.classList.remove("abierto");
    telon.classList.remove("abierto");
    document.body.classList.remove("menu-abierto");
    hamb.setAttribute("aria-expanded", "false");
    hamb.setAttribute("aria-label", "Abrir menú");
    if (devolverFoco) hamb.focus();
  }
  hamb.addEventListener("click", function () {
    if (panel.classList.contains("abierto")) cerrarPanel(true); else abrir();
  });
  pcerrar.addEventListener("click", function () { cerrarPanel(true); });
  telon.addEventListener("click", function () { cerrarPanel(false); });
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape" && panel.classList.contains("abierto")) cerrarPanel(true);
    if (ev.key === "Tab" && panel.classList.contains("abierto")) {
      var focos = panel.querySelectorAll("a, button");
      var primero = focos[0], ultimo = focos[focos.length - 1];
      if (ev.shiftKey && document.activeElement === primero) { ev.preventDefault(); ultimo.focus(); }
      else if (!ev.shiftKey && document.activeElement === ultimo) { ev.preventDefault(); primero.focus(); }
    }
  });
  panel.addEventListener("click", function (ev) {
    if (ev.target.closest && ev.target.closest("a")) cerrarPanel(false);
  });

  /* ---------- Anterior / siguiente ---------- */
  var orden = PAGINAS.filter(function (p) { return p.id !== "privacidad"; });
  var i = -1;
  orden.forEach(function (p, k) { if (p.id === actual) i = k; });
  var main = document.getElementById("contenido");
  if (main && i >= 0) {
    var pager = el("nav", "contenedor pager");
    pager.setAttribute("aria-label", "Otras páginas");
    if (i > 0) {
      var a1 = el("a");
      a1.href = orden[i - 1].href;
      a1.appendChild(el("small", null, "← Anterior"));
      a1.appendChild(el("strong", null, orden[i - 1].titulo));
      pager.appendChild(a1);
    }
    if (i < orden.length - 1) {
      var a2 = el("a", "sig");
      a2.href = orden[i + 1].href;
      a2.appendChild(el("small", null, "Siguiente →"));
      a2.appendChild(el("strong", null, orden[i + 1].titulo));
      pager.appendChild(a2);
    }
    main.appendChild(pager);
  }

  /* ---------- Pie ---------- */
  var pie = el("footer", "pie");
  var pc = el("div", "contenedor");
  var pm = el("p", "pie-marca");
  var plogo = el("img");
  plogo.src = "img/logo-m.svg";
  plogo.alt = "";
  plogo.width = 38;
  plogo.height = 38;
  pm.appendChild(plogo);
  pm.appendChild(document.createTextNode("Movilízate"));
  pc.appendChild(pm);
  pc.appendChild(el("p", null, "Proyecto del curso Información y Cultura Digital (1INT38), PUCP, semestre 2026-2. No es un medio oficial de la PUCP ni de la Federación de Estudiantes, y no usa sus logotipos."));
  var pp = el("p");
  pp.appendChild(document.createTextNode("Este sitio no usa cookies ni analítica. "));
  var pl = el("a", null, "Más sobre privacidad");
  pl.href = "privacidad.html";
  pp.appendChild(pl);
  pp.appendChild(document.createTextNode("."));
  pc.appendChild(pp);
  pie.appendChild(pc);
  var scripts = document.querySelector("body > script");
  document.body.insertBefore(pie, scripts);

  /* ---------- Abrir el aviso al final, con la página ya armada ---------- */
  if (aviso) {
    document.body.appendChild(aviso);
    window.MOVI_MODAL.abrir(aviso, { onEsc: cerrarAviso });
  }
})();

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

  var CFG = window.MOVI || {};
  var actual = document.body.getAttribute("data-pagina");

  function el(tag, clase, texto) {
    var n = document.createElement(tag);
    if (clase) n.className = clase;
    if (texto) n.textContent = texto;
    return n;
  }
  function guardar(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  function leer(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }

  /* ---------- Aviso importante ---------- */
  var aviso = null;
  if (leer("movi-aviso") !== "1") {
    aviso = el("div", "aviso");
    aviso.id = "aviso";
    aviso.setAttribute("role", "region");
    aviso.setAttribute("aria-label", "Aviso importante");
    var fila = el("div", "contenedor aviso-fila");
    fila.appendChild(el("p", "aviso-etiqueta", "Aviso importante"));
    var texto = el("div", "aviso-texto");
    texto.appendChild(el("p", null, "Este sitio es un proyecto académico del curso Información y Cultura Digital (PUCP, 2026-2). No es un medio oficial de la universidad ni de la Federación de Estudiantes."));
    texto.appendChild(el("p", null, "A continuación te invitamos a responder una breve encuesta, anónima y voluntaria, para conocer qué tan informadas están las personas sobre este tema. No pedimos tu nombre ni tu correo."));
    fila.appendChild(texto);
    var acciones = el("div", "aviso-acciones");
    var enc = el("a", "boton boton-oscuro");
    if (CFG.encuestaUrl) {
      enc.textContent = "Responder la encuesta";
      enc.href = CFG.encuestaUrl;
      enc.target = "_blank";
      enc.rel = "noopener noreferrer";
    } else {
      enc.textContent = "Ver la encuesta";
      enc.href = "voces.html#encuesta";
    }
    acciones.appendChild(enc);
    fila.appendChild(acciones);
    var cerrar = el("button", "aviso-cerrar", "×");
    cerrar.type = "button";
    cerrar.setAttribute("aria-label", "Cerrar el aviso");
    cerrar.addEventListener("click", function () {
      aviso.hidden = true;
      guardar("movi-aviso", "1");
    });
    fila.appendChild(cerrar);
    aviso.appendChild(fila);
    document.body.insertBefore(aviso, document.body.firstChild);
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
  var referencia = aviso ? aviso.nextSibling : document.body.firstChild;
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
})();

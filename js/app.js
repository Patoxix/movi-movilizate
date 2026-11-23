(function () {
  "use strict";

  function el(tag, clase, texto) {
    var nodo = document.createElement(tag);
    if (clase) nodo.className = clase;
    if (texto) nodo.textContent = texto;
    return nodo;
  }
  function enlace(texto, url) {
    var a = el("a", null, texto);
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  }

  // ---------- Línea de tiempo ----------
  var raiz = document.getElementById("linea");
  var eventos = window.LINEA || [];
  if (raiz) {
    eventos.forEach(function (e) {
      var li = el("li", "evento revela");
      if (e.estado === "por precisar") li.classList.add("es-pendiente");
      if (e.estado === "previsto") li.classList.add("es-previsto");

      var f = el("p", "evento-fecha", e.fecha);
      if (e.estado === "por precisar") f.appendChild(el("span", "evento-estado", "POR PRECISAR"));
      if (e.estado === "previsto") f.appendChild(el("span", "evento-estado", "PREVISTO"));
      li.appendChild(f);

      li.appendChild(el("h3", null, e.titulo));
      li.appendChild(el("p", null, e.texto));
      if (e.nota) li.appendChild(el("p", "evento-nota", e.nota));

      if (e.fuentes && e.fuentes.length) {
        var ul = el("ul", "evento-fuentes");
        e.fuentes.forEach(function (s) {
          var item = el("li");
          item.appendChild(document.createTextNode("Fuente: "));
          item.appendChild(enlace(s.medio + ", «" + s.titulo + "»", s.url));
          ul.appendChild(item);
        });
        li.appendChild(ul);
      } else {
        li.appendChild(el("p", "sin-fuente", "Falta fuente"));
      }
      raiz.appendChild(li);
    });
  }

  // ---------- Cuentas y publicaciones (Muévete PUCP) ----------
  var contCuentas = document.getElementById("cuentas");
  var cuentas = window.CUENTAS || [];
  if (contCuentas) {
    cuentas.forEach(function (c) {
      var li = el("li");
      var art = el("article", "cuenta");
      art.appendChild(el("p", "tipo", c.tipo));
      art.appendChild(el("h3", null, c.nombre));
      art.appendChild(el("p", "usuario", c.usuario));
      var a = el("a", "boton boton-oscuro", "Ver en Instagram ↗");
      a.href = c.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", "Ver " + c.usuario + " en Instagram (se abre en otra pestaña)");
      art.appendChild(a);
      li.appendChild(art);
      contCuentas.appendChild(li);
    });
  }

  var contPubs = document.getElementById("publicaciones-lista");
  var contFiltros = document.getElementById("filtros");
  if (contPubs) {
    var pubs = (window.PUBLICACIONES || []).slice().sort(function (a, b) {
      return a.fecha < b.fecha ? 1 : a.fecha > b.fecha ? -1 : 0;
    });
    var nombreCuenta = {};
    cuentas.forEach(function (c) { nombreCuenta[c.id] = c; });
    var fmt = new Intl.DateTimeFormat("es-PE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

    var pintar = function (filtro) {
      contPubs.textContent = "";
      var lista = pubs.filter(function (p) { return filtro === "todas" || p.cuenta === filtro; });
      if (!lista.length) {
        var vacio = el("li", "pubs-vacio", pubs.length
          ? "No hay publicaciones cargadas de esta cuenta."
          : "Todavía no hay publicaciones cargadas. El grupo las irá agregando con su fecha y el enlace a la publicación original.");
        contPubs.appendChild(vacio);
        return;
      }
      lista.forEach(function (p) {
        var c = nombreCuenta[p.cuenta] || { nombre: p.cuenta, usuario: "" };
        var li = el("li");
        var art = el("article", "pub");
        art.setAttribute("data-cuenta", p.cuenta);
        var cab = el("p", "pub-cab");
        cab.appendChild(el("strong", null, c.nombre));
        if (c.usuario) cab.appendChild(el("span", null, c.usuario));
        var d = new Date(p.fecha + "T00:00:00Z");
        var t = el("time", null, isNaN(d) ? p.fecha : fmt.format(d));
        t.setAttribute("datetime", p.fecha);
        cab.appendChild(t);
        art.appendChild(cab);
        String(p.texto).split("\n").forEach(function (par) {
          if (par.trim()) art.appendChild(el("p", null, par));
        });
        if (p.nota) art.appendChild(el("p", "pub-nota", p.nota));
        if (p.url) {
          var pa = el("p");
          pa.appendChild(enlace("Ver la publicación original ↗", p.url));
          art.appendChild(pa);
        }
        li.appendChild(art);
        contPubs.appendChild(li);
      });
    };

    if (contFiltros) {
      var opciones = [{ id: "todas", nombre: "Todas" }].concat(cuentas.map(function (c) {
        return { id: c.id, nombre: c.id === "fepuc" ? "Federación" : c.id === "copess" ? "COPESS" : "PUCP" };
      }));
      opciones.forEach(function (o, k) {
        var b = el("button", "filtro", o.nombre);
        b.type = "button";
        b.setAttribute("aria-pressed", k === 0 ? "true" : "false");
        b.addEventListener("click", function () {
          Array.prototype.forEach.call(contFiltros.children, function (x) { x.setAttribute("aria-pressed", "false"); });
          b.setAttribute("aria-pressed", "true");
          pintar(o.id);
        });
        contFiltros.appendChild(b);
      });
    }
    pintar("todas");
  }

  // ---------- Entrada suave de los eventos ----------
  var revelas = document.querySelectorAll(".revela");
  if ("IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          ro.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    revelas.forEach(function (n) { ro.observe(n); });
  } else {
    revelas.forEach(function (n) { n.classList.add("visible"); });
  }
})();

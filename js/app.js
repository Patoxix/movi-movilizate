(function () {
  "use strict";

  function el(tag, clase, texto) {
    var nodo = document.createElement(tag);
    if (clase) nodo.className = clase;
    if (texto) nodo.textContent = texto;
    return nodo;
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
          var a = el("a", null, s.medio + ", «" + s.titulo + "»");
          a.href = s.url;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          item.appendChild(a);
          ul.appendChild(item);
        });
        li.appendChild(ul);
      } else {
        li.appendChild(el("p", "sin-fuente", "Falta fuente"));
      }
      raiz.appendChild(li);
    });
  }

  // ---------- Menú en móvil ----------
  var boton = document.getElementById("menu-boton");
  var menu = document.getElementById("menu");
  if (boton && menu) {
    boton.addEventListener("click", function () {
      var abierto = menu.classList.toggle("abierto");
      boton.setAttribute("aria-expanded", String(abierto));
    });
    menu.addEventListener("click", function (ev) {
      if (ev.target.tagName === "A") {
        menu.classList.remove("abierto");
        boton.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && menu.classList.contains("abierto")) {
        menu.classList.remove("abierto");
        boton.setAttribute("aria-expanded", "false");
        boton.focus();
      }
    });
  }

  // ---------- Sección activa en el menú ----------
  var enlaces = Array.prototype.slice.call(document.querySelectorAll(".menu a"));
  var secciones = enlaces
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && secciones.length) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) {
          enlaces.forEach(function (a) {
            a.classList.toggle("activo", a.getAttribute("href") === "#" + en.target.id);
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    secciones.forEach(function (s) { io.observe(s); });
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

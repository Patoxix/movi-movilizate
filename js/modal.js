/* Ventanas emergentes bloqueantes (aviso y encuesta).
   Mientras hay una abierta, el resto de la página queda inactiva (no se puede tocar, tabular ni leer
   con lector de pantalla) y no se puede hacer scroll. */
window.MOVI_MODAL = (function () {
  "use strict";
  var pila = [];

  function candidatos() {
    return Array.prototype.filter.call(document.body.children, function (n) {
      return n.tagName !== "SCRIPT" && n.tagName !== "NOSCRIPT" && n.tagName !== "STYLE";
    });
  }
  function actualizar() {
    var tope = pila.length ? pila[pila.length - 1].nodo : null;
    candidatos().forEach(function (n) {
      if (tope && n !== tope) {
        n.setAttribute("inert", "");
        n.setAttribute("aria-hidden", "true");
      } else {
        n.removeAttribute("inert");
        n.removeAttribute("aria-hidden");
      }
    });
    document.body.classList.toggle("bloqueado", pila.length > 0);
  }
  var obs = new MutationObserver(function () { if (pila.length) actualizar(); });
  obs.observe(document.body, { childList: true });

  function enfocables(nodo) {
    return Array.prototype.filter.call(
      nodo.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      function (n) { return n.offsetParent !== null || n === document.activeElement; }
    );
  }

  function abrir(nodo, opciones) {
    opciones = opciones || {};
    nodo.hidden = false;
    pila.push({ nodo: nodo, opener: document.activeElement, onEsc: opciones.onEsc });
    actualizar();
    var destino = nodo.querySelector("[data-foco]") || enfocables(nodo)[0] || nodo;
    setTimeout(function () { if (destino.focus) destino.focus(); }, 30);
  }
  function cerrar(nodo) {
    var k = -1;
    pila.forEach(function (m, i) { if (m.nodo === nodo) k = i; });
    if (k < 0) { nodo.hidden = true; return; }
    var m = pila.splice(k, 1)[0];
    nodo.hidden = true;
    actualizar();
    if (!pila.length && m.opener && document.contains(m.opener) && m.opener.focus) m.opener.focus();
  }

  document.addEventListener("keydown", function (ev) {
    if (!pila.length) return;
    var tope = pila[pila.length - 1];
    if (ev.key === "Escape" && tope.onEsc) { ev.preventDefault(); tope.onEsc(); return; }
    if (ev.key === "Tab") {
      var f = enfocables(tope.nodo);
      if (!f.length) { ev.preventDefault(); return; }
      var primero = f[0], ultimo = f[f.length - 1];
      if (!tope.nodo.contains(document.activeElement)) { ev.preventDefault(); primero.focus(); }
      else if (ev.shiftKey && document.activeElement === primero) { ev.preventDefault(); ultimo.focus(); }
      else if (!ev.shiftKey && document.activeElement === ultimo) { ev.preventDefault(); primero.focus(); }
    }
  });

  return { abrir: abrir, cerrar: cerrar, hayAbierta: function () { return pila.length > 0; } };
})();

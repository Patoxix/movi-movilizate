/* Encuesta emergente. Las preguntas y el destino de las respuestas están en data/encuesta.js. */
(function () {
  "use strict";
  var E = window.ENCUESTA;
  var M = window.MOVI_MODAL;

  function el(tag, clase, texto) {
    var n = document.createElement(tag);
    if (clase) n.className = clase;
    if (texto) n.textContent = texto;
    return n;
  }
  function leerLocal(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function guardarLocal(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var modal = null, caja = null, contenido = null;
  var paso = -1;            // -1 = introducción, 0..n-1 = preguntas, n = final
  var resp = {};
  var opciones = {};
  var enviando = false;

  function construir() {
    modal = el("div", "modal modal-encuesta");
    modal.hidden = true;
    modal.setAttribute("data-modal", "");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "enc-titulo");
    caja = el("div", "modal-caja");
    contenido = el("div", "enc");
    caja.appendChild(contenido);
    modal.appendChild(caja);
    document.body.appendChild(modal);
  }

  function salir() {
    M.cerrar(modal);
    if (typeof opciones.alSalir === "function") opciones.alSalir();
  }

  function cabecera(titulo, progreso) {
    var cab = el("div", "enc-cab");
    var t = el("p", "enc-etiqueta", "Encuesta anónima");
    cab.appendChild(t);
    var x = el("button", "modal-cerrar");
    x.type = "button";
    x.setAttribute("aria-label", "Cerrar la encuesta");
    x.innerHTML = '<span aria-hidden="true">×</span>';
    x.addEventListener("click", salir);
    cab.appendChild(x);
    contenido.appendChild(cab);
    if (progreso) {
      var barra = el("div", "enc-progreso");
      barra.setAttribute("role", "progressbar");
      barra.setAttribute("aria-valuemin", "0");
      barra.setAttribute("aria-valuemax", String(E.preguntas.length));
      barra.setAttribute("aria-valuenow", String(progreso.actual));
      barra.setAttribute("aria-label", "Progreso de la encuesta");
      var relleno = el("span");
      relleno.style.width = (progreso.actual / E.preguntas.length * 100) + "%";
      barra.appendChild(relleno);
      contenido.appendChild(barra);
    }
  }

  function titulo(texto, id) {
    var h = el("h2", "enc-titulo", texto);
    if (id) h.id = id;
    h.tabIndex = -1;
    h.setAttribute("data-foco", "");
    return h;
  }

  function limpiar() { contenido.textContent = ""; }

  function pintar() {
    limpiar();
    var n = E.preguntas.length;
    if (paso === -1) return pintarIntro();
    if (paso >= n) return pintarFinal();
    pintarPregunta(E.preguntas[paso]);
  }
  function enfocarTitulo() {
    var h = contenido.querySelector("[data-foco]");
    if (h) setTimeout(function () { h.focus(); }, 20);
  }

  function pintarIntro() {
    cabecera();
    contenido.appendChild(titulo(E.titulo, "enc-titulo"));
    contenido.appendChild(el("p", "enc-texto", E.intro));
    var acc = el("div", "enc-acciones");
    var empezar = el("button", "boton boton-primario", "Empezar");
    empezar.type = "button";
    empezar.addEventListener("click", function () { paso = 0; pintar(); });
    acc.appendChild(empezar);
    contenido.appendChild(acc);
    enfocarTitulo();
  }

  function valido(q) {
    var v = resp[q.id];
    if (!q.obligatoria) return true;
    if (q.tipo === "multiple") return Array.isArray(v) && v.length > 0;
    return typeof v === "string" && v.trim() !== "";
  }

  function pintarPregunta(q) {
    var n = E.preguntas.length;
    cabecera(null, { actual: paso });
    contenido.appendChild(el("p", "enc-paso", "Pregunta " + (paso + 1) + " de " + n));
    var fs = el("fieldset", "enc-campo");
    var lg = el("legend", "enc-pregunta", q.texto);
    lg.id = "enc-titulo";
    lg.tabIndex = -1;
    lg.setAttribute("data-foco", "");
    fs.appendChild(lg);

    var siguiente;
    function refrescar() { if (siguiente) siguiente.disabled = !valido(q); }

    if (q.tipo === "abierta") {
      var ta = el("textarea", "enc-texto-libre");
      ta.rows = 4;
      ta.maxLength = 500;
      ta.setAttribute("aria-label", q.texto);
      ta.value = resp[q.id] || "";
      ta.addEventListener("input", function () { resp[q.id] = ta.value; refrescar(); });
      fs.appendChild(ta);
      fs.appendChild(el("p", "enc-ayuda", "Máximo 500 caracteres. No escribas tu nombre ni datos personales."));
    } else {
      var multiple = q.tipo === "multiple";
      var lista = el("div", "enc-opciones");
      q.opciones.forEach(function (op, i) {
        var et = el("label", "enc-opcion");
        var inp = el("input");
        inp.type = multiple ? "checkbox" : "radio";
        inp.name = "enc-" + q.id;
        inp.value = op;
        if (multiple) inp.checked = Array.isArray(resp[q.id]) && resp[q.id].indexOf(op) > -1;
        else inp.checked = resp[q.id] === op;
        inp.addEventListener("change", function () {
          if (multiple) {
            var cur = Array.isArray(resp[q.id]) ? resp[q.id].slice() : [];
            var k = cur.indexOf(op);
            if (inp.checked && k < 0) cur.push(op);
            if (!inp.checked && k > -1) cur.splice(k, 1);
            resp[q.id] = cur;
          } else {
            resp[q.id] = op;
          }
          refrescar();
        });
        et.appendChild(inp);
        et.appendChild(el("span", null, op));
        lista.appendChild(et);
      });
      fs.appendChild(lista);
    }
    contenido.appendChild(fs);

    var acc = el("div", "enc-acciones");
    var atras = el("button", "boton boton-claro", paso === 0 ? "Volver" : "Atrás");
    atras.type = "button";
    atras.addEventListener("click", function () { paso = paso === 0 ? -1 : paso - 1; pintar(); });
    acc.appendChild(atras);
    var ultima = paso === n - 1;
    siguiente = el("button", "boton boton-primario", ultima ? "Enviar" : "Siguiente");
    siguiente.type = "button";
    siguiente.disabled = !valido(q);
    siguiente.addEventListener("click", function () {
      if (!valido(q)) return;
      if (ultima) enviar(); else { paso += 1; pintar(); }
    });
    acc.appendChild(siguiente);
    contenido.appendChild(acc);
    if (!q.obligatoria) contenido.appendChild(el("p", "enc-ayuda", "Esta pregunta es opcional."));
    enfocarTitulo();
  }

  function pintarFinal(estado) {
    limpiar();
    cabecera();
    var prueba = !(E.destino && E.destino.url);
    if (estado === "error") {
      contenido.appendChild(titulo("No pudimos enviar tus respuestas", "enc-titulo"));
      contenido.appendChild(el("p", "enc-texto", "Parece que no hay conexión. Tus respuestas siguen aquí: puedes intentarlo de nuevo."));
      var acc0 = el("div", "enc-acciones");
      var reint = el("button", "boton boton-primario", "Intentar de nuevo");
      reint.type = "button";
      reint.addEventListener("click", enviar);
      acc0.appendChild(reint);
      contenido.appendChild(acc0);
      enfocarTitulo();
      return;
    }
    contenido.appendChild(titulo(prueba ? "Modo de prueba" : "¡Gracias por responder!", "enc-titulo"));
    contenido.appendChild(el("p", "enc-texto", prueba
      ? "Esta encuesta todavía no está conectada a un formulario, así que tus respuestas no se guardaron."
      : "Tus respuestas son anónimas y se publicarán junto con las de las demás personas, de forma agregada."));
    var acc = el("div", "enc-acciones");
    var fin = el("button", "boton boton-primario", opciones.desdeAviso ? "Entrar a la página" : "Cerrar");
    fin.type = "button";
    fin.addEventListener("click", function () {
      M.cerrar(modal);
      if (typeof opciones.alTerminar === "function") opciones.alTerminar();
    });
    acc.appendChild(fin);
    contenido.appendChild(acc);
    enfocarTitulo();
  }

  function pintarYaRespondio() {
    limpiar();
    cabecera();
    contenido.appendChild(titulo("Ya respondiste la encuesta", "enc-titulo"));
    contenido.appendChild(el("p", "enc-texto", "Este navegador ya envió una respuesta. ¡Gracias! Para mantener los resultados confiables, cada persona responde una sola vez."));
    var acc = el("div", "enc-acciones");
    var fin = el("button", "boton boton-primario", opciones.desdeAviso ? "Entrar a la página" : "Cerrar");
    fin.type = "button";
    fin.addEventListener("click", function () {
      M.cerrar(modal);
      if (typeof opciones.alTerminar === "function") opciones.alTerminar();
    });
    acc.appendChild(fin);
    contenido.appendChild(acc);
    enfocarTitulo();
  }

  function enviar() {
    if (enviando) return;
    enviando = true;
    var d = E.destino || {};
    function listo(ok) {
      enviando = false;
      if (ok) {
        if (d.url) guardarLocal("movi-encuesta", "1");
        paso = E.preguntas.length;
        pintarFinal();
      } else {
        pintarFinal("error");
      }
    }
    if (!d.url) { listo(true); return; }
    var p;
    if (d.tipo === "google-forms") {
      var cuerpo = new URLSearchParams();
      E.preguntas.forEach(function (q) {
        var campo = d.campos && d.campos[q.id];
        var v = resp[q.id];
        if (!campo || v === undefined || v === "" || (Array.isArray(v) && !v.length)) return;
        if (Array.isArray(v)) v.forEach(function (x) { cuerpo.append(campo, x); });
        else cuerpo.append(campo, v);
      });
      p = fetch(d.url, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: cuerpo.toString() });
    } else {
      p = fetch(d.url, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(resp) });
    }
    p.then(function () { listo(true); }, function () { listo(false); });
  }

  function abrir(op) {
    if (!E || !E.preguntas || !E.preguntas.length) return;
    opciones = op || {};
    if (!modal) construir();
    resp = {};
    paso = -1;
    if (leerLocal("movi-encuesta") === "1") pintarYaRespondio(); else pintar();
    M.abrir(modal, { onEsc: salir });
  }

  // Botones de la página («Responder la encuesta»)
  document.addEventListener("click", function (ev) {
    var b = ev.target.closest && ev.target.closest("[data-abrir-encuesta]");
    if (b) { ev.preventDefault(); abrir({}); }
  });

  // Para repetir pruebas: abrir cualquier página con ?reiniciar=1
  if (/[?&]reiniciar=1/.test(location.search)) {
    try { localStorage.removeItem("movi-encuesta"); sessionStorage.removeItem("movi-aviso"); } catch (e) {}
  }

  window.MOVI_ENCUESTA = { abrir: abrir, respondida: function () { return leerLocal("movi-encuesta") === "1"; } };
})();

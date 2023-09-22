import { bajarCss } from "../utilidades/css.js?w=1";
import { tag } from "../utilidades/tag.js?w=1";
import { contenido } from "../classes/Contenido.js?w=1";
import { data } from "../data/Data.js?w=1";
import { GrabacionInfo } from "../classes/GrabacionInfo.js?w=1";
import { GrabacionCaja } from "../classes/GrabacionCaja.js?w=1";

export function pintarGrabacion(url) {
  contenido.grabacionUrl = url;

  if (contenido.grabacionCss) {
    traerGrabacionData();
  } else {
    const enlace = "./scripts/componentes/Grabacion.css?w=1";
    bajarCss(enlace, traerGrabacionData);
  }
}

function traerGrabacionData() {
  contenido.grabacionCss = true;
  data.traerItem(
    contenido.grabacionUrl,
    dibujarGrabacion,
    "/admin/grabaciones/url/"
  );
}

function dibujarGrabacion(data) {
  contenido.info.innerHTML = "";

  const divGTop = tag("div", contenido.info);
  divGTop.className = "grabacion";

  const grabacionInfo = new GrabacionInfo(divGTop, data, "pantalla");
  grabacionInfo.pintar();

  const divGEnlaces = tag("div", contenido.info);
  divGEnlaces.className = "grabacion-enlaces";

  dibujarGrabacionEnlaces(divGEnlaces, data);
}

function dibujarGrabacionEnlaces(el, data) {
  const divM = tag("div", el);

  const grabacionesCajaMusico = new GrabacionCaja(divM, data.grabacionesMusico);
  grabacionesCajaMusico.titulo = "Más grabaciones de " + data.musico.nombre;
  grabacionesCajaMusico.pintar();

  const divC = tag("div", el);

  const grabacionesCajaCategoria = new GrabacionCaja(divC, data.grabacionesCategoria);
  grabacionesCajaCategoria.titulo = "Más grabaciones de " + data.categoria.titulo;
  grabacionesCajaCategoria.pintar();
}

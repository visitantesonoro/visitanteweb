import { bajarCss } from "../utilidades/css.js?w=5";
import { tag } from "../utilidades/tag.js?w=5";
import { contenido } from "../classes/Contenido.js?w=5";
import { data } from "../data/Data.js?w=5";
import { GrabacionInfo } from "../classes/GrabacionInfo.js?w=5";
import { GrabacionCaja } from "../classes/GrabacionCaja.js?w=5";

export function pintarGrabacion(url) {
  contenido.grabacionUrl = url;

  if (contenido.grabacionCss) {
    traerGrabacionData();
  } else {
    const enlace = "./scripts/componentes/Grabacion.css?w=5";
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

  const grabacionesCajaMusico = new GrabacionCaja(divM, data.grabacionesMusico, data.grabacion._id);
  grabacionesCajaMusico.titulo = "Más grabaciones de " + data.musico.nombre;
  grabacionesCajaMusico.pintar();

  const divC = tag("div", el);

  const grabacionesCajaCategoria = new GrabacionCaja(divC, data.grabacionesCategoria, data.grabacion._id);
  grabacionesCajaCategoria.titulo = "Más grabaciones de la categoria  " + data.categoria.titulo;
  grabacionesCajaCategoria.pintar();
}

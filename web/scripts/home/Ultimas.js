import { bajarCss } from "../utilidades/css.js?w=5";
import { tag } from "../utilidades/tag.js?w=5";
import { contenido } from "../classes/Contenido.js?w=5";
import { GrabacionCaja } from "../classes/GrabacionCaja.js?w=5";
import { data } from "../data/Data.js?w=5";

export function pintarUltimas() {
  if (contenido.UltimasCss) {
    traerUltimas();
  } else {
    const enlace = "./scripts/home/Ultimas.css?w=5";
    bajarCss(enlace, traerUltimas);
  }
}

function traerUltimas() {
  contenido.UltimasCss = true;
  data.traerLista(dibujarUltimas, "/admin/grabaciones/ultimas/");
}

function dibujarUltimas(data) {
  const divC = tag("div", contenido.ultimasDiv);
  divC.className = "ultimas";

  const grabacionesCajaCatalogo = new GrabacionCaja(
    divC,
    data.grabaciones,
    null
  );
  grabacionesCajaCatalogo.titulo = "Últimas entradas";
  grabacionesCajaCatalogo.pintar();
}

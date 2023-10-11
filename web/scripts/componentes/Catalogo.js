import { bajarCss } from "../utilidades/css.js?w=6";
import { tag } from "../utilidades/tag.js?w=6";
import { contenido } from "../classes/Contenido.js?w=6";
import { data } from "../data/Data.js?w=6";
import { GrabacionCaja } from "../classes/GrabacionCaja.js?w=6";

export function pintarCatalogo() {
  if (contenido.catalogoCss) {
    traerCatalogo();
  } else {
    const enlace = "./scripts/componentes/Catalogo.css?w=6";
    bajarCss(enlace, traerCatalogo);
  }
}

function traerCatalogo() {
  contenido.catalogoCss = true;
  data.traerLista(dibujarCatalogo, "/admin/grabaciones/");
}

function dibujarCatalogo(data) {
  const divC = tag("div", contenido.info);
  divC.className = "catalogo";

  const grabacionesCajaCatalogo = new GrabacionCaja(
    divC,
    data.grabaciones,
    null
  );
  grabacionesCajaCatalogo.titulo = "Catalogo";
  grabacionesCajaCatalogo.pintar();
}

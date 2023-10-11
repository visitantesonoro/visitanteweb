import { bajarCss } from "../utilidades/css.js?w=5";
import { tag } from "../utilidades/tag.js?w=5";
import { contenido } from "../classes/Contenido.js?w=5";
import { data } from "../data/Data.js?w=5";
import { GrabacionCaja } from "../classes/GrabacionCaja.js?w=5";

export function pintarCatalogo() {
  if (contenido.catalogoCss) {
    traerCatalogo();
  } else {
    const enlace = "./scripts/componentes/Catalogo.css?w=5";
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

import { bajarCss } from "../utilidades/css.js?w=1";
import { tag } from "../utilidades/tag.js?w=1";
import { contenido } from "../classes/Contenido.js?w=1";
import { data } from "../data/Data.js?w=1";


export function pintarPerfil(id) {
  contenido.perfilId = id;

  if (contenido.perfilCss) {
    traerPefilData();
  } else {
    const enlace = "./scripts/componentes/Header.css?w=1";
    bajarCss(enlace, traerPefilData);
  }
}

function traerPefilData() {
  contenido.perfilCss = true;
  data.traerItem('123', dibujarPerfil, "/admin/grabaciones/");
}

function dibujarPerfil(data) {
  debugger;
  contenido.perfilId;
}

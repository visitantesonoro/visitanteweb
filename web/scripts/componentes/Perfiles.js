import { bajarCss } from "../utilidades/css.js?w=5";
import { tag } from "../utilidades/tag.js?w=5";
import { contenido } from "../classes/Contenido.js?w=5";
import { data } from "../data/Data.js?w=5";
import { baseUri } from "../../enviroment.js?w=5";
import { uploadUri } from '../../enviroment.js?w=5';
import { Grabaciones } from "../classes/Grabaciones.js?w=5";

export function pintarPerfiles() {
  if (contenido.perfilesCss) {
    traerPefilData();
  } else {
    const enlace = "./scripts/componentes/Perfiles.css?w=5";
    bajarCss(enlace, traerPefilData);
  }
}

function traerPefilData() {
  contenido.perfilesCss = true;
  data.traerLista(dibujarPerfil, "/admin/musicos/");
}

function dibujarPerfil(data) {
  contenido.info.innerHTML = "";

  const divG = tag("div", contenido.info);
  divG.className = "perfiles";

  data.map(perfil =>{
    dibujarPerfilModulo(divG, perfil)
  })
}

function dibujarPerfilModulo(el, info){
    const div = tag("div", el);
    div.className = "perfiles-modulo";
    div.addEventListener("click", ()=>{
        window.location.href = "#/perfil/" + info.url;
    })

    const img = tag("img", div);
    img.src = `${uploadUri}/${info.imagen}`;

    const h1 = tag("h1", div);
    h1.innerHTML = info.nombre;
}

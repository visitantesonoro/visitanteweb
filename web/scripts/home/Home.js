import { bajarCss } from "../utilidades/css.js?w=1";
import { tag } from "../utilidades/tag.js?w=1";
import { contenido } from "../classes/Contenido.js?w=1";
import { textos } from "../utilidades/textos.js?w=1";
import { map } from "../mapa/Mapa.js?w=1";

export function pintarHome() {
  const enlace = "./scripts/home/Home.css?w=1";
  bajarCss(enlace, dibujarHome);
}

function dibujarHome() {
  contenido.info.innerHTML = "";

  const div = tag("div", contenido.info);
  div.className = "home";
  div.innerHTML = "Home";
  div.addEventListener("click", ()=>{
    console.log(map);
  })
}

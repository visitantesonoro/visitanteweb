import { bajarCss } from "../utilidades/css.js?w=6";
import { tag } from "../utilidades/tag.js?w=6";
import { contenido } from "../classes/Contenido.js?w=6";
import { textos } from "../utilidades/textos.js?w=6";

export function pintarMapaHome() {
  const enlace = "./scripts/home/MapaHome.css?w=6";
  bajarCss(enlace, dibujarMapaHome);
}

function dibujarMapaHome() {
  contenido.mapaHome.className = "mapa-home";
  
  const h1 = tag("h1", contenido.mapaHome);
  h1.innerHTML = "Explora nuestro catálogo desde el mapa interactivo";

  const div = tag("div", contenido.mapaHome);

  const img = tag("img", div);
  img.src =  "./assets/imgs/mapa.jpg";
  img.addEventListener("click", ()=>{
    window.location.href = "#/mapa";
  })
}
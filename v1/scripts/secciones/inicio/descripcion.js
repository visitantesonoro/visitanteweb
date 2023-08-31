import { tag } from "../../componentes/utilidades/tag.js?n=17";
import { bajarCss } from "../../componentes/utilidades/css.js?n=17";
import { textos } from "../../managers/Textos.js?n=17";

let contenedor;

export function pintarDescripcion(el) {
  contenedor = el;

  const enlace = "./scripts/secciones/inicio/descripcion.css";
  bajarCss(enlace, dibujarDescripcion);
}

function dibujarDescripcion() {
  contenedor.className = "pagina-principal-section";

  let div1 = tag("div", contenedor);

  let p = tag("p", div1);
  p.innerHTML = textos.textoDescEs.toUpperCase();

  let div2 = tag("div", contenedor);

  let video = tag("video", div2);
  video.volume = 0;
  video.loop = true;
  video.src = "./assets/videos/0.mp4";
  video.play();
}

import { bajarCss } from "../utilidades/css.js?w=5";
import { tag } from "../utilidades/tag.js?w=5";
import { contenido } from "../classes/Contenido.js?w=5";
import { textos } from "../utilidades/textos.js?w=5";
import { pintarUltimas } from "./Ultimas.js?w=5";
import { pintarPlanes } from "./Planes.js?w=5";
import { pintarMapaHome } from "./MapaHome.js?w=5";

export function pintarHome() {
  const enlace = "./scripts/home/Home.css?w=5";
  bajarCss(enlace, dibujarHome);
}

function dibujarHome() {
  contenido.info.innerHTML = "";

  const div = tag("div", contenido.info);
  div.className = "trailer";
  dibujarTrailer(div);

  contenido.ultimasDiv = tag("div", contenido.info);
  pintarUltimas();

  contenido.planes = tag("div", contenido.info);
  pintarPlanes();

  contenido.mapaHome = tag("div", contenido.info);
  pintarMapaHome();
}

function dibujarTrailer(contenedor) {
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

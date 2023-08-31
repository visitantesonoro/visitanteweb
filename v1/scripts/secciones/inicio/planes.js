import { tag } from "../../componentes/utilidades/tag.js?n=17";
import { bajarCss } from "../../componentes/utilidades/css.js?n=17";
import { textos } from "../../managers/Textos.js?n=17";

let contenedor;

export function pintarPlanes(el) {
  contenedor = el;

  const enlace = "./scripts/secciones/inicio/planes.css";
  bajarCss(enlace, dibujarPlanes);
}

function dibujarPlanes() {
  contenedor.className = "pagina-principal-planes";

  let div1 = tag("div", contenedor);

  let img1 = tag("img", div1);
  img1.src = "./assets/imgs/slide/0.jpg";

  let p1 = tag("p", div1);
  p1.innerHTML = "plan1";

  let div2 = tag("div", contenedor);

  let img2 = tag("img", div2);
  img2.src = "./assets/imgs/slide/1.jpg";

  let p2 = tag("p", div2);
  p2.innerHTML = "plan1";

  let div3 = tag("div", contenedor);

  let img3 = tag("img", div3);
  img3.src = "./assets/imgs/slide/2.jpg";

  let p3 = tag("p", div3);
  p3.innerHTML = "plan1";

}

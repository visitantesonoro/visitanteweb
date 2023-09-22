import { tag } from "../utilidades/tag.js?w=1";
import { bajarCss } from "../utilidades/css.js?w=1";
import { baseUri } from "../../enviroment.js?=w=1";
import { formatearFecha } from "../utilidades/fecha.js?w=1";

export class GrabacionCaja {
  constructor(contenedor, data, estilo) {
    this.contenedor = contenedor;
    this.data = data;
    this.estilo = estilo;

    const enlace = "./scripts/classes/GrabacionCaja.css?w=1";
    bajarCss(enlace, null);
  }

  pintar() {
    this.contenedor.innerHTML = "";

    const divG = tag("div", this.contenedor);
    divG.className = "grabaciones-caja";

    if (this.titulo) {
      const h1 = tag("h1", divG);
      h1.innerHTML = this.titulo;
    }

    const divC = tag("div", divG);

    for (let grabacion of this.data) {
      const div = tag("div", divC);
      div.addEventListener("click", () => {
        window.location.href = "#/grabaciones/" + grabacion.url;
      });

      const divPlayC = tag("div", div);

      const imgPlay = tag("img", divPlayC);
      imgPlay.src = "./assets/imgs/player/play.png";

      const h2 = tag("h2", div);
      h2.innerHTML = grabacion.titulo;

      const p = tag("p", div);
      p.innerHTML = grabacion.lugar;
    }
  }
}

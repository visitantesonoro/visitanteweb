import { tag } from "../utilidades/tag.js?w=5";
import { bajarCss } from "../utilidades/css.js?w=5";
import { player } from "../player/Player.js?w=5";

// import { baseUri } from "../../enviroment.js?=w=1";
// import { formatearFecha } from "../utilidades/fecha.js?w=5";

export class GrabacionCaja {
  constructor(contenedor, data, grabacionS) {
    this.contenedor = contenedor;
    this.data = data;
    this.grabacionS = grabacionS;

    const enlace = "./scripts/classes/GrabacionCaja.css?w=5";
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
      if (grabacion._id !== this.grabacionS) {
        const div = tag("div", divC);

        const divPlayC = tag("div", div);

        const imgPlay = tag("img", divPlayC);
        imgPlay.src = "./assets/imgs/player/play.png";
        imgPlay.addEventListener("click", () => {
          player.ponerASonarDesdeComponente(
            imgPlay,
            grabacion.musico,
            grabacion.url
          );
        });

        const h2 = tag("h2", div);
        h2.innerHTML = grabacion.titulo;
        h2.addEventListener("click", () => {
          window.location.href = "#/grabaciones/" + grabacion.url;
        });

        const p = tag("p", div);
        p.innerHTML = grabacion.lugar;
      }
    }
  }
}

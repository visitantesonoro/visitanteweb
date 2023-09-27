import { tag } from "../utilidades/tag.js?w=1";
import { bajarCss } from "../utilidades/css.js?w=1";
import { baseUri } from "../../enviroment.js?=w=1";
import { formatearFecha } from "../utilidades/fecha.js?w=1";
import { player } from "../player/Player.js?w=1";

export class GrabacionInfo {
  constructor(contenedor, data, estilo) {
    this.contenedor = contenedor;
    this.data = data;
    this.estilo = estilo;

    const enlace = "./scripts/classes/GrabacionInfo.css?w=1";
    bajarCss(enlace, null);
  }

  pintar() {
    const thisObj = this;

    this.contenedor.innerHTML = "";

    const divG = tag("div", this.contenedor);
    divG.className = "grabacion-info";

    const img = tag("img", divG);
    img.className = "grabacion-info-musico-img";
    img.src = `${baseUri}/${this.data.musico.imagen}`;

    const imgPlay = tag("img", divG);
    imgPlay.className = "grabacion-info-play-img";
    imgPlay.src = "./assets/imgs/player/play.png";
    imgPlay.addEventListener("click", () => {
      player.ponerASonarDesdeComponente(
        imgPlay,
        thisObj.data.musico._id,
        thisObj.data.grabacion.url
      );
    });

    const divT = tag("div", divG);
    divT.className = "grabacion-info-titulo";

    const h1 = tag("h1", divT);
    h1.innerHTML = this.data.grabacion.titulo;

    const h2 = tag("h2", divT);
    h2.innerHTML = this.data.musico.nombre;
    h2.addEventListener("click", () => {
      window.location.href = "#/perfil/" + this.data.musico.url;
    });

    const fechaStr = formatearFecha(this.data.grabacion.fecha);

    const pFecha = tag("p", divT);
    pFecha.innerHTML = fechaStr;

    const divDesc = tag("div", divG);
    divDesc.className = "grabacion-info-descripcion";

    const p = tag("p", divDesc);
    p.innerHTML = this.data.grabacion.descripcion;
  }
}

import { tag } from "../utilidades/tag.js?w=6";
import { bajarCss } from "../utilidades/css.js?w=6";
import { formatearFecha } from "../utilidades/fecha.js?w=6";
import { obtenerDuracion } from "../utilidades/audio.js?w=6";
import { player } from "../player/Player.js?w=6";

export class Grabaciones {
  grabaciones = [];

  constructor(grabaciones) {
    this.grabaciones = grabaciones;

    const enlace = "./scripts/classes/Grabaciones.css?w=6";
    bajarCss(enlace, null);
  }

  pintarLista(el) {
    const divC = tag("div", el);
    divC.className = "grabaciones-lista";

    this.grabaciones.map((info, index) => {
      const divG = tag("div", divC);

      const pIndex = tag("p", divG);
      pIndex.innerHTML = index + 1;

      const grabacion = new Grabacion(info);
      grabacion.pintar(divG);
    });
  }
}

class Grabacion {
  constructor(info) {
    this.info = info;
    this.campos = ["titulo", "lugar", "fecha", "audio"];
  }

  async pintar(el) {
    const thisObj = this;

    this.el = el;
    this.el.addEventListener("click", this.ponerASonar.bind(this));
    this.duracion = await obtenerDuracion(this.info.audio);
    this.organizarInfo();
    this.dibujarFila();
  }

  ponerASonar() {
    player.ponerASonarDesdePlaylist(this.el, this.info.musico, this.info.url);
  }

  organizarInfo() {
    this.camposObj = [];

    for (const prop in this.info) {
      if (this.campos.includes(prop)) {
        let valor;
        let pos;

        if (prop === "fecha") {
          valor = formatearFecha(this.info[prop]);
          pos = 3;
        } else if (prop === "audio") {
          valor = this.duracion;
          pos = 4;
        } else if (prop === "lugar") {
          valor = this.info[prop];
          pos = 2;
        } else {
          valor = this.info[prop];
          pos = 1;
        }

        this.camposObj.push({ valor, pos });
      }
    }
  }

  dibujarFila() {
    this.camposObj
      .sort((c1, c2) => c1.pos - c2.pos)
      .map((campo) => {
        const p = tag("p", this.el);
        p.innerHTML = campo.valor;
      });
  }
}

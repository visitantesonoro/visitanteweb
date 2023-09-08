import { tag } from "../utilidades/tag.js?w=1";
import { bajarCss } from "../utilidades/css.js?w=1";
import { formatearFecha } from "../utilidades/fecha.js?w=1";
import { obtenerDuracion } from "../utilidades/audio.js?w=1";

export class Grabaciones {
  grabaciones = [];

  constructor(grabaciones) {
    this.grabaciones = grabaciones;

    const enlace = "./scripts/classes/Grabaciones.css?w=1";
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
    this.duracion = await obtenerDuracion(this.info.audio);

    this.camposObj = [];

    for (const prop in this.info) {
      if (this.campos.indexOf(prop) >= 0) {
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

        const campo = {
          valor,
          pos,
        };

        this.camposObj.push(campo);
      }
    }

    this.camposObj
      .sort((c1, c2) => c1.pos - c2.pos)
      .map((campo) => {
        const p = tag("p", el);
        p.innerHTML = campo.valor;
      });
  }
}

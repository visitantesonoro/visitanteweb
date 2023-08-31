import { bajarCss } from "../componentes/utilidades/css.js?n=17";
import { tag } from "../componentes/utilidades/tag.js?n=17";
import { textos } from "../managers/Textos.js?n=17";

import { pintarDescripcion } from "../secciones/inicio/descripcion.js?n=17";
import { pintarPlanes } from "../secciones/inicio/planes.js?n=17";

class Info {
  seccion;
  yaPintoLogo = false;

  pintar() {
    const enlace = "./scripts/classes/Info.css";
    bajarCss(enlace, this.pintarEntrada.bind(this));
  }

  pintarEntrada() {
    this.infoC.innerHTML = "";
    this.infoC.className = "infoC";

    this.entradaC = tag("div", this.infoC);
    this.entradaC.className = "entrada-div-texto";

    const img = tag("img", this.entradaC);
    img.src = "./assets/imgs/auriculares.png";

    const p = tag("p", this.entradaC);
    p.innerHTML = textos.textoInicioEs;
  }

  pintarPaginaInicio(){

    this.infoC.innerHTML = "";

    let sectionD = tag("section", this.infoC);
    sectionD.style.animation = "aparecer 3s ease-in forwards"

    pintarDescripcion(sectionD);

    let sectionP = tag("section", this.infoC);

    pintarPlanes(sectionP);
  }
}

export const info = new Info();

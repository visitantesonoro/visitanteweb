import { bajarCss } from "../componentes/utilidades/css.js?n=17";
import { tag } from "../componentes/utilidades/tag.js?n=17";
import { player } from "./Player.js?n=17";
import { info } from "./Info.js?n=17";
import { header } from "./Header.js?n=17";
import { escogerSeccion } from "../app.js?n=17";

class Logo {

  pintarInicio = true;

  pintar() {
    const enlace = "./scripts/classes/Logo.css";
    bajarCss(enlace, this.pintarLogo.bind(this));
  }

  pintarLogo() {
    this.logoC.className = "logoC";

    const canvasC = tag('div', this.logoC);
    player.canvasC = canvasC;

    const logoG = tag('div', this.logoC);
    logoG.className = 'logoG';

    const divLogo = tag("div", logoG);
    divLogo.className = "logoC-div-logo";

    const img = tag("img", divLogo);
    img.src = "./assets/imgs/logo-inicio.png";
    img.addEventListener("click", this.onClickLogo.bind(this));

    const h2 = tag("h2", divLogo);
    h2.innerHTML = "VISITANTE SONORO";
    h2.addEventListener("click", this.onClickLogo.bind(this));

    escogerSeccion();
  }

  onClickLogo(){
    header.mostrarHeader();
    player.yaHuboClick = true;
    if(this.pintarInicio){
      info.pintarPaginaInicio();
    }
    
    player.ponerCancionRandom();
    player.pintarInfoCancion();    
  }
}

export const logo = new Logo();

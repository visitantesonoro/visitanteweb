import { bajarCss } from "../componentes/utilidades/css.js?n=17";
import { tag } from "../componentes/utilidades/tag.js?n=17";
import { info } from "../classes/Info.js?n=17";
import { mapa } from "../classes/Mapa.js?n=17";
import { musicos } from "../classes/Musicos.js?n=17";
import { datos } from "../data/Datos.js?n=17";
import { textos } from "../managers/Textos.js?n=17";

class Menu {
  menuActivo = false;

  pintar() {
    const enlace = "./scripts/classes/Menu.css";
    bajarCss(enlace, this.pintarMenu.bind(this));
  }

  pintarMenu() {
    this.menuC.className = "menu";

    const nav = tag("nav", this.menuC);

    const aH = tag("a", nav);
    aH.innerHTML = "Home";
    aH.addEventListener("click", () => {
      this.conmutarMenu();

      if (info.seccion === "mapa") {
        mapa.mapa.style.animation = "slide-up 900ms ease-out forwards";
      }

      info.seccion = "home";
      window.location.href = "/#/home";
    });

    const a = tag("a", nav);
    a.innerHTML = "Mapa";
    a.addEventListener("click", () => {
      this.conmutarMenu();
       window.location.href = "/#/mapa";
    });

    const aP = tag("a", nav);
    aP.innerHTML = "Perfiles";
    aP.addEventListener("click", () => {
      this.conmutarMenu();
      if (info.seccion === "mapa") {
        mapa.mapa.style.animation = "slide-up 900ms ease-out forwards";
      }

      mapa.mapa.style.animation = "slide-up 900ms ease-out forwards";

      window.location.href = "/#/perfiles";
    });
  }

  conmutarMenu() {
    if (this.menuActivo) {
      this.menuActivo = false;
      this.menuC.style.animation = "slide-up 300ms ease-out forwards";
    } else {
      this.menuActivo = true;
      this.menuC.style.animation = "slide-down 200ms ease-out forwards";
    }
  }
}

export const menu = new Menu();

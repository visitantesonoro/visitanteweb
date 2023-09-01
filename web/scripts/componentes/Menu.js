import { bajarCss } from "../utilidades/css.js?w=1";
import { tag } from "../utilidades/tag.js?w=1";
import { contenido } from "../classes/Contenido.js?w=1";

export function pintarMenu() {
  const enlace = "./scripts/componentes/Menu.css?w=1";
  bajarCss(enlace, dibujarMenu);
}

function dibujarMenu() {
  contenido.nav.className = "menu";

  const aH = tag("a", contenido.nav);
  aH.innerHTML = "Home";
  aH.addEventListener("click", () => {
    conmutarMenu();
    window.location.href = "#/home";
    // this.conmutarMenu();

    // if (info.seccion === "mapa") {
    //   mapa.mapa.style.animation = "slide-up 900ms ease-out forwards";
    // }

    // info.seccion = "home";
    // window.location.href = "/#/home";
  });

  const a = tag("a", contenido.nav);
  a.innerHTML = "Mapa";
  a.addEventListener("click", () => {
    conmutarMenu();
    window.location.href = "#/mapa";
  });

  const aP = tag("a", contenido.nav);
  aP.innerHTML = "Perfiles";
  aP.addEventListener("click", () => {
    // this.conmutarMenu();
    // if (info.seccion === "mapa") {
    //   mapa.mapa.style.animation = "slide-up 900ms ease-out forwards";
    // }

    // mapa.mapa.style.animation = "slide-up 900ms ease-out forwards";

    // window.location.href = "/#/perfiles";
  });
}

export function conmutarMenu() {
  if (contenido.menuActivo) {
    contenido.menuActivo = false;
    contenido.nav.style.animation = "slide-up 300ms ease-out forwards";
  } else {
    contenido.menuActivo = true;
    contenido.nav.style.animation = "slide-down 200ms ease-out forwards";
  }
}

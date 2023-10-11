import { bajarCss } from "../utilidades/css.js?w=5";
import { tag } from "../utilidades/tag.js?w=5";
import { contenido } from "../classes/Contenido.js?w=5";

export function pintarMenu() {
  const enlace = "./scripts/componentes/Menu.css?w=5";
  bajarCss(enlace, dibujarMenu);
}

function dibujarMenu() {
  const menu = [
    {
      titulo: "Home",
      ref: "#/home",
    },
    {
      titulo: "Mapa",
      ref: "#/mapa",
    },
    {
      titulo: "Perfiles",
      ref: "#/perfiles",
    },
    {
      titulo: "Catalogo",
      ref: "#/catalogo",
    },
    {
      titulo: "Planes",
      ref: "#/planes",
    },
  ];

  contenido.nav.className = "menu";

  menu.map((item) => {
    const aH = tag("a", contenido.nav);
    aH.innerHTML = item.titulo;
    aH.addEventListener("click", () => {
      conmutarMenu();
      window.location.href = item.ref;
    });
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

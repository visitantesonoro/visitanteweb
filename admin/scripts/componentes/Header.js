import { tag } from "../utilidades/tag.js?ad=6";
import { bajarCss } from "../utilidades/css.js?ad=6";
import { pintarMusicos } from "./Musicos.js?ad=6";
import { pintarGrabaciones } from "./Grabaciones.js?ad=6";
import { pintarCategorias } from "./Categorias.js?ad=6";
import { pintarTags } from "./Tags.js?ad=6";
import { logout } from "../data/dataAdmin.js?ad=6";

let elPadre;

export function pintarHeader(padre) {
  elPadre = padre;

  const enlace = "./scripts/componentes/Header.css?ad=6";
  bajarCss(enlace, dibujarHeader);
}

function dibujarHeader() {
  const menu = [
    {
      id: "musicos",
      titulo: "Músicos",
      fx: pintarMusicos,
      activo: true,
    },
    {
      id: "grabaciones",
      titulo: "Grabaciones",
      fx: pintarGrabaciones,
      activo: false,
    },
    {
      id: "categorias",
      titulo: "Categorias",
      fx: pintarCategorias,
      activo: false,
    },
    {
      id: "tags",
      titulo: "Tags",
      fx: pintarTags,
      activo: false,
    },
  ];

  const header = tag("header", elPadre);

  menu.map((item) => {
    const div = tag("div", header);
    div.className = item.activo ? "menu activo" : "menu";
    div.innerHTML = item.titulo;
    div.addEventListener("click", () => {
      var current = document.getElementsByClassName("activo");
      current[0].className = current[0].className.replace(" activo", "");

      div.className = "menu activo";
      item.fx();
    });

    if(item.activo){
      item.fx();
    }
  });

  const divS = tag("div", header);
  divS.className = "salir";

  const spanS = tag("span", divS);
  spanS.innerHTML = "Salir";
  spanS.addEventListener("click", () => {
    logout();
  });
}

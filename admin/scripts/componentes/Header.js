import { tag } from "../utilidades/tag.js?ad=1";
import { bajarCss } from "../utilidades/css.js?ad=1";
import { pintarMusicos } from "./Musicos.js?ad=1";

let elPadre;

export function pintarHeader(padre) {
  elPadre = padre;

  const enlace = "./scripts/componentes/Header.css?ad=1";
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
  });

  pintarMusicos();
}

function pintarGrabaciones() {
  console.log(menu.titulo);
}

function pintarCategorias() {
  console.log(menu.titulo);
}

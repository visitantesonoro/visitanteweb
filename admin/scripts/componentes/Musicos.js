import { tag } from "../utilidades/tag.js?ad=1";
import { contenido } from "../classes/Contenido.js?ad=1";
import { data } from "../classes/Data.js?ad=1";
import { Forma } from "../classes/Forma.js?ad=1";
import { bajarCss } from "../utilidades/css.js?ad=1";

export function pintarMusicos() {
  contenido.main.innerHTML = "";

  const enlace = "./scripts/componentes/Musicos.css?ad=1";
  bajarCss(enlace, traerDataMusicos);
}

function traerDataMusicos() {
  data.traerMusicos(dibujarMusicos);
}

function dibujarMusicos(info) {
  const div = tag("div", contenido.main);
  div.className = "musicos";

  const divC = tag("div", div);
  divC.className = "musicos-crear";

  const span = tag("span", divC);
  span.innerHTML = "Crear";
  span.addEventListener("click", () => {
    const forma = new Forma();
    forma.data = null;
    forma.agregarCampo("text", "nombre", "", "Nombre");
    forma.agregarCampo("text", "imagen", "", "Imagen");
    forma.fx = data.crearMusico;
    forma.editando = false;
    forma.pintar();
  });

  const divMusicos = tag("div", div);
  divMusicos.className = "musicos-general";

  info.forEach((musico) => {
    const divM = tag("div", divMusicos);
    divM.className = "musicos-caja";
    divM.addEventListener("click", () => {
      const forma = new Forma();
      forma.data = musico;
      forma.agregarCampo("text", "nombre", musico.nombre, "Nombre");
      forma.agregarCampo("text", "imagen", musico.imagen, "Imagen");
      forma.fx = data.editarMusico;
      forma.borrarFx = data.borrarMusico;
      forma.editando = true;
      forma.pintar();
    });

    const h1 = tag("h1", divM);
    h1.innerHTML = musico.nombre;
  });
}

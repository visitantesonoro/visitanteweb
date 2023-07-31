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
  data.traerLista(dibujarMusicos, "/admin/musicos/");
}

function dibujarMusicos(info) {
  const div = tag("div", contenido.main);
  div.className = "musicos";

  const divC = tag("div", div);
  divC.className = "crear-btn";

  const span = tag("span", divC);
  span.innerHTML = "Crear";
  span.addEventListener("click", () => {
    formaMusicos(null);
    // const forma = new Forma();
    // forma.data = null;
    // forma.agregarCampo("text", "nombre", "", "Nombre", true);
    // forma.agregarCampo("text", "imagen", "", "Imagen", false);
    // forma.fx = data.grabarMusico;
    // forma.despuesFx = pintarMusicos;
    // forma.editando = false;
    // forma.pintar();
  });

  const divMusicos = tag("div", div);
  divMusicos.className = "musicos-general";

  info.forEach((musico) => {
    const divM = tag("div", divMusicos);
    divM.className = "musicos-caja";
    divM.addEventListener("click", () => {
      formaMusicos(musico);
      // const forma = new Forma();
      // forma.data = musico;
      // forma.agregarCampo("text", "nombre", musico.nombre, "Nombre", true);
      // forma.agregarCampo("text", "imagen", musico.imagen, "Imagen", false);
      // forma.fx = data.grabarMusico;
      // forma.uri = '/admin/musicos/borrar/';
      // forma.borrarFx = data.borrarItem;
      // forma.despuesFx = pintarMusicos;
      // forma.editando = true;
      // forma.pintar();
    });

    const h1 = tag("h1", divM);
    h1.innerHTML = musico.nombre;
  });
}

function formaMusicos(musico) {
  const forma = new Forma();
  forma.data = musico ? musico : null;
  forma.agregarCampo(
    "text",
    "nombre",
    musico ? musico.nombre : "",
    "Nombre",
    true
  );
  forma.agregarCampo(
    "text",
    "imagen",
    musico ? musico.imagen : "",
    "Imagen",
    false
  );
  forma.agregarCampo(
    "text",
    "descripcion",
    musico ? musico.descripcion : "",
    "Descripción",
    false
  );
  forma.fx = data.grabarMusico;
  forma.uri = "/admin/musicos/borrar/";
  forma.borrarFx = data.borrarItem;
  forma.despuesFx = pintarMusicos;
  forma.editando = musico ? true : false;
  forma.pintar();
}

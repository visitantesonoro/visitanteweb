import { tag } from "../utilidades/tag.js?ad=6";
import { contenido } from "../classes/Contenido.js?ad=6";
import { data } from "../data/Data.js?ad=6";
import { Forma } from "../classes/Forma.js?ad=6";
import { bajarCss } from "../utilidades/css.js?ad=6";
import { baseUri } from "../../enviroment.js?ad=6";
import { uploadUri } from "../../enviroment.js?ad=6";

export function pintarMusicos() {
  contenido.main.innerHTML = "";

  const enlace = "./scripts/componentes/Musicos.css?ad=6";
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
  });

  const divMusicos = tag("div", div);
  divMusicos.className = "musicos-general";

  info.forEach((musico) => {
    const divM = tag("div", divMusicos);
    divM.className = "musicos-caja";
    divM.addEventListener("click", () => {
      formaMusicos(musico);
    });

    const h1 = tag("h1", divM);
    h1.innerHTML = musico.nombre;

    const img = tag("img", divM);
    img.src = `${uploadUri}/${musico.imagen}`;
  });
}

function formaMusicos(musico) {
  const imgOp = {
    id: "imagen",
    tipo: "img",
    ext: [".jpg, .png, .jpeg"],
  };

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
    "file",
    "imagen",
    musico ? musico.imagen : "",
    "Imagen",
    false,
    imgOp
  );
  forma.agregarCampo(
    "textarea",
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

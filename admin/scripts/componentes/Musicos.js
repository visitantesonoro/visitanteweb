import { tag } from "../utilidades/tag.js?ad=1";
import { contenido } from "../classes/Contenido.js?ad=1";
import { data } from "../data/Data.js?ad=1";
import { Forma } from "../classes/Forma.js?ad=1";
import { bajarCss } from "../utilidades/css.js?ad=1";
import { baseUri } from "../../enviroment.js?ad=1";

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
    img.src = `${baseUri}/${musico.imagen}`
  });
}

function formaMusicos(musico) {

  const imgOp = {
    id:"imagen",
    tipo:"img",
    ext:[".jpg, .png, .jpeg"]
  }

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
    true,
    imgOp
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

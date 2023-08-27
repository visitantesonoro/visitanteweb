import { tag } from "../utilidades/tag.js?ad=1";
import { contenido } from "../classes/Contenido.js?ad=1";
import { data } from "../data/Data.js?ad=1";
import { Forma } from "../classes/Forma.js?ad=1";
import { bajarCss } from "../utilidades/css.js?ad=1";
import { baseUri } from "../../enviroment.js?ad=1";

export function pintarTags() {
  contenido.main.innerHTML = "";

  const enlace = "./scripts/componentes/Tags.css?ad=1";
  bajarCss(enlace, traerDataTags);
}

function traerDataTags() {
  data.traerLista(dibujarTags, "/admin/tags/");
}

function dibujarTags(info) {

  const div = tag("div", contenido.main);
  div.className = "categorias";

  const divC = tag("div", div);
  divC.className = "crear-btn";

  const span = tag("span", divC);
  span.innerHTML = "Crear";
  span.addEventListener("click", () => {
    formaTags(null);
  });

  const divCategorias = tag("div", div);
  divCategorias.className = "categorias-general";

  info.forEach((tagDB) => {
    const divM = tag("div", divCategorias);
    divM.className = "categorias-caja";
    divM.addEventListener("click", () => {
        formaTags(tagDB);
    });

    const h1 = tag("h1", divM);
    h1.innerHTML = tagDB.titulo;

    const img = tag("img", divM);
    img.src = (tagDB.imagen) ? `${baseUri}/${tagDB.imagen}`: "";
  });
}

function formaTags(tag) {

  const imgOp = {
    id:"imagen",
    tipo:"img",
    ext:[".jpg, .png, .jpeg"]
  }

  const forma = new Forma();
  forma.data = tag ? tag : null;
  forma.agregarCampo(
    "text",
    "titulo",
    tag ? tag.titulo : "",
    "Título",
    true
  );
  forma.agregarCampo(
    "text",
    "descripcion",
    tag ? tag.descripcion : "",
    "Descripción",
    false
  );
  forma.agregarCampo(
    "file",
    "imagen",
    tag ? tag.imagen : "",
    "Imagen",
    false,
    imgOp
  );
  forma.fx = data.grabarTag;
  forma.uri = "/admin/tags/borrar/";
  forma.borrarFx = data.borrarItem;
  forma.despuesFx = pintarTags;
  forma.editando = tag ? true : false;
  forma.pintar();
}

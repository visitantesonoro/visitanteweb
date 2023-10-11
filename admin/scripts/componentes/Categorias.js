import { tag } from "../utilidades/tag.js?ad=6";
import { contenido } from "../classes/Contenido.js?ad=6";
import { data } from "../data/Data.js?ad=6";
import { Forma } from "../classes/Forma.js?ad=6";
import { bajarCss } from "../utilidades/css.js?ad=6";
import { baseUri } from "../../enviroment.js?ad=6";

export function pintarCategorias() {
  contenido.main.innerHTML = "";

  const enlace = "./scripts/componentes/Categorias.css?ad=6";
  bajarCss(enlace, traerDataCategorias);
}

function traerDataCategorias() {
  data.traerLista(dibujarCategorias, "/admin/categorias/");
}

function dibujarCategorias(info) {
  const div = tag("div", contenido.main);
  div.className = "categorias";

  const divC = tag("div", div);
  divC.className = "crear-btn";

  const span = tag("span", divC);
  span.innerHTML = "Crear";
  span.addEventListener("click", () => {
    formaCategorias(null);
  });

  const divCategorias = tag("div", div);
  divCategorias.className = "categorias-general";

  info.forEach((categoria) => {
    const divM = tag("div", divCategorias);
    divM.className = "categorias-caja";
    divM.addEventListener("click", () => {
      formaCategorias(categoria);
    });

    const h1 = tag("h1", divM);
    h1.innerHTML = categoria.titulo;

    const img = tag("img", divM);
    img.src = (categoria.imagen) ? `${baseUri}/${categoria.imagen}` : "";
  });
}

function formaCategorias(categoria) {

  const imgOp = {
    id:"imagen",
    tipo:"img",
    ext:[".jpg, .png, .jpeg"]
  }

  const forma = new Forma();
  forma.data = categoria ? categoria : null;
  forma.agregarCampo(
    "text",
    "titulo",
    categoria ? categoria.titulo : "",
    "Título",
    true
  );
  forma.agregarCampo(
    "text",
    "descripcion",
    categoria ? categoria.descripcion : "",
    "Descripción",
    false
  );
  forma.agregarCampo(
    "file",
    "imagen",
    categoria ? categoria.imagen : "",
    "Imagen",
    false,
    imgOp
  );
  forma.fx = data.grabarCategoria;
  forma.uri = "/admin/categorias/borrar/";
  forma.borrarFx = data.borrarItem;
  forma.despuesFx = pintarCategorias;
  forma.editando = categoria ? true : false;
  forma.pintar();
}

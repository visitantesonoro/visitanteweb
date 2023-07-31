import { tag } from "../utilidades/tag.js?ad=1";
import { contenido } from "../classes/Contenido.js?ad=1";
import { data } from "../classes/Data.js?ad=1";
import { Forma } from "../classes/Forma.js?ad=1";
import { bajarCss } from "../utilidades/css.js?ad=1";

export function pintarCategorias() {
  contenido.main.innerHTML = "";

  const enlace = "./scripts/componentes/Categorias.css?ad=1";
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
  });
}

function formaCategorias(categoria) {
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
    "imagen",
    categoria ? categoria.imagen : "",
    "Imagen",
    false
  );
  forma.agregarCampo(
    "text",
    "descripcion",
    categoria ? categoria.descripcion : "",
    "Descripción",
    false
  );
  forma.fx = data.grabarCategoria;
  forma.uri = "/admin/categorias/borrar/";
  forma.borrarFx = data.borrarItem;
  forma.despuesFx = pintarCategorias;
  forma.editando = categoria ? true : false;
  forma.pintar();
}

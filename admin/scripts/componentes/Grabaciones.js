import { tag } from "../utilidades/tag.js?ad=1";
import { contenido } from "../classes/Contenido.js?ad=1";
import { data } from "../classes/Data.js?ad=1";
import { Forma } from "../classes/Forma.js?ad=1";
import { bajarCss } from "../utilidades/css.js?ad=1";

export function pintarGrabaciones() {
  contenido.main.innerHTML = "";

  const enlace = "./scripts/componentes/Grabaciones.css?ad=1";
  bajarCss(enlace, traerDataGrabaciones);
}

function traerDataGrabaciones() {
  data.traerLista(dibujarGrabaciones, "/admin/grabaciones/");
}

function dibujarGrabaciones(info) {
  const div = tag("div", contenido.main);
  div.className = "grabaciones";

  const divC = tag("div", div);
  divC.className = "crear-btn";

  const span = tag("span", divC);
  span.innerHTML = "Crear";
  span.addEventListener("click", () => {
    data.traerLista(pintarFormaGrabacion, "/admin/musicos/");
  });

  const divMusicos = tag("div", div);
  divMusicos.className = "grabaciones-general";

  const divM = tag("div", divMusicos);
  divM.className = "grabaciones-fila";

  const campos = [
    {
      titulo: "TÍTULO",
      valor: "titulo",
      ancho:"25%",
      mostrar: true,
    },
    {
      titulo: "DESCRIPCIÓN",
      valor: "descripcion",
      ancho:"15%",
      mostrar: false,
    },
    {
      titulo: "LUGAR",
      valor: "lugar",
      ancho:"15%",
      mostrar: true,
    },
    {
      titulo: "MÚSICO",
      valor: "musico",
      ancho:"25%",
      mostrar: true,
    },
    {
      titulo: "CATEGORÍA",
      valor: "categoria",
      ancho:"15%",
      mostrar: true,
    },
    {
      titulo: "FECHA",
      valor: "fecha",
      ancho:"15%",
      mostrar: false,
    },
  ];

  campos.forEach((campo) => {
    if (campo.mostrar) {
      const texto = tag("p", divM);
      texto.style.width = campo.ancho;
      texto.innerHTML = campo.titulo;
    }
  });

  info.grabaciones
    .map((grabacion) => ({
      tituloS: grabacion.titulo.toUpperCase(),
      valor: grabacion,
    }))
    .sort((g1, g2) => (g1.tituloS < g2.tituloS ? -1 : 1))
    .map((grabacion, index) => {
      const divM = tag("div", divMusicos);
      divM.className = "grabaciones-fila";
      divM.addEventListener("click", () => {
        data.traerItem(
          grabacion.valor._id,
          pintarFormaGrabacion,
          "/admin/grabaciones/"
        );
      });
      campos.forEach((campo) => {
        if (campo.mostrar) {
          if (campo.valor === "musico") {
            const musicoObj = info.musicos.filter(
              (musico) => musico._id === grabacion.valor.musico
            );

            const texto = tag("p", divM);
            texto.style.width = campo.ancho;
            texto.innerHTML =
              musicoObj.length > 0 ? musicoObj[0].nombre : "Indefinido";
          } else if (campo.valor === "categoria") {
            const categoriaObj = info.categorias.filter(
              (categoria) => categoria._id === grabacion.valor.categoria
            );
            const texto = tag("p", divM);
            texto.style.width = campo.ancho;
            texto.innerHTML =
              categoriaObj.length > 0 ? categoriaObj[0].titulo : "Indefinida";
          } else {
            const texto = tag("p", divM);
            texto.style.width = campo.ancho;
            texto.innerHTML = grabacion.valor[campo.valor];
          }
        }
      });
    });
}

function pintarFormaGrabacion(info) {

  const grabacionObj = {
    titulo: "",
    descripcion: "",
    fecha: "",
    lugar: "",
    longitud: "",
    musico: "",
  };

  const musicos = info.musicos ? info.musicos : info;
  const grabacion = info.grabacion ? info.grabacion : grabacionObj;
  const categorias = info.categorias ? info.categorias : info;
  const tags = info.tags ? info.tags : info;

  const musicosOp = [];

  musicos.map((musico) => {
    const opcion = {
      rotulo: musico.nombre,
      valor: musico._id,
    };

    musicosOp.push(opcion);
  });

  const categoriasOp = [];

  categorias.map((categoria) => {
    const opcion = {
      rotulo: categoria.titulo,
      valor: categoria._id,
    };

    categoriasOp.push(opcion);
  });

  const tagsOp = [];

  tags.map((tag) => {
    const opcion = {
    
      rotulo: tag.titulo,
      valor: tag._id,
    };

    tagsOp.push(opcion);
  });

  const forma = new Forma();
  forma.data = grabacion;
  forma.agregarCampo("text", "titulo", grabacion.titulo, "Titulo", true);
  forma.agregarCampo(
    "text",
    "descripcion",
    grabacion.descripcion,
    "Descripcion",
    false
  );
  forma.agregarCampo(
    "date",
    "fecha",
    grabacion.fecha.split("T")[0],
    "Fecha",
    true
  );
  forma.agregarCampo("text", "lugar", grabacion.lugar, "Lugar", true);
  forma.agregarCampo(
    "number",
    "longitud",
    grabacion.longitud,
    "Longitud",
    true
  );
  forma.agregarCampo("number", "latitud", grabacion.latitud, "Latitud", true);
  forma.agregarCampo(
    "select",
    "musico",
    grabacion.musico,
    "Músico",
    true,
    musicosOp
  );
  forma.agregarCampo(
    "select",
    "categoria",
    grabacion.categoria,
    "Categoria",
    false,
    categoriasOp
  );
  forma.agregarCampo(
    "select",
    "tags",
    grabacion.tags,
    "Tags",
    false,
    tagsOp
  );
  forma.uri = "/admin/grabaciones/borrar/";
  forma.borrarFx = data.borrarItem;
  forma.fx = data.grabarGrabacion;
  forma.despuesFx = pintarGrabaciones;
  forma.editando = info.grabacion ? true : false;
  forma.pintar();
}



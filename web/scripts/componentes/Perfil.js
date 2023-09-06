import { bajarCss } from "../utilidades/css.js?w=1";
import { tag } from "../utilidades/tag.js?w=1";
import { contenido } from "../classes/Contenido.js?w=1";
import { data } from "../data/Data.js?w=1";
import { baseUri } from '../../enviroment.js?w=1';

export function pintarPerfil(id) {
  contenido.perfilId = id;

  if (contenido.perfilCss) {
    traerPefilData();
  } else {
    const enlace = "./scripts/componentes/Perfil.css?w=1";
    bajarCss(enlace, traerPefilData);
  }
}

function traerPefilData() {
  contenido.perfilCss = true;
  data.traerItem(contenido.perfilId, dibujarPerfil, "/admin/musicos/");
}

function dibujarPerfil(data) {
  contenido.info.innerHTML = "";

  const divG = tag("div", contenido.info);
  divG.className = "perfil";

  const sectionM = tag("section", divG);
  sectionM.className = "perfil-header";

  pintarMusico(sectionM, data);

  const sectionP = tag("section", divG);
  sectionP.className = "perfil-player";

  pintarPlayer(sectionP, data);
}

function pintarMusico(el, data){

  const divI = tag("div", el);

  const divImage = tag("div", divI);

  const img = tag("img", divImage);
  img.src = `${baseUri}/${data.musico.imagen}`;

  const divT = tag("div", el);

  const h1 = tag("h1", divT);
  h1.innerHTML = data.musico.nombre;

  const p = tag("p", divT);
  p.innerHTML = data.musico.descripcion;
}

function pintarPlayer(el, data){

  data.grabaciones.map(grabacion =>{
    const div = tag("div", el);

    const p = tag("p", div);
    p.innerHTML = grabacion.titulo;
  })

}

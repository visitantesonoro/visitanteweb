import { bajarCss } from "../utilidades/css.js?w=5";
import { tag } from "../utilidades/tag.js?w=5";
import { contenido } from "../classes/Contenido.js?w=5";
import { data } from "../data/Data.js?w=5";
import { baseUri } from '../../enviroment.js?w=5';
import { uploadUri } from '../../enviroment.js?w=5';
import { Grabaciones } from "../classes/Grabaciones.js?w=5";

export function pintarPerfil(url) {
  contenido.perfilUrl = url;

  if (contenido.perfilCss) {
    traerPefilData();
  } else {
    const enlace = "./scripts/componentes/Perfil.css?w=5";
    bajarCss(enlace, traerPefilData);
  }
}

function traerPefilData() {
  contenido.perfilCss = true;
  data.traerItem(contenido.perfilUrl, dibujarPerfil, "/admin/musicos/url/");
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
  img.src = `${uploadUri}/${data.musico.imagen}`;

  const divT = tag("div", el);

  const h1 = tag("h1", divT);
  h1.innerHTML = data.musico.nombre;

  const p = tag("p", divT);
  p.innerHTML = data.musico.descripcion;
}

function pintarPlayer(el, data){

  const divContador = tag("div", el);
  divContador.className = 'perfil-player-contador';

  const p = tag("p", divContador);
  p.innerHTML = `${data.grabaciones.length} grabaciones`;

  const divPlayer = tag("div", el);
  divPlayer.className = 'perfil-player-grabaciones';

  const grabaciones = new Grabaciones(data.grabaciones);
  grabaciones.pintarLista(divPlayer);

}

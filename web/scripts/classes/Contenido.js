import { tag } from "../utilidades/tag.js?w=5";
import { baseUri } from "../../enviroment.js?w=5";
import { uploadUri } from "../../enviroment.js?w=5";
import { bajarCss } from "../utilidades/css.js?w=5";
import { formatearFecha } from "../utilidades/fecha.js?w=5";
import { player } from "../player/Player.js?w=5";

class Contenido {
  header;
  main;
  footer;
  nav;
  mapa;
  popup;
  popupGrabacion;
  entrando = true;
  menuActivo = false;
  perfilId = 0;
  perfilCss = false;
  primeraVez = true;
  yaBajoMapa = false;

  constructor() {
    const enlace = "./scripts/classes/Contenido.css?w=5";
    bajarCss(enlace, null);
  }

  mostrarPopup(el, texto) {
    this.popup.innerHTML = texto;
    const coord = el.getBoundingClientRect();
    this.popup.style.left = coord.x - 105 + "px";
    this.popup.style.top = coord.y - 40 + "px";
    this.popup.style.visibility = "visible";
  }

  esconderPopup() {
    this.popup.style.visibility = "hidden";
  }

  mostrarInfoGrabacion(obj) {
    this.popupGrabacion.innerHTML = "";

    const img = tag("img", this.popupGrabacion);
    img.src = `${uploadUri}/${obj.info.musico.imagen}`;

    const div = tag("div", this.popupGrabacion);

    const divX = tag("div", div);
    divX.className = "popup-grabacion-x";

    const span = tag("span", divX);
    span.innerHTML = "X";
    span.addEventListener("click", this.esconderInfoGrabacion.bind(this));

    const divPlay = tag("div", div);
    divPlay.className = "popup-grabacion-play";

    const divPlayC = tag("div", divPlay);

    const imgPlay = tag("img", divPlayC);
    imgPlay.src = "./assets/imgs/player/play.png";
    imgPlay.addEventListener("click", () => {
      player.ponerASonarDesdeComponente(
        imgPlay,
        obj.info.musico._id,
        obj.info.grabacion.url
      );
    });

    const divC = tag("div", div);

    const h1 = tag("h1", divC);
    h1.innerHTML = obj.info.grabacion.titulo;
    h1.addEventListener("click", ()=>{
      this.esconderInfoGrabacion();
      window.location.href = "#/grabaciones/" + obj.info.grabacion.url;
    })

    const divInfo = tag("div", divC);
    divInfo.className = "popup-grabacion-info";

    const a = tag("a", divInfo);
    a.innerHTML = obj.info.musico.nombre;
    a.addEventListener("click", () => {
      this.esconderInfoGrabacion();
      window.location.href = "#/perfil/" + obj.info.musico.url;
    });

    const fechaStr = formatearFecha(obj.info.grabacion.fecha);

    const spanI = tag("span", divInfo);
    spanI.innerHTML = `<br>${fechaStr} - ${obj.info.grabacion.lugar}`;

    const texto = obj.info.grabacion.descripcion;
    const p = tag("p", divC);
    p.innerHTML = texto;

    this.popupGrabacion.style.visibility = "visible";
  }

  esconderInfoGrabacion() {
    this.popupGrabacion.style.visibility = "hidden";
  }
}

export const contenido = new Contenido();

import { datos } from "../data/Datos.js?n=17";
import { player } from "../classes/Player.js?n=17";
import { bajarCss } from "../componentes/utilidades/css.js?n=17";
import { tag } from "../componentes/utilidades/tag.js?n=17";

class Musico {
  contenedor;
  info;
  canciones;
  lugar;

  async pintarPerfil(contenedor) {
    this.contenedor = contenedor;

    this.contenedor.innerHTML = "";

    this.pintarInfoPerfil();
  }

  pintarInfoPerfil() {
    const xC = tag("div", this.contenedor);
    xC.className = "cerrar";

    const xSpan = tag("span", xC);
    xSpan.innerHTML = "X";
    xSpan.addEventListener("click", () => {
      this.contenedor.style.animation = "desaparecer 0.4s ease-out forwards";
    });

    const musicoC = tag("div", this.contenedor);
    musicoC.className = "perfilC";

    const divImg = tag("div", musicoC);
    divImg.className = "perfil-img";

    const img = tag("img", divImg);
    img.src = this.info.img;

    const divInfo = tag("div", musicoC);
    divInfo.className = "perfil-info";

    const divDetalles = tag("div", divInfo);
    divDetalles.className = "perfil-detalles";

    const nombreC = tag("h2", divDetalles);
    nombreC.innerHTML = this.info.nombre;

    const descP = tag("p", divDetalles);
    descP.innerHTML = this.info.descripcion;

    const divGrabaciones = tag("div", divInfo);
    divGrabaciones.className = "perfil-grabaciones";

    for (var id of this.info.grabaciones) {
      const grabacion = datos.grabaciones.filter(
        (grabacion) => grabacion.grabacion_id === id
      );

      if (grabacion.length > 0) {
        const grabacionObj = grabacion[0];

        const divG = tag("div", divGrabaciones);
        divG.innerHTML = grabacionObj.nombre;
        divG.addEventListener("click", () => {
          player.musicoS = this.info;
          player.grabacionS = grabacionObj;
          player.audioSrc = grabacionObj.url;
          player.iniciar();
          player.pintarInfoCancion();
          player.activo = false;
          player.conmutarPlay();
        });
      }
    }
  }
}

export const musico = new Musico();

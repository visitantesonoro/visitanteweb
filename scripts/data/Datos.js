import { crearEstructura } from "../app.js?n=17";
import { tag } from "../componentes/utilidades/tag.js?n=17";

//const BASEURI = "https://alejoforero.com/proyectos/visitante-sonoro/frontend/scripts/data/";
const BASEURI = "http://127.0.0.1:5500/scripts/data/";


class Datos {
  musicos = [];
  lugares = [];
  grabaciones = [];

  grabacionS;
  musicoS;

  async traerDatos(url, tipo, ejecutar) {
    const enlace = `${BASEURI}${url}`;

    try {
      const response = await fetch(enlace);
      const responseData = await response.json();

      this.organizarDatos(responseData, ejecutar);
    } catch (e) {
      const divE = tag("div", document.body);
      divE.innerHTML = "Lo sentimos pero algo ocurrió con la app";
    }
  }

  organizarDatos(data, ejecutar) {
    this.musicos = data.musicos;
    this.grabaciones = data.grabaciones;
    this.categorias = data.categorias;

    if (ejecutar === "inicio") {
      crearEstructura();
    }
  }
}

export const datos = new Datos();

// const cards = DUMMY_CARDS.filter(card=>{
//     return card.creator === userId;
// })

// const cards = DUMMY_CARDS.filter(card => card.creator === userId); //short way
// DUMMY_CARDS = DUMMY_CARDS.filter(card => card.id !== cId); // Filter all but the selected id

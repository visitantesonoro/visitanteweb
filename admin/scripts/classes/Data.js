import { baseUri } from "../../enviroment.js?ad=1";
import { pintarMusicos } from "../componentes/Musicos.js?ad=1";

class Data {
  async traerMusicos(fx) {
    const uriMusicos = `${baseUri}/admin/musicos/`;

    const response = await fetch(uriMusicos);

    const responseData = await response.json();

    const allData = responseData;

    fx(allData);
  }

  async crearMusico(info) {
    const uriMusicos = `${baseUri}/admin/musicos/crear`;

    const response = await fetch(uriMusicos, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: info.nombre,
        imagen: info.imagen,
      }),
    });

    const responseData = await response.json();
    pintarMusicos(pintarMusicos);
  }

  async editarMusico(info) {
    const uriMusicos = `${baseUri}/admin/musicos/editar/${info.id}`;

    const response = await fetch(uriMusicos, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: info.nombre,
        imagen: info.imagen,
      }),
    });

    const responseData = await response.json();
    pintarMusicos(pintarMusicos);
  }

  async borrarMusico(info) {
    debugger;
    const uriMusicos = `${baseUri}/admin/musicos/borrar/${info.id}`;

    const response = await fetch(uriMusicos, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    pintarMusicos(pintarMusicos);
  }
}

export const data = new Data();

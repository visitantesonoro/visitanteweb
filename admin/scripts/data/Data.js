import { baseUri } from "../../enviroment.js?ad=6";
import { grabarGrabacion } from "./dataGrabacion.js?ad=6";
import { grabarMusico } from "./dataMusico.js?ad=6";
import { grabarCategoria } from "./dataCategoria.js?ad=6";
import { grabarTag } from "./dataTag.js?ad=6";
import { logear } from "./dataAdmin.js?ad=6";
import { admin } from "../classes/Admin.js?ad=6";

class Data {
  async traerLista(fx, uri) {
    const uriFinal = `${baseUri}${uri}`;
    const response = await fetch(uriFinal);
    const datos = await response.json();
    fx(datos);
  }

  async traerItem(id, fx, uri) {
    const uriFinal = `${baseUri}${uri}${id}`;
    const response = await fetch(uriFinal);
    const datos = await response.json();
    fx(datos);
  }

  async grabarGrabacion(info, fx) {
    const data = await grabarGrabacion(info);
    fx();
  }

  async grabarMusico(info, fx) {
    const data = await grabarMusico(info);
    fx();
  }

  async grabarCategoria(info, fx) {
    const data = await grabarCategoria(info);
    fx();
  }

  async grabarTag(info, fx) {
    const data = await grabarTag(info);
    fx();
  }

  async logear(usuario, fx) {
    const data = await logear(usuario);
    if (data) {
      fx();
    }
  }

  async borrarItem(info, fx, uri) {
    const uriFinal = `${baseUri}${uri}${info.id}`;

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + admin.info.token,
    };

    const response = await fetch(uriFinal, {
      method: "DELETE",
      headers,
    });

    const responseData = await response.json();

    if (!responseData) {
      alert("El item está asociado con otros records y no se puede borrar");
      return;
    }
    fx();
  }
}

export const data = new Data();

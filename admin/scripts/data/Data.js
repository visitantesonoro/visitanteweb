import { baseUri } from "../../enviroment.js?ad=1";
import { grabarGrabacion } from "./dataGrabacion.js?ad=1";
import { grabarMusico } from "./dataMusico.js?ad=1";
import { grabarCategoria } from "./dataCategoria.js?ad=1";
import { grabarTag } from "./dataTag.js?ad=1";
import { logear } from "./dataAdmin.js?ad=1";

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

  async logear(usuario, fx){
    const data = await logear(usuario);
    if(data){
      fx();
    }
  }

  async borrarItem(info, fx, uri) {
    const uriFinal = `${baseUri}${uri}${info.id}`;

    const response = await fetch(uriFinal, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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

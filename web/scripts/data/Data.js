import { baseUri } from "../../enviroment.js?w=1";

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
}

export const data = new Data();

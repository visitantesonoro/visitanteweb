import { baseUri } from "../../enviroment.js?ad=1";
import { admin } from "../classes/Admin.js?ad=1";
import { logout } from "./dataAdmin.js?ad=1";

export async function grabarTag(info) {
  const uri = !info.id
    ? `${baseUri}/admin/tags/crear`
    : `${baseUri}/admin/tags/editar/${info.id}`;
  const metodo = !info.id ? "POST" : "PATCH";

  var data = new FormData();
  data.append("titulo", info.titulo);
  data.append("imagen", info.imagen);
  data.append("descripcion", info.descripcion);

  if (!admin.info) {
    logout();
    return;
  }

  const token = admin.info.token;

  const headers = {
    Authorization: "Bearer " + token,
  };

  const solicitud = await fetch(uri, {
    method: metodo,
    body: data,
    headers
  });

  const respuesta = await solicitud.json();

  return respuesta;
}

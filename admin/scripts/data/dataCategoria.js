import { baseUri } from "../../enviroment.js?ad=6";
import { admin } from "../classes/Admin.js?ad=6";
import { logout } from "./dataAdmin.js?ad=6";

export async function grabarCategoria(info) {
  const uri = !info.id
    ? `${baseUri}/admin/categorias/crear`
    : `${baseUri}/admin/categorias/editar/${info.id}`;
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

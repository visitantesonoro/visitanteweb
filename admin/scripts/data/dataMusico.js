import { baseUri } from "../../enviroment.js?ad=6";
import { admin } from "../classes/Admin.js?ad=6";
import { logout } from "./dataAdmin.js?ad=6";

export async function grabarMusico(info) {
  const uri = !info.id
    ? `${baseUri}/admin/musicos/crear`
    : `${baseUri}/admin/musicos/editar/${info.id}`;
  const metodo = !info.id ? "POST" : "PATCH";

  let imgFile;

  if (info.imagen instanceof File) {
    imgFile = info.imagen;
  } else {
    imgFile = null;
  }

  var data = new FormData();
  data.append("nombre", info.nombre);
  data.append("imagen", imgFile);
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
    headers,
  });

  const respuesta = await solicitud.json();

  if(respuesta.error){
    alert(respuesta.mensaje);

    return;
  }

  return respuesta;
}

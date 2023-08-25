import { baseUri } from "../../enviroment.js?ad=1";
import { httprequest } from "./httprequest.js?ad=1";

export async function grabarMusico(info) {
  const uri = !info.id
    ? `${baseUri}/admin/musicos/crear`
    : `${baseUri}/admin/musicos/editar/${info.id}`;
  const metodo = !info.id ? "POST" : "PATCH";

  let imgFile;

  if (info.imagen instanceof File) {
    imgFile = info.imagen;
  } else {
    imgFile = await httprequest(info.imagen);
  }

  var data = new FormData();
  data.append("nombre", info.nombre);
  data.append("imagen", imgFile);
  data.append("descripcion", info.descripcion);

  const solicitud = await fetch(uri, {
    method: metodo,
    body: data,
  });

  const respuesta = await solicitud.json();

  return respuesta;
}



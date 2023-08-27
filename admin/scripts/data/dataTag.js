import { baseUri } from "../../enviroment.js?ad=1";

export async function grabarTag(info) {
  const uri = !info.id
    ? `${baseUri}/admin/tags/crear`
    : `${baseUri}/admin/tags/editar/${info.id}`;
  const metodo = !info.id ? "POST" : "PATCH";

  var data = new FormData();
  data.append("titulo", info.titulo);
  data.append("imagen", info.imagen);
  data.append("descripcion", info.descripcion);

  const solicitud = await fetch(uri, {
    method: metodo,
    body: data,
  });

  const respuesta = await solicitud.json();

  return respuesta;
}

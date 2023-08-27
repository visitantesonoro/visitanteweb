import { baseUri } from "../../enviroment.js?ad=1";

export async function grabarCategoria(info) {
  const uri = !info.id
    ? `${baseUri}/admin/categorias/crear`
    : `${baseUri}/admin/categorias/editar/${info.id}`;
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

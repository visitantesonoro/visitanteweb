import { baseUri } from "../../enviroment.js?ad=1";

export async function grabarGrabacion(info) {

  let uri;
  let metodo;

  if (info.id) {
    uri = `${baseUri}/admin/grabaciones/editar/${info.id}`;
    metodo = "PATCH";
  } else {
    uri = `${baseUri}/admin/grabaciones/crear`;
    metodo = "POST";
  }

  let audioFile;
 
  if (info.audio instanceof File) {
    audioFile = info.audio;
  } else {
    audioFile = null;
  }

  var data = new FormData();
  data.append("titulo", info.titulo);
  data.append("descripcion", info.descripcion);
  data.append("fecha", JSON.stringify(info.fecha));
  data.append("lugar", info.lugar);
  data.append("longitud", info.longitud);
  data.append("latitud", info.latitud);
  data.append("musico", info.musico);
  data.append("categoria", info.categoria);
  data.append("tags", JSON.stringify(info.tags));
  data.append("audio", audioFile);

  const solicitud = await fetch(uri, {
    method: metodo,
    body: data,
  });

  const respuesta = await solicitud.json();

  return respuesta;
}

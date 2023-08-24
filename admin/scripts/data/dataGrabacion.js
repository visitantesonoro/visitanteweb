import { baseUri } from "../../enviroment.js?ad=1";

export async function grabarGrabacion(info) {


  // let uri;
  // let metodo;

  // if (info.id) {
  //   uri = `${baseUri}/admin/grabaciones/editar/${info.id}`;
  //   metodo = "PATCH";
  // } else {
  //   uri = `${baseUri}/admin/grabaciones/crear`;
  //   metodo = "POST";
  // }

  // const audioFile = info.audio;

  // var data = new FormData();
  // data.append("titulo", info.titulo);
  // data.append("descripcion", info.descripcion);
  // data.append("fecha", info.fecha);
  // data.append("lugar", info.lugar);
  // data.append("longitud", info.longitud);
  // data.append("latitud", info.latitud);
  // data.append("musico", info.musico);
  // data.append("categoria", info.categoria);
  // data.append("tags", info.tags);
  // data.append("audio", audioFile);

  // const solicitud = await fetch(uri, {
  //   method: metodo,
  //   body: data,
  // });

  // const respuesta = await solicitud.json();

  // return respuesta;



  /********/

  let uri;
  let metodo;

  if(info.id){
    uri = `${baseUri}/admin/grabaciones/editar/${info.id}`;
    metodo = "PATCH"
  }else{
    uri = `${baseUri}/admin/grabaciones/crear`;
    metodo = "POST"
  }

  const response = await fetch(uri, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titulo: info.titulo,
      descripcion: info.descripcion,
      fecha: info.fecha,
      lugar: info.lugar,
      longitud: info.longitud,
      latitud: info.latitud,
      musico: info.musico,
      categoria: info.categoria,
      tags:info.tags,
      audio:"audio"
    }),
  });

  const responseData = await response.json();

  return responseData;
}

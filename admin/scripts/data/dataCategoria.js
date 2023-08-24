import { baseUri } from "../../enviroment.js?ad=1";

export  async function grabarCategoria(info) {

  const uri = !info.id
    ? `${baseUri}/admin/categorias/crear`
    : `${baseUri}/admin/categorias/editar/${info.id}`;
  const metodo = !info.id ? "POST" : "PATCH";

  const file = info.imagen;

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

    // const uri = !info.id
    //   ? `${baseUri}/admin/categorias/crear`
    //   : `${baseUri}/admin/categorias/editar/${info.id}`;
    // const metodo = !info.id ? "POST" : "PATCH";

    // const solicitud = await fetch(uri, {
    //   method: metodo,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     titulo: info.titulo,
    //     imagen: info.imagen,
    //     descripcion: info.descripcion,
    //   }),
    // });

    // const respuesta = await solicitud.json();
    
    // return respuesta;
  }
import { baseUri } from "../../enviroment.js?ad=1";

export async function grabarTag(info) {
    const uri = !info.id
      ? `${baseUri}/admin/tags/crear`
      : `${baseUri}/admin/tags/editar/${info.id}`;
    const metodo = !info.id ? "POST" : "PATCH";

    const solicitud = await fetch(uri, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: info.titulo,
        imagen: info.imagen,
        descripcion: info.descripcion,
      }),
    });

    const respuesta = await solicitud.json();

    return respuesta;
  }
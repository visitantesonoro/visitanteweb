import { baseUri } from "../../enviroment.js?ad=1";

class Data {

  async traerLista(fx, uri){
    const uriFinal = `${baseUri}${uri}`;
    const response = await fetch(uriFinal);
    const datos = await response.json();
    fx(datos);
  }

  async traerItem(id, fx, uri) {
    const uriFinal = `${baseUri}${uri}${id}`;
    const response = await fetch(uriFinal);
    const datos = await response.json();
    fx(datos);
  }

  async borrarItem(info, fx, uri) {
 
    const uriFinal = `${baseUri}${uri}${info.id}`;

    const response = await fetch(uriFinal, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if(!responseData){
      alert("El item está asociado con otros records y no se puede borrar");
      return
    }

    fx();
  }

  async grabarGrabacion(info, fx) {

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
        tags:info.tags
      }),
    });

    const responseData = await response.json();

    fx();
  }

  async grabarMusico(info, fx){
    
    const uri = (!info.id) ? `${baseUri}/admin/musicos/crear` : `${baseUri}/admin/musicos/editar/${info.id}`;
    const metodo = (!info.id) ? "POST" : "PATCH";

    const solicitud = await fetch(uri, {
      method:metodo,
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: info.nombre,
        imagen: info.imagen,
        descripcion:info.descripcion
      })
    })

    const respuesta = await solicitud.json();
    fx();
  }

  async grabarCategoria(info, fx){
    
    const uri = (!info.id) ? `${baseUri}/admin/categorias/crear` : `${baseUri}/admin/categorias/editar/${info.id}`;
    const metodo = (!info.id) ? "POST" : "PATCH";

    const solicitud = await fetch(uri, {
      method:metodo,
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: info.titulo,
        imagen: info.imagen,
        descripcion:info.descripcion
      })
    })

    const respuesta = await solicitud.json();
    fx();
  }

  async grabarTag(info, fx){
    const uri = (!info.id) ? `${baseUri}/admin/tags/crear` : `${baseUri}/admin/tags/editar/${info.id}`;
    const metodo = (!info.id) ? "POST" : "PATCH";

    const solicitud = await fetch(uri, {
      method:metodo,
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: info.titulo,
        imagen: info.imagen,
        descripcion:info.descripcion
      })
    })

    const respuesta = await solicitud.json();
    fx();
  }
}

export const data = new Data();

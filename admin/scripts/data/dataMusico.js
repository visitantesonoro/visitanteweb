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
    imgFile = null;
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


function makeRequest(file) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open("GET", `${baseUri}/${file}`, true);
    request.responseType = "blob";
    request.onload = function () {
      var status = request.status;
      if (status == 200) {
        resolve(request.response);
      } else {
        reject(status);
      }
    };
    request.send();
  });
}

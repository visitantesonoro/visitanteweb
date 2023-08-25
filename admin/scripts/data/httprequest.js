import { baseUri } from "../../enviroment.js?ad=1";

export function httprequest(file) {
  return new Promise(function (resolve, reject) {
    try {
      var request = new XMLHttpRequest();
      request.open("GET", `${baseUri}/${file}`, true);
      request.onload = function () {
        var status = request.status;
        if (status == 200) {
          resolve(request.response);
        } else {
          reject(status);
          alert("hay un problema con alguno de los archivos que desea cargar, no se ha podido guardar los cambios");
        }
      };
      request.send();
    } catch (error) {}
  });
}

export async function bajarCss(estiloSrc, ejecutar) {
  const enlace = `${estiloSrc}?ad=1`;

  await cssReq("GET", enlace);

  ejecutar();
}

function cssReq(metodo, enlace) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open(metodo, enlace);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {

        const style = document.createElement("style");
        style.rel = "stylesheet";
        style.innerHTML = this.responseText;
        document.getElementsByTagName("head")[0].appendChild(style);

        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
}

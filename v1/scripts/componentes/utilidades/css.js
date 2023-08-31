export function bajarCss(estiloSrc, ejecutar) {
  const enlace = `${estiloSrc}?n=17`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", enlace);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      xhr.onreadystatechange = null;

      const style = document.createElement("style");
      style.rel = "stylesheet";
      style.innerHTML = this.responseText;
      document.getElementsByTagName("head")[0].appendChild(style);

      ejecutar();
    }
  };
  xhr.send();
}

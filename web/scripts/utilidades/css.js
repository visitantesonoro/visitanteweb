export function bajarCss(estiloSrc, ejecutar) {
  const enlace = `${estiloSrc}?w=6`;

  fetch(enlace)
    .then((res) => res.text())
    .then((cssString) => {
      const style = document.createElement("style");
      style.rel = "stylesheet";
      style.innerHTML = cssString;
      document.getElementsByTagName("head")[0].appendChild(style);

      if (ejecutar) {
        ejecutar();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

import { tag } from "../utilidades/tag.js?ad=6";
import { data } from "../data/Data.js?ad=6";
import { bajarCss } from "../utilidades/css.js?ad=6";
import { pintarAdminWeb } from "../main.js?ad=6";

export function pintarLogin() {
  const enlace = "./scripts/componentes/Login.css?ad=6";
  bajarCss(enlace, dibujarLogin);
}

function dibujarLogin() {
  document.body.innerHTML = "";

  const divBg = tag("div", document.body);
  divBg.className = "login";

  const divI = tag("div", divBg);

  const forma = tag("form", divI);
  forma.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = {
      email: forma.elements["email"].value,
      password: forma.elements["password"].value,
    };

    data.logear(usuario, pintarAdminWeb);
  });

  const emailI = tag("input", forma);
  emailI.name = "email";
  emailI.type = "text";

  const passwordI = tag("input", forma);
  passwordI.name = "password";
  passwordI.type = "password";

  const boton = tag("button", forma);
  boton.innerHTML = "entrar";
}

import { tag } from "./utilidades/tag.js?ad=1";
import { pintarHeader } from "./componentes/Header.js?ad=1";
import { contenido } from "./classes/Contenido.js?ad=1";
import { pintarLogin } from "./componentes/Login.js?ad=1";

correr();

function correr() {
  document.body.innerHTML = "";

  const admin = localStorage.getItem("administrador");

  if (!admin) {
    pintarLogin();
  } else {
   pintarAdminWeb();
  }
}

export function pintarAdminWeb(){
   document.body.innerHTML = "";
   
   const div = tag("div", document.body);
    pintarHeader(div);
    contenido.main = tag("section", document.body);
}

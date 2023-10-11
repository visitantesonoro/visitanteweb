import { bajarCss } from "../utilidades/css.js?w=5";
import { tag } from "../utilidades/tag.js?w=5";
import { contenido } from "../classes/Contenido.js?w=5";
import { textos } from "../utilidades/textos.js?w=5";
import { conmutarMenu } from "./Menu.js?w=5";

export function pintarHeader() {
  const enlace = "./scripts/componentes/Header.css?w=5";
  bajarCss(enlace, dibujarHeader);
}

function dibujarHeader() {
  const logoH = tag("div", contenido.header);
  logoH.className = "logo-header";
  logoH.innerHTML = "";

  pintarLogoHeader(logoH);

  const centroH = tag("div", contenido.header);
  centroH.innerHTML = "";

  const loginH = tag("div", contenido.header);
  loginH.className = "header-login";

  pintarLogin(loginH);
}

function pintarLogoHeader(el) {
  const img = tag("img", el);
  img.src = "./assets/imgs/logo-inicio.png";

  const p = tag("p", el);
  p.innerHTML = "Visitante sonoro";
}

function pintarLogin(el) {
  const p = tag("p", el);
  p.innerHTML = textos.loginEs;

  const divM = tag("div", el);
  divM.className = "hamburguesa";
  divM.addEventListener('click', ()=>conmutarMenu())

  pintarHamburguesa(divM);
}

function pintarHamburguesa(el) {
  for (let i = 0; i < 3; i++) {
    const div = tag("div", el);
    div.innerHTML = "";
  }
}

export function mostrarHeader() {
  contenido.header.style.animation = "aparecer 4s ease-out forwards";
}

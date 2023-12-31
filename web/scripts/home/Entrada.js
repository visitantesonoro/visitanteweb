import { bajarCss } from "../utilidades/css.js?w=6";
import { tag } from "../utilidades/tag.js?w=6";
import { contenido } from "../classes/Contenido.js?w=6";
import { textos } from "../utilidades/textos.js?w=6";
import { mostrarHeader } from "../componentes/Header.js?w=6";
import { player } from "../player/Player.js?w=6";
import { pintarHome } from "./Home.js?w=6";

export function pintarEntrada() {
  const enlace = "./scripts/home/Entrada.css?w=6";
  bajarCss(enlace, dibujarEntrada);
}

function dibujarEntrada() {
  contenido.logo.className = "logoG";
  dibujarLogo();
  dibujarCelulares()
}

function dibujarCelulares(){
  contenido.popupCel.innerHTML = "Estamos trabajando en una versión para dispositivos móviles que estará disponible próximamente. Actualmente, este sitio web solo está accesible desde computadoras.";
}

function dibujarLogo() {
  const divLogo = tag("div", contenido.logo);
  divLogo.className = "logoC-div-logo";

  const img = tag("img", divLogo);
  img.src = "./assets/imgs/logo-inicio.png";
  img.addEventListener("click", onClickLogo);

  const h2 = tag("h2", divLogo);
  h2.innerHTML = "VISITANTE SONORO";
  h2.addEventListener("click", onClickLogo);

  let subdirectorio = location.hash;

  if (subdirectorio == "" || !subdirectorio) {
    pintarIndicaciones();
  }
}

function pintarIndicaciones() {
  const div = tag("div", contenido.info);
  div.className = "infoC";

  const entradaC = tag("div", div);
  entradaC.className = "entrada-div-texto";

  const imgA = tag("img", entradaC);
  imgA.src = "./assets/imgs/auriculares.png";

  const p = tag("p", entradaC);
  p.innerHTML = textos.textoInicioEs;
}

function onClickLogo() {
  mostrarHeader();
  window.location.href = "#/home";

  if (!player.yaHuboClick) {
    player.yaHuboClick = true;
  } 

  player.musicoS = null;
  player.actualizar();

 

  // player.yaHuboClick = true;
  // if (this.pintarInicio) {
  //   info.pintarPaginaInicio();
  // }
  // player.ponerCancionRandom();
  // player.pintarInfoCancion();
}

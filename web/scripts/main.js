import { tag } from "./utilidades/tag.js?w=1";
import { contenido } from "./classes/Contenido.js?w=1";
import { pintarEntrada } from "./home/Entrada.js?w=1";
import { pintarHeader } from "./componentes/Header.js?w=1";
import { pintarMenu } from "./componentes/Menu.js?w=1";
import { pintarHome } from "./home/Home.js?w=1";
import { pintarPerfil } from "./componentes/Perfil.js?w=1";
import { mapaObj } from "./mapa/Mapa.js?w=1";
import { mostrarHeader } from "./componentes/Header.js?w=1";

correr();

function correr() {
  document.body.innerHTML = "";
  pintarContenedores();
}

function pintarContenedores() {

  contenido.header = tag("header", document.body);
  contenido.nav = tag("nav", document.body);
  contenido.main = tag("main", document.body);
  contenido.hero = tag("section", contenido.main);
  contenido.hero.className = "hero";
  contenido.logo = tag("div", contenido.hero);
  contenido.canvas = tag("canvas", contenido.hero);
  contenido.canvas.width = window.innerWidth;
  contenido.canvas.height = 300;
  contenido.info = tag("section", contenido.main);
  contenido.info.className = "contenido-info";
  contenido.footer = tag("footer", document.body);
  contenido.mapa = tag("div", document.body);
  contenido.player = tag("div", document.body);
  contenido.popup = tag("div", document.body);
  contenido.popup.className = "popup";
  contenido.popupGrabacion = tag("div", document.body);
  contenido.popupGrabacion.className = "popup-grabacion";

  pintarEntrada();  
  pintarHeader();
  pintarMenu();
  mapaObj.pintarMapa();
  escogerSeccion();
}

function escogerSeccion(){

  let subdirectorio = location.hash;
  contenido.mapa.style.visibility = 'hidden';

  if(subdirectorio == '' || !subdirectorio){
   
  }else if(subdirectorio ==='#/home'){
    mostrarHeader();
    pintarHome();
  }else if(subdirectorio ==='#/mapa'){
    window.scrollTo(0, 0);
    mostrarHeader();
    contenido.mapa.style.visibility = 'visible';
  }else if(subdirectorio.includes("perfil")){
    const perfilUrl = location.href.substring(location.href.lastIndexOf('/') + 1)
    mostrarHeader();
    pintarPerfil(perfilUrl);
  }
}

window.addEventListener("hashchange", function () {
  escogerSeccion();
});
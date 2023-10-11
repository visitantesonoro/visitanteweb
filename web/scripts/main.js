import { tag } from "./utilidades/tag.js?w=5";
import { contenido } from "./classes/Contenido.js?w=5";
import { pintarEntrada } from "./home/Entrada.js?w=5";
import { pintarHeader } from "./componentes/Header.js?w=5";
import { pintarMenu } from "./componentes/Menu.js?w=5";
import { pintarHome } from "./home/Home.js?w=5";
import { pintarPerfil } from "./componentes/Perfil.js?w=5";
import { pintarPerfiles } from "./componentes/Perfiles.js?w=5";
import { pintarCatalogo } from "./componentes/Catalogo.js?w=5";
import { pintarGrabacion } from "./componentes/Grabacion.js?w=5";
import { pintarPlanes } from "./home/Planes.js?w=5";
import { player } from "./player/Player.js?w=5";
import { mapaObj } from "./mapa/Mapa.js?w=5";
import { mostrarHeader } from "./componentes/Header.js?w=5";

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
  contenido.mapaNavegacion = tag("div", document.body);
  contenido.player = tag("div", document.body);
  contenido.popup = tag("div", document.body);
  contenido.popup.className = "popup";
  contenido.popupCel = tag("div", document.body);
  contenido.popupCel.className = "popup-cel";
  contenido.popupGrabacion = tag("div", document.body);
  contenido.popupGrabacion.className = "popup-grabacion";
  contenido.popupLoading = tag("div", document.body);
  contenido.popupLoading.className = "popup-loading";
  const imgL = tag("img", contenido.popupLoading);
  imgL.src = "./assets/imgs/loading.gif";

  pintarEntrada();
  pintarHeader();
  pintarMenu();
  player.pintar();
  //mapaObj.pintarMapa();
  escogerSeccion();
}

function escogerSeccion() {
  let subdirectorio = location.hash;
  contenido.mapa.style.visibility = "hidden";
  contenido.info.style.animation = "slide-up 900ms ease-out forwards";

  contenido.popupLoading.style.visibility = "visible";

  if (contenido.seccion === "mapa") {
    contenido.mapa.style.animation = "slide-up 900ms ease-out forwards";
  }

  if (subdirectorio == "" || !subdirectorio) {
    contenido.player.style.visibility = "hidden";
    contenido.footer.style.display = "none";
  } else{
    if(contenido.primeraVez){
      contenido.primeraVez = false;
      contenido.player.style.animation = "aparecer 5s ease-out forwards";
    }
    contenido.player.style.visibility = "visible"
  }

  setTimeout(() => {
    contenido.info.innerHTML = "";

    if (subdirectorio == "" || !subdirectorio) {
      
    } else if (subdirectorio === "#/home") {
      contenido.hero.style.animation = "aparecer 1200ms ease-out forwards";
      contenido.seccion = "home";
      contenido.hero.style.display = "block";
      contenido.footer.style.display = "block";
      mostrarHeader();
      pintarHome();
    } else if (subdirectorio === "#/mapa") {
      if(!contenido.yaBajoMapa){
        contenido.yaBajoMapa = true;
        mapaObj.pintarMapa();
      }
      
      contenido.seccion = "mapa";
      window.scrollTo(0, 0);
      mostrarHeader();
      contenido.mapa.style.visibility = "visible";
      contenido.mapa.style.animation = "slide-down 1200ms ease-out forwards";
    } else if (subdirectorio === "#/perfiles") {
      contenido.hero.style.animation = "aparecer 900ms ease-out forwards";
      contenido.seccion = "perfiles";
      contenido.hero.style.display = "block";
      contenido.hero.style.visibility = "visible";
      contenido.footer.style.display = "block";
      window.scrollTo(0, 0);
      mostrarHeader();
      pintarPerfiles();
    } else if (subdirectorio.includes("catalogo")) {
      contenido.seccion = "catalogo";
      contenido.hero.style.display = "block";
      contenido.hero.style.visibility = "visible";
      contenido.hero.style.animation = "aparecer 900ms ease-out forwards";
      contenido.footer.style.display = "block";
      mostrarHeader();
      pintarCatalogo();
    } else if (subdirectorio === "#/planes") {
      contenido.hero.style.animation = "aparecer 900ms ease-out forwards";
      contenido.seccion = "planes";
      contenido.hero.style.display = "block";
      contenido.hero.style.visibility = "visible";
      contenido.footer.style.display = "block";

      const divP = tag("div", contenido.info);
      contenido.planes = divP;
      window.scrollTo(0, 0);
      mostrarHeader();
      pintarPlanes();
    } else if (subdirectorio.includes("perfil")) {
      contenido.seccion = "perfil";
      contenido.hero.style.animation = "desaparecer 900ms ease-out forwards";
      contenido.hero.style.display = "none";
      contenido.footer.style.display = "block";
      const perfilUrl = location.href.substring(
        location.href.lastIndexOf("/") + 1
      );
      mostrarHeader();
      pintarPerfil(perfilUrl);
    } else if (subdirectorio.includes("grabaciones")) {
      contenido.seccion = "grabaciones";
      contenido.hero.style.display = "none";
      window.scrollTo(0, 0);
      contenido.footer.style.display = "block";
      const grabacionUrl = location.href.substring(
        location.href.lastIndexOf("/") + 1
      );
      mostrarHeader();
      pintarGrabacion(grabacionUrl);
    }
    contenido.info.style.animation = "slide-down 3200ms ease-out forwards";
    contenido.popupLoading.style.visibility = "hidden";
  }, 300);
}

window.addEventListener("hashchange", function () {
  escogerSeccion();
});

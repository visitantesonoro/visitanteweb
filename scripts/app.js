import { datos } from "./data/Datos.js?n=17";
import { musicos } from "./classes/Musicos.js?n=17";
import { logo } from "./classes/Logo.js?n=17";
import { header } from "./classes/Header.js?n=17";
import { tag } from "./componentes/utilidades/tag.js?n=17";
import { info } from "./classes/Info.js?n=17";
import { menu } from "./classes/Menu.js?n=17";
import { mapa } from "./classes/Mapa.js?n=17";
import { player } from "./classes/Player.js?n=17";

empezar();

let entrando = true;

function empezar() {
  datos.traerDatos("data.json", "get", "inicio");
}

export function crearEstructura() {
  const headerC = tag("header", document.body);
  header.headerC = headerC;

  header.pintar();

  const menuC = tag("div", document.body);
  menu.menuC = menuC;

  menu.pintar();

  const main = tag("main", document.body);

  const logoC = tag("div", main);
  logo.logoC = logoC;

  logo.pintar();

  const infoC = tag("section", main);
  info.infoC = infoC;

  const infoPerfil = tag("div", document.body);
  infoPerfil.className = "info-perfil";
  info.perfilC = infoPerfil;

  const mapaC = tag("div", document.body);
  mapaC.id = "map";
  mapa.mapa = mapaC;

  mapa.pintar();
}

export function escogerSeccion() {
  let nombrePagina = location.hash;

  if (nombrePagina === "#/home") {
    if (entrando) {
      entrando = false;
      info.pintar();
    } else {
      info.pintarPaginaInicio();
      header.mostrarHeader();
    }
  } else if (nombrePagina === "#/perfiles") {
    header.mostrarHeader();
    logo.pintarInicio = false;
    musicos.perfiles = datos.musicos;
    musicos.pintarLista(info.infoC);
    if (entrando) {
      entrando = false;
      player.ponerCancionRandom();
    }
  } else {
    window.location.href = "#/home";
  }
}

window.addEventListener("hashchange", function () {
  escogerSeccion();
});

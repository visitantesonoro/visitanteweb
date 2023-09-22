import { bajarCss } from "../utilidades/css.js?w=1";
import { tag } from "../utilidades/tag.js?w=1";
import { contenido } from "../classes/Contenido.js?w=1";
import { playerActualizar } from "./PlayerActualizar.js?w=1";

class Player {
  yaHuboClick = false;
  primeraVez = true;
  musicoS = null;
  grabacionS = null;
  estaEnPausa = true;
  volumen = 0.2;
  activo = false;

  pintar = pintarPlayer;
  pintarInfoCancion = pintarInfoCancion;
  pintarCentroPlayer = pintarCentroPlayer;
  pintarVolumen = pintarVolumen;
  actualizar = playerActualizar;
  conmutarPlay = conmutarPlay;
  ponerPlay = ponerPlay;
}

export const player = new Player();

function pintarPlayer() {
  const enlace = "./scripts/player/Player.css?w=1";
  bajarCss(enlace, dibujarPlayer);
}

function dibujarPlayer() {
  contenido.player.className = "player";

  player.infoGrabacionC = tag("div", contenido.player);
  player.infoGrabacionC.className = "player-info";
  player.pintarInfoCancion();

  player.pC = tag("div", contenido.player);
  player.pC.className = "player-centro";
  player.pintarCentroPlayer();

  player.pR = tag("div", contenido.player);
  player.pR.className = "player-volumen";

  player.pintarVolumen();
}

function pintarInfoCancion() {
  player.infoGrabacionC.innerHTML = "";

  player.tituloCancion = tag("h2", player.infoGrabacionC);
  player.tituloCancion.innerHTML = player.grabacionS
    ? player.grabacionS.nombre
    : "Título";

  player.musico = tag("p", player.infoGrabacionC);
  player.musico.className = "player-enlace";
  player.musico.innerHTML = player.musicoS ? player.musicoS.nombre : "Músico";
  //musico.addEventListener('click', this.mostrarPerfil.bind(this))

  const infoCancion = tag("p", player.infoGrabacionC);

  player.lugar = tag("span", infoCancion);
  player.lugar.innerHTML = player.musicoS
    ? this.musicoS.lugar.nombre + ", "
    : "Lugar , ";

  const fechaObj = player.grabacionS
    ? new Date(player.grabacionS.fecha)
    : new Date();

  player.fecha = tag("span", infoCancion);
  player.fecha.innerHTML = fechaObj.toLocaleDateString();
}

function pintarCentroPlayer() {
  const centroTop = tag("div", player.pC);
  centroTop.className = "player-controles";

  const imgPlay = player.yaHuboClick
    ? "./assets/imgs/player/pause.png"
    : "./assets/imgs/player/play.png";

  const anterior = tag("img", centroTop);
  anterior.src = "./assets/imgs/player/anterior.png";

  const playImg = tag("img", centroTop);
  playImg.src = imgPlay;
  playImg.addEventListener("click", () => {
    player.conmutarPlay();
  });

  player.playImg = playImg;

  const siguiente = tag("img", centroTop);
  siguiente.src = "./assets/imgs/player/siguiente.png";

  const centroDuracion = tag("div", player.pC);
  centroDuracion.className = "player-duracion";

  player.tiempo = tag("div", centroDuracion);
  player.tiempo.innerHTML = "00:00";

  const lineaContenedor = tag("div", centroDuracion);

  const inputRange = tag("input", lineaContenedor);
  inputRange.className = "progreso";
  inputRange.type = "range";
  inputRange.max = "100";
  inputRange.value = "0";

  player.progreso = inputRange;

  player.duracion = tag("div", centroDuracion);
  player.duracion.innerHTML = "3:21";
}

function pintarVolumen() {
  const divImg = tag("div", player.pR);

  const volImg = tag("img", divImg);
  volImg.src = "./assets/imgs/player/volumen.png";

  const divVol = tag("div", player.pR);

  const inputRange = tag("input", divVol);
  inputRange.className = "volumen";
  inputRange.type = "range";
  inputRange.max = 100;
  inputRange.value = player.volumen;

  player.volumenRango = inputRange;
}

async function conmutarPlay() {
  if (player.ctx.state === "suspended") {
    await player.ctx.resume();
  }

  if (player.activo) {
    player.audio.pause();
    player.activo = false;
    player.playImg.src = "./assets/imgs/player/play.png";
  } else {
    ponerPlay();
  }
}

async function ponerPlay() {
  await player.audio.play();
  player.activo = true;
  player.playImg.src = "./assets/imgs/player/pause.png";
  //player.actualizarFrecuencia();
}

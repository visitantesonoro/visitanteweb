import { bajarCss } from "../utilidades/css.js?w=6";
import { tag } from "../utilidades/tag.js?w=6";
import { contenido } from "../classes/Contenido.js?w=6";
import { player } from "./Player.js?w=6";

export function pintarPlayer() {
  const enlace = "./scripts/player/Player.css?w=6";
  bajarCss(enlace, dibujarPlayer);
}

function dibujarPlayer() {
  contenido.player.className = "player";

  player.infoGrabacionC = tag("div", contenido.player);
  player.infoGrabacionC.className = "player-info";

  pintarInfoCancion();

  player.pC = tag("div", contenido.player);
  player.pC.className = "player-centro";

  pintarCentroPlayer();

  player.pR = tag("div", contenido.player);
  player.pR.className = "player-volumen";

  pintarVolumen();

  player.actualizar();
}

function pintarInfoCancion() {
  player.infoGrabacionC.innerHTML = "";

  player.tituloCancion = tag("h2", player.infoGrabacionC);
  player.tituloCancion.innerHTML = "";

  player.musico = tag("p", player.infoGrabacionC);
  player.musico.className = "player-enlace";
  player.musico.innerHTML = "";
  player.musico.addEventListener("click", player.onClickMusico);

  const infoCancion = tag("p", player.infoGrabacionC);

  player.lugar = tag("span", infoCancion);
  player.lugar.innerHTML = ""

  player.fecha = tag("span", infoCancion);
  player.fecha.innerHTML = "";
}

function pintarCentroPlayer() {
  const centroTop = tag("div", player.pC);
  centroTop.className = "player-controles";

  const imgPlay = "./assets/imgs/player/play.png"

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
  player.progreso.addEventListener("input", () => {
    player.audio.currentTime = player.progreso.value;
  });

  player.duracion = tag("div", centroDuracion);
  player.duracion.innerHTML = "00:00";
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
  inputRange.value = 50;

  player.volumenRango = inputRange;
  player.volumenRango.addEventListener("input", () => {
    if (player.gainNode) {
      player.volumen = player.volumenRango.value / 100;
      player.gainNode.gain.value = player.volumen;
    }
  });
}

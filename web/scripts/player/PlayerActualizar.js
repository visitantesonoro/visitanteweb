import { player } from "./Player.js?w=6";
import { data } from "../data/Data.js?w=6";
import { baseUri } from "../../enviroment.js?w=6";
import { uploadUri } from "../../enviroment.js?w=6";

export function playerActualizar() {
  traerGrabacion();
}

function traerGrabacion() {
  if (!player.musicoId) {
    data.traerItem(0, actualizarInfoPlayer, "/admin/grabaciones/random/");
  } else {
    data.traerItem(player.grabacionUrl, actualizarInfoPlayer, "/admin/grabaciones/url/");
  }
}

function actualizarInfoPlayer(data) {

  if (player.audio) {
    player.audio.pause();
    document.body.removeChild(player.audio);
  }

  player.audio = new Audio();
  player.audio.crossOrigin = "anonymous";
  player.audio.src = `${uploadUri}/${data.grabacion.audio}`;
  document.body.appendChild(player.audio);

  organizarEventos();

  if(player.ctx){
    player.organizarAudioCtx();
  }

  player.grabacionS = data.grabacion;
  player.musicoS = data.musico;

  player.tituloCancion.innerHTML = player.grabacionS.titulo;
  player.musico.innerHTML = player.musicoS.nombre;
  player.lugar.innerHTML = player.grabacionS.lugar;

  const fechaObj = player.grabacionS
    ? new Date(player.grabacionS.fecha)
    : new Date();

  player.fecha.innerHTML = ` - ${fechaObj.toLocaleDateString()}`;
}


function actualizarTiempo(tiempo) {
  player.tiempoActual = formatearTiempo(tiempo);

  const tiempoRestante = player.audio.duration - tiempo;

  player.tiemporRestanteStr = formatearTiempo(tiempoRestante);

  player.tiempo.innerHTML = player.tiempoActual;
  player.progreso.value = player.audio.currentTime;
  player.duracion.innerHTML = player.tiemporRestanteStr;
}

function formatearTiempo(time) {
  const secs = `${parseInt(`${time % 60}`, 10)}`.padStart(2, "0");
  const min = parseInt(`${(time / 60) % 60}`, 10);

  return `${min}:${secs}`;
}

function organizarEventos() {
  player.audio.addEventListener("loadedmetadata", () => {
    actualizarTiempo(player.audio.currentTime);
    player.progreso.max = player.audio.duration;
  });

  player.audio.addEventListener("timeupdate", () => {
    actualizarTiempo(player.audio.currentTime);
  });

  player.audio.addEventListener("ended", () => {
    player.conmutarPlay();
  });
}

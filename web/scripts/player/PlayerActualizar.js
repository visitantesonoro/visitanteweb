import { player } from "./Player.js?w=1";
import { data } from "../data/Data.js?w=1";
import { baseUri } from "../../enviroment.js?w=1";

export function playerActualizar() {
  if (player.primeraVez) {
    player.primeraVez = false;
    crearAudioContext();
  } else {
    traerGrabacion();
  }
}

function crearAudioContext() {
  player.audio = new Audio();
  player.audio.crossOrigin = "anonymous";
  document.body.appendChild(player.audio);

  player.ctx = new AudioContext();

  organizarEventos();

  traerGrabacion();
}

function traerGrabacion() {
  if (!player.musicoS) {
    data.traerItem(0, ponerASonar, "/admin/grabaciones/random/");
  } else {
    console.log("traer grabación musico");
  }
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

  // player.progreso.addEventListener("input", () => {
  //   player.moverA(player.progreso.value);
  // });

  // player.volumenRango.addEventListener("input", player.cambiarVolumen.bind(player));
}

function ponerASonar(data) {
  actualizarInfoPlayer(data);

  if (player.audio) {
    player.audio.pause();
    document.body.removeChild(player.audio);
  }

  player.audio = new Audio();
  player.audio.crossOrigin = "anonymous";
  player.audio.src = `${baseUri}/${data.grabacion.audio}`;
  document.body.appendChild(player.audio);

  organizarEventos();

  player.cancion = player.ctx.createMediaElementSource(player.audio);
  player.gainNode = player.ctx.createGain();
  player.gainNode.gain.value = player.volumen;
  player.analista = player.ctx.createAnalyser();
  player.analista.fftSize = 2048;
  player.bufferLength = player.analista.frequencyBinCount;
  player.dataArray = new Uint8Array(player.bufferLength);
  player.analista.getByteFrequencyData(player.dataArray);

  player.cancion
    .connect(player.gainNode)
    .connect(player.analista)
    .connect(player.ctx.destination);

  if(player.activo){
    player.ponerPlay();
  }
}

function actualizarInfoPlayer(data) {
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

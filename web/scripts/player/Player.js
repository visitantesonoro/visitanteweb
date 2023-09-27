import { pintarPlayer } from "./PlayerPintar.js?w=1";
import { playerActualizar } from "./PlayerActualizar.js?w=1";
import { pintarCanvas, animarFrecuencias } from "./PlayerCanvas.js?w=1";

class Player {
  yaHuboClick = false;
  primeraVez = true;
  musicoS = null;
  grabacionS = null;
  estaEnPausa = true;
  volumen = 0.5;
  activo = false;
  contador = 0;
  imgPlayS = null;
  fila = null;

  pintar = pintarPlayer;
  actualizar = playerActualizar;
  organizarAudioCtx = organizarAudioCtx;
  conmutarPlay = conmutarPlay;
  ponerASonar = ponerASonar;
  ponerASonarDesdeComponente = ponerASonarDesdeComponente;
  ponerASonarDesdePlaylist = ponerASonarDesdePlaylist;
  pintarCanvas = pintarCanvas;
  animarFrecuencias = animarFrecuencias;

  onClickMusico = ()=>{
    window.location.href = "#/perfil/" + this.musicoS.url;
  }
}

export const player = new Player();

function ponerASonarDesdePlaylist(el, musicoId, grabacionUrl) {
  if (this.fila === el) {
    if (this.activo) {
      this.fila.className = "";
    } else {
      this.fila.className = "";
    }

    this.conmutarPlay();
    return;
  }

  if (this.fila) {
    this.fila.className = "";
  }

  this.fila = el;
  this.fila.className = "grabaciones-listaS";

  this.musicoId = musicoId;
  this.grabacionUrl = grabacionUrl;
  this.actualizar();
  this.activo = false;
  this.conmutarPlay();
}

function ponerASonarDesdeComponente(el, musicoId, grabacionUrl) {
  if (this.imgPlayS === el) {
    if (this.activo) {
      this.imgPlayS.src = "./assets/imgs/player/play.png";
    } else {
      this.imgPlayS.src = "./assets/imgs/player/pause.png";
    }

    this.conmutarPlay();
    return;
  }

  if (this.imgPlayS) {
    this.imgPlayS.src = "./assets/imgs/player/play.png";
  }

  this.imgPlayS = el;
  this.imgPlayS.src = "./assets/imgs/player/pause.png";

  this.musicoId = musicoId;
  this.grabacionUrl = grabacionUrl;
  this.actualizar();
  this.activo = false;
  this.conmutarPlay();
}

async function conmutarPlay() {
  if (player.primeraVez) {
    player.primeraVez = false;
    player.pintarCanvas();
    player.ctx = new AudioContext();
    player.organizarAudioCtx();
  }

  if (player.ctx.state === "suspended") {
    await player.ctx.resume();
  }

  if (player.activo) {
    player.audio.pause();
    player.activo = false;
    player.playImg.src = "./assets/imgs/player/play.png";
  } else {
    ponerASonar();
  }
}

async function ponerASonar() {
  await player.audio.play();
  player.activo = true;
  player.playImg.src = "./assets/imgs/player/pause.png";
  player.animarFrecuencias();
}

function organizarAudioCtx() {
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

  if (player.activo) {
    player.ponerASonar();
  }
}

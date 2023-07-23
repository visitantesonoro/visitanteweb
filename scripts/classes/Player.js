import { bajarCss } from "../componentes/utilidades/css.js?n=17";
import { tag } from "../componentes/utilidades/tag.js?n=17";
import { datos } from "../data/Datos.js?n=17";
import { musico } from "./Musico.js?n=17";
import { info } from "./Info.js?n=17";
import { textos } from "../managers/Textos.js?n=17";

class Player {
  activo = false;
  duracion;
  tiempo;
  contador = 0;
  volumen = 0.1;
  yaInicializo = false;
  yaHuboClick = false;

  iniciar() {
    if (this.audio) {
      this.audio.pause();
    }

    this.audio = new Audio();
    this.audio.src = this.audioSrc;

    this.ctx = new AudioContext();
    this.cancion = this.ctx.createMediaElementSource(this.audio);
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.value = this.volumen;
    this.analista = this.ctx.createAnalyser();
    this.analista.fftSize = 2048;
    this.bufferLength = this.analista.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.analista.getByteFrequencyData(this.dataArray);

    this.cancion
      .connect(this.gainNode)
      .connect(this.analista)
      .connect(this.ctx.destination);

    if(this.yaHuboClick){
      this.conmutarPlay();
    }  
    
    this.actualizarFrecuencia(); 

    this.controles.style.animation = "aparecer 4s ease-out forwards";

    this.organizarEventos();
  }

  pintar() {
    if(!this.yaInicializo){
      const enlace = "./scripts/classes/Player.css";
      bajarCss(enlace, this.pintarPlayer.bind(this));
      this.yaInicializo = true;
    }else{
      this.iniciar();
    }
  }

  pintarPlayer() {
    this.pintarCanvas();
    this.pintarControles();
    this.iniciar();
  }

  pintarCanvas() {
    this.canvas = tag("canvas", this.canvasC);
    this.canvas.className = "player-canvas";
    this.canvas.width = window.innerWidth;
    this.canvas.height = 300;
    this.canvasCtx = this.canvas.getContext("2d");
    this.canvasCtx.fillStyle = "rgb(0, 0, 0, 0)";
    this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  pintarControles() {
    this.controles = tag("div", document.body);
    this.controles.className = "player";

    const pL = tag("div", this.controles);
    pL.className = "player-info";

    this.infoGrabacionC = pL;

    this.pintarInfoCancion(pL);

    const pC = tag("div", this.controles);
    pC.className = "player-centro";

    this.pintarCentroPlayer(pC);

    const pR = tag("div", this.controles);
    pR.className = "player-volumen";

    this.pintarVolumen(pR);
  }

  pintarInfoCancion() {

    this.infoGrabacionC.innerHTML = "";

    const tituloCancion = tag("h2", this.infoGrabacionC);
    tituloCancion.innerHTML = this.grabacionS.nombre;

    const musico = tag("p", this.infoGrabacionC);
    musico.className = 'player-enlace';
    musico.innerHTML = this.musicoS.nombre;
    musico.addEventListener('click', this.mostrarPerfil.bind(this))

    const infoCancion = tag("p", this.infoGrabacionC);

    const lugar = tag("span", infoCancion);
    lugar.innerHTML = this.musicoS.lugar.nombre + ', ';

    const fechaObj = new Date(this.grabacionS.fecha);

    const fecha = tag("span", infoCancion);
    fecha.innerHTML = fechaObj.toLocaleDateString();
  }

  pintarCentroPlayer(el) {
    const centroTop = tag("div", el);
    centroTop.className = "player-controles";

    const imgPlay = (this.yaHuboClick) ? "./assets/imgs/player/pause.png" : "./assets/imgs/player/play.png";

    const anterior = tag("img", centroTop);
    anterior.src = "./assets/imgs/player/anterior.png";

    const playImg = tag("img", centroTop);
    playImg.src = imgPlay;
    playImg.addEventListener("click", () => {
      this.conmutarPlay();
    });

    this.playImg = playImg;

    const siguiente = tag("img", centroTop);
    siguiente.src = "./assets/imgs/player/siguiente.png";

    const centroDuracion = tag("div", el);
    centroDuracion.className = "player-duracion";

    this.tiempo = tag("div", centroDuracion);
    this.tiempo.innerHTML = "00:00";

    const lineaContenedor = tag("div", centroDuracion);

    const inputRange = tag("input", lineaContenedor);
    inputRange.className = "progreso";
    inputRange.type = "range";
    inputRange.max = "100";
    inputRange.value = "0";

    this.progreso = inputRange;

    this.duracion = tag("div", centroDuracion);
    this.duracion.innerHTML = "3:21";
  }

  pintarVolumen(el) {
    const divImg = tag("div", el);

    const volImg = tag("img", divImg);
    volImg.src = "./assets/imgs/player/volumen.png";

    const divVol = tag("div", el);

    const inputRange = tag("input", divVol);
    inputRange.className = "volumen";
    inputRange.type = "range";
    inputRange.max = 100;
    inputRange.value = this.volumen;

    this.volumenRango = inputRange;
  }

  organizarEventos() {
    this.audio.addEventListener("loadedmetadata", () => {
      this.actualizarTiempo(this.audio.currentTime);
      this.progreso.max = this.audio.duration;
    });

    this.audio.addEventListener("timeupdate", () => {
      this.actualizarTiempo(this.audio.currentTime);
    });

    this.audio.addEventListener("ended", () => {
      this.conmutarPlay();
    });

    this.progreso.addEventListener("input", () => {
      this.moverA(this.progreso.value);
    });

    this.volumenRango.addEventListener("input", this.cambiarVolumen.bind(this));
  }

  cambiarVolumen() {
    console.log(this.volumenRango.value);

    if (this.gainNode) {
      this.volumen = this.volumenRango.value / 100;
      this.gainNode.gain.value = this.volumen;
    }
  }

  moverA(valor) {
    this.audio.currentTime = valor;
  }

  formatearTiempo(time) {
    const secs = `${parseInt(`${time % 60}`, 10)}`.padStart(2, "0");
    const min = parseInt(`${(time / 60) % 60}`, 10);

    return `${min}:${secs}`;
  }

  actualizarTiempo(tiempo) {
    this.tiempoActual = this.formatearTiempo(tiempo);

    const tiempoRestante = this.audio.duration - tiempo;

    this.tiemporRestanteStr = this.formatearTiempo(tiempoRestante);

    this.tiempo.innerHTML = this.tiempoActual;
    this.progreso.value = this.audio.currentTime;
    this.duracion.innerHTML = this.tiemporRestanteStr;
  }

  async conmutarPlay() {
    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }

    if (this.activo) {
      this.audio.pause();
      this.activo = false;
      this.playImg.src = "./assets/imgs/player/play.png";
    } else {
      await this.audio.play();
      this.activo = true;
      this.playImg.src = "./assets/imgs/player/pause.png";
      this.actualizarFrecuencia();
    }
  }

  ponerCancionRandom() {
    const random = Math.floor(Math.random()*8);

    datos.grabacionS = datos.grabaciones[random];
    datos.musicoS = datos.musicos.filter(
      (musico) => musico.musico_id === datos.grabacionS.musico
    );
    this.activo = false;
    this.musicoS = datos.musicoS[0];
    this.grabacionS = datos.grabacionS;
    this.audioSrc = this.grabacionS.url;
    this.pintar();    
  }

  mostrarPerfil(){
    info.perfilC.style.animation = "aparecer 0.4s ease-out forwards";
    musico.info = this.musicoS;
    musico.pintarPerfil(info.perfilC);
  }

  actualizarFrecuencia() {
    this.contador++;

    if (this.contador > 1) {
      this.contador = 0;
      this.analista.getByteFrequencyData(this.dataArray);

      this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const barWidth = 1;
      const gap = 20;
      const barCount = this.bufferLength / (barWidth + gap - gap);
      let x = 0;
      let xAnterior = 0;
      let yAnterior = this.canvas.height / 2;
      let y;

      for (let i = 0; i < barCount; i++) {
        xAnterior = x;
        yAnterior = y;

        const perc = (this.dataArray[i] * 100) / 255;
        const h = (perc * this.canvas.height) / 100;
        y = this.canvas.height / 1.5 - h / 1.5;

        x += barWidth + gap;

        this.canvasCtx.beginPath();
        this.canvasCtx.strokeStyle = "#fff";
        this.canvasCtx.moveTo(xAnterior - gap, yAnterior);
        this.canvasCtx.lineTo(x - gap, y);
        this.canvasCtx.stroke();
      }
    }

    requestAnimationFrame(this.actualizarFrecuencia.bind(this));
  }
}

export const player = new Player();

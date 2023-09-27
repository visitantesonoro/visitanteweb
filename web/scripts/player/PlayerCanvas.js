import { contenido } from "../classes/Contenido.js?w=1";
import { player } from "./Player.js?w=1";

export function pintarCanvas() {
  player.canvas = contenido.canvas;
  player.canvas.className = "player-canvas";

  player.canvasCtx = player.canvas.getContext("2d");
  player.canvasCtx.fillStyle = "rgb(0, 0, 0, 0)";
  player.canvasCtx.fillRect(0, 0, player.canvas.width, player.canvas.height);
}

export function animarFrecuencias(){
  player.contador++;

  if (player.contador > 1) {
    player.contador = 0;
    player.analista.getByteFrequencyData(player.dataArray);

    player.canvasCtx.clearRect(0, 0, player.canvas.width, player.canvas.height);

    const barWidth = 1;
    const gap = 20;
    const barCount = player.bufferLength / (barWidth + gap - gap);
    let x = 0;
    let xAnterior = 0;
    let yAnterior = player.canvas.height / 2;
    let y;

    for (let i = 0; i < barCount; i++) {
      xAnterior = x;
      yAnterior = y;

      const perc = (player.dataArray[i] * 100) / 255;
      const h = (perc * player.canvas.height) / 100;
      y = player.canvas.height / 1.5 - h / 1.5;

      x += barWidth + gap;

      player.canvasCtx.beginPath();
      player.canvasCtx.strokeStyle = "#fff";
      player.canvasCtx.moveTo(xAnterior - gap, yAnterior);
      player.canvasCtx.lineTo(x - gap, y);
      player.canvasCtx.stroke();
    }
  }

  requestAnimationFrame(player.animarFrecuencias);
}

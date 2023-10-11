import { baseUri } from "../../enviroment.js?w=6";
import { uploadUri } from "../../enviroment.js?ad=6";

export const obtenerDuracion = (audio, ejecutar) => {
  let audioObj = new Audio();
  document.body.appendChild(audioObj);

  return new Promise((resolve) => {
    const audioSrc = `${uploadUri}/${audio}`;
    audioObj.src = audioSrc;
    audioObj.addEventListener("loadeddata", () => {
      const duracion = audioObj.duration;
      const secs = `${parseInt(`${duracion % 60}`, 10)}`.padStart(2, "0");
      const min = parseInt(`${(duracion / 60) % 60}`, 10);
      const duracionFormateada = `${min}:${secs}`;

      document.body.removeChild(audioObj);
      resolve(duracionFormateada);
    });
  });
};

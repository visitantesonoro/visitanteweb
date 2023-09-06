import { bajarCss } from "../utilidades/css.js?w=1";
import { tag } from "../utilidades/tag.js?w=1";
import { contenido } from "../classes/Contenido.js?w=1";
import { data } from "../data/Data.js?w=1";
import { baseUri } from "../../enviroment.js?w=1";

class MapaObj {
  map;
  filtro = "grabaciones";
  bajarDatos = bajarDatos;
  pintarMapa = pintarMapa;
  pintarMarkers = pintarMarkers;

  markers = [];

  addMarker(markerObj) {
    markerObj.contenedor.addEventListener("click", () => {
      this.markerOnClick(markerObj);
    });
    this.markers.push(markerObj);

    markerObj.contenedor.addEventListener("mouseover", () => {
      this.markerOnMouseover(markerObj);
    });

    markerObj.contenedor.addEventListener("mouseout", () => {
      this.markerOnmouseout(markerObj);
    });
  }

  markerOnMouseover(marker) {
    if (this.map.getZoom() >= 17) {

      const n = 20;
      const tituloOr = marker.info.grabacion.titulo;
      const musicoOr = marker.info.musico.nombre;

      const titulo = (tituloOr.length > n) ? tituloOr.slice(0, n) + '...' :  tituloOr;
      const musico = (musicoOr.length > n) ? musicoOr.slice(0, n) + '...' :  musicoOr;

      const texto = `${titulo} - <b>${musico}</b>`;
      contenido.mostrarPopup(marker.contenedor, texto);
    }
  }

  markerOnmouseout(marker) {
    contenido.esconderPopup();
  }

  markerOnClick(marker) {
    contenido.esconderPopup();
    
    if (this.map.getZoom() < 17) {
      const end = {
        center: [marker.info.grabacion.longitud, marker.info.grabacion.latitud],
        zoom: 17,
        //bearing: 130,
        pitch: 10,
      };

      this.map.flyTo({
        ...end,
        duration: 2000,
        essential: true,
      });
    } else {
      contenido.mostrarInfoGrabacion(marker);
    }
  }
}

export const mapaObj = new MapaObj();

function bajarDatos() {
  if (this.filtro === "grabaciones") {
    data.traerLista(this.pintarMarkers.bind(this), "/admin/grabaciones/");
  }
}

function pintarMapa() {
  const enlace = "./scripts/mapa/Mapa.css?w=1";
  bajarCss(enlace, dibujarMapa);
}

function dibujarMapa() {
  contenido.mapa.className = "mapa";

  const div = tag("div", contenido.mapa);
  div.id = "map";

  pintarMapaGraficos();
}

function pintarMapaGraficos() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYWxlam9mb3Jlcm8iLCJhIjoiY2xoOWNoMnkyMDYwODNtcGRoaGttMGU2MCJ9.WF4h2nN6MymJNNffz5JyEA";

  mapaObj.map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v11",
    center: [-74.07169171487116, 4.713225906131585],
    zoom: 4,
  });

  // mapaObj.map.on("zoom", () => {
  //   console.log(mapaObj.map.getZoom());
  // });

  mapaObj.bajarDatos();
}

function pintarMarkers(data) {
  const thisObj = this;

  data.grabaciones.map((grabacion) => {

    const musico = data.musicos.filter(musico => musico._id === grabacion.musico)[0];

    const imgSrc = `url(${baseUri}/${musico.imagen})`;

    const el = document.createElement("div");
    const width = 30;
    const height = 30;
    el.className = "marker";
    el.style.backgroundImage = imgSrc;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.backgroundSize = "100%";

    const coordenadas = [grabacion.longitud, grabacion.latitud];

    const marker = new mapboxgl.Marker(el)
      .setLngLat(coordenadas)
      .addTo(thisObj.map);

    let markerObj = {
      contenedor: el,
      info: {
        grabacion,
        musico
      },

      marker,
    };

    thisObj.addMarker(markerObj);
  });
}



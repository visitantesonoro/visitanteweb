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
  }

  markerOnClick(marker) {
    //alert(marker.info.titulo);

    if (this.map.getZoom() < 17) {
      const end = {
        center: [marker.info.longitud, marker.info.latitud],
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
      alert(marker.info.titulo);
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

  mapaObj.map.on("zoom", () => {
    // if (map.getZoom() > zoomThreshold) {

    console.log(mapaObj.map.getZoom());
  });

  mapaObj.bajarDatos();
}

function pintarMarkers(data) {
  const thisObj = this;

  data.grabaciones.map((grabacion) => {
    const imagen = data.musicos.filter(
      (musico) => musico._id === grabacion.musico
    )[0].imagen;

    const imgSrc = `url(${baseUri}/${imagen})`;

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
      info: grabacion,
      marker,
    };

    thisObj.addMarker(markerObj);
  });
}

function adjuntarMusicoFx(el, musico, map) {
  el.addEventListener("click", () => {
    console.log(musico);
    // musicos.pintarPerfilInfo(musico);

    // const end = {
    //   center: [-76.66034692643743, 5.686056820833372],
    //   zoom: 9,
    //   //bearing: 130,
    //   pitch: 10,
    // };

    // const el = document.createElement("div");
    // const width = 10;
    // const height = 10;
    // el.className = "marker";
    // el.style.backgroundColor = "red";
    // el.style.width = `${width}px`;
    // el.style.height = `${height}px`;
    // el.style.backgroundSize = "100%";

    // const coordenadas = [-76.60034692643743, 5.72605682083336];

    // // Add markers to the map.
    // let marker = new mapboxgl.Marker(el).setLngLat(coordenadas).addTo(map);

    // setTimeout(() => {
    //   marker.remove();
    // }, 4000);

    // map.flyTo({
    //   ...end,
    //   duration: 2000,
    //   essential: true,
    // });
  });
}

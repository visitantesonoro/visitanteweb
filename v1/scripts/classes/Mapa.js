import { datos } from "../data/Datos.js?n=17";
import { musicos } from "./Musicos.js?n=17";

class Mapa {
  pintar = pintarMapa;
}

export const mapa = new Mapa();

export function pintarMapa() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYWxlam9mb3Jlcm8iLCJhIjoiY2xoOWNoMnkyMDYwODNtcGRoaGttMGU2MCJ9.WF4h2nN6MymJNNffz5JyEA";

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          message: "Músico",
          iconSize: [30, 30],
          img: "./assets/imgs/perfiles/0.jpg",
        },
        geometry: {
          type: "Point",
          coordinates: [-77.2746026070177, 1.2224503846742913],
        },
      },
      {
        type: "Feature",
        properties: {
          message: "Músico",
          iconSize: [30, 30],
          img: "./assets/imgs/perfiles/1.jpg",
        },
        geometry: {
          type: "Point",
          coordinates: [-76.65035728645385, 5.69614507645981],
        },
      },
      {
        type: "Feature",
        properties: {
          message: "Músico",
          iconSize: [30, 30],
          img: "./assets/imgs/perfiles/2.jpg",
        },
        geometry: {
          type: "Point",
          coordinates: [-72.90968633859188, 11.59757327175551],
        },
      },
      {
        type: "Feature",
        properties: {
          message: "Músico",
          iconSize: [30, 30],
          img: "./assets/imgs/perfiles/3.jpg",
        },
        geometry: {
          type: "Point",
          coordinates: [-72.27154263755355, 4.864028882511346],
        },
      },
    ],
  };

  const map = new mapboxgl.Map({
    container: "map",
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: "mapbox://styles/mapbox/light-v11",
    center: [-74.07169171487116, 4.713225906131585],
    zoom: 4,
  });

  map.on("zoom", () => {
    // if (map.getZoom() > zoomThreshold) {
    //   stateLegendEl.style.display = "none";
    //   countyLegendEl.style.display = "block";
    // } else {
    //   stateLegendEl.style.display = "block";
    //   countyLegendEl.style.display = "none";
    // }

    console.log(map.getZoom());
  });

  for (var musico of datos.musicos) {
    const el = document.createElement("div");
    const width = 30;
    const height = 30;
    el.className = "marker";
    el.style.backgroundImage = `url(${musico.img})`;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.backgroundSize = "100%";

    adjuntarMusicoFx(el, musico, map);

    // Add markers to the map.
    new mapboxgl.Marker(el).setLngLat(musico.lugar.coordenadas).addTo(map);
  }
}

function adjuntarMusicoFx(el, musico, map) {
  el.addEventListener("click", () => {
    musicos.pintarPerfilInfo(musico);

    const end = {
      center: [-76.66034692643743, 5.686056820833372],
      zoom: 9,
      //bearing: 130,
      pitch: 10,
    };

    const el = document.createElement("div");
    const width = 10;
    const height = 10;
    el.className = "marker";
    el.style.backgroundColor = "red";
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.backgroundSize = "100%";

    const coordenadas = [-76.60034692643743, 5.72605682083336];

    // Add markers to the map.
    let marker = new mapboxgl.Marker(el).setLngLat(coordenadas).addTo(map);

    setTimeout(() => {
      marker.remove();
    }, 4000);

    map.flyTo({
      ...end,
      duration: 2000,
      essential: true,
    });
  });
}

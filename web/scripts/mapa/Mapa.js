import { bajarCss } from "../utilidades/css.js?w=1";
import { tag } from "../utilidades/tag.js?w=1";
import { contenido } from "../classes/Contenido.js?w=1";

let datos = {
  musicos: [
    {
      musico_id: 1,
      nombre: "Walter Eccehomo Martínez Mena",
      descripcion: "Músico de Quibdó",
      img: "assets/imgs/victor-espinal.jpg",
      lugar: {
        nombre: "Quibdó",
        coordenadas: [-76.66034692643743, 5.686056820833372],
      },
      grabaciones: [1, 2, 3, 5],
    },
    {
      musico_id: 2,
      nombre: "Taylor Miranda",
      descripcion: "Músico de San Basilio de Palenque",
      img: "assets/imgs/auriculares.png",
      lugar: {
        nombre: "San Basilio de Palenque",
        coordenadas: [-75.197593395137, 10.103552256072621],
      },
      grabaciones: [6, 7],
    },
    {
      musico_id: 3,
      nombre: "Roland Balanta",
      descripcion: "Músico de Santander de Quilichao",
      img: "assets/imgs/auriculares.png",
      lugar: {
        nombre: "Santander de Quilichao",
        coordenadas: [-76.48762381460952, 3.0094946090487418],
      },
      grabaciones: [8, 9],
    },
    {
      musico_id: 4,
      nombre: "Malku",
      descripcion: "Músico de Santander de Quilichao",
      img: "assets/imgs/auriculares.png",
      lugar: {
        nombre: "Cerro Munchique",
        coordenadas: [-75.9283932, 2.532622],
      },
      grabaciones: [10, 11, 12, 13, 14],
    },
    {
      musico_id: 5,
      nombre: "Luís Carabalí",
      descripcion: "Músico de Santa Lucía",
      img: "assets/imgs/auriculares.png",
      lugar: {
        nombre: "Santa Lucía, Cauca",
        coordenadas: [-74.9283932, 2.532442],
      },
      grabaciones: [15, 16, 17],
    },
    {
      musico_id: 6,
      nombre: "Danilo Floréz",
      descripcion: "Músico de Santa Lucía",
      img: "assets/imgs/auriculares.png",
      lugar: {
        nombre: "La Palestina, Casanare",
        coordenadas: [-73.9283932, 2.532428],
      },
      grabaciones: [18, 19, 20, 21, 22, 23, 24, 25],
    },
  ],
  grabaciones: [
    {
      grabacion_id: 1,
      nombre: "Dominguito toma 2",
      url: "assets/audios/martinez-mena/01.mp3",
      fecha: "1980/05/07",
      musico: 1,
      categorias: [1],
    },
    {
      grabacion_id: 2,
      nombre: "Joselin Bacoso",
      url: "assets/audios/martinez-mena/02.mp3",
      fecha: "1983/09/02",
      musico: 1,
      categorias: [1],
    },
    {
      grabacion_id: 3,
      nombre: "Joselin La muela",
      url: "assets/audios/martinez-mena/03.mp3",
      fecha: "1983/09/02",
      musico: 1,
      categorias: [1],
    },
    {
      grabacion_id: 5,
      nombre: "Joselin Pasillo",
      url: "assets/audios/martinez-mena/05.mp3",
      fecha: "1983/09/02",
      musico: 1,
      categorias: [1],
    },
    {
      grabacion_id: 6,
      nombre: "Tyler saludo",
      url: "assets/audios/tylor-miranda/01.mp3",
      fecha: "1983/09/02",
      musico: 2,
      categorias: [1],
    },
    {
      grabacion_id: 7,
      nombre: "Pregones de Panamá",
      url: "assets/audios/tylor-miranda/02.mp3",
      fecha: "1983/09/02",
      musico: 2,
      categorias: [1],
    },
    {
      grabacion_id: 8,
      nombre: "El agáchese, SDQ venta de ropa y raspado",
      url: "assets/audios/roland-balanta/03.mp3",
      fecha: "1983/09/02",
      musico: 3,
      categorias: [1],
    },
    {
      grabacion_id: 9,
      nombre: "Paisaje sonoro parque pandebono",
      url: "assets/audios/roland-balanta/04.mp3",
      fecha: "1983/09/02",
      musico: 3,
      categorias: [1],
    },
    {
      grabacion_id: 10,
      nombre: "Bakacxtepa Malku Abril 13 2021",
      url: "assets/audios/malku/01.mp3",
      fecha: "2021/04/13",
      musico: 4,
      categorias: [1],
    },
    {
      grabacion_id: 11,
      nombre: "flauta reserva Munchique",
      url: "assets/audios/malku/02.mp3",
      fecha: "2021/04/13",
      musico: 4,
      categorias: [1],
    },
    {
      grabacion_id: 12,
      nombre: "Malku Thewala",
      url: "assets/audios/malku/03.mp3",
      fecha: "2021/04/13",
      musico: 4,
      categorias: [1],
    },
    {
      grabacion_id: 13,
      nombre: "vientos andinos caballo y radio",
      url: "assets/audios/malku/04.mp3",
      fecha: "1983/09/02",
      musico: 4,
      categorias: [1],
    },
    {
      grabacion_id: 14,
      nombre: "Munchique territorio Nasa",
      url: "assets/audios/malku/05.mp3",
      fecha: "1983/09/02",
      musico: 4,
      categorias: [1],
    },
    {
      grabacion_id: 15,
      nombre: "pollos casa Luis",
      url: "assets/audios/carabali/01.mp3",
      fecha: "1983/09/02",
      musico: 5,
      categorias: [1],
    },
    {
      grabacion_id: 16,
      nombre: "violín caucano historia canciones",
      url: "assets/audios/carabali/02.mp3",
      fecha: "1983/09/02",
      musico: 5,
      categorias: [1],
    },
    {
      grabacion_id: 17,
      nombre: "presentación min 4 Luis Carabali",
      url: "assets/audios/carabali/03.mp3",
      fecha: "1983/09/02",
      musico: 5,
      categorias: [1],
    },
    {
      grabacion_id: 18,
      nombre: "Bullicio de amanecer",
      url: "assets/audios/danilo-florez/01.mp3",
      fecha: "1983/09/02",
      musico: 6,
      categorias: [1],
    },
    {
      grabacion_id: 19,
      nombre: "Bullicio de arendajos",
      url: "assets/audios/danilo-florez/02.mp3",
      fecha: "1983/09/02",
      musico: 6,
      categorias: [1],
    },
    {
      grabacion_id: 20,
      nombre: "Coleadores a la manga",
      url: "assets/audios/danilo-florez/03.mp3",
      fecha: "1983/09/02",
      musico: 6,
      categorias: [1],
    },
    {
      grabacion_id: 21,
      nombre: "Consejo sagrado",
      url: "assets/audios/danilo-florez/04.mp3",
      fecha: "1983/09/02",
      musico: 6,
      categorias: [1],
    },
    {
      grabacion_id: 22,
      nombre: "Coplas a caballo",
      url: "assets/audios/danilo-florez/05.mp3",
      fecha: "1983/09/02",
      musico: 6,
      categorias: [1],
    },
    {
      grabacion_id: 23,
      nombre: "De fundo a fundo",
      url: "assets/audios/danilo-florez/06.mp3",
      fecha: "1983/09/02",
      musico: 6,
      categorias: [1],
    },
    {
      grabacion_id: 24,
      nombre: "El hijo del llano",
      url: "assets/audios/danilo-florez/07.mp3",
      fecha: "1983/09/02",
      musico: 6,
      categorias: [1],
    },
    {
      grabacion_id: 25,
      nombre: "En el corral",
      url: "assets/audios/danilo-florez/08.mp3",
      fecha: "1983/09/02",
      musico: 6,
      categorias: [1],
    },
  ],
  categorias: [
    {
      catgoria_id: 1,
      nombre: "Música",
    },
  ],
};

export let map;

export function pintarMapa() {
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

  map = new mapboxgl.Map({
    container: "map",
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

import { bajarCss } from "../utilidades/css.js?w=6";
import { tag } from "../utilidades/tag.js?w=6";
import { contenido } from "../classes/Contenido.js?w=6";
import { textos } from "../utilidades/textos.js?w=6";

export function pintarPlanes() {
  const enlace = "./scripts/home/Planes.css?w=6";
  bajarCss(enlace, dibujarPlanes);
}

function dibujarPlanes() {
  contenido.planes.className = "planes";

  const h1 = tag("h1", contenido.planes);
  h1.innerHTML = textos.planesTituloEs;

  const p = tag("p", contenido.planes);
  p.innerHTML = textos.planesDescEs;

  const section = tag("section", contenido.planes);

  pintarPlanesOpciones(section);
}

function pintarPlanesOpciones(contenedor) {
  const planesInfo = [
    {
      titulo: "Crowdfunding",
      precio: "$20.000",
      beneficios: [
        "Con tu aporte podremos realizar más grabaciones",
        "El aporte será destinado para los músicos y creadores de contenido",
      ],
    },
    {
      titulo: "Catálogo",
      precio: "$30.000",
      beneficios: [
        "Realiza compra del catálogo de grabaciones y apoya a nuestros artistas",
      ],
    },
    {
      titulo: "Miembro",
      precio: "$40.000",
      beneficios: [
        "20% de descuento por compras en el catálogo",
        "Acceso a todas las grabaciones sin restricción",
        "creación de playlists",
        "Acceso a todos los artículos de investigación",
      ],
    },
  ];

  planesInfo.map((plan) => {
    const divP = tag("div", contenedor);
    divP.className = 'planes-caja';

    const opcion = new PlanesCaja(divP);
    opcion.titulo = plan.titulo;
    opcion.precio = plan.precio;
    opcion.beneficios = plan.beneficios;
    opcion.pintar();
  });
}

class PlanesCaja {
  constructor(contenedor) {
    this.contenedor = contenedor;
  }

  pintar() {
    const h1 = tag("h1", this.contenedor);
    h1.innerHTML = this.titulo;

    // const h1 = tag("h1", this.contenedor);
    // h1.innerHTML = this.precio;

    const div = tag("div", this.contenedor);

    this.pintarBeneficios(div);
  }

  pintarBeneficios(contenedor){

    const ul = tag("ul", contenedor);

    this.beneficios.map(beneficio =>{
        const li = tag("li", ul);
        li.innerHTML = beneficio;
    })
  }

}

import { datos } from "../data/Datos.js?n=17";
import { player } from "../classes/Player.js?n=17";
import { info } from "../classes/Info.js?n=17";
import { musico } from "../classes/Musico.js?n=17";
import { bajarCss } from "../componentes/utilidades/css.js?n=17";
import { tag } from "../componentes/utilidades/tag.js?n=17";

class Musicos{

    perfiles = [];

    pintarLista(contenedor){
        contenedor.innerHTML = '';

        const divPerfiles = tag('div', contenedor);
        divPerfiles.className = 'perlifesC'

        for(const perfil of this.perfiles){
            const divI = tag('div', divPerfiles);
            divI.className = 'perfiles-item';

            const divImg = tag('div', divI);

            const img = tag('img', divImg);
            img.src = perfil.img;
            img.addEventListener('click', ()=>{
                this.pintarPerfilInfo(perfil)
            })

            const divInfo = tag('div', divI);

            const nombre = tag('h2', divInfo)
            nombre.innerHTML = perfil.nombre;
        }
    }

    pintarPerfilInfo(perfil){
        info.perfilC.style.animation = "aparecer 0.4s ease-out forwards";
        musico.info = perfil;
        musico.pintarPerfil(info.perfilC);
    }
}

export const musicos = new Musicos();
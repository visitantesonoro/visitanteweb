import { tag } from "../utilidades/tag.js?ad=1";
import { contenido } from "../classes/Contenido.js?ad=1";
import { data } from "../classes/Data.js?ad=1";

export function pintarMusicos(){
    contenido.main.innerHTML = "";

    data.traerMusicos(dibujarMusicos);  
}

function dibujarMusicos(data){

    const div = tag("div", contenido.main);

    const divC = tag("div", div);

    const span = tag("span", divC);
    span.innerHTML = "Crear";

    data.forEach(musico =>{
        const divM = tag("div", div);

        const h1 = tag("h1", divM);
        h1.innerHTML = musico.nombre;
    })

}
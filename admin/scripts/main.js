import { tag } from "./utilidades/tag.js?ad=1";
import { pintarHeader } from "./componentes/Header.js?ad=1";
import { contenido } from "./classes/Contenido.js?ad=1";

correr()

function correr(){
   const div = tag("div", document.body);
   
   pintarHeader(div);

   contenido.main = tag("section", document.body);
}
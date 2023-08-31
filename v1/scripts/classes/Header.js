import { bajarCss } from "../componentes/utilidades/css.js?n=17";
import { tag } from "../componentes/utilidades/tag.js?n=17";
import { textos } from "../managers/Textos.js?n=17";
import { menu } from "../classes/Menu.js?n=17";

class Header {
  pintar() {
    const enlace = "./scripts/classes/Header.css";
    bajarCss(enlace, this.pintarHeader.bind(this));
  }

  pintarHeader() {
    const logoH = tag("div", this.headerC);
    logoH.className = "logo-header";
    logoH.innerHTML = "";

    this.pintarLogoHeader(logoH);

    const centroH = tag("div", this.headerC);
    centroH.innerHTML = "";

    const loginH = tag("div", this.headerC);
    loginH.className = "header-login";

    this.pintarLogin(loginH);
  }

  pintarLogoHeader(el) {
    const img = tag("img", el);
    img.src = "./assets/imgs/logo-inicio.png";

    const p = tag("p", el);
    p.innerHTML = "Visitante sonoro";
  }

  pintarLogin(el) {
    const p = tag("p", el);
    p.innerHTML = textos.loginEs;
  
    const divM = tag('div', el);
    divM.className = 'hamburguesa';
    divM.addEventListener('click', ()=>menu.conmutarMenu())
  
    this.pintarHamburguesa(divM);
  }
  
  pintarHamburguesa(el){
    for(let i=0; i<3; i++){
      const div = tag('div', el);
      div.innerHTML = '';
    }
  }

  mostrarHeader(){
    this.headerC.style.animation = "aparecer 4s ease-out forwards";
  }
}

export const header = new Header();

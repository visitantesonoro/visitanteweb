import { tag } from "../utilidades/tag.js?ad=1";
import { bajarCss } from "../utilidades/css.js?ad=1";

export class Forma {
  contenedor;
  campos = [];
  botonCrearTxt = "Crear";
  botonEditarTxt = "Guardar";
  botonBorrarTxt = "Borrar";
  fx;
  editando = false;
  todoOk = true;

  pintar() {
    const enlace = "./scripts/classes/Forma.css?ad=1";
    bajarCss(enlace, this.dibujar.bind(this));
  }

  dibujar() {
    const thisObj = this;

    const divB = tag("div", document.body);
    divB.className = "forma";

    this.contenedor = divB;

    const divI = tag("div", divB);

    const divX = tag("div", divI);
    divX.className = "forma-x";
    divX.addEventListener("click", () => {
      document.body.removeChild(divB);
    });

    const spanX = tag("span", divX);
    spanX.innerHTML = "X";

    const forma = tag("form", divI);

    this.campos.forEach((campo) => {
      const div = tag("div", forma);

      const h1 = tag("h1", div);
      h1.innerHTML = campo.titulo;

      const input = tag("input", div);
      input.value = campo.valor;
      input.type = campo.tipo;
      input.addEventListener("change", () => {
        campo.valor = input.value;
      });
    });

    const divBtn = tag("div", forma);

    if (!this.editando) {
      const boton = tag("button", divBtn);
      boton.innerHTML = this.botonCrearTxt;
      boton.addEventListener("click", (e) => {
        e.preventDefault();
        thisObj.enviarDatos(false);
      });
    } else {
      const boton = tag("button", divBtn);
      boton.innerHTML = this.botonEditarTxt;
      boton.addEventListener("click", (e) => {
        e.preventDefault();
        thisObj.enviarDatos(false);
      });

      const botonD = tag("button", divBtn);
      botonD.innerHTML = this.botonBorrarTxt;
      botonD.className = "borrar";
      botonD.addEventListener("click", (e) => {
        e.preventDefault();
        thisObj.enviarDatos(true);
      });
    }
  }

  enviarDatos(borrando) {
    const obj = {};

    if (this.data) {
      obj.id = this.data._id;
    }

    this.campos.forEach((campo) => {
      if (campo.valor === "") {
        this.todoOk = false;
      }
      obj[campo.nombre] = campo.valor;
    });

    if (!this.todoOk) {
      alert("faltan cosas");
      this.todoOk = true;
      return;
    }

    if (borrando) {
      this.borrarFx(obj);
    } else {
      this.fx(obj);
    }

    document.body.removeChild(this.contenedor);
  }

  agregarCampo(tipo, nombre, valor, titulo) {
    const campo = {
      tipo,
      nombre,
      valor,
      titulo,
    };

    this.campos.push(campo);
  }
}

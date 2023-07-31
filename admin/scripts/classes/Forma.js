import { tag } from "../utilidades/tag.js?ad=1";
import { bajarCss } from "../utilidades/css.js?ad=1";

export class Forma {
  contenedor;
  campos = [];
  botonCrearTxt = "Crear";
  botonEditarTxt = "Guardar";
  botonBorrarTxt = "Borrar";
  fx;
  despuesFx;
  editando = false;
  todoOk = true;
  opciones;
  uri;

  agregarCampo(tipo, nombre, valor, titulo, requerido, opciones) {
    const campo = {
      tipo,
      nombre,
      valor,
      titulo,
      requerido,
      opciones,
    };

    this.campos.push(campo);
  }

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

      const h1 = tag("label", div);
      h1.innerHTML = campo.titulo;

      if (campo.tipo === "select") {
        this.opcionesCopia = [...campo.opciones];

        this.opcionesCopia.map((opcion) => (opcion.seleccionada = false));

        if (typeof campo.valor === "object") {
          const div = tag("div", forma);
          div.className = "forma-tags";

          campo.valor.forEach((valor) => {
            const opcionObj = this.opcionesCopia.filter(
              (opcion) => opcion.valor === valor
            )[0];

            if (opcionObj) {
              opcionObj.seleccionada = true;
            }
          });

          this.pintarFormaTags(div);
        } else {
          const select = tag("select", div);
          select.addEventListener("change", () => {
            campo.valor = select.value;
          });

          campo.opciones.forEach((opcion) => {
            const option = tag("option", select);
            option.innerHTML = opcion.rotulo;
            option.value = opcion.valor;
          });

          select.value = campo.valor;
        }
      } else {
        const input = tag("input", div);
        input.value = campo.valor;
        input.type = campo.tipo;
        input.addEventListener("change", () => {
          campo.valor = input.value;
        });
      }
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

  pintarFormaTags(divG) {
    let thisObj = this;

    divG.innerHTML = "";

    const select = tag("select", divG);
    select.name = "tag";
    select.addEventListener("change", () => {
      const opcionObj = this.opcionesCopia.filter(
        (opcion) => opcion.rotulo === select.value
      );

      opcionObj[0].seleccionada = true;

      thisObj.pintarFormaTags(divG);
    });

    const option = tag("option", select);
    option.value = "";
    option.hidden = true;
    option.disabled = true;
    option.innerHTML = "Selecciona una opción";

    const divI = tag("div", divG);
    divI.className = "forma-caja";

    this.opcionesCopia.map((opcion) => {
      if (opcion.seleccionada) {
        const div = tag("div", divI);

        const span = tag("span", div);
        span.innerHTML = `${opcion.rotulo}`;

        const spanX = tag("span", div);
        spanX.className = "forma-caja-x";
        spanX.innerHTML = "X";
        spanX.addEventListener("click", () => {
          opcion.seleccionada = false;
          thisObj.pintarFormaTags(divG);
        });
      } else {
        const option = tag("option", select);
        option.innerHTML = opcion.rotulo;
      }
    });
  }

  enviarDatos(borrando) {
    const obj = {};

    if (this.data) {
      obj.id = this.data._id;
    }

    this.campos.forEach((campo) => {
      if (!borrando) {
        if (campo.valor === "" && campo.requerido) {
          this.todoOk = false;
        }

        if (typeof campo.valor === "object") {
          campo.valor = this.opcionesCopia
            .filter((opcion) => opcion.seleccionada)
            .map((opcion) => opcion.valor);

          obj[campo.nombre] = campo.valor;
        } else {
          obj[campo.nombre] = campo.valor;
        }
      }
    });

    if (!this.todoOk) {
      alert("algunos campos requeridos están vacios");
      this.todoOk = true;
      return;
    }

    if (borrando) {
      this.borrarFx(obj, this.despuesFx, this.uri);
    } else {
      this.fx(obj, this.despuesFx);
    }

    document.body.removeChild(this.contenedor);
  }
}

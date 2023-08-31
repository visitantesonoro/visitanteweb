import { tag } from "../utilidades/tag.js?ad=1";
import { bajarCss } from "../utilidades/css.js?ad=1";
import { baseUri } from "../../enviroment.js?ad=1";

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

      const h1 = tag("h1", div);
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
      } else if (campo.tipo === "file") {
        if (campo.opciones.tipo === "img") {
          thisObj.img = tag("img", div);
          thisObj.img.src =
            campo.valor != "" ? `${baseUri}/${campo.valor}` : "";
        } else if (campo.opciones.tipo === "audio") {
          thisObj.audio = tag("audio", div);
          thisObj.audio.controls = true;
          thisObj.audio.src =
            campo.valor != "" ? `${baseUri}/${campo.valor}` : "";
        }

        const input = tag("input", div);
        input.value = campo.valor;
        input.type = campo.tipo;
        input.accept = campo.opciones.ext;
        input.addEventListener("change", (event) => {
          if (event.target.files && event.target.files.length === 1) {
            const file = event.target.files[0];

            const fileReader = new FileReader();
            fileReader.addEventListener("load", () => {
              if (campo.opciones.tipo === "img") {
                thisObj.img.src = fileReader.result;
              } else if (campo.opciones.tipo === "audio") {
                thisObj.audio.src = fileReader.result;
              }
            });
            fileReader.readAsDataURL(file);

            campo.valor = file;
          }
        });
      } else if (campo.tipo === "textarea") {
        const input = tag("textarea", div);
        input.value = campo.valor;
        input.addEventListener("change", () => {
          campo.valor = input.value;
        });
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
        if (
          (campo.valor === "" && campo.requerido) ||
          (!campo.valor && campo.requerido)
        ) {
          this.todoOk = false;
        }

        if (typeof campo.valor === "object" && campo.tipo != "file") {
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

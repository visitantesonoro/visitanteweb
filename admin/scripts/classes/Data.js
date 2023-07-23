class Data {
  direccion = "http://localhost:4200";

  async traerMusicos(fx) {
    const uriMusicos = `${this.direccion}/admin/musicos/`;

    const response = await fetch(uriMusicos);

    const responseData = await response.json();

    const allData = responseData;

    fx(allData);
  }
}

export const data = new Data();

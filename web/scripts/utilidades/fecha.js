export const formatearFecha = (fecha, idioma) => {
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
  ];


  const date = new Date(fecha);
  const mes = meses[date.getMonth()];
  const dia = date.getDate();
  const diaEs = date.toLocaleDateString('es-CO', {weekday: 'long'});
  const año = date.getFullYear();

  return `${diaEs}, ${dia} de ${mes} de ${año}  `;
};

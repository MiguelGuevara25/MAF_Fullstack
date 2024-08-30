const inputVeh = document.querySelector("#vehiculo");

const fetchData = (url, data) => {
  return $.ajax({
    type: "GET",
    url,
    cache: false,
    dataType: "json",
    async: false,
    data,
  }).fail((error) => {
    console.error("Error en la solicitud AJAX: ", error);
  });
};

fetchData("http://localhost:2801/api/cabecera-cotizacion").done((response) => {
  const cabecera = JSON.parse(response.Parametros);

  cabecera.map(
    ({ NombreClase, NombreTipo, NombreModelo, NombreMarca, VEHI_AñoFab }) => {
      inputVeh.value = `${NombreClase} ${NombreMarca} ${NombreModelo} ${NombreTipo} ${VEHI_AñoFab}`;
    }
  );
});

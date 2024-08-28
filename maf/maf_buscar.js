const selectProduct = document.querySelector("#productos");
const formClientes = document.querySelector("#formDatosClientes");
const inputDocCliente = document.querySelector("#documentoCliente");
const inputCliente = document.querySelector("#cliente");
const tableInfoCliente = document.querySelector("#infoCliente");

let parseProductos,
  parseDatosCliente,
  nombreInput,
  arrayinfo = [];

function fetchData(url, data) {
  return $.ajax({
    type: "GET",
    url,
    cache: false,
    dataType: "json",
    async: false,
    data,
  }).fail(function (error) {
    console.error("Error en la solicitud AJAX: ", error);
  });
}

formClientes.addEventListener("submit", (e) => {
  e.preventDefault();

  const docCliente = inputDocCliente.value;

  fetchData("http://localhost:2801/api/datos-cliente", {
    documento: docCliente,
  }).done(function (response) {
    parseDatosCliente = response;
    const datosCliente = JSON.parse(parseDatosCliente.Parametros);

    datosCliente.map((e) => {
      nombreInput = e.COTI_Nombres + " " + e.COTI_ApePaterno;
    });

    tableInfoCliente.innerHTML =
      `<thead>
        <tr class="*:border *:bg-gray-300">
          <th>Acción</th>
          <th>Número</th>
          <th>Fecha de Cotización</th>
          <th>Vehículo</th>
        </tr>
      </thead>` +
      datosCliente
        .map((e) => {
          const timestamp = parseInt(e.COTI_Fecha.match(/\d+/)[0]);
          const date = new Date(timestamp);

          const dia = date.getDate().toString().padStart(2, "0");
          const mes = (date.getMonth() + 1).toString().padStart(2, "0");
          const anio = date.getFullYear();

          const fechaFormateada = `${dia}/${mes}/${anio}`;

          return `
        <tr class="*:border">
          <td class="text-center">o</td>
          <td class="text-center">${e.COTI_Interno}</td>
          <td class="text-center">${fechaFormateada}</td>
          <td class="text-center">${e.Marca + " " + e.VEHI_AñoFab}</td>
        </tr>
      `;
        })
        .join("");
  });

  if (nombreInput === undefined) {
    inputCliente.value = "Cliente no encontrado";
  } else {
    inputCliente.value = nombreInput;
  }
});

fetchData("http://localhost:2801/api/productos").done(function (response) {
  parseProductos = response;
  const productos = JSON.parse(parseProductos.Parametros);

  selectProduct.innerHTML =
    `<option value="" hidden>Seleccione producto...</option>` +
    productos
      .map(
        ({ TIPO_CodigoGRS, TIPO_DescripcionGRS }) =>
          `<option value="${TIPO_CodigoGRS}">${TIPO_DescripcionGRS}</option>`
      )
      .join("");
});

const selectColor = document.querySelector("#color");
const selectTipoDocAsegurado = document.querySelector(
  "#tipoDocumentoAsegurado"
);
const inputNroDocAsegurado = document.querySelector("#nroDocumentoAsegurado");
const inputApellidoPaternoAsegurado = document.querySelector(
  "#apellidoPaternoAsegurado"
);
const inputApellidoMaternoAsegurado = document.querySelector(
  "#apellidoMaternoAsegurado"
);
const inputNombreAsegurado = document.querySelector("#nombresAsegurado");
const inputEmailAsegurado = document.querySelector("#emailAsegurado");
const inputTelefonoAsegurado = document.querySelector("#telefonoAsegurado");
const inputDireccionAsegurado = document.querySelector("#direccionAsegurado");
const selectUbigeoAsegurado = document.querySelector("#ubigeoAsegurado");
const checkboxContratanteAsegurado = document.querySelector(
  "#contratanteAsegurado"
);
const inputFechaNacimientoAsegurado = document.querySelector(
  "#fechaNacimientoAsegurado"
);

const selectTipoDocContratante = document.querySelector(
  "#tipoDocumentoContratante"
);
const inputNroDocContratante = document.querySelector(
  "#nroDocumentoContratante"
);
const inputApellidoPaternoContratante = document.querySelector(
  "#apellidoPaternoContratante"
);
const inputApellidoMaternoContratante = document.querySelector(
  "#apellidoMaternoContratante"
);
const inputNombreContratante = document.querySelector("#nombresContratante");
const inputEmailContratante = document.querySelector("#emailContratante");
const inputTelefonoContratante = document.querySelector("#telefonoContratante");
const inputDireccionContratante = document.querySelector(
  "#direccionContratante"
);
const selectUbigeoContratante = document.querySelector("#ubigeoContratante");

const selectFormaPago = document.querySelector("#formaPago");
const selectNroCuotas = document.querySelector("#nroCuotas");
const selectEntiFinan = document.querySelector("#endosatario");

const vehiculoForm = document.querySelector("#vehiculoForm");
const aseguradoForm = document.querySelector("#aseguradoForm");
const datosAdiForm = document.querySelector("#datosAdicionalesForm");

let tipoDocAseguradoSeleccionado, nroDocAseguradoSeleccionado;

const fetchData = (url, data) => {
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
};

fetchData("http://localhost:2801/api/color").done(function (response) {
  const color = JSON.parse(response.Parametros);

  //! --- Color --- //
  selectColor.innerHTML =
    `<option value="" hidden>Seleccione el color...</option>` +
    color
      .map(
        ({ TIPO_Desc1, TIPO_CodTipo }) =>
          `<option value="${TIPO_CodTipo}">${TIPO_Desc1}</option>`
      )
      .join("");
});

//!------------------------------------------------------//
//! ----- SEGUNDA PARTE - ASEGURADO Y CONTRATANTE ----- //
//!----------------------------------------------------//

fetchData("http://localhost:2801/api/tipo-documento").done(function (response) {
  const tipoDocAsegurado = JSON.parse(response.Parametros);

  //! --- Tipo Documento Asegurado --- //
  selectTipoDocAsegurado.innerHTML =
    `<option value="" hidden>Seleccione el tipo de documento...</option>` +
    tipoDocAsegurado
      .map(
        ({ TIPO_Desc1, TIPO_CodTipo }) =>
          `<option value="${TIPO_CodTipo}">${TIPO_Desc1}</option>`
      )
      .join("");
});

selectTipoDocAsegurado.addEventListener(
  "change",
  () => (tipoDocAseguradoSeleccionado = selectTipoDocAsegurado.value)
);

fetchData("http://localhost:2801/api/zona-geografica").done(function (
  response
) {
  const zonaGeografica = JSON.parse(response.Parametros);

  //! --- Zona Geográfica --- //
  selectUbigeoAsegurado.innerHTML =
    `<option value="" hidden>Seleccione la zona geográfica...</option>` +
    zonaGeografica
      .map(
        ({ ZOGE_desc }) => `<option value="${ZOGE_desc}">${ZOGE_desc}</option>`
      )
      .join("");

  selectUbigeoContratante.innerHTML =
    `<option value="" hidden>Seleccione la zona geográfica...</option>` +
    zonaGeografica
      .map(
        ({ ZOGE_desc }) => `<option value="${ZOGE_desc}">${ZOGE_desc}</option>`
      )
      .join("");
});

//! --- Nro Documento Asegurado --- //
inputNroDocAsegurado.addEventListener("blur", (e) => {
  nroDocAseguradoSeleccionado = e.target.value;

  // if (!tipoDocAseguradoSeleccionado) {
  //   alert("Por favor, seleccione un tipo de documento antes de continuar.");
  //   return;
  // }

  fetchData("http://localhost:2801/api/datos-cliente-asegurado", {
    tipoDocAsegurado: tipoDocAseguradoSeleccionado,
    nroDocAsegurado: nroDocAseguradoSeleccionado,
  }).done(function (response) {
    const datosClienteAsegurado = JSON.parse(response.Parametros);

    datosClienteAsegurado.map(
      ({
        ENTC_Paterno,
        ENTC_Materno,
        ENTC_Nombre,
        ENTC_Email,
        ENTC_tel1,
        ENTC_dir,
        ENTC_fecNac,
      }) => {
        const timestamp = parseInt(ENTC_fecNac.match(/\d+/)[0]);
        const date = new Date(timestamp);

        const dia = date.getDate().toString().padStart(2, "0");
        const mes = (date.getMonth() + 1).toString().padStart(2, "0");
        const anio = date.getFullYear();

        const fechaFormateada = `${anio}-${mes}-${dia}`;

        inputApellidoPaternoAsegurado.value = ENTC_Paterno;
        inputApellidoMaternoAsegurado.value = ENTC_Materno;
        inputNombreAsegurado.value = ENTC_Nombre;
        inputEmailAsegurado.value = ENTC_Email;
        inputTelefonoAsegurado.value = ENTC_tel1;
        inputDireccionAsegurado.value = ENTC_dir;
        inputFechaNacimientoAsegurado.value = fechaFormateada;
      }
    );
  });
});

checkboxContratanteAsegurado.addEventListener("change", (e) => {
  if (e.target.checked) {
    selectTipoDocContratante.value =
      selectTipoDocAsegurado.options[selectTipoDocAsegurado.selectedIndex].text;
    inputNroDocContratante.value = inputNroDocAsegurado.value;
    inputApellidoPaternoContratante.value = inputApellidoPaternoAsegurado.value;
    inputApellidoMaternoContratante.value = inputApellidoMaternoAsegurado.value;
    inputNombreContratante.value = inputNombreAsegurado.value;
    inputEmailContratante.value = inputEmailAsegurado.value;
    inputTelefonoContratante.value = inputTelefonoAsegurado.value;
    inputDireccionContratante.value = inputDireccionAsegurado.value;
  }
});

fetchData("http://localhost:2801/api/planes-financiamiento").done(function (
  response
) {
  const planesFinanciamiento = JSON.parse(response.Parametros);

  //! --- Planes de Financiamiento --- //
  selectFormaPago.innerHTML =
    `<option value="" hidden>Seleccione la entidad financiera...</option>` +
    planesFinanciamiento
      .map(
        ({ DescFinanciamiento }) =>
          `<option value="${DescFinanciamiento}">${DescFinanciamiento}</option>`
      )
      .join("");

  //! --- Nro de Cuotas --- //
  selectNroCuotas.innerHTML =
    `<option value="" hidden>Seleccione el nro. de cuotas...</option>` +
    planesFinanciamiento
      .map(
        ({ FIPR_MinCuotas }) =>
          `<option value="${FIPR_MinCuotas}">${FIPR_MinCuotas}</option>`
      )
      .join("");
});

fetchData("http://localhost:2801/api/entidad-financiera").done(function (
  response
) {
  const entidadFinanciera = JSON.parse(response.Parametros);

  //! --- Entidad Financiera --- //
  selectEntiFinan.innerHTML =
    `<option value="" hidden>Seleccione la entidad financiera...</option>` +
    entidadFinanciera
      .map(
        ({ TIPO_CodTipo, TIPO_Desc1 }) =>
          `<option value="${TIPO_CodTipo}">${TIPO_Desc1}</option>`
      )
      .join("");
});

// selectEntiFinan

//!------------------------------------------------------//
//! ----- BOTONES GENERALES ----- //
//!----------------------------------------------------//
const squareVehicle = document.querySelector("#squareVeh");
const squareAseCont = document.querySelector("#squareAseCont");
const squareDatos = document.querySelector("#squareDatos");

document.querySelector("#sgteVehiculo").addEventListener("click", () => {
  vehiculoForm.classList.add("hidden");
  aseguradoForm.classList.remove("hidden");
  squareAseCont.classList.remove("bg-gray-400");
  squareAseCont.classList.add("bg-blue-500");
});

document.querySelector("#atrasAsegurado").addEventListener("click", () => {
  aseguradoForm.classList.add("hidden");
  vehiculoForm.classList.remove("hidden");
  squareAseCont.classList.remove("bg-blue-500");
  squareAseCont.classList.add("bg-gray-400");
});

document.querySelector("#sgteAsegurado").addEventListener("click", () => {
  aseguradoForm.classList.add("hidden");
  datosAdiForm.classList.remove("hidden");
  squareDatos.classList.remove("bg-gray-400");
  squareDatos.classList.add("bg-blue-500");
});

document
  .querySelector("#atrasDatosAdicionales")
  .addEventListener("click", () => {
    datosAdiForm.classList.add("hidden");
    aseguradoForm.classList.remove("hidden");
    squareDatos.classList.remove("bg-blue-500");
    squareDatos.classList.add("bg-gray-400");
  });

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
      }) => {
        inputApellidoPaternoAsegurado.value = ENTC_Paterno;
        inputApellidoMaternoAsegurado.value = ENTC_Materno;
        inputNombreAsegurado.value = ENTC_Nombre;
        inputEmailAsegurado.value = ENTC_Email;
        inputTelefonoAsegurado.value = ENTC_tel1;
        inputDireccionAsegurado.value = ENTC_dir;
      }
    );
  });
});

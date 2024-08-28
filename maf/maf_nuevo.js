const selectLugarCirculacion = document.querySelector("#lugarCirculacion");
const selectTipoDoc = document.querySelector("#tipoDocumento");
const selectModelo = document.querySelector("#modelo");
const selectMarca = document.querySelector("#marca");
const selectClase = document.querySelector("#clase");
const selectTipo = document.querySelector("#tipo");
const selectUso = document.querySelector("#uso");
const selectAnio = document.querySelector("#anio");
const inputSumaAsegurada = document.querySelector("#sumaAsegurada");
const selectCombustible = document.querySelector("#combustible");

let parseCombustible,
  parseMarcaUso,
  parseTipoDoc,
  parseModelo,
  parseClase,
  parseTipo,
  parseAnio,
  lugarCirculacionSeleccionado,
  parseLugarCirculacion,
  modelo2Seleccionado,
  modeloSeleccionado,
  marcaSeleccionada,
  claseSeleccionado,
  tipoSeleccionado,
  usoSeleccionado,
  arrayinfo = [];

// Función para manejar las solicitudes AJAX de forma más segura
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

fetchData("http://localhost:2801/api/tipo-documento").done(function (response) {
  parseTipoDoc = response;
  const tipoDoc = JSON.parse(parseTipoDoc.Parametros);

  //! --- Tipo de documento --- //
  selectTipoDoc.innerHTML = tipoDoc
    .map(
      ({ TIPO_Desc2, TIPO_DescC }) =>
        `<option value="${TIPO_DescC}">${TIPO_Desc2}</option>`
    )
    .join("");
});

fetchData("http://localhost:2801/api/combustible").done(function (response) {
  parseCombustible = response;
  const combustible = JSON.parse(parseCombustible.Parametros);

  //! --- Combustible --- //
  selectCombustible.innerHTML =
    `<option value="" hidden>Seleccione el combustible...</option>` +
    combustible
      .map(
        ({ TIPO_Desc1, TIPO_CodTipo }) =>
          `<option value="${TIPO_CodTipo}">${TIPO_Desc1}</option>`
      )
      .join("");
});

fetchData("http://localhost:2801/api/marca-uso").done(function (response) {
  parseMarcaUso = response;
  const marcaUso = JSON.parse(parseMarcaUso.Parametros);

  //! --- Marca --- //
  selectMarca.innerHTML =
    `<option value="" hidden>Seleccione...</option>` +
    marcaUso
      .map(({ TIPO_CodTabla, TIPO_CodTipo, TIPO_Desc1 }) => {
        if (TIPO_CodTabla === "MAR") {
          return `<option value="${TIPO_CodTipo}">${TIPO_Desc1}</option>`;
        }
      })
      .join("");

  //! --- Uso --- //
  selectUso.innerHTML =
    `<option value="" hidden>Seleccione el uso...</option>` +
    marcaUso
      .map(({ TIPO_CodTabla, TIPO_CodTipo, TIPO_Desc1 }) => {
        if (TIPO_CodTabla === "VUS") {
          return `<option value="${TIPO_CodTipo}">${TIPO_Desc1}</option>`;
        }
      })
      .join("");
});

//! --- Obtener valor del uso seleccionado --- //
selectUso.addEventListener("change", (e) => {
  usoSeleccionado = e.target.value;
});

fetchData("http://localhost:2801/api/lugar-circulacion").done(function (
  response
) {
  parseLugarCirculacion = response;
  const lugarCirculacion = JSON.parse(parseLugarCirculacion.Parametros);

  selectLugarCirculacion.innerHTML =
    `<option value="" hidden>Seleccione el lugar...</option>` +
    lugarCirculacion
      .map(
        ({ ZOGE_desc, ZOGE_Codigo }) =>
          `<option value="${ZOGE_Codigo.trim()}">${ZOGE_desc}</option>`
      )
      .join("");
});

//! --- Obtener valor del lugar de circulación seleccionado --- //
selectLugarCirculacion.addEventListener("change", (e) => {
  lugarCirculacionSeleccionado = e.target.value;
});

//! --- Carga de los modelos dependiendo de la marca seleccionada --- //
selectMarca.addEventListener("change", (e) => {
  marcaSeleccionada = e.target.value;

  fetchData("http://localhost:2801/api/modelo", {
    marca: marcaSeleccionada,
  }).done(function (response) {
    parseModelo = response;
    const modelo = JSON.parse(parseModelo.Parametros);

    selectModelo.innerHTML =
      `<option value="" hidden>Seleccione el modelo...</option>` +
      modelo
        .map(
          ({ MVEH_Interno, MVEH_Desc, MVEH_CodigoCCSMaster }) =>
            `<option value="${MVEH_Interno}" data-value="${MVEH_CodigoCCSMaster}">${MVEH_Desc}</option>`
        )
        .join("");
  });
});

//! --- Carga de clase dependiendo del modelo seleccionada --- //
selectModelo.addEventListener("change", (e) => {
  modeloSeleccionado = e.target.value;
  modelo2Seleccionado = e.target.options[e.target.selectedIndex].dataset.value;

  fetchData("http://localhost:2801/api/clase", {
    modelo: modeloSeleccionado,
  }).done(function (response) {
    parseClase = response;
    const clase = JSON.parse(parseClase.Parametros);

    selectClase.innerHTML =
      `<option value="" hidden>Seleccione la clase...</option>` +
      clase
        .map(
          ({ TIPO_Desc1, TIPO_CodTipo }) =>
            `<option value="${TIPO_CodTipo}">${TIPO_Desc1}</option>`
        )
        .join("");
  });
});

//! --- Carga de tipo dependiendo de la clase seleccionada --- //
selectClase.addEventListener("change", (e) => {
  claseSeleccionado = e.target.value;

  fetchData("http://localhost:2801/api/tipo", {
    clase: claseSeleccionado,
    modelo: modeloSeleccionado,
  }).done(function (response) {
    parseTipo = response;
    const tipo = JSON.parse(parseTipo.Parametros);

    selectTipo.innerHTML =
      `<option value="" hidden>Seleccione el tipo...</option>` +
      tipo
        .map(
          ({ TIPO_CodTipo, TIPO_Desc1 }) =>
            `<option value="${TIPO_CodTipo}">${TIPO_Desc1}</option>`
        )
        .join("");
  });
});

//! --- Obtener valor del tipo seleccionado --- //
selectTipo.addEventListener("change", (e) => {
  tipoSeleccionado = e.target.value;
});

//! --- Carga de año dependiendo de los datos del vehículo seleccionado --- //
selectLugarCirculacion.addEventListener("change", () => {
  fetchData("http://localhost:2801/api/anios", {
    marca: marcaSeleccionada,
    modelo: modeloSeleccionado,
    clase: claseSeleccionado,
    uso: usoSeleccionado,
    lugarCirculacion: lugarCirculacionSeleccionado,
    tipo: tipoSeleccionado,
  }).done(function (response) {
    parseAnio = response;
    const anio = JSON.parse(parseAnio.Parametros);

    selectAnio.innerHTML =
      `<option value="" hidden>Seleccione el año...</option>` +
      anio
        .map(
          ({ Antiguedad }) =>
            `<option value="${Antiguedad}">${Antiguedad}</option>`
        )
        .join("");
  });
});

//! --- Carga de suma asegurada dependiendo del modelo y año seleccionado --- //
selectAnio.addEventListener("change", (e) => {
  fetchData("http://localhost:2801/api/suma-asegurada", {
    modelo2: modelo2Seleccionado,
    anio: e.target.value,
  }).done(function (response) {
    const sumaAsegurada = JSON.parse(response.Parametros);

    sumaAsegurada.map((e) => {
      inputSumaAsegurada.value = e.Prima;
    });
  });
});

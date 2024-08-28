const selectColor = document.querySelector("#color");

let parseColor;

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
  parseColor = response;
  const color = JSON.parse(parseColor.Parametros);

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

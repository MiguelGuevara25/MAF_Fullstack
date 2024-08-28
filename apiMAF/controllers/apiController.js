import axios from "axios";
let returnToken = "";

export const obtenerToken = async (req, res) => {
  try {
    const url =
      "http://qa.sigsretail.com/ApiServiciosRetail_GR/api/login/SolicitaToken";
    const { data } = await axios.post(
      url,
      {
        Aplicacion: "Toyota",
      },
      {
        headers: {
          Autorizacion: "VG95b3RhQ09OOkM0ZGVuNEMwbjN4MTBu",
          "Content-Type": "application/json",
        },
      }
    );

    returnToken = data.BearerToken;
    res.send(data.BearerToken);
  } catch (error) {
    res.send({ error: error.message });
  }
};

//! --- Proceso 501 ---
export const listarProductos = async (req, res) => {
  try {
    const url =
      "http://qa.sigsretail.com/ApiServiciosRetail_GR/api/ProcesarPeticion";

    const { data } = await axios.post(
      url,
      {
        TipoProceso: "501",
        Parametros: "{}",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${returnToken}`,
        },
      }
    );
    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
};

//! --- Proceso 502 ---
export const obtenerDatosCliente = async (req, res) => {
  const documento = req.query.documento;

  try {
    const url =
      "http://qa.sigsretail.com/ApiServiciosRetail_GR/api/ProcesarPeticion";

    const { data } = await axios.post(
      url,
      {
        TipoProceso: "502",
        Parametros: `{"NroDocumento":"40875215"}`,
        // Parametros: `{"NroDocumento":"${documento}"}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${returnToken}`,
        },
      }
    );

    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
};

//! --- Proceso 503 ---
//! --- Proceso 503 / TDI ---
export const obtenerTipoDocumento = async (req, res) => {
  try {
    const url =
      "http://qa.sigsretail.com/ApiServiciosRetail_GR/api/ProcesarPeticion";

    const { data } = await axios.post(
      url,
      {
        TipoProceso: "503",
        Parametros: '{"Tipo_CodTabla":"TDI"}',
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${returnToken}`,
        },
      }
    );

    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
};

//! --- Proceso 503 / Combustible ---
export const obtenerCombustible = async (req, res) => {
  try {
    const url =
      "http://qa.sigsretail.com/ApiServiciosRetail_GR/api/ProcesarPeticion";

    const { data } = await axios.post(
      url,
      {
        TipoProceso: "503",
        Parametros: '{"Tipo_CodTabla":"CMB"}',
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${returnToken}`,
        },
      }
    );

    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
};

//! --- Proceso 503 / Color ---
export const obtenerColor = async (req, res) => {
  try {
    const url =
      "http://qa.sigsretail.com/ApiServiciosRetail_GR/api/ProcesarPeticion";

    const { data } = await axios.post(
      url,
      {
        TipoProceso: "503",
        Parametros: '{"Tipo_CodTabla":"CLR"}',
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${returnToken}`,
        },
      }
    );

    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
};

//! --- Proceso 503 / Sexo ---
export const obtenerSexo = async (req, res) => {
  try {
    const url =
      "http://qa.sigsretail.com/ApiServiciosRetail_GR/api/ProcesarPeticion";

    const { data } = await axios.post(
      url,
      {
        TipoProceso: "503",
        Parametros: '{"Tipo_CodTabla":"SEX"}',
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${returnToken}`,
        },
      }
    );

    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
};

//! --- Proceso 503 / Entidad Financiera ---
export const obtenerBCO = async (req, res) => {
  try {
    const url =
      "http://qa.sigsretail.com/ApiServiciosRetail_GR/api/ProcesarPeticion";

    const { data } = await axios.post(
      url,
      {
        TipoProceso: "503",
        Parametros: '{"Tipo_CodTabla":"BCO"}',
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${returnToken}`,
        },
      }
    );

    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
};

//! --- Proceso 504 ---
export const obtenerMarcaUso = async (req, res) => {
  try {
    const url =
      "http://qa.sigsretail.com/ApiServiciosRetail_GR/api/ProcesarPeticion";

    const { data } = await axios.post(
      url,
      {
        TipoProceso: "504",
        Parametros: '{"tablas":"MAR-VUS","TIPO_CodGRS":"010"}',
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${returnToken}`,
        },
      }
    );

    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
};

//! --- Proceso 505 ---
export const obtenerModelo = async (req, res) => {
  try {
    const marca = req.query.marca;

    const url =
      "http://qa.sigsretail.com/ApiServiciosRetail_GR/api/ProcesarPeticion";

    const { data } = await axios.post(
      url,
      {
        TipoProceso: "505",
        Parametros: `{"Marca":"${marca}","TIPO_CodGRS":"010"}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${returnToken}`,
        },
      }
    );

    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
};

//! --- Proceso 506 ---
export const obtenerClase = async (req, res) => {
  try {
    const modelo = req.query.modelo;

    const url =
      "http://qa.sigsretail.com/ApiServiciosRetail_GR/api/ProcesarPeticion";

    const { data } = await axios.post(
      url,
      {
        TipoProceso: "506",
        Parametros: `{"ValorFiltro":"${modelo}","TIPO_CodGRS":"010"}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${returnToken}`,
        },
      }
    );

    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
};

//! --- Proceso 507 ---
export const obtenerTipo = async (req, res) => {
  try {
    const clase = req.query.clase;
    const modelo = req.query.modelo;

    const url =
      "http://qa.sigsretail.com/ApiServiciosRetail_GR/api/ProcesarPeticion";

    const { data } = await axios.post(
      url,
      {
        TipoProceso: "507",
        Parametros: `{"ValorFiltro":"${clase}","CodVersion":"${modelo}","TIPO_CodGRS":"010"}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${returnToken}`,
        },
      }
    );

    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
};

//! --- Proceso 508 ---
export const obtenerLugarCirculacion = async (req, res) => {
  try {
    const url =
      "http://qa.sigsretail.com/ApiServiciosRetail_GR/api/ProcesarPeticion";

    const { data } = await axios.post(
      url,
      {
        TipoProceso: "508",
        Parametros: "{}",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${returnToken}`,
        },
      }
    );

    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
};

//! --- Proceso 509 ---
export const obtenerAniosAntiguedad = async (req, res) => {
  const marca = req.query.marca;
  const modelo = req.query.modelo;
  const clase = req.query.clase;
  const uso = req.query.uso;
  const lugarCirculacion = req.query.lugarCirculacion;
  const tipo = req.query.tipo;

  try {
    const url =
      "http://qa.sigsretail.com/ApiServiciosRetail_GR/api/ProcesarPeticion";

    const { data } = await axios.post(
      url,
      {
        TipoProceso: "509",
        Parametros: `{"TIPO_CodMar":"${marca}","MVEH_Interno":"${modelo}","TIPO_codVEH":"${clase}","TIPO_codUSO":"${uso}","ZOGE_Codigo":"${lugarCirculacion}","TipoVehiculo":"${tipo}","TIPO_CodGRS":"010"}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${returnToken}`,
        },
      }
    );

    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
};

//! --- Proceso 510 ---
export const obtenerSumaAsegurada = async (req, res) => {
  const anio = req.query.anio;
  const modelo2 = req.query.modelo2;

  try {
    const url =
      "http://qa.sigsretail.com/ApiServiciosRetail_GR/api/ProcesarPeticion";

    const { data } = await axios.post(
      url,
      {
        TipoProceso: "510",
        Parametros: `{"CodigoVersion":${modelo2},"Anio":"${anio}"}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${returnToken}`,
        },
      }
    );

    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
};

//! --- Proceso 512 ---
// export const

//! --- Proceso 521 ---
export const obtenerZonaGeo = async (req, res) => {
  try {
    const url =
      "http://qa.sigsretail.com/ApiServiciosRetail_GR/api/ProcesarPeticion";

    const { data } = await axios.post(
      url,
      {
        TipoProceso: "521",
        Parametros: `{}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${returnToken}`,
        },
      }
    );

    res.send(data);
  } catch (error) {
    res.send({ error: error.message });
  }
};

// export const obtener

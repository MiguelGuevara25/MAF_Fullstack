import express from "express";
import {
  obtenerToken,
  listarProductos,
  obtenerDatosCliente,
  obtenerTipoDocumento,
  obtenerCombustible,
  obtenerMarcaUso,
  obtenerModelo,
  obtenerClase,
  obtenerTipo,
  obtenerLugarCirculacion,
  obtenerAniosAntiguedad,
  obtenerSumaAsegurada,
  obtenerColor,
  obtenerSexo,
  obtenerZonaGeo,
  obtenerBCO,
} from "../controllers/apiController.js";

const router = express.Router();

//! --- Rutas GET ---
router.get("/token", obtenerToken);
router.get("/datos-cliente", obtenerDatosCliente);
router.get("/productos", listarProductos);

router.get("/tipo-documento", obtenerTipoDocumento);
router.get("/combustible", obtenerCombustible);
router.get("/color", obtenerColor);
router.get("/sexo", obtenerSexo);
router.get("/entidad-financiera", obtenerBCO);
router.get("/marca-uso", obtenerMarcaUso);

router.get("/modelo", obtenerModelo);
router.get("/clase", obtenerClase);
router.get("/tipo", obtenerTipo);
router.get("/lugar-circulacion", obtenerLugarCirculacion);
router.get("/anios", obtenerAniosAntiguedad);
router.get("/suma-asegurada", obtenerSumaAsegurada);
router.get("/zona-geografica", obtenerZonaGeo);

export default router;

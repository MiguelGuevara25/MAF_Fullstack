import express from "express";
import cors from "cors";
import apiRoutes from "./routes/apiRoutes.js";

const app = express();
const port = 2801;

//! --- Habilitar CORS para todas las solicitudes ---
app.use(cors());

//! --- Rutas ---
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`http://localhost:${port}/api/token`);
});

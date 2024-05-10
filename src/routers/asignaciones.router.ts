import { Router } from "express";
import { controladorAsignaciones } from "../controllers/asignaciones.controller";
import { CrearAsignacionEsquema } from "../util/esquemas/crear-asignacion";
import { ValidadorEsquemas } from "../util/midlewares/validador-esquemas";
import { BorrarAsignacionEsquema } from "../util/esquemas/borrar-asignacion";
import { ObtenerAsignacionesEsquema } from "../util/esquemas/obtener-asignaciones";
import { ActualizarAsignacionEsquema } from "../util/esquemas/actualizar-asignacion";

export const asisgnacionesRouter = Router();

asisgnacionesRouter.post(
  "/crear",
  ValidadorEsquemas(CrearAsignacionEsquema),
  controladorAsignaciones.CrearNuevaAsignacion.bind(controladorAsignaciones)
);

asisgnacionesRouter.delete(
  "/borrar/:id",
  ValidadorEsquemas(BorrarAsignacionEsquema),
  controladorAsignaciones.EliminarAsignacion.bind(controladorAsignaciones)
);

asisgnacionesRouter.put(
  "/actualizar",
  ValidadorEsquemas(ActualizarAsignacionEsquema),
  controladorAsignaciones.ActualizarAsignacion.bind(controladorAsignaciones)
);

asisgnacionesRouter.get(
  "/",
  controladorAsignaciones.ObtenerAsignaciones.bind(controladorAsignaciones)
);

asisgnacionesRouter.get(
  "/:id",
  ValidadorEsquemas(ObtenerAsignacionesEsquema),
  controladorAsignaciones.ObtenerAsignacion.bind(controladorAsignaciones)
);

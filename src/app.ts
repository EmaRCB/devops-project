import Express from "express";
import cors from "cors";
import { ManejadorError } from "./util/midlewares/manejador-error";
import { asisgnacionesRouter } from "./gestion_asignaciones/vista/rutas-asignaciones";

export const app = Express();

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cors());

app.use("/asignaciones", asisgnacionesRouter);

app.use(ManejadorError);

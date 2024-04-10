import Express from "express";
import cors from "cors";
import RutasVista from "./f_crud_rutas/vista/RutasVista";

import { ManejadorError } from "./util/midlewares/manejador-error";
import { asisgnacionesRouter } from "./gestion_asignaciones/vista/rutas-asignaciones";
import ConductorVista from "../src/f_crud_conductores_02/Vista/ConductorVista"; 
export const app = Express();
const adminRutas = require('./f_registro_administradores_04/vista/AdminRutas');
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cors());
app.use('/rutas', RutasVista);
app.use('/admin', adminRutas);
app.use('/conductores', ConductorVista);
app.use("/asignaciones", asisgnacionesRouter);
app.use(ManejadorError);
import Express from "express";
import cors from "cors";
import rutasRouter from "./routers/rutas.router";
import { ManejadorError } from "./util/midlewares/manejador-error";
import { asisgnacionesRouter } from "./routers/asignaciones.router";
import ConductorVista from "./routers/conductor.router";
import vehiculosRouter from "./routers/vehiculo.router";
import { manejadorExcepcionesVehiculo } from "./util/midlewares/manejador-excepciones-vehiculo";
import loginRouter from "./routers/login.router";
import adminRouter from "./routers/admin.router";
import registerRouter from "./routers/register.router";

export const app = Express();

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cors());

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/rutas", rutasRouter);
app.use("/admin", adminRouter);
app.use("/conductores", ConductorVista);
app.use("/asignaciones", asisgnacionesRouter);
app.use("/vehiculos", vehiculosRouter);
app.use(manejadorExcepcionesVehiculo);
app.use(ManejadorError);

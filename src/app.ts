import Express from "express";
import cors from "cors";
import RutasVista from "./f_crud_rutas/vista/RutasVista";

export const app = Express();

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cors());

app.use('/api/rutas', RutasVista);
import Express from "express";
import cors from "cors";
import ConductorVista from "../src/f_crud_conductores_02/Vista/ConductorVista"; 

export const app = Express();

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cors());

// Ruta para crud de conductores
app.use('/conductores', ConductorVista);


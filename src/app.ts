import Express from "express";
import cors from "cors";
import ConductorVista from "../src/f_crud_conductores_02/Vista/ConductorVista"; // Asegúrate de que la ruta de importación sea correcta

export const app = Express();

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cors());

// Montar las rutas de conductores en un endpoint específico, por ejemplo '/api/conductores'
app.use('/api/conductores', ConductorVista);


import Express from "express";
import cors from "cors";
import ConductorVista from "../src/f_crud_conductores_02/Vista/ConductorVista"; 

export const app = Express();
const adminRutas = require('./f_registro_administradores_04/vista/AdminRutas');


app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cors());
app.use('/admin', adminRutas);
app.use('/conductores', ConductorVista);
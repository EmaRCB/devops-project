const adminController = require('../controllers/admin.controller');
import express from "express";
import { TokenValidador } from "../util/midlewares/token-validador";

const adminRouter = express.Router();

adminRouter.use(TokenValidador);

adminRouter.delete('/:id', adminController.EliminarAdministrador);
adminRouter.put('/:id', adminController.ActualizarAdministrador);
adminRouter.get('/:id', adminController.ObtenerAdministrador);
adminRouter.get('/', adminController.ObtenerAdministradores);

export default adminRouter;
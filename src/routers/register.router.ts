import express from "express";

const registerRouter = express.Router();
const adminController = require('../controllers/admin.controller');

registerRouter.post('/pre', adminController.PreRegistro);
registerRouter.post('', adminController.RegistrarAdministrador);

export default registerRouter;
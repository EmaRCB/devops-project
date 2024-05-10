const express = require("express");
const adminController = require("../controlador/AdminController");

const router = express.Router();

router.post("/pre-registro", adminController.PreRegistro);
router.post("/registro", adminController.RegistrarAdministrador);
router.delete("/eliminar/:id", adminController.EliminarAdministrador);
router.put("/actualizar/:id", adminController.ActualizarAdministrador);
router.get("/obtener/:id", adminController.ObtenerAdministrador);
router.get("/obtener-admins", adminController.ObtenerAdministradores);
router.post("/login", adminController.login);
module.exports = router;

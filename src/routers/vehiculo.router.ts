import { vehiculoController } from "../controllers/vehiculo.controller";
import { TokenValidador } from "../util/midlewares/token-validador";
import {VehiculoService} from "../services/vehiculo.service";
const express = require("express");
const vehiculosRouter = express.Router();
const cors = require("cors");
let vehiculoService = new VehiculoService();
const vehiculosControllerInstance = new vehiculoController(vehiculoService);

vehiculosRouter.use(cors());
vehiculosRouter.use(TokenValidador);
vehiculosRouter.get("/", vehiculosControllerInstance.getVehiculos.bind(vehiculosControllerInstance));
vehiculosRouter.get("/:id", vehiculosControllerInstance.getVehiculo.bind(vehiculosControllerInstance));
vehiculosRouter.post("/", vehiculosControllerInstance.createVehiculo.bind(vehiculosControllerInstance));
vehiculosRouter.put("/:id", vehiculosControllerInstance.updateVehiculo.bind(vehiculosControllerInstance));
vehiculosRouter.delete("/:id", vehiculosControllerInstance.deleteVehiculo.bind(vehiculosControllerInstance));

export default vehiculosRouter;

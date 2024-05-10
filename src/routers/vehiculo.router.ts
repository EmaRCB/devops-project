import { vehiculoController } from "../controllers/vehiculo.controller";
import { TokenValidador } from "../util/midlewares/token-validador";
const express = require("express");
const vehiculosRouter = express.Router();
const cors = require("cors");
const vehiculosControllerInstance = new vehiculoController();

vehiculosRouter.use(cors());
vehiculosRouter.use(TokenValidador);
vehiculosRouter.get("/", vehiculosControllerInstance.getVehiculos);
vehiculosRouter.get("/:id", vehiculosControllerInstance.getVehiculo);
vehiculosRouter.post("/", vehiculosControllerInstance.createVehiculo);
vehiculosRouter.put("/:id", vehiculosControllerInstance.updateVehiculo);
vehiculosRouter.delete("/:id", vehiculosControllerInstance.deleteVehiculo);

export default vehiculosRouter;

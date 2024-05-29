
import { RutasController } from "../controllers/rutas.controller";
import { TokenValidador } from "../util/midlewares/token-validador";
const express = require("express");
const rutasRouter = express.Router();

const rutasControllerInstance = new RutasController();

rutasRouter.use(TokenValidador);
rutasRouter.get("/", rutasControllerInstance.getRutas);
rutasRouter.get("/:id", rutasControllerInstance.getRuta);
rutasRouter.post("/", rutasControllerInstance.createRuta);
rutasRouter.put("/:id", rutasControllerInstance.updateRuta);
rutasRouter.delete("/:id", rutasControllerInstance.deleteRuta);

export default rutasRouter;
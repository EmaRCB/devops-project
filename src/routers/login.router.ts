import express from "express";
import { Login } from "../controllers/admin.controller";
import { LoginDatos } from "../util/esquemas/datos-login";
import { ValidadorEsquemas } from "../util/midlewares/validador-esquemas";

const loginRouter = express.Router();

loginRouter.post("", ValidadorEsquemas(LoginDatos), Login);
export default loginRouter;

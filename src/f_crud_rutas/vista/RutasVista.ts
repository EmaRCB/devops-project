import { Router } from "express";
import { RutasControlador } from "../controlador/RutasControlador";
import { TokenValidador } from "../../util/midlewares/token-validador";

const router = Router();
const rutas = new RutasControlador();

router.use(TokenValidador);
// Crear una nueva ruta
router.post("/", async (req, res) => rutas.crearRuta(req, res));

// Obtener todas las rutas
router.get("/", async (req, res) => rutas.obtenerRutas(req, res));

// Obtener una ruta por ID
router.get("/:id", async (req, res) => rutas.obtenerRutasPorId(req, res));

// Actualizar una ruta por ID
router.put("/:id", async (req, res) => rutas.actualizarRuta(req, res));

// Eliminar una ruta por ID
router.delete("/:id", async (req, res) => rutas.eliminarRuta(req, res));

export default router;

import { Router } from 'express';
import { ConductorControlador } from '../Controlador/ConductorControlador';

const router = Router();
const controlador = new ConductorControlador();

// Crear un nuevo conductor
router.post('/', async (req, res) => controlador.crearConductor(req, res));

// Obtener todos los conductores
router.get('/', async (req, res) => controlador.obtenerConductores(req, res));

// Obtener un conductor por ID
router.get('/:id', async (req, res) => controlador.obtenerConductorPorId(req, res));

// Actualizar un conductor por ID
router.put('/:id', async (req, res) => controlador.actualizarConductor(req, res));

// Eliminar un conductor por ID
router.delete('/:id', async (req, res) => controlador.eliminarConductor(req, res));

export default router;

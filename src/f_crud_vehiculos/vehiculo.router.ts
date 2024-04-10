import {vehiculoController} from "./vehiculo.controller";
const express = require('express');
const router = express.Router();
const cors = require('cors');
const vehiculosControllerInstance = new vehiculoController();

router.use(cors());
router.get('/', vehiculosControllerInstance.getVehiculos);
router.get('/:id', vehiculosControllerInstance.getVehiculo);
router.post('/', vehiculosControllerInstance.createVehiculo);
router.put('/:id', vehiculosControllerInstance.updateVehiculo);
router.delete('/:id', vehiculosControllerInstance.deleteVehiculo)

module.exports = router;
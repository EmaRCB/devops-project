const express = require('express');
const router = express.Router();
const vehiculoController = require('../f_crud_vehiculos/vehiculos.controller');
const cors = require('cors');

router.use(cors());

router.get('/', vehiculoController.getVehiculos);

module.exports = router;
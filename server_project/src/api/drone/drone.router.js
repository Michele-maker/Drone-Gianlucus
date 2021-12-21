const express = require('express');
const router = express.Router();
const droneController = require('./drone.controller');

//definizione dele api
router.post('/', droneController.createdrone);

router.get('/', droneController.list); 
router.get('/:id', droneController.details);
router.get('/:idDrone/status', droneController.getStatus); 

module.exports = router;
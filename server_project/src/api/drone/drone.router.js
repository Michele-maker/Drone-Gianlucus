const express = require('express');
const router = express.Router();
const droneController = require('./drone.controller');

//definizione dele api
router.post('/', droneController.createdrone);

router.get('/', droneController.list); 
router.get('/:id', droneController.details); 

module.exports = router;
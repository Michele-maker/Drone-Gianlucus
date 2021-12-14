const express = require('express');
const router = express.Router();
const droneRouter = require('./drone/drone.router');

//definizione della route
router.use('/drones', droneRouter);

module.exports = router;
const mongoose = require('mongoose');

let droneSchema = mongoose.Schema({
    dueDate: Date,
    idPersona: Number,
    idDrone: Number,
    posizione: Number,
    velocita: Number,
    percentuale: Number
});

module.exports = mongoose.model('drone', droneSchema);
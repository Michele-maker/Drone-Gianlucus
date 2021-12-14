const mongoose = require('mongoose');

let droneSchema = mongoose.Schema({
    dueDate: Date,
    posizione: Number,
    velocita: Number,
    percentuale: Number
});

module.exports = mongoose.model('drone', droneSchema);
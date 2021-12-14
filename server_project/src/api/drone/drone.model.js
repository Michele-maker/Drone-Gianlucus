const droneModel = require('./drone.schema');


module.exports.createdrone = async (drone) => { // con la funzione inserisco un dato nel database
    return await droneModel.create(drone); // create è un metodo di mongoose
}

module.exports.getList = async () => {
    return await droneModel.find() // funzione di mongoose
    /*
    let q = {};
    if (!showCompleted) {
        q.completed=  {$ne: true}; // not equal - se non è uguale a vero
    }
    return droneModel.find(q);
    */   
}

module.exports.getById = async (id) => {
    return await droneModel.findById(id); // funzione di mongoose
}
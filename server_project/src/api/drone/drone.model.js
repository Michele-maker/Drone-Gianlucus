const droneModel = require('./drone.schema');

module.exports.createdrone = async (drone) => { // con la funzione inserisco un dato nel database
    return await droneModel.create(drone); // create è un metodo di mongoose
}

module.exports.getList = async () => {
    return await droneModel.find() // funzione di mongoose
    
    /*let q = {};
    if (!showHired) {
        q.hired=  {$ne: true}; // not equal - se non è uguale a vero
    }
    return droneModel.find(q);*/
       
}

module.exports.getById = async (id) => {
    return await droneModel.findById(id); // funzione di mongoose
}

module.exports.getLast = async (last30minutes,idDrone) => {
    let q = {};
    let ora=new Date();
    if (last30minutes || ora) {
        q.dueDate = {};
    }
    if (last30minutes)
    {
        q.dueDate.$gte =last30minutes;
    }
    if (ora)
    {
        q.dueDate.$lte =ora;
    }
    q.idDrone=idDrone;
    return droneModel.find(q).sort( { dueDate: -1 } ).limit(1);
}
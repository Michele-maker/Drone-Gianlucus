const moment = require('moment');
const droneModel = require('./drone.model');
const minutes30ago = moment().subtract(30, 'm').toDate();

module.exports.createdrone = async (req,res,next) => {
    try {
     let drone = (req.body) // req.body vado a leggere il blocco di parametri che gli passo in post
     let newDrone = await droneModel.createdrone(drone)
        res.redirect(`/api/drones/${newDrone.id}`); // prendo l'id di quel record e glielo passo alla pagina /api/drones/ questo id
    } catch (err) {
        res.status(500);
        res.send();
    }
}

module.exports.list = async (req, res, next) => {
    try {
        
        /*const showHired = req.query.showHired === 'true';
        const results = await droneModel.getList(showHired);*/
        
        const results = await droneModel.getList();
        res.json(results);
    } catch(err) {
        next(err);
    }
};

module.exports.details = async (req,res,next) => {
    try {
    const drone = await droneModel.getById(req.params.id);
        if (!drone) {
            res.status(404);
            res.send('Not Found');
            return;
        }
        res.json(drone)
        } catch (err) {
            console.log(err);
            res.status(500);
            res.send();
        }
    }

module.exports.getStatus = async (req,res,next) => {
    try {
        const idle = { "stato": "libero"};
        const results = await droneModel.getLast(minutes30ago,req.params.idDrone);
        if(results != '') {
            res.json(results);
        }
        else {
            res.json(idle);
        }
    } catch(err) {
        next(err);
    }
}
const droneModel = require('./drone.model');


module.exports.createdrone = async (req,res,next) => {
    try {
     let drone = (req.body) // req.body vado a leggere il blocco di parametri che gli passo in post
     let newDrone = await droneModel.createdrone(drone)
        res.redirect(`/drones/${newDrone.id}`); // prendo l'id di quel record e glielo passo alla pagina /drones/ questo id
    } catch (err) {
        //console.log(err);
        res.status(500);
        res.send();
    }
}

module.exports.list = async (req, res, next) => {
    try {
        /*
        const showCompleted = req.query.showCompleted === 'true';
        const results = await droneModel.getList(showCompleted);
        */
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
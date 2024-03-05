const controller = require("../controllers/order.controller");
const router = require("express").Router();

module.exports = app => {
    router.post('/create', controller.create);
    router.get('/all', controller.findAll)
    router.get('/status/:status', controller.findbystatus)
    router.get('/name/:method', controller.findbymethod)
    router.get('/id/:orderID', controller.findbyid)
    router.post('/update', controller.update);
    router.get('/delete/:orderID', controller.delete);//delete not work so use get first
    //router.delete('/deleteall', controller.deleteAll);
    app.use('/api/order', router);
};
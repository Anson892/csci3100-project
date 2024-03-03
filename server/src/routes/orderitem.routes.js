const controller = require("../controllers/order.controller");
const router = require("express").Router();

module.exports = app => {
    router.post('/create', controller.create);
    router.get('/all', controller.findAll)
    router.get('/id/:orderID', controller.findbyorderid)
    router.post('/update', controller.update);
    router.get('/delete/:orderID', controller.delete);//delete not work so use get first
    //router.delete('/deleteall', controller.deleteAll);
    app.use('/api/orderitem', router);
};
const orders = require("../controllers/order.controller");
const router = require("express").Router();

module.exports = app => {
    router.post('/create', orders.create);
    router.post('/add', orders.addToOrder);
    router.delete('/remove', orders.removeOrderItem);
    router.get('/', orders.findAll)
    router.get('/status/:status', orders.findbystatus)
    router.get('/name/:method', orders.findbymethod)
    router.get('/id/:orderID', orders.findbyid)
    router.post('/update', orders.update);
    router.delete('/delete/:orderID', orders.delete);//delete not work so use get first
    //router.delete('/deleteall', controller.deleteAll);
    app.use('/api/order', router);
};
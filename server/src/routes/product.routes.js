const controller = require("../controllers/product.controller");
const router = require('express').Router();

module.exports = app => {
    router.post('/create', controller.create);
    router.get('/all', controller.findAll)
    router.get('/category/:cate', controller.findbycategory)
    router.get('/id/:productID', controller.findbyid)
    router.get('/name/:productname', controller.findbyname)
    router.post('/update', controller.update);
    router.get('/delete/:productID', controller.delete);//delete not work so use get first
    //router.delete('/deleteall', controller.deleteAll);
    app.use('/api/product', router);
}
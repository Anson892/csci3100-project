const product = require("../controllers/product.controller");
const router = require('express').Router();
const upload = require("../middlewares/upload");

module.exports = app => {
    router.post('/', upload.array("files", 5), product.create);
    router.get('/', product.findAll)
    router.get('/category/:cate', product.findbycategory)
    router.get('/:productID', product.findbyid)
    router.get('/name/:productname', product.findbyname)
    router.post('/update', product.update);
    router.delete('/:productID', product.delete);//delete not work so use get first
    //router.delete('/deleteall', controller.deleteAll);
    app.use('/api/product', router);
}
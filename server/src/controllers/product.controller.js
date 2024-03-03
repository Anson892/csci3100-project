const db = require("../models");
const Product = db.Product;
const Op = db.Sequelize.Op;
const controller = {};

//product image crud also done with same controller?

//Add product
controller.create = async (req, res) => {
    //console.log(req.body);
    await Product.create(req.body).then(() => {
        //console.log('data inserted!');
      }).catch((err) => res.status(500).send(err))
}

//Show all product
controller.findAll = async (req,res) => {
    Product.findAll().then((data) => {
        res.send(data)
    }).catch((err) => res.status(500).send(err))
}

//Show by category
controller.findbycategory = async (req,res) => {
    Product.findAll({
        where: {
            category: req.params.cate
        }
    }).then((data) => {
        //console.log(data[0].id);
        res.send(data)
    }).catch((err) => res.status(500).send(err))
}

//find product by product id
controller.findbyid = (req, res) => {
    //console.log(req.params.productID);
    Product.findOne({
        where: {
            id: req.params.productID
        }
    }).then((data) => {
        res.send(data)
    }).catch((err) => res.status(500).send(err))
};

//find product by name
controller.findbyname = (req, res) => {
    Product.findOne({
        where: {
            name: req.params.productname
        }
    }).then((data) => {
        res.send(data)
    }).catch((err) => res.status(500).send(err))
};

//update product
controller.update = (req, res) => {
    const { id, name, category, description, price, discount, stock } = req.body; 
    Product.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            name: name,
            category: category,
            description: description,
            price: price,
            discount: discount,
            stock: stock
        })
    }).then(() => {
        console.log('update successful!');
      }).catch((err) => res.status(500).send(err))
};

//update product
controller.delete = (req, res) => {
    console.log(req.params.productID);
    Product.findOne({
        where: {
            id: req.params.productID
        }
    }).then((data) => {
        data.destroy().then(() => {
          res.status(204);
          console.log('deleted!');
        })
    }).catch((err) => res.status(500).send(err))
};

/*delete all product(not for use?)
controller.deleteAll = (req, res) => {
    Product.destroyAll().then(() => {
        console.log('All data deleted!');
      }).catch((err) => res.status(500).send(err))
};*/

module.exports = controller;
const db = require("../models");
//const Order = db.Order;
const Orderitem = db.OrderItem;
const Op = db.Sequelize.Op;
const controller = {};

controller.create = async (req, res) => {
    //console.log(req.body);
    await Orderitem.create(req.body).then(() => {
        //console.log('data inserted!');
        }).catch((err) => res.status(500).send(err))
};

//show all orderitem
controller.findAll = async (req, res) => {
    Orderitem.findAll().then((data) => {
        res.send(data)
    }).catch((err) => res.status(500).send(err))
};

//show order from orderid
controller.findbyorderid = async (req, res) => {
    Order.findone({
        where: {
            orderId: req.params.orderID
        }
    }).then((data) => {
        //console.log(data[0].id);
        res.send(data)
    }).catch((err) => res.status(500).send(err))
};

controller.update = async (req, res) => {
    const { id, orderID, productID, price, quantity } = req.body; 
    Order.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            orderId: orderID,
            productId: productID,
            price: price,
            quantity: quantity
        })
    }).then(() => {
        console.log('update successful!');
      }).catch((err) => res.status(500).send(err))
};

controller.delete = async (req, res) => {
    Orderitem.findAll({
        where: {
            orderId: req.params.orderID
        }
    }).then((data) => {
        data.destroy().then(() => {
          res.status(204);
          console.log('deleted!');
        })
    }).catch((err) => res.status(500).send(err))
};
/*
controller.deleteAll = async (req, res) => {

};*/

module.exports = controller;
const db = require("../models");
const Order = db.Order;
const Orderitem = db.OrderItem;
const Op = db.Sequelize.Op;
const controller = {};

controller.create = async (req, res) => {
    //console.log(req.body);
    await Order.create(req.body).then(() => {
        //console.log('data inserted!');
        }).catch((err) => res.status(500).send(err))
};

//show all order
controller.findAll = async (req, res) => {
    Order.findAll().then((data) => {
        res.send(data)
    }).catch((err) => res.status(500).send(err))
};

//show order by status
controller.findbystatus = async (req, res) => {
    Order.findAll({
        where: {
            status: req.params.status
        }
    }).then((data) => {
        //console.log(data[0].id);
        res.send(data)
    }).catch((err) => res.status(500).send(err))
};

//show order by paymentmethod
controller.findbymethod = async (req, res) => {
    Order.findAll({
        where: {
            paymentMethod: req.params.method
        }
    }).then((data) => {
        //console.log(data[0].id);
        res.send(data)
    }).catch((err) => res.status(500).send(err))
};

//show order from orderid
controller.findbyid = async (req, res) => {
    Order.findone({
        where: {
            id: req.params.orderID
        }
    }).then((data) => {
        //console.log(data[0].id);
        res.send(data)
    }).catch((err) => res.status(500).send(err))
};

controller.update = async (req, res) => {
    const { id, status } = req.body; 
    Order.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        data.update({
            status: status
        })
    }).then(() => {
        console.log('update successful!');
      }).catch((err) => res.status(500).send(err))
};

controller.delete = async (req, res) => {
    Order.findOne({
        where: {
            id: req.params.orderID
        }
    }).then((data) => {
        data.destroy().then(() => {
          res.status(204);
          console.log('deleted!');
        })
    }).catch((err) => res.status(500).send(err))
};

controller.deleteAll = async (req, res) => {

};

module.exports = controller;
const db = require("../models");
const Order = db.Order;
const OrderItem = db.OrderItem;
const Product = db.Product;
const Op = db.Sequelize.Op;
const controller = {};

controller.create = async (req, res) => {
  //console.log(req.body);
  await Order.create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.status(500).send(err));
};

// add products to order
controller.addToOrder = async (req, res) => {
  const { orderId, productId, quantity } = req.body;

  // Find order
  Order.findOne({ where: { id: orderId } })
    .then((order) => {
      if (order === null) {
        res.status(404).send({
          message: "Order not found",
        });
      } else {
        // Find target product
        Product.findOne({ where: { id: productId } })
          .then((product) => {
            if (product === null) {
              res.status(404).send({
                message: "Product not found",
              });
            } else {
              // Add product to order
              const orderItem = {
                orderId: orderId,
                productId: productId,
                price: product.price,
                quantity: quantity,
              };

              OrderItem.create(orderItem)
                .then((data) => {
                  res.send(data);
                })
                .catch((err) =>
                  res.status(500).send({
                    message:
                      err.message ||
                      "Some error occurred while adding product to order.",
                  })
                );
            }
          })
          .catch((err) => res.status(500).send({
            message: err.message || "Some error occurred while finding product.",
          }));
      }
    })
    .catch((err) => res.status(500).send({
      message: err.message || "Some error occurred while finding order.",
    }));
};

controller.removeOrderItem = async (req, res) => {
  const { orderId, productId } = req.body;

  // Find order
  Order.findOne({ where: { id: orderId } }).then((order) => {
    if (order === null) {
      // order not found
      res.status(404).send({
        message: "Order not found",
      });
    } else {
      // Find product in order
      OrderItem.findOne({
        where: { orderId: orderId, productId: productId },
      }).then((orderItem) => {
        if (orderItem === null) {
          // product not in order
          res.status(404).send({
            message: "Product not in order",
          });
        } else {
          // Remove product from order
          orderItem
            .destroy()
            .then(() => {
              res.send({ message: "Product removed from order" });
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while removing product from order.",
              });
            });
        }
      });
    }
  });
};

//show all order
controller.findAll = async (req, res) => {
  Order.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.status(500).send(err));
};

//show order by status
controller.findbystatus = async (req, res) => {
  Order.findAll({
    where: {
      status: req.params.status,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.status(500).send(err));
};

//show order by paymentmethod
controller.findbymethod = async (req, res) => {
  Order.findAll({
    where: {
      paymentMethod: req.params.method,
    },
  })
    .then((data) => {
      //console.log(data[0].id);
      res.send(data);
    })
    .catch((err) => res.status(500).send(err));
};

//show order from orderid
controller.findbyid = async (req, res) => {
  Order.findone({
    where: {
      id: req.params.orderID,
    },
  })
    .then((data) => {
      //console.log(data[0].id);
      res.send(data);
    })
    .catch((err) => res.status(500).send(err));
};

controller.update = async (req, res) => {
  const { id, status } = req.body;
  Order.findOne({
    where: {
      id: id,
    },
  })
    .then((data) => {
      data.update({
        status: status,
      });
    })
    .then(() => {
      console.log("update successful!");
    })
    .catch((err) => res.status(500).send(err));
};

controller.delete = async (req, res) => {
  Order.findOne({
    where: {
      id: req.params.orderID,
    },
  })
    .then((data) => {
      data.destroy().then(() => {
        res.status(204);
        console.log("deleted!");
      });
    })
    .catch((err) => res.status(500).send(err));
};
/*
controller.deleteAll = async (req, res) => {

};*/

module.exports = controller;

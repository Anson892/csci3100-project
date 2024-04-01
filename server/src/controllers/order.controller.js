const db = require("../models");
const Order = db.Order;
const OrderItem = db.OrderItem;
const Product = db.Product;
const UserInfo = db.UserInfo;
const Op = db.Sequelize.Op;
const controller = {};

//create order
controller.create = async (req, res) => {
  const { userId, infoId } = req.body;
  await Order.create({
    userId: userId,
    userInfoId: infoId
  }).then(async (data) => {
    const orderid = await Order.findOne({
      attributes: ['id'],
      where: { userId: userId,
               userInfoId: infoId },
      order: [ [ 'createdAt', 'DESC' ]]
    })
    res.send(orderid)
  })
}

// add products to order
controller.addToOrder = async (req, res) => {
  const { orderId, products } = req.body;
  const productlist = [];
  const productidlist = [];
  const updatelist = [];
  products.forEach(element => {
    const orderitem = {
      orderId: orderId,
      productId: element.productId,
      price: element.price,
      quantity: element.quantity
    }
    productlist.push(orderitem)
    productidlist.push(element.productId)
  });
  await Order.findOne({ where: { id: orderId } })
    .then(async (order) => {
      if (order === null) {
        res.status(404).send({
          message: "Order not found",
        });
      } else {
        // Find target product
        productidlist.forEach(async element => {
          await Product.findOne({ attributes: ['id', 'stock'],
                            where: { id: element } })
          .then((product) => {
            if (product === null) {
              res.status(404).send({
                message: "Product not found",
              });
              }
          })
        });
        //list of product user buy for further update
        await Product.findAll({
          attributes: ['id', 'stock'],
          where: {id: {[Op.in]: productidlist}}
        }).then((data) => {
          data.forEach(element => {
            productlist.forEach(listitem => {
              if(element.id==listitem.productId){
                const updatestock = element.stock - listitem.quantity;
                const updateproduct = {
                  id: element.id,
                  stock: updatestock
                };
                updatelist.push(updateproduct)
              }
            })
          })
        })
        let result = await OrderItem.bulkCreate(productlist);
        updatelist.forEach(async element => {
          await Product.update({stock: element.stock},{where: {id: element.id}})
        })
        res.send("Add orderitem success!")
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

//update order status
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

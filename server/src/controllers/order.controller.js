const { where } = require("sequelize");
const db = require("../models");
const Order = db.Order;
const OrderItem = db.OrderItem;
const Product = db.Product;
const UserInfo = db.UserInfo;
const Op = db.Sequelize.Op;
const controller = {};

//create order
controller.create = async (req, res) => {
  const { userId,  products } = req.body;
  const productlist = [];
  const productidlist = [];
  const updatelist = [];
  //create new order record
  await Order.create({
    userId: userId
  }).then(async () => {
    //get the created order id
    await Order.findOne({
      attributes: ['id'],
      where: { userId: userId },
      order: [ [ 'createdAt', 'DESC' ]]
    }).then(async (data) => {
      console.log(data.id)
      products.forEach(element => {
        const orderitem = {
          orderId: data.id,
          productId: element.productId,
          price: element.price,
          quantity: element.quantity
        }
        productlist.push(orderitem)
        productidlist.push(element.productId)
      });

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

    //add cart item to order item
    await OrderItem.bulkCreate(productlist);

    //update stock number
    updatelist.forEach(async element => {
      await Product.update({ stock: element.stock },{ where: {id: element.id} })
    })
    res.send(data)
    })
  })
  .catch((err) => res.status(500).send({
    message: err.message || "Error occurred while creating order.",
  }));
}

// add products to order
controller.PlaceOrder = async (req, res) => {
  const { orderId, paymentMethod, receiver, address } = req.body;
  Order.update(
    {
      status: "pending",
      paymentMethod: paymentMethod,
      receiver: receiver,
      address: address
    },
    { where: {id: orderId} }
  )
  res.send("success")
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

//User order history http://localhost:8080/api/order/history/1
controller.history = async (req, res) => {
  const userid = req.params.userid;
  const resultlist = [];
  const orderlist = await Order.findAll({
    where: {userId: userid,
    status: {[Op.ne]: 'payment'}},
    order: [['id', 'DESC']]
  })
  var ordercount = 0;
  try{
    for (const element of orderlist) {
      const productlsit = [];
      var total = 0;
      const itemlist = await OrderItem.findAll({
        attributes: ['productId', 'price', 'quantity'],
        where: {orderId: element.id}
      })
      for (const product of itemlist) {
        const productname = await Product.findOne({
          attributes: ['name'],
          where: { id: product.productId }
        })
        const info = {
          productId: product.productId,
          productname: productname.name,
          price: product.price,
          quantity: product.quantity
        }
        productlsit.push(info)
        var temp = product.price
        var price = Number(temp)
        total = total + price
      }
      const createTime = element.createdAt
      const deliverydate = new Date(createTime)
      deliverydate.setDate(deliverydate.getDate() + 7)
      const order = {
        id: element.id,
        ordertime: element.createdAt,
        ordertotal: total,
        receiver: element.receiver,
        address: element.address,
        paymentMethod: element.paymentMethod,
        deliverytime: deliverydate,
        status: element.status,
        orderitem: productlsit
      }
      console.log(order)
      resultlist.push(order)
      ordercount+=1;
      if(ordercount==orderlist.length){
        res.send(resultlist)
      }
    }
  }
  catch(err){
    res.status(500).send("error exist:" + err)
  }
  
}

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
  const { id, receiver, address, status } = req.body;
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

// Delete an order entry: DELETE /api/order/delete/:orderID
controller.delete = async (req, res) => {
  const updatelist = [];

  //find order item list
  await OrderItem.findAll({
    where: { orderId: req.params.orderID }
  }).then(async (item) => {
    item.forEach(async item => {
      const product = await Product.findByPk(item.productId)
      const stock = product.stock + item.quantity
      await Product.update({ stock: stock },{ where: { id: product.id } })
    })
    await OrderItem.destroy({where: { orderId: req.params.orderID }})
    await Order.destroy({where: { id: req.params.orderID }})
  }).then(() => {
    res.send("order deleted.")
  })
  .catch((err) => res.status(500).send(err));
};
/*
controller.deleteAll = async (req, res) => {

};*/

module.exports = controller;

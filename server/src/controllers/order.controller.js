const { where } = require("sequelize");
const db = require("../models");
const Order = db.Order;
const OrderItem = db.OrderItem;
const Product = db.Product;
const UserInfo = db.UserInfo;
const Op = db.Sequelize.Op;
const controller = {};

/** 
 * Create a new order
 * API: POST http://localhost:8080/api/order/create
 * Request body: { userId, products: [{productId, price, quantity}] }
 * Response: { id }
*/
controller.create = async (req, res) => {
  const { userId, products } = req.body;
  const productlist = [];
  const productidlist = [];
  const updatelist = [];
  try {
    // Create new order record
    await Order.create({
      userId: userId,
    });

    // Get the created order id
    const newOrder = await Order.findOne({
      attributes: ["id"],
      where: { userId: userId },
      order: [["createdAt", "DESC"]],
    });

    // Get ordered products
    products.forEach((element) => {
      const orderitem = {
        orderId: newOrder.id,
        productId: element.productId,
        price: element.price,
        quantity: element.quantity,
      };
      productlist.push(orderitem);
      productidlist.push(element.productId);
    });

    // Get product stock
    for (const element of productidlist) {
      const product = await Product.findOne({
        attributes: ["id", "stock"],
        where: { id: element },
      });
      if (product === null) {
        res.status(404).send({
          message: "Product not found",
        });
      } else {
        for (const item of productlist) {
          if (product.id == item.productId) {
            const updatestock = element.stock - listitem.quantity;
            const updateproduct = {
              id: element.id,
              stock: updatestock,
            };
            updatelist.push(updateproduct);
          }
        }
      }
    }

    // Update stock and create order item
    for (const element of updatelist) {
      await Product.update(
        { stock: element.stock },
        { where: { id: element.id } }
      );
    }

    await OrderItem.bulkCreate(productlist);
    res.send(newOrder);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating order.",
    });
  }
};

/**
 * Add payment method and receiver information to an order
 * API: PUT http://localhost:8080/api/order/placeorder
 * Request body: { orderId, paymentMethod, receiver, address }
 * Response: "success" if successful
 */
controller.PlaceOrder = async (req, res) => {
  const { orderId, paymentMethod, receiver, address } = req.body;
  try {
    await Order.update(
      {
        status: "pending",
        paymentMethod: paymentMethod,
        receiver: receiver,
        address: address,
      },
      { where: { id: orderId } }
    );
    res.send("success");
  } catch (err) {
    res.status(500).send({
      error: err.message || "Error occurred while placing order.",
    });
  }
};

/**
 * Remove a product from an order
 * API: DELETE http://localhost:8080/api/order/remove
 * Request body: { orderId, productId }
 * Response: "Product removed from order" if successful
 */
controller.removeOrderItem = async (req, res) => {
  const { orderId, productId } = req.body;

  try {
    // Find order
    const order = await Order.findOne({ where: { id: orderId } });
    if (order === null) {
      res.status(404).send({
        message: "Order not found",
      });
    }
    // Find product in order
    const orderItem = await OrderItem.findOne({
      where: { orderId: orderId, productId: productId },
    });
    if (orderItem === null) {
      res.status(404).send({
        message: "Product not in order",
      });
    }
    // Remove product from order
    await orderItem.destroy();
    res.send({ message: "Product removed from order" });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing product from order.",
    });
  }
};

/**
 * Get order history of a user
 * API: GET http://localhost:8080/api/order/history/:userid
 * Response: [{id, ordertime, ordertotal, receiver, address, paymentMethod, deliverytime, status, orderitem}]
 * orderitem: [{productId, productname, price, quantity}]
 */
controller.history = async (req, res) => {
  const userid = req.params.userid;
  const resultlist = [];
  try {
    // get all orders of the user
    const orderlist = await Order.findAll({
      where: { userId: userid, status: { [Op.ne]: "payment" } },
      order: [["id", "DESC"]],
    });
    var ordercount = 0;
    // for each order, get order items and product information
    for (const element of orderlist) {
      const productlsit = [];
      var total = 0;
      // get order items
      const itemlist = await OrderItem.findAll({
        attributes: ["productId", "price", "quantity"],
        where: { orderId: element.id },
      });
      // get all product information in an order
      for (const product of itemlist) {
        const productname = await Product.findOne({
          attributes: ["name"],
          where: { id: product.productId },
        });
        const info = {
          productId: product.productId,
          productname: productname.name,
          price: product.price,
          quantity: product.quantity,
        };
        productlsit.push(info);
        var temp = product.price;
        var price = Number(temp);
        total = total + price;
      }

      // Get delivery time
      const createTime = element.createdAt;
      const deliverydate = new Date(createTime);
      deliverydate.setDate(deliverydate.getDate() + 7);
      // Format order information for response
      const order = {
        id: element.id,
        ordertime: element.createdAt,
        ordertotal: total,
        receiver: element.receiver,
        address: element.address,
        paymentMethod: element.paymentMethod,
        deliverytime: deliverydate,
        status: element.status,
        orderitem: productlsit,
      };
      resultlist.push(order);
      ordercount += 1;
      if (ordercount == orderlist.length) {
        res.send(resultlist);
      }
    }
  } catch (err) {
    res.status(500).send("error exist:" + err);
  }
};

/**
 * Get all orders in the database
 * API: GET http://localhost:8080/api/order
 * Response: [{id, userId, status, paymentMethod, receiver, address}]
 */
controller.findAll = async (req, res) => {
  Order.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.status(500).send(err));
};

/**
 * Find orders by order status
 * API: GET http://localhost:8080/api/order/status/:status
 * Response: [{id, userId, status, paymentMethod, receiver, address}]
 */
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

/**
 * Find orders by payment method
 * API: GET http://localhost:8080/api/order/name/:method
 * Response: [{id, userId, status, paymentMethod, receiver, address}]
 */
controller.findbymethod = async (req, res) => {
  Order.findAll({
    where: {
      paymentMethod: req.params.method,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.status(500).send(err));
};

/**
 * Find an order by order id
 * API: GET http://localhost:8080/api/order/id/:orderID
 * Response: {id, userId, status, paymentMethod, receiver, address}
 */
controller.findbyid = async (req, res) => {
  Order.findOne({
    where: {
      id: req.params.orderID,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.status(500).send(err));
};

/**
 * Update an order status by order id
 * API: PUT http://localhost:8080/api/order/update
 * Request body: { id, status }
 * Response: "update successful!" if successful
 */
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

/**
 * Delete an order and its order items by order id,
 * and update the stock of the products in the order
 * API: DELETE http://localhost:8080/api/order/delete/:orderID
 * Response: "order deleted." if successful
 */
controller.delete = async (req, res) => {
  //find order item list
  await OrderItem.findAll({
    where: { orderId: req.params.orderID },
  })
    .then(async (items) => {
      for (let item of items) {
        const product = await Product.findByPk(item.productId);
        const stock = product.stock + item.quantity;
        await Product.update({ stock: stock }, { where: { id: product.id } });
      }
      await OrderItem.destroy({ where: { orderId: req.params.orderID } });
      await Order.destroy({ where: { id: req.params.orderID } });
    })
    .then(() => {
      res.send("order deleted.");
    })
    .catch((err) => res.status(500).send(err));
};

module.exports = controller;

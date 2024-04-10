const { on } = require("nodemon");
const db = require("../models");
const Comment = db.Comment;
const User = db.User;
const Order = db.Order;
const OrderItem = db.OrderItem;
const Op = db.Sequelize.Op;
const controller = {};

// check comment by user id + product id + order id
controller.checkcomment = async (req, res) => {
  const { userId, productId, orderId } = req.body;
  try {
    const comment = await Comment.findOne({
      where: { userId: userId, productId: productId, orderId: orderId },
    });
    if (comment != null) {
      res.json({
        exist: true,
        rating: comment.rating,
        content: comment.content,
      });
    } else {
      res.json({ exist: false });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//add comment and rating
controller.addcomment = async (req, res) => {
  const { userId, rating, content, productId, orderId } = req.body;
  try {
    //search whether comment exist
    const findcomment = await Comment.findOne({
      where: { userId: userId, orderId: orderId, productId: productId },
    });
    //check the order item exist
    const findorder = await OrderItem.findOne({
      attributes: ["orderId", "productId"],
      include: [
        {
          model: Order,
          attributes: ["userId"],
          where: { userId: userId },
        },
      ],
      where: { orderId: orderId, productId: productId },
    });
    if (findcomment == null && findorder != null) {
      const view = {
        rating: rating,
        content: content,
        userId: userId,
        productId: productId,
        orderId: orderId,
      };
      console.log("go");
      await Comment.create(view)
        .then(() => {
          res.send("Add comment success.");
        })
        .catch((err) => res.status(500).send(err));
    } else {
      if (findcomment != null) {
        res.status(500).json("Comment already exist.");
      } else {
        res.status(500).json("Order doesn't exist.");
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

//comment rating
controller.status = async (req, res) => {
  try {
    const pid = req.params.pid;
    const five_star = await Comment.count({
      where: {
        productId: pid,
        rating: 5, // count rating = 5
      },
    });
    const four_star = await Comment.count({
      where: {
        productId: pid,
        rating: 4, // count rating = 4
      },
    });
    const three_star = await Comment.count({
      where: {
        productId: pid,
        rating: 3, // count rating = 3
      },
    });
    const two_star = await Comment.count({
      where: {
        productId: pid,
        rating: 2, // count rating = 2
      },
    });
    const one_star = await Comment.count({
      where: {
        productId: pid,
        rating: 1, // count rating = 1
      },
    });

    // average
    const total = five_star + four_star + three_star + two_star + one_star;
    const avg = (5 * five_star + 4 * four_star + 3 * three_star + 2 * two_star + 1 * one_star) / Math.max(1, total);

    const status = {
      id: req.params.pid,
      average: avg.toFixed(1),
      five_star: JSON.stringify(five_star),
      four_star: JSON.stringify(four_star),
      three_star: JSON.stringify(three_star),
      two_star: JSON.stringify(two_star),
      one_star: JSON.stringify(one_star),
    };
    res.send(status);
  } catch (err) {
    res.status(500).send(err);
  }
};

//show comment
controller.commentlist = (req, res) => {
  const { commentpointer, id } = req.body;
  var setoffset = 0;
  var setlimit = 3;
  if (commentpointer > 0) {
    var setoffset = 3 + (commentpointer - 1);
    var setlimit = 1;
  }
  Comment.findAll({
    attributes: ["rating", "content"],
    where: {
      productId: id,
    },
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
    offset: setoffset,
    limit: setlimit,
    order: [["createdAt", "DESC"]]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = controller;

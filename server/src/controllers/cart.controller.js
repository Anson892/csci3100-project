const db = require("../models");
const Cart = db.Cart;
const CartItem = db.CartItem;
const Product = db.Product;
const Op = db.Sequelize.Op;
const controller = {};

// Create a new cart for user
controller.createCart = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({
      message: "userId cannot be empty!",
    });
    return;
  }
  // Find existing cart
  Cart.findOne({ where: { userId: req.body.userId } }).then((data) => {
    if (data === null) {
      // Create a Cart for user
      const cart = {
        userId: req.body.userId,
      };

      // Save new Cart in the database
      Cart.create(cart)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the cart.",
          });
        });
    } else {
      res.status(400).send({ message: "user already has a cart!" });
    }
  });
};

// Get user cart
controller.getUserCart = (req, res) => {
  const userId = req.body.userId;
  // find cart
  Cart.findOne({ where: { userId: userId } })
    .then((cart) => {
      if (cart === null) {
        res.status(404).send({
          message: "Cart not found",
        });
      } else {
        // Get cart items
        CartItem.findAll({ where: { cartId: cart.id }, include: Product })
          .then((cartItems) => {
            res.send(cartItems);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving cart items.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cart.",
      });
    });
};

controller.addToCart = (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Find user cart
  Cart.findOne({ where: { userId: userId } }).then((cart) => {
    if (cart === null) {
      res.status(404).send({
        message: "Cart not found",
      });
    } else {
      // Check if product is already in cart
      CartItem.findOne({
        where: { cartId: cart.id, productId: productId },
      }).then((cartItem) => {
        if (cartItem === null) {
          // Product not in cart
          // Add product to cart
          const cartItem = {
            productId: productId,
            cartId: cart.id,
            quantity: quantity,
          };

          CartItem.create(cartItem)
            .then((data) => {
              res.send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while adding product to cart.",
              });
            });
        } else {
          // Product already in cart
          // Update quantity
          cartItem.quantity += quantity;
          cartItem
            .save()
            .then((data) => {
              res.send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while updating product in cart.",
              });
            });
        }
      });
    }
  });
};

controller.removeCartItem = (req, res) => {
  const { userId, productId } = req.body;

  // Find user cart
  Cart.findOne({ where: { userId: userId } }).then((cart) => {
    if (cart === null) {
      // cart not found
      res.status(404).send({
        message: "Cart not found",
      });
    } else {
      // Find product in cart
      CartItem.findOne({
        where: { cartId: cart.id, productId: productId },
      }).then((cartItem) => {
        if (cartItem === null) {
          // product not in cart
          res.status(404).send({
            message: "Product not in cart",
          });
        } else {
          // Remove product from cart
          cartItem
            .destroy()
            .then(() => {
              res.send({ message: "Product removed from cart" });
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while removing product from cart.",
              });
            });
        }
      });
    }
  });
};

controller.clearCart = (req, res) => {
  const userId = req.body.userId;

  // Find user cart
  Cart.findOne({ where: { userId: userId } })
    .then((cart) => {
      if (cart === null) {
        // cart not found
        res.status(404).send({
          message: "Cart not found",
        });
      } else {
        // Clear cart
        CartItem.destroy({ where: { cartId: cart.id } })
          .then(() => {
            res.send({ message: "Cart cleared" });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while clearing cart.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cart.",
      });
    });
};

controller.deleteCart = (req, res) => {
  const userId = req.body.userId;

  // Find user cart
  Cart.findOne({ where: { userId: userId } })
    .then((cart) => {
      if (cart === null) {
        // cart not found
        res.status(404).send({
          message: "Cart not found",
        });
      } else {
        // Delete cart content
        CartItem.destroy({ where: { cartId: cart.id } })
          .then(() => {
            // Delete cart
            Cart.destroy({ where: { userId: userId } })
              .then(() => {
                res.send({ message: "Cart deleted" });
              })
              .catch((err) => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while deleting cart.",
                });
              });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while deleting cart.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cart.",
      });
    });
};

controller.updateCartItem = (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Find user cart
  Cart.findOne({ where: { userId: userId } }).then((cart) => {
    if (cart === null) {
      // cart not found
      res.status(404).send({
        message: "Cart not found",
      });
    } else {
      // Find product in cart
      CartItem.findOne({
        where: { cartId: cart.id, productId: productId },
      }).then((cartItem) => {
        if (cartItem === null) {
          // product not in cart
          res.status(404).send({
            message: "Product not in cart",
          });
        } else {
          // Update quantity
          cartItem.quantity = quantity;
          if (cartItem.quantity <= 0) {
            // Remove product from cart
            cartItem
              .destroy()
              .then(() => {
                res.send({ message: "Product removed from cart" });
              })
              .catch((err) => {
                res.status(500).send({
                  message:
                    err.message ||
                    "Some error occurred while removing product from cart.",
                });
              });
          } else {
            // Save updated quantity
            cartItem
              .save()
              .then((data) => {
                res.send(data);
              })
              .catch((err) => {
                res.status(500).send({
                  message:
                    err.message ||
                    "Some error occurred while updating product in cart.",
                });
              });
          }
        }
      });
    }
  });
};

module.exports = controller;

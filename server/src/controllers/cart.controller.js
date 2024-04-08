const db = require("../models");
const Cart = db.Cart;
const CartItem = db.CartItem;
const Product = db.Product;
const ProductImage = db.ProductImage;
const Op = db.Sequelize.Op;
const controller = {};

// Create a new cart for user
controller.createCart = async (req, res) => {
  const { userId } = req.params;
  console.log("Creating cart for user: " + userId);
  try {
    // Find existing cart
    const cart = await Cart.findOne({ where: { userId: userId } });
    if (cart === null) {
      // Create a Cart for user
      const cart = {
        userId: userId,
      };

      // Save new Cart in the database
      Cart.create(cart);

      res.status(200).json({
        success: true,
        message: "Cart created successfully!",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Cart already exists!",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message || "Some error occurred while creating the cart.",
    });
  }
};

// Get user cart
controller.getUserCart = (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    res.status(400).json({
      error: "User Id cannot be empty!",
    });
    return;
  }

  // find cart
  Cart.findOne({ where: { userId: userId } })
    .then((cart) => {
      // Get cart items
      CartItem.findAll({
        where: { cartId: cart.id },
        attributes: ["productId", "quantity"],
      })
        .then((cartItems) => {
          res.json(cartItems);
        })
        .catch((err) => {
          res.status(500).json({
            error:
              err.message || "Some error occurred while retrieving cart items.",
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message || "Some error occurred while retrieving cart.",
      });
    });
};

controller.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  // validate request
  if (!userId || !productId || !quantity) {
    res.status(400).json({
      error: "userID, productID and quantity cannot be empty!",
    });
    return;
  }

  if (quantity <= 0) {
    res.status(400).json({
      error: "quantity must be greater than 0!",
    });
    return;
  }

  // validate requested quantity and stock
  const product = await Product.findOne({ where: { id: productId } });
  console.log(product.stock);
  if (quantity > product.stock) {
    res.status(200).json({
      success: false,
      message: "Not enough stock available!",
    });
    return;
  }

  // Find user cart
  Cart.findOne({ where: { userId: userId } }).then((cart) => {
    if (cart === null) {
      res.status(404).json({
        error: "Cart not found",
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
              res
                .status(200)
                .json({ success: true, message: "Product added to cart" });
            })
            .catch((err) => {
              res.status(500).json({
                error:
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
              res
                .status(200)
                .json({ success: true, message: "Product updated in cart" });
            })
            .catch((err) => {
              res.status(500).json({
                error:
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
      res.status(404).json({
        error: "Cart not found",
      });
    } else {
      // Find product in cart
      CartItem.findOne({
        where: { cartId: cart.id, productId: productId },
      }).then((cartItem) => {
        if (cartItem === null) {
          // product not in cart
          res.status(404).json({
            error: "Product not in cart",
          });
        } else {
          // Remove product from cart
          cartItem
            .destroy()
            .then(() => {
              res.status(200).json({ message: "Product removed from cart" });
            })
            .catch((err) => {
              res.status(500).json({
                error:
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
        res.status(404).json({
          message: "Cart not found",
        });
      } else {
        // Clear cart
        CartItem.destroy({ where: { cartId: cart.id } })
          .then(() => {
            res.json({ message: "Cart cleared" });
          })
          .catch((err) => {
            res.status(500).json({
              message:
                err.message || "Some error occurred while clearing cart.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
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
        res.status(404).json({
          message: "Cart not found",
        });
      } else {
        // Delete cart content
        CartItem.destroy({ where: { cartId: cart.id } })
          .then(() => {
            // Delete cart
            Cart.destroy({ where: { userId: userId } })
              .then(() => {
                res.json({ message: "Cart deleted" });
              })
              .catch((err) => {
                res.status(500).json({
                  message:
                    err.message || "Some error occurred while deleting cart.",
                });
              });
          })
          .catch((err) => {
            res.status(500).json({
              message:
                err.message || "Some error occurred while deleting cart.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
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
      res.status(404).json({
        message: "Cart not found",
      });
    } else {
      // Find product in cart
      CartItem.findOne({
        where: { cartId: cart.id, productId: productId },
      }).then((cartItem) => {
        if (cartItem === null) {
          // product not in cart
          res.status(404).json({
            message: "Product not in cart",
          });
        } else {
          // Update quantity
          cartItem
            .save()
            .then((data) => {
              res.status(200).json({ message: "Product updated in cart" });
            })
            .catch((err) => {
              res.status(500).json({
                error:
                  err.message ||
                  "Some error occurred while updating product in cart.",
              });
            });
        }
      });
    }
  });
};

module.exports = controller;

const db = require("../models");
const Cart = db.Cart;
const CartItem = db.CartItem;
const Product = db.Product;
const ProductImage = db.ProductImage;
const Op = db.Sequelize.Op;
const controller = {};

/**
 * Create a new cart for user (or check if cart already exists)
 * API: POST http://localhost:8080/api/cart/create/:userId
 * Response: { success, message/error }
 */
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
      success: false,
      error: err.message || "Some error occurred while creating the cart.",
    });
  }
};

/**
 * Get user cart with cart items
 * API: GET http://localhost:8080/api/cart/:userId
 * Response: [{ productId, quantity }]
 */
controller.getUserCart = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    res.status(400).json({
      error: "User Id cannot be empty!",
    });
    return;
  }
  try {
    // find cart
    const cart = await Cart.findOne({ where: { userId: userId } });
    if (cart === null) {
      res.status(404).json({
        error: "Cart not found",
      });
    } else {
      // Get cart items
      const cartItems = await CartItem.findAll({
        where: { cartId: cart.id },
        attributes: ["productId", "quantity"],
      });
      res.json(cartItems);
    }
  } catch (err) {
    res.status(500).json({
      error: err.message || "Some error occurred while retrieving cart.",
    });
  }
};

/**
 * Add product to cart
 * API: POST http://localhost:8080/api/cart/add
 * Request body: { userId, productId, quantity }
 * Response: { success, message/error }
 */
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

  try {
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
    const cart = await Cart.findOne({ where: { userId: userId } });
    if (cart === null) {
      res.status(404).json({
        error: "Cart not found",
      });
    } else {
      // Check if product is already in cart
      const cartItem = await CartItem.findOne({
        where: { cartId: cart.id, productId: productId },
      });
      if (cartItem === null) {
        // Product not in cart
        // Add product to cart
        const cartItem = {
          productId: productId,
          cartId: cart.id,
          quantity: quantity,
        };

        CartItem.create(cartItem);
        res
          .status(200)
          .json({ success: true, message: "Product added to cart" });
      } else {
        // Product already in cart
        // Update quantity
        cartItem.quantity += quantity;
        if (cartItem.quantity > product.stock) {
          res.status(200).json({
            success: false,
            message: "Not enough stock available!",
          });
          return;
        }
        cartItem.save();
        res
          .status(200)
          .json({ success: true, message: "Product updated in cart" });
      }
    }
  } catch (err) {
    res.status(500).json({
      error: err.message || "Some error occurred while adding product to cart.",
    });
  }
};

/**
 * Remove a product from cart
 * API: POST http://localhost:8080/api/cart/remove
 * Request body: { userId, productId }
 * Response: message/error
 */
controller.removeCartItem = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    res.status(400).json({
      error: "userID and productID cannot be empty!",
    });
    return;
  }

  // Find user cart
  try {
    const cart = await Cart.findOne({ where: { userId: userId } });
    if (cart === null) {
      res.status(404).json({
        error: "Cart not found",
      });
    }

    // Find product in cart
    const cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId: productId },
    });

    if (cartItem === null) {
      res.status(404).json({
        error: "Product not in cart",
      });
    }
    await cartItem.destroy();
    res.status(200).json({ message: "Product removed from cart" });
  } catch (err) {
    res.status(500).json({
      error:
        err.message || "Some error occurred while removing product from cart.",
    });
  }
};

/**
 * Clear cart content of a user
 * API: DELETE http://localhost:8080/api/cart/clear
 * Request body: { userId }
 * Response: message/error
 */
controller.clearCart = async (req, res) => {
  const userId = req.body.userId;

  try {
    const cart = await Cart.findOne({ where: { userId: userId } });
    if (cart === null) {
      res.status(404).json({
        error: "Cart not found",
      });
    } else {
      await CartItem.destroy({ where: { cartId: cart.id } });
      res.status(200).json({ message: "Cart cleared" });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message || "Some error occurred while clearing cart.",
    });
  }
};

/**
 * Delete cart of a user
 * API: DELETE http://localhost:8080/api/cart/delete
 * Request body: { userId }
 * Response: message/error
 */
controller.deleteCart = async (req, res) => {
  const userId = req.body.userId;

  // Find user cart
  try {
    const cart = await Cart.findOne({ where: { userId: userId } });
    if (cart === null) {
      res.status(404).json({
        error: "Cart not found",
      });
    } else {
      await CartItem.destroy({ where: { cartId: cart.id } });
      await cart.destroy();
      res.status(200).json({ message: "Cart deleted" });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message || "Some error occurred while deleting cart.",
    });
  }
};

/**
 * Update quantity of product in cart
 * API: PUT http://localhost:8080/api/cart/update
 * Request body: { userId, productId, quantity }
 * Response: message/error
 */
controller.updateCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  // validate request
  if (!userId || !productId || !quantity) {
    res.status(400).json({
      error: "userID, productID and quantity cannot be empty!",
    });
    return;
  }

  try {
    // check quantity and stock
    const product = await Product.findOne({ where: { id: productId } });
    if (quantity > product.stock) {
      res.status(200).json({
        success: false,
        message: "Not enough stock available!",
      });
      return;
    }

    // find user cart
    const cart = await Cart.findOne({ where: { userId: userId } });
    // find product in cart
    const cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId: productId },
    });
    if (cartItem === null) {
      res.status(404).json({
        error: "Product not in cart",
      });
    } else {
      // update quantity
      cartItem.quantity = quantity;
      cartItem.save();
      res
        .status(200)
        .json({ success: true, message: "Product updated in cart" });
    }
  } catch (err) {
    res.status(500).json({
      error:
        err.message || "Some error occurred while updating product in cart.",
    });
  }
};

module.exports = controller;

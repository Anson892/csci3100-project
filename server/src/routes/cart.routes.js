const cart = require("../controllers/cart.controller");
const router = require("express").Router();

module.exports = app => {
    router.post("/:userId", cart.createCart);
    router.get("/:userId", cart.getUserCart);
    router.post("/add", cart.addToCart);
    router.delete("/remove", cart.removeCartItem);
    router.put("/update", cart.updateCartItem);

    router.delete("/clear", cart.clearCart);
    router.delete("/delete", cart.deleteCart);

    app.use('/api/cart', router);
};
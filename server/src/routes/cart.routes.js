const cart = require("../controllers/cart.controller");
const router = require("express").Router();

module.exports = app => {
    router.post("/create", cart.createCart);
    router.get("/", cart.getUserCart);
    router.post("/add", cart.addToCart);
    router.delete("/remove", cart.removeCartItem);
    router.delete("/clear", cart.clearCart);
    router.delete("/delete", cart.deleteCart);
    router.put("/update", cart.updateCartItem);

    app.use('/api/cart', router);
};
const userInfo = require("../controllers/user-info.controller");
const router = require("express").Router();

module.exports = app => {
    router.post("/:id", userInfo.createUserInfo);
    router.get("/:id", userInfo.getUserInfo);
    router.get("/checkout/:id", userInfo.getCheckoutInfo);
    router.put("/:id", userInfo.updateUserInfo);

    app.use('/api/info', router);
};
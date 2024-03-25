const userInfo = require("../controllers/user-info.controller");
const router = require("express").Router();

module.exports = app => {
    router.post("/", userInfo.createUserInfo);
    router.get("/:id", userInfo.getUserInfo);
    router.put("/:id", userInfo.updateUserInfo);

    app.use('/api/info', router);
};
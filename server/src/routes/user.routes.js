const controller = require("../controllers/user.controller");
const router = require("express").Router();

module.exports = app => {
    router.post("/", controller.create);
    app.use('/api/user', router);
};
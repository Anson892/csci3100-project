const users = require("../controllers/user.controller");
const router = require("express").Router();

module.exports = app => {
    router.post("/create", users.create);
    router.get("/", users.getAllUsers);
    router.get("/id/:id", users.findById);
    router.get("/username/:username", users.findByUsername);
    router.put("/update/:id", users.update);
    router.delete("/delete/:id", users.delete);
    router.delete("/delete", users.deleteAll);
    router.get("/info/")

    app.use('/api/users', router);
};
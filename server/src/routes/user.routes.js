const users = require("../controllers/user.controller");
const router = require("express").Router();

module.exports = app => {
    router.post("/create", users.createUser);
    router.get("/", users.getAllUsers);
    router.get("/id/:id", users.findById);
    router.get("/username/:username", users.findByUsername);
    router.put("/update/:id", users.update);
    router.delete("/:username", users.delete);
    router.delete("/", users.deleteAll);

    app.use('/api/users', router);
};
const Auth = require("../controllers/Auth.controller");
const router = require("express").Router();
const { verifyToken } = require('../middlewares/authJWT');

module.exports = app => {
    router.post('/login', Auth.login);
    router.post('/logout', verifyToken, Auth.logout);

    app.use('/api/auth', router);
};
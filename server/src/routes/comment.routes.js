const controller = require("../controllers/comment.controller");
const router = require('express').Router();

module.exports = app => {
    router.post('/add', controller.addcomment);

    router.post('/comment', controller.commentlist);
    router.get('/id/:pid', controller.status);

    app.use('/api/comment', router);
}
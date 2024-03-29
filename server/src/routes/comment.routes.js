const comment = require("../controllers/comment.controller");
const router = require('express').Router();

module.exports = app => {
    router.post('/add', comment.addcomment);

    router.post('/list', comment.commentlist);
    router.get('/id/:pid', comment.status);

    app.use('/api/comment', router);
}
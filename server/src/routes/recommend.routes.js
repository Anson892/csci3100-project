const recommend = require("../controllers/recommend.controller");
const router = require("express").Router();

module.exports = (app) => {
  router.get("/", recommend.getRecommend);
  router.get("/user/:userId", recommend.getUserRecommend);
  router.get("/product/:productId", recommend.relatedProduct);
  app.use("/api/recommend", router);
};

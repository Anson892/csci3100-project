const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.acquire
  },

  logging: (...msg) => console.log("[SQL LOG] " + msg)
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* tables */
// User
db.User = require("./user.model.js")(sequelize, Sequelize);
db.UserInfo= require("./user-info.model.js")(sequelize, Sequelize);
// Cart
db.Cart = require("./cart.model.js")(sequelize, Sequelize);
db.CartItem = require("./cart-item.model.js")(sequelize, Sequelize);
// Product
db.Product = require("./product.model.js")(sequelize, Sequelize);
db.ProductImage = require("./product-image.model.js")(sequelize, Sequelize);
// Comment
db.Comment = require("./comment.model.js")(sequelize, Sequelize);
// Order
db.Order = require("./order.model.js")(sequelize, Sequelize);
db.OrderItem = require("./order-item.model.js")(sequelize, Sequelize);

/* relationships */
db.User.link(db);
db.UserInfo.link(db);
db.Cart.link(db);
db.CartItem.link(db);
db.Product.link(db);
db.ProductImage.link(db);
db.Comment.link(db);
db.Order.link(db);
db.OrderItem.link(db);

module.exports = db;

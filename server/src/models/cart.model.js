module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define("cart", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  // foreign keys to
  // User: a cart belongs to a user
  // Product: a cart has multiple product items
  Cart.link = function (models) {
    Cart.belongsTo(models.User);
    Cart.belongsToMany(models.Product, { through: models.CartItem });
  };
  
  return Cart;
};

module.exports = (sequelize, Sequelize) => {
  const CartItem = sequelize.define("cart_item", {
    cartId: {
      type: Sequelize.INTEGER,
      references: {
        model: "carts",
        key: "id",
      },
    },
    productId: {
      type: Sequelize.INTEGER,
      references: {
        model: "products",
        key: "id",
      },
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });

  // foreign keys to
  // Cart: an cart item belongs to a cart
  // Product: an cart item is a product
  CartItem.link = function (models) {
    CartItem.belongsTo(models.Cart);
    CartItem.belongsTo(models.Product);
  }

  return CartItem;
};

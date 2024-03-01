module.exports = (sequelize, Sequelize) => {
  const OrderItem = sequelize.define("order-item", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: Sequelize.INTEGER,
      references: {
        model: "orders",
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
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });

  // foreign keys to
  // Order: an order item belongs to an order
  // Product: an order item is a product
  OrderItem.link = function (models) {
    OrderItem.belongsTo(models.Order);
    OrderItem.belongsTo(models.Product);
  };

  return OrderItem;
};

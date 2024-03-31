module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      }, 
      status: {
        type: Sequelize.ENUM("pending", "processing", "in delievery", "completed", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "pending"
      },
    });

    // foreign keys to
    // User: an order is made by a user 
    // UserInfo: an order is associated with a user info (shipping info)
    // Product: an order has many product items
    Order.link = function (models) {
      Order.belongsTo(models.User);
      Order.belongsTo(models.UserInfo);
      Order.belongsToMany(models.Product, { through: models.OrderItem });
    }
  
    return Order;
  };
  
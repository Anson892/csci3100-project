module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(200),
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    discount: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 1,
      validate: {
        max: 1
      }
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate:{
        min: 0
      }
    },
  });

  // foreign keys to
  // ProductImage: a product has multiple images
  // Comment: a product has multiple reviews
  Product.link = function (models) {
    Product.hasMany(models.ProductImage); // Product images
    Product.hasMany(models.Comment); // Product reviews
  };

  return Product;
};

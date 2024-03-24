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
      set(value) {
        if (value > 1)
          throw {
            error: {
              message: "discount percentage should smaller than or equal to 1!",
            },
          };
      },
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      set(value) {
        if (value < 0)
          throw { error: { message: "stock should not less than zero!" } };
      },
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

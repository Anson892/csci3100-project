module.exports = (sequelize, Sequelize) => {
  const ProductImage = sequelize.define("product_image", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    path: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  // foreign keys to
  // Product: a product image belongs to a product 
  ProductImage.link = function (models) {
    ProductImage.belongsTo(models.Product);
  };

  return ProductImage;
};

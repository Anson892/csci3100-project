module.exports = (sequelize, Sequelize) => {
  const ProductImage = sequelize.define("product_image", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    file_path: {
      type: Sequelize.STRING(200),
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

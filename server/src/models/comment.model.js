module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: Sequelize.ENUM("1", "2", "3", "4", "5"),
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING(1000),
    },
  });

  // foreign keys to
  // User: a comment is made by a user
  // Product: a comment is about a product
  Comment.link = function (models) {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Product);
  }

  return Comment;
};

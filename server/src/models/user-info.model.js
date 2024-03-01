module.exports = (sequelize, Sequelize) => {
  const UserInfo = sequelize.define("user_info", {
    id : {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    address: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    city: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    country: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    zipCode: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },
  });

  // foreign key to
  // User: an user info belongs to a user
  UserInfo.link = function (models) {
    UserInfo.belongsTo(models.User);
  };

  return UserInfo;
};
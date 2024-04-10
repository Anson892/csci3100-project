module.exports = (sequelize, Sequelize) => {
  const UserInfo = sequelize.define("user_info", {
    id : {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING(50),
      defaultValue: "",
    },
    lastName: {
      type: Sequelize.STRING(50),
      defaultValue: "",
    },
    address: {
      type: Sequelize.STRING(200),
      defaultValue: "",
    },
    zipCode: {
      type: Sequelize.STRING(10),
      defaultValue: "",
    },
    phoneNumber: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
  });

  // foreign key to
  // User: an user info belongs to a user
  UserInfo.link = function (models) {
    UserInfo.belongsTo(models.User);
  };

  return UserInfo;
};
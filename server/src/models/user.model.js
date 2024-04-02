const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      set(value){
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      }
    },
    userType: {
      type: Sequelize.ENUM("admin", "customer"),
      defaultValue: "customer"
    }
  }, {sequelize, paranoid: true});

  // foreign keys to
  // UserInfo: a user has one user info
  // Cart: a user has one cart
  // Order: a user can make multiple orders
  // Comment: a user can make multiple comments
  User.link = function (models) {
    User.hasOne(models.UserInfo);
    User.hasOne(models.Cart);
    User.hasMany(models.Order);
    User.hasMany(models.Comment);
  }

  return User;
};

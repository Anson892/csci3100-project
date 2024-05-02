const db = require("../models");
const User = db.User;
const UserInfo = db.UserInfo;
const Op = db.Sequelize.Op;
const controller = {};

/**
 * Create a new user info
 * API: POST http://localhost:8080/api/info/:id
 * Request: {firstName, lastName, address, phoneNumber}
 * Response: {message/error, data}
 */
controller.createUserInfo = async (req, res) => {
  const userInfo = {
    userId: req.params.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
  };

  try {
    // Check if user exists
    const user = await User.findByPk(userInfo.userId);
    if (user === null) {
      res.status(404).json({
        error: "Cannot find user with id=" + userInfo.userId,
      });
      return;
    }

    // Check if user info already exists
    const existingUserInfo = await UserInfo.findOne({
      where: { userId: userInfo.userId },
    });
    if (existingUserInfo !== null) {
      res.status(200).json({
        message: "User info already exists!",
      });
      return;
    }

    // Create user info
    const data = await UserInfo.create(userInfo);
    res.status(200).json({
      message: "User info created successfully!",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message || "Some error occurred while creating the user info.",
    });
  }
};

/**
 * Retrieve user info by user id
 * API: GET http://localhost:8080/api/info/:id
 * Request: {}
 * Response: {message/error, data}
 **/
controller.getUserInfo = async (req, res) => {
  const id = req.params.id;

  try {
    const userInfos = await UserInfo.findAll({
      where: { userId: id },
      include: [{ model: User, attribute: ["id", "username"] }],
    });

    if (userInfos === null) {
      res.status(404).json({
        error: "Cannot find user info with id=" + id,
      });
      return;
    }
    res.status(200).json({
      message: "User info found!",
      data: userInfos,
    });
  } catch (err) {
    res.status(500).json({
      error:
        err.message ||
        "Some error occurred while retrieving user info with id=" + id,
    });
  }
};

/**
 * Retrieve checkout info by user id
 * API: GET http://localhost:8080/api/info/checkout/:id
 * Request: {}
 * Response: {Receiver, Address}
 * */
controller.getCheckoutInfo = async (req, res) => {
  const id = req.params.id;
  try {
    const userInfo = await UserInfo.findOne({
      where: { userId: id },
      attributes: ["firstName", "lastName", "address"],
    });

    if (userInfo === null) {
      res.status(404).json({
        error: "Cannot find user info with id=" + id,
      });
      return;
    }

    const receiver = userInfo.firstName + " " + userInfo.lastName;
    const result = {
      Receiver: receiver,
      Address: userInfo.address,
    };
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error:
        err.message ||
        "Some error occurred while retrieving user info with id=" + id,
    });
  }
};

/**
 * Update user info by user id
 * API: PUT http://localhost:8080/api/info/:id
 * Request: {firstName, lastName, address, city, country, zipCode, phoneNumber}
 * Response: {message/error}
 */
controller.updateUserInfo = async (req, res) => {
  const id = req.params.id;
  const {
    InfoId,
    firstName,
    lastName,
    address,
    city,
    country,
    zipCode,
    phoneNumber,
  } = req.body;

  try {
    const success = await UserInfo.update(
      { firstName, lastName, address, city, country, zipCode, phoneNumber },
      { where: { userId: id } }
    );

    if (success) {
      res.status(200).json({
        message: "User info updated successfully.",
      });
    } else {
      res.status(404).json({
        error: "Cannot update user info with id=" + id,
      });
    }
  } catch (err) {
    res.status(500).json({
      error:
        err.message ||
        "Some error occurred while updating user info with id=" + id,
    });
  }
};

module.exports = controller;

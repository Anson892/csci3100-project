const db = require("../models");
const User = db.User;
const UserInfo = db.UserInfo;
const Op = db.Sequelize.Op;
const controller = {};

// create user info: POST /api/info
controller.createUserInfo = async (req, res) => {
  const userInfo = {
    userId: req.body.userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
  };

  // validate user exists
  User.findByPk(userInfo.userId)
    .then((data) => {
      if (data === null) {
        res.status(404).json({
          error: "Cannot find user with id=" + userInfo.userId,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error:
          err.message || "Some error occurred while retrieving user with id=" + userInfo.userId,
      });
    });

  // create user info
  UserInfo.create(userInfo)
    .then((data) => {
      res.status(200).json({
        message: "User info created successfully!",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message || "Some error occurred while creating the user info.",
      });
    });
}

// find user info by user id: GET /api/info/:id
controller.getUserInfo = async (req, res) => {
  const id = req.params.id;

  UserInfo.findByPk(id, { include: User })
    .then((data) => {
      if (data === null) {
        res.status(404).json({
          error: "Cannot find user info with id=" + id,
        });
      } else {
        res.status(200).json({
          message: "User info found!",
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error:
          err.message || "Some error occurred while retrieving user info with id=" + id,
      });
    });
}

// update user info: PUT /api/info/:id
controller.updateUserInfo = async (req, res) => {
  const id = req.params.id;

  UserInfo.update(req.body, {
    where: { id: id },
  })
    .then(async (num) => {
      if (num == 1) {
        // retrieve updated user info
        const updatedUserInfo = await UserInfo.findByPk(id, { include: User });

        res.status(200).json({
          message: "User info updated successfully.",
          data: updatedUserInfo,
          success: true,
        });
      } else {
        res.status(404).json({
          error: "Cannot update user info with id=" + id,
          success: false,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message || "Some error occurred while updating user info with id=" + id,
        success: false,
      });
    });
}

module.exports = controller;
const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const controller = {};

//admin add user
controller.createuser = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "username/password cannot be empty!",
    });
    return;
  }
  // Find existing username
  User.findOne({ where: { username: req.body.username } })
    .then((data) => {
      if (data == null) {
        // Create a User
        const user = {
          username: req.body.username,
          password: req.body.password,
          userType: req.body.userType ? req.body.userType : "customer",
        };
        // Save new User in the database
        User.create(user)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User.",
            });
          });
      } else {
        res.status(400).send({ message: "username already in use!" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while checking the existend of user.",
      });
    });
};

controller.getAllUsers = (req, res) => {
  User.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving the user",
      });
    });
};

controller.findById = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data === null) {
        res.status(404).json({
          message: "Cannot find user with id=" + id,
        });
      } else {
        res.json(data);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred retrieving user with id=" + id,
      });
    });
};

controller.findByUsername = (req, res) => {
  const username = req.params.username;

  User.findOne({ where: { username: username } })
    .then((data) => {
      if (data === null) {
        res.status(404).json({
          message: "Cannot find user with username=" + username,
        });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message ||
          "Some error occurred while retrieving user with usernam=" + username,
      });
    });
};

controller.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        // update successful
        res.json({
          message: "user was updated successfully.",
        });
      } else {
        // update not successful
        res.json({
          message: "cannot update user with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message ||
          "Some error occurred while updating user with id=" + id,
      });
    });
};

// delete user by username
controller.delete = (req, res) => {
  const username = req.params.username;

  // delete user
  User.destroy({ where: { username: username } })
    .then((num) => {
      if (num == 1) {
        // delete successful
        res.status(200).json({
          message: `user ${username} was deleted successfully.`,

        });
      } else {
        // delete not successful
        res.status(404).json({
          message: `Cannot delete user with username=${username}. Maybe user was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error:
          err.message ||
          "Some error occurred while deleting user with username=" + username,
      });
    });
};

// delete all users
controller.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((num) => {
      res.status(200).json({ message: `${num} users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};

module.exports = controller;

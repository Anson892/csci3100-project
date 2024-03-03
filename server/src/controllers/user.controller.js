const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const controller = {};

controller.create = (req, res) => {
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
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving the user",
      });
    });
};

controller.findById = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data === null) {
        res.status(404).send({
          message: "Cannot find user with id=" + id,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
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
        res.status(404).send({
          message: "Cannot find user with username=" + username,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
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
        res.send({
          message: "user was updated successfully.",
        });
      } else {
        // update not successful
        res.send({
          message: "cannot update user with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while updating user with id=" + id,
      });
    });
};

controller.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        // delete successful
        res.send({
          message: "user was deleted successfully.",
        });
      } else {
        // delete not successful
        res.send({
          message: "cannot delete user with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while deleting user with id=" + id,
      });
    });
};

controller.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((num) => {
      res.send({ message: `${num} users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};

module.exports = controller;

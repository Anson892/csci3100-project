const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const controller = {};

/**
 * Create a new user
 * API: POST http://localhost:8080/api/users/
 * Request: {username, password, userType}
 * Response: {id, username, userType, createdAt, updatedAt, message/error}
 */
controller.createUser = async (req, res) => {
  const { username, password, userType } = req.body;

  // Validate request
  if (!username || !password) {
    res.status(400).json({
      error: "username and password cannot be empty!",
    });
    return;
  }

  try {
    // Find existing username in the database
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      // if user exists
      res.status(400).json({ error: "username already in use!" });
      return;
    } else {
      // create a new user
      const newUser = {
        username: username,
        password: password,
        userType: userType ? userType : "customer",
      };

      await User.create(newUser);
      res.status(200).json({
        message: "User was created successfully!",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message || "Some error occurred while creating the User.",
    });
  }
};

/**
 * Retrieve all users from the database.
 * API: GET http://localhost:8080/api/users/
 * Request: {}
 * Response:[{id, username, userType, createdAt, updatedAt}]
 */
controller.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "userType", "createdAt", "updatedAt"],
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      error: err.message || "Some error occurred while retrieving users.",
    });
  }
};

/**
 * Retrieve a single user by id.
 * API: GET http://localhost:8080/api/users/id/:id
 * Request: {}
 * Response: {id, username, userType, createdAt, updatedAt, message/error}
 */
controller.findById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByPk({
      id: id,
      attributes: ["id", "username", "userType", "createdAt", "updatedAt"],
    });

    if (user === null) {
      res.status(404).json({
        message: "Cannot find user with id=" + id,
      });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      error:
        err.message ||
        "Some error occurred while retrieving user with id=" + id,
    });
  }
};

/**
 * Retrieve a single user by username.
 * API: GET http://localhost:8080/api/users/username/:username
 * Request: {}
 * Response: {id, username, userType, createdAt, updatedAt, message/error}
 */
controller.findByUsername = (req, res) => {
  const username = req.params.username;

  try {
    const user = User.findOne({
      where: { username: username },
      attributes: ["id", "username", "userType", "createdAt", "updatedAt"],
    });

    if (user === null) {
      res.status(404).json({
        message: "Cannot find user with username=" + username,
      });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      error:
        err.message ||
        "Some error occurred while retrieving user with username=" + username,
    });
  }
};

/**
 * Update a user by id.
 * API: PUT http://localhost:8080/api/users/update/:id
 * Request: {username, password, userType}
 * Response: {message}
 */
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

/**
 * Delete a user by username.
 * API: DELETE http://localhost:8080/api/users/:username
 * Request: {}
 * Response: {error/message}
 */
controller.delete = async (req, res) => {
  const username = req.params.username;

  try {
    // find user
    const user = await User.findOne({ where: { username: username } });

    const newUsername = "deleted user";
    user.username = newUsername;
    await user.save();
    console.log(user.username);

    await User.destroy({
      where: { username: newUsername },
    });

    res.status(200).json({ message: "User was deleted successfully!" });
  } catch (err) {
    res.status(500).json({
      error: err.message || "Some error occurred while deleting user.",
    });
  }
};

/**
 * Delete all users from the database.
 * API: DELETE http://localhost:8080/api/users/
 * Request: {}
 * Response: {message/error}
 */
controller.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((num) => {
      res
        .status(200)
        .json({ message: `${num} users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message || "Some error occurred while removing all users.",
      });
    });
};

module.exports = controller;

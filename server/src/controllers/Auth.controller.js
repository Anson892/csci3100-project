const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const controller = {};
const { generateToken } = require("../middlewares/authJWT");

/**
 * Handle login request
 * API: POST http://localhost:8080/api/auth/login
 * Request: { username, password }
 * Response: { id, username, userType, accesstoken }
 */
controller.login = async (req, res) => {
  const { username, password } = req.body;
  if (!password || !username) {
    res.status(400).send({ message: "Enter your email and password." });
    return;
  }
  await User.findOne({
    attributes: ["id", "username", "password", "userType"],
    where: {
      username: username,
    },
  })
    .then((data) => {
      if (data != null) {
        const user = {
          id: data.id,
          username: data.username,
          password: data.password,
          userType: data.userType,
        };
        const verifiedPassword = bcrypt.compareSync(password, user.password);
        if (!verifiedPassword) {
          res.status(401).send({ message: "Password invalid!" });
        } else {
          // generate access token with cart data?.
          const token = generateToken(user);
          res.status(200).send({
            id: user.id,
            username: user.username,
            userType: user.userType,
            accesstoken: token,
          });
        }
      } else {
        res.status(401).send({ message: "User not exist" });
      }
    })
    .catch((err) => res.status(500).send(err));
};

/**
 * Handle logout request
 * API: POST http://localhost:8080/api/auth/logout
 * Request: { accesstoken }
 */
controller.logout = async (req, res) => {
  console.log("turnback");
  try {
    const username = req.payload.id;

    const user = await User.findOne(username);

    if (!user) return res.status(400).send({ message: "User not exist" });

    res.status(200).send({
      user: {
        username: null,
        userType: null,
        accesstoken: null,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error." });
  }
};

/**
 * Handle register request
 * API: POST http://localhost:8080/api/auth/register
 * Request: { username, password, userType }
 * Response: { id, username, userType }
 */
controller.register = async (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "username/password cannot be empty!",
    });
    return;
  }
  // Find existing username
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
    });
    if (user) {
      res.status(400).send({ message: "username already in use!" });
      return;
    }
    // Create a User
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      userType: req.body.userType ? req.body.userType : "customer",
    };
    // Save new User in the database
    await User.create(newUser);
    res.status(200).send({
      id: newUser.id,
      username: newUser.username,
      userType: newUser.userType,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User.",
    });
  }
};

module.exports = controller;

const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const controller = {};
const { generateToken } = require('../middlewares/authJWT');


//login
controller.login = async (req, res) => {

    const { username, password } = req.body;
    if(!password || !username){
        res.status(400).send({message: "Enter your email and password."});
        return;
    }
    await User.findOne({
      attributes: ['username', 'password', 'userType'],
      where:{
            username: username
      }
    })
    .then( data => {
      if(data != null){
        const user = {
          username: data.username,
          password: data.password,
          userType: data.userType
        }
        console.log(user)
        const verifiedPassword = bcrypt.compareSync(password, user.password);
        if(!verifiedPassword){
          console.log("fail")
          res.status(401).send({message: 'Password invalid!'});
        }else{
          // generate access token with cart data?.
          console.log("token")
          const token = generateToken(user);
          res.status(200).send(
              {
                  username: user.username,
                  userType: user.userType,
                  accesstoken: token
              }
          );
        }
    }else{
        res.status(401).send({message: 'User not exist'});
    }
    })
    .catch(err => res.status(500).send(err));

};

//logout
controller.logout = async (req, res) => {
    console.log("turnback")
    try {
        const username = req.payload.id;

        const user = await User.findOne(username);
        
        if(!user) return res.status(400).send({message: "User not exist"});

        res.status(200).send({
            user:{
                username: null,
                userType: null,
                accesstoken: null
            }
        });


    } catch(err) {
        console.log(err);
        res.status(500).send({message: "Internal server error."});
    }
}

// Register
controller.register = (req, res) => {
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

module.exports = controller;
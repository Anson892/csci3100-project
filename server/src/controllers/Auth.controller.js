const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const controller = {};
const { generateToken } = require('../middlewares/authJWT');


//login
controller.login = async (req, res) => {

    const { username, password } = req.body;
    if(!password || !username){
        res.status(400).send({message: "Enter your email and password."});
        return;
    }
    await User.findAll({
        where:{
             username: username,
             password: password
            }
    })
    .then( data => {
        if(data.length == 1){
            const user = data[0];
            if(user.password != password){
                res.status(401).send({message: 'Password invalid!'});
            }else{
                // generate access token with cart data?.
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
    try {
        const username = req.payload.id;

        const user = await User.findByPk(username);
        
        if(!user) return res.status(400).send({message: "User not exist"});

        res.status(200).send({
            user:{
                username: null,
                userType: null,
                accesstoken: null
            },
            message: 'Logout successfully.'
        });


    } catch(err) {
        console.log(err);
        res.status(500).send({message: "Internal server error."});
    }
}

module.exports = controller;
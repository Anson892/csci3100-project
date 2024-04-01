const jwt = require('jsonwebtoken');
const UserSecretKey = process.env.User_SECRET_KEY || "USER";//
const AdminSecretKey = process.env.Admin_SECRET_KEY || "ADMIN";//

exports.generateToken = (user) => {
    if(user.userType=="customer"){
        return jwt.sign(
            {
                username: user.username,
                userType: user.userType
            },
            UserSecretKey,
            {expiresIn: "1d"}
        );
    }else{
        return jwt.sign(
            {
                username: user.username,
                userType: user.userType
            },
            AdminSecretKey,
            {expiresIn: "1d"}
        );
    }
    
}

// Verify token
exports.verifytoken = (req, res, next) => {
    const headersToken = req.headers.authorization;
    
    if(!headersToken) return res.status(401).send({message: "No access token sended."});

    const userType = headersToken.split(' ')[1];
    const token = headersToken.split(' ')[2];
    console.log(userType)
    if(userType=="customer"){
        jwt.verify(token, UserSecretKey, (err, payload) => {
        
            if(err) return res.status(403).send({message: "You are not authorized."});
    
            console.log(payload); 
    
            req.payload = payload;
            
            next();
    
        });
    }else if(userType=="admin"){
        jwt.verify(token, AdminSecretKey, (err, payload) => {
        
            if(err) return res.status(403).send({message: "You are not authorized."});
    
            console.log(payload); 
    
            req.payload = payload;
            
            next();
    
        });
    }else{
        return res.status(401).send({message: "Unauthorized"});
    }
    
}



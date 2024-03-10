const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyTokenController = async(req, res)=>{
    const {token} = req.query;

    if(!token){
        return res.status(400).json({success:false,msg: "Invalid Token"});
    }

    //DECODE TOKEN
    let decodedToken;
     try {
         decodedToken = jwt.verify(token, '!@#$%^&*');
      } catch(err) {
        return res.status(400).json({success:false,msg: "Invalid Token"});
      }

    ///CHECKING IF USER IS PRESENT OR NOT
    const oldUser = await User.findOne({email:decodedToken.email});
    if(!oldUser){
        return res.status(403).json({success:false,msg: "User does not exist"});
    }
    res.status(200).json({success:true,msg: "Token Verified"});
};

module.exports = verifyTokenController;
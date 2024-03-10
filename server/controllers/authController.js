const bcrypt = require('bcryptjs');
const tokenGenerator = require("../config/createToken")
const {sendVerificationEmail,sendForgotPasswordEmail} = require("../config/sendEmail");
const User = require('../models/User');

const registerController =  async (req, res) => {
    const{name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({success:false,msg: "Please enter all fields"});
    }

    if(!/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)){
        return res.status(400).json({success:false,msg: "Please enter valid email"});
    }

    if(password.length < 6){
        return res.status(400).json({success:false,msg: "Password must be at least 6 characters"});
    }

    const oldUser = await User.findOne({email});
    if(oldUser){
        return res.status(403).json({success:false,msg: "User already exists"});
    }

    //USE MODEL AND CREATE NEW USER
    bcrypt.genSalt(12, (err, salt) =>{
        bcrypt.hash(password, salt, async (err, hash)=> {
            const hashedPassword = hash;


            const newUser = new User({
                name,
                email,
                password: hashedPassword
            });

            await newUser.save();

            //GENERATE TOKEN
            
            const token = tokenGenerator({email:newUser.email});

            //SEND EMAIL
            const link ="http://" +req.hostname+":8000/api/email/verify?token="+token; //local host 3000 or 5173 whatever the front end is running on i am taking 5173
            //"http://" +req.hostname+":5173/api/email/verify?token="+token;
            //verifyEmail is of frontend
            const sendMail = await sendVerificationEmail(newUser.email, link);
            if(!sendMail){
                return res.status(201).json({success:true,msg: "Registered Successfully, Error sending email"});
            }else{
                return res.status(201).json({success:true,msg: "Registered Successfully, Email sent"});
            
            }
        });
    });
};
    
const loginController = async (req, res) => {
    const {email, password} = req.body;
    if( !email || !password){
        return res.status(400).json({success:false,msg: "Please enter all fields"});
    }

    //FINDING OLD USER
    const oldUser = await User.findOne({email});

    if(!oldUser){
        return res.status(403).json({success:false,msg: "User does not exist"});
    }

    //COMPARE PASSWORD
    const comparePassword = await bcrypt.compare(password, oldUser.password);

    if(!comparePassword){
        return res.status(403).json({success:false,msg: "Invalid Credentials"});
    }

    //GENERATE TOKEN
    const token = tokenGenerator({email:oldUser.email,name:oldUser.name,verified:oldUser.verified , _id:oldUser._id});
    res.status(200).json({success:true,token:token});

};

const forgotPasswordController = async(req, res) => {
    const {email} = req.body;
    if(!email){
        return res.status(400).json({success:false,msg: "Please enter email"});
    }
    //USER PRESENT OR NOT
    const oldUser = await User.findOne({email});
    if(!oldUser){
        return res.status(403).json({success:false,msg: "User does not exist"});
    }

    //SEND FORGOT PASSWORD EMAIL
    const token = tokenGenerator({email:oldUser.email});

    //SEND EMAIL
    const link = "http://" +req.hostname+":8000/api/auth/verifyToken?token="+token;
    const sendMail = await sendForgotPasswordEmail(oldUser.email, link);
    if(!sendMail){
        return res.status(201).json({success:true,msg: "Error sending email"});
    }
    else{
        return res.status(201).json({success:true,msg: "Email sent"});
    
    }
}

// RESET PASSWORD CONTROLLER

const resetPasswordController = async(req, res) => {
    const{email,newPassword,confirmNewPassword} = req.body;
    if(!/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)){
        return res.status(400).json({success:false,msg: "Please enter valid email"});
    }
    if(!email || !newPassword || !confirmNewPassword){
        return res.status(400).json({success:false,msg: "Please enter all fields"});
    }

    const oldUser = await User.findOne({email});

    if(!oldUser){
        return res.status(403).json({success:false,msg: "User does not exist"});
    }

    if(newPassword !== confirmNewPassword){
        return res.status(400).json({success:false,msg: "Passwords do not match"});
    }
    bcrypt.genSalt(12, (err, salt) =>{
        bcrypt.hash(newPassword, salt, async (err, hash)=> {
            const hashedPassword = hash;

            const updatedData  =await User.findOneAndUpdate({email},{
                $set:{
                password:hashedPassword
                },
            })
            if(updatedData){
                return res.status(201).json({success:true,msg: "Password Updated"});
            }else{
                return res.status(400).json({success:false,msg: "Error updating password"});
            }
            })
    });

}

module.exports = {registerController,loginController,forgotPasswordController,resetPasswordController};    
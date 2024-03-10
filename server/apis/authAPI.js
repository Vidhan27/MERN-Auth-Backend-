const express = require('express');
const { registerController, loginController, forgotPasswordController, resetPasswordController } = require('../controllers/authController');
const verifyTokenController = require('../controllers/verifyTokenController');
const router = express.Router();

//REGISTER API

router.post('/register', registerController);

//LOGIN API

router.post('/login', loginController);

//FORGOT PASSWORD API

router.post('/forgotpassword', forgotPasswordController);

//VERIFY TOKEN

router.get('/verifyToken', verifyTokenController)

//RESET PASSWORD

router.post('/resetpassword',resetPasswordController)


module.exports = router;
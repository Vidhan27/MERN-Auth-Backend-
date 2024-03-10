const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'casimir.zboncak@ethereal.email',
        pass: 'bamaCpPZTy9GERk8Dy'
    },
    tls: {
        rejectUnauthorized: false
    }
});
module.exports ={
 sendVerificationEmail: async(senderAddress,link)=>{

    let error = false;
    
    try {
        await transporter.sendMail({
            from: '"test account" <vidhanprajapati27@gmail.com>', // sender address
            to: senderAddress, // list of receivers
            subject: "Verify Email", // Subject line 
            html: `Please Verify your Email by Clicking  <a href=${link}>here</a> <br/>
            Link is valid for 7 days`, // html body
          });
    
        
    } catch (e) {

        error = true;
    }

    return error;
    


},
sendForgotPasswordEmail: async(senderAddress,link)=>{

    let error = false;
    
    try {
        await transporter.sendMail({
            from: '"BTS test account" <vidhanprajapati27@gmail.com>', // sender address
            to: senderAddress, // list of receivers
            subject: "Forgot Password", // Subject line 
            html: `Please Reset Your Password by Clicking  <a href=${link}>here</a> <br/>
            Link is valid for 7 days`, // html body
          });
    
        
    } catch (e) {

        error = true;
    }

    return error;

}
}

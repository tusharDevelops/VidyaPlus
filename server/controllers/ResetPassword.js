const User = require("../models/user");
const mailSender = require("../utilities/mailSender");
const bcrypt = require("bcrypt");


//forget password logic

exports.resetPasswordToken = async(req,res)=>{
    try {
        //fetch email from request
        const email = req.body.email;
        //email validation for user
        const user  = await User.findOne({email: email});
        if(!user){
        return res.json({success:false,
        message:'Your Email is not registered with us'});
        }

        //generate token
        const token  = crypto.randomUUID();
        //		const token = crypto.randomBytes(20).toString("hex");
        //update the user by adding token  and expiration time
        const updatedDetails = await User.findOneAndUpdate({email: email},{
            token: token,
            resetPasswordExpires: Date.now() + 5*60*1000,

        },
        {new: true}
        );

        

        //create url
        const url = `http://localhost:3000/update-password/${token}`;

        //send mail containing the url
        const mailResponse = await mailSender(email, "Password Reset Link",`Password Reset Link: ${url}`);

        //retrurn res
        return res.json({
            success:true,
            message:'Email sent successfully, please check email and change pwd',
        });


    } catch (error) {

        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset pwd mail'
        });
    }

};

//ye logic hai jab mail vali link me click krke pahuch jaoge

exports.resetPassword = async (req, res) => {
    try {
          //data fetch
        const {password, confirmPassword, token} = req.body;
        //validation
        if(password !== confirmPassword) {
            return res.json({
                success:false,
                message:'Password not matching',
            });
        }
        //get userdetails from db using token
        const userDetails = await User.findOne({token: token});
        //if no entry - invalid token
        if(!userDetails) {
            return res.json({
                success:false,
                message:'Token is invalid',
            });
        }
        //token time check 
        if( userDetails.resetPasswordExpires < Date.now()  ) {
                return res.json({
                    success:false,
                    message:'Token is expired, please regenerate your token',
                });
        }
        //hash pwd
        const hashedPassword = await bcrypt.hash(password, 10);

        //password update
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        );
        //return response
        return res.status(200).json({
            success:true,
            message:'Password reset successful',
        });
    }
    catch(error) {

        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset pwd mail'
        })
    }
};
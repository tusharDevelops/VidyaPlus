const User = require("../models/user");
const OTP = require("../models/OTP");
const Profile = require("../models/profile");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
require("dotenv").config();
const mailSender = require("../utilities/mailSender");
const {passwordUpdated} = require("../mail/templates/passwordUpdate");

//sign up contoller

exports.signUp = async(req,res)=>{
    try {
        //data fetch karo from request ki body
        const{firstName, lastName, email, password, confirmPassword,accountType,otp,contactNumber} = req.body;
        //validate krlo
        if(!firstName || !lastName || !email || !password || !confirmPassword
            || !otp) {
                return res.status(403).json({
                    success:false,
                    message:"All fields are required",
                })
        }


        //2 password match krlo
        if(password !== confirmPassword) {
            return res.status(400).json({
                success:false,
                message:'Password and ConfirmPassword Value does not match, please try again',
            });
        }

         //check user already exist or not
         const existingUser = await User.findOne({email});
         if(existingUser) {
             return res.status(400).json({
                 success:false,
                 message:'User is already registered',
             });
         }


         //find the recent otp in db and match with the otp sent by client
         const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);
         console.log("recent most otp", recentOtp[0]);

         //validate krlo
         if(recentOtp.length == 0) {
            //OTP not found
            return res.status(400).json({
                success:false,
                message:'OTP NOT Found',
            })

            //check here if this is array or something
        } else if(otp !== recentOtp[0].otp) {
            //Invalid OTP
            return res.status(400).json({
                success:false,
                message:"Invalid OTP",
            });
        }


        //agar otp match ho gya to age badho

        //password hash krlo
        const hashedPassword = await bcrypt.hash(password,10);

        let approved = (accountType === "Instructor") ? false : true;

        //entry create kro db me
        //phle profile wala model ka document banao kyunki user model ko iski id chaiye

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth: null,
            about:null,
            contactNumber:contactNumber,
        });

        //user crete krdo db me
        const userDetails = await User.create(
            {
                firstName,
                lastName,
                email,
                contactNumber,
                password:hashedPassword,
                accountType,
                approved:approved,
                additionalDetails:profileDetails._id,
                image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            }
        );

        //return the succes response
        return res.status(200).json({
            success:true,
            message:'User is registered Successfully',
            userDetails,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registrered. Please try again",
        });
    }

};



//login contoller
exports.login = async(req,res)=>{
    try {
      //get data from request body
      const {email,password} = req.body;
  
      //data validation krlo
      if(!email || !password) {
          return res.status(403). json({
              success:false,
              message:'All fields are required, please try again',
          });
      }
  
      //dekho ki user exist krta bhi hai ya nii
      const user = await User.findOne({email}).populate("additionalDetails");
          if(!user) {
              return res.status(401).json({
                  success:false,
                  message:"User is not registrered, please signup first",
              });
          }
  
      //agr exist krta hai to ab password match krlo or jwt generate kro further authorization ke liye
      if(await bcrypt.compare(password, user.password)){
  
          //jwt ka payload generate krlo
          const payload = {
          email: user.email,
          id: user._id,
          accountType: user.accountType
          } 
          //ab tokrn banalo 
          const token = jwt.sign(payload, process.env.JWT_SECRET_KEY,{
              expiresIn: "2h"
          });
  
          user.token = token;
          user.password = undefined;
          //create cookie and send response
          const options = {
              expires: new Date(Date.now() + 3*24*60*60*1000),
              httpOnly:true,
          }
  
          res.cookie("token", token, options).status(200).json({
              success:true,
              token,
              user,
              message:'Logged in successfully',
          });
          //ab login krne ke bad client koi bhi request bhjega to phle token match krenge using middlewares for authorization
      }
      else{
          return res.status(401).json({
              success:false,
              message:'Password is incorrect',
          });
      }
  
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({
          success:false,
          message:'Login Failure, please try again',
      });
    }  
  };

//send otp controller

exports.sendOTP = async(req,res)=>{
    try {
        // fetch the email from request body
        const {email} = req.body;

        //check kro user already exist to ni krta
        const checkUserPresent = await User.findOne({email});

        //agr exist krta hai to response bhjo
        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message: "User Already Exist"
            });
        }

        //generate otp
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        console.log("GENERATED OTP: ",otp);

        //HARD SCOPE OF UPGRADATION (very bruteforce method)

        // check karo otp generated unique hai ki nii
        //hoskta hai at a time bhut sare otp db me save ho usi me se koi otp fir se generate ho gya ho
        let result = await OTP.findOne({otp:otp});
        //if yes
        while(result){
             otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });

            result = await OTP.findOne({otp:otp});
    
        }

        //create an entry for this unique otp in db
        const otpPayload = {email,otp};
        //db me entry crete hone se phle user ko mail jayega
        const otpBody = await OTP.create(otpPayload);
        console.log("otpBody: ", otpBody);
       

        // return the success response to client
        res.status(200).json({
            success: true,
            message: "OTP SENT TO THIS EMAIL SUCCESFULLY",
            otp,    
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};






//change password  controller functionality


exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
                "PASSWORD UPDATION",
				passwordUpdated(
					updatedUserDetails.email,
					`${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};
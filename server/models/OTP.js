const mongoose = require("mongoose");
const mailSender = require("../utilities/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = new mongoose.Schema(
    {
        email: {
            type: String, 
            required: true
        },

        otp:{
            type:String,
            required: true
        },
        createdAt:{
            type: Date,
            default: Date.now(),
            expires: 10,
        }
    }
);

// function to send mail
async function sendVerificationEmail(email,otp){
    try {
        const mailResponse = await mailSender(email, "verfication email from studynotion", emailTemplate(otp));

    } catch (error) {


    }
}

//middlewares exection send otp to user before saving otp in db

OTPSchema.pre("save", async function(next){
if(this.isNew)await sendVerificationEmail(this.email, this.otp);
next();
});

module.exports = mongoose.model("OTP", OTPSchema);
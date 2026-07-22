const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async(email,title,body)=>{
    try {
        let transporter = nodemailer.createTransport(
            {
                service: "gmail",
                host: process.env.MAIL_HOST || "smtp.gmail.com",
                port: process.env.MAIL_PORT || 587,
                secure: false,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
                }
            }
        );

        let info = await transporter.sendMail({
            from: `"Vidya+ || Online Learning Platform" <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        });

        console.log("Email sent successfully:", info.response);
        return info;
    } catch (error) {
        console.log("ISSUE IN MAILSENDER: ", error);
        throw error;
    }
}

module.exports = mailSender;
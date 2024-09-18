const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = ()=>{
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET
        });
        console.log("CLOUDINARY DB CONNECTED");
    } catch (error) {
        console.log("ERROR ON CONNECTING WITH CLOUD MEDIA DATABASE", error);
    }

};
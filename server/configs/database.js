const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = ()=>{
    mongoose.connect(process.env.MONGO_DB_URL)
    .then(()=>console.log("DB CONNECTION DONE"))
    .catch((error)=>{
        console.log("DB CONNECTION FAILS");
        console.log(error);
        process.exit(1);
    });
}
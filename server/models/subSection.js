const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
    
    title:{
        type:String,
    },
    timeDuration: {
        type: String,
    },
    description: {
        type:String,
    },
    videoUrl:{
        type:String,
    },
    videoPublicId: {
        type: String,
    },

    notes: [
        {
            title: { type: String, required: true },
            url: { type: String, required: true },
            publicId: { type: String },
            createdAt: { type: Date, default: Date.now },
        },
    ],


});

module.exports = mongoose.model("SubSection", subSectionSchema);
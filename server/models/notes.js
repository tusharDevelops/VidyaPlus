const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema(
    {
  name: { type: String, required: true },
    subjects: [{
        name: { type: String, required: true },
        chapters: [{ title: { type: String, required: true }, notes: String }]
    }]
    
    }
);

// Model
const ClassModel = mongoose.model('Notes', ClassSchema);

module.exports = { ClassModel };

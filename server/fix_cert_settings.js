require("dotenv").config();
const { dbConnect } = require("./configs/database");
const Course = require("./models/course");

async function run() {
  await dbConnect();
  // Enable certificates for all existing courses that have it set to disabled or unset
  const result = await Course.updateMany(
    { $or: [
      { "certificateSettings.enabled": false },
      { "certificateSettings.enabled": { $exists: false } },
      { "certificateSettings": { $exists: false } }
    ]},
    { $set: { "certificateSettings.enabled": true } }
  );
  console.log("Updated courses:", result.modifiedCount);
  
  // Show current state
  const courses = await Course.find().select("courseName certificateSettings");
  console.log(JSON.stringify(courses.map(c => ({ name: c.courseName, settings: c.certificateSettings })), null, 2));
  process.exit(0);
}
run();

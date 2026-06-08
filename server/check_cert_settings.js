require("dotenv").config();
const { dbConnect } = require("./configs/database");
const Course = require("./models/course");

async function run() {
  await dbConnect();
  const courses = await Course.find().select("courseName certificateSettings");
  console.log(JSON.stringify(courses.map(c => ({ name: c.courseName, settings: c.certificateSettings })), null, 2));
  process.exit(0);
}
run();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { dbConnect } = require("./configs/database");
const User = require("./models/user");
const Course = require("./models/course");
const Certificate = require("./models/certificate");

async function check() {
  await dbConnect();

  const allCerts = await Certificate.find().lean();
  console.log("Certs:", JSON.stringify(allCerts, null, 2));

  const allCourses = await Course.find().populate("instructor", "email").lean();
  console.log("Courses:", JSON.stringify(allCourses.map(c => ({ _id: c._id, courseName: c.courseName, instructor: c.instructor?.email })), null, 2));

  process.exit(0);
}
check();

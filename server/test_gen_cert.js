const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { dbConnect } = require("./configs/database");
const Certificate = require("./models/certificate");
const Course = require("./models/course");
const User = require("./models/user");
require("./models/courseProgress");
require("./models/section");

async function check() {
  await dbConnect();
  
  // Find a student who is enrolled in a course with progress
  const Progress = mongoose.model("CourseProgress");
  const progress = await Progress.findOne();
  if (!progress) {
      console.log("No course progress found");
      process.exit();
  }

  const userId = progress.userId;
  const courseId = progress.courseID;
  
  console.log("Found progress for user", userId, "course", courseId);
  console.log("Completed videos:", progress.completedVideos.length);

  const course = await Course.findById(courseId).select("courseContent certificateSettings courseName");
  if (!course) {
      console.log("Course not found");
      process.exit();
  }
  
  const Section = mongoose.model("Section");
  const sections = await Section.find({ _id: { $in: course.courseContent } }).select("subSection");
  
  const totalLectures = sections.reduce(
    (acc, s) => acc + (Array.isArray(s.subSection) ? s.subSection.length : 0),
    0
  );
  console.log("Total lectures:", totalLectures);
  
  const completed = progress.completedVideos.length;
  if (totalLectures === 0 || completed < totalLectures) {
     console.log("Error: Course not fully completed yet", completed, "/", totalLectures);
  } else {
     console.log("Course IS fully completed!");
  }

  // simulate issueCertificateIfEligible
  const user = await User.findById(userId).select("firstName lastName");
  if (!user || !course) {
      console.log("User or course missing");
      process.exit();
  }
  
  console.log("Certificate settings enabled:", course.certificateSettings?.enabled);
  if (course.certificateSettings && course.certificateSettings.enabled === false) {
    console.log("Error: Certificates are disabled for this course");
  } else {
    console.log("Certificates are enabled. Would issue certificate now.");
  }
  
  process.exit(0);
}
check();

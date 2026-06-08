const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { dbConnect } = require("./configs/database");
const Course = require("./models/course");
require("./models/user");
require("./models/category");
require("./models/ratingAndReview");
require("./models/section");
require("./models/subSection");
require("./models/profile"); // Add this

async function check() {
  await dbConnect();

  const courseId = "69c295f3406f9ce98a4a32f6";
  const userId = "69be8738ed6b0f54b5655882"; 

  try {
    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      console.log("Course not found in DB! Check if the ID is correct in your DB");
      process.exit(0);
    }

    console.log("Course found:", courseDetails.courseName);
    console.log("Instructor ID logic:", courseDetails.instructor?._id?.toString(), "vs", userId);

    const isEnrolled = courseDetails.studentsEnrolled?.some(
      (id) => id.toString() === userId.toString()
    )
    const isInstructor = courseDetails.instructor?._id?.toString() === userId.toString()

    console.log("isEnrolled:", isEnrolled);
    console.log("isInstructor:", isInstructor);

    if (!isEnrolled && !isInstructor) {
      console.log("REJECTED: NOT ENROLLED AND NOT INSTRUCTOR");
    } else {
      console.log("ACCEPTED!");
    }
  } catch(e) {
    console.error("ERROR:", e);
  }
  process.exit(0);
}
check();

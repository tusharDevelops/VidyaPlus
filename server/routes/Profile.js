const express = require("express")
const router = express.Router()
const { authZ, isInstructor } = require("../middlewares/Authorization")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile",authZ, deleteAccount)
router.put("/updateProfile", authZ, updateProfile)
router.get("/getUserDetails", authZ, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", authZ, getEnrolledCourses)
router.put("/updateDisplayPicture", authZ, updateDisplayPicture)
router.get("/instructorDashboard", authZ, isInstructor, instructorDashboard)

module.exports = router
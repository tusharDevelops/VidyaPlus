// Import the required modules
const express = require("express")
const router = express.Router()

// &Import the Controllers

//& Course Controllers Import
const {createCourse,getAllCourses,getCourseDetails, editCourse, getInstructorCourses, deleteCourse,getFullCourseDetails, removeStudentFromCourse} = require("../controllers/Course");
  
const {
    updateCourseProgress,
    
  } = require("../controllers/CourseProgress")

// Course Notes Controllers
const {
  addExamNote,
  deleteExamNote,
  addSubSectionNote,
  deleteSubSectionNote,
  getExamNotes,
  getSubSectionNotes,
} = require("../controllers/CourseNotes")

//& Categories Controllers Import
const {showAllCategories,createCategory,categoryPageDetails, deleteCategory} = require("../controllers/Category");

//& Sections Controllers Import
const {createSection,updateSection,deleteSection,} = require("../controllers/Section");

//& Sub-Sections Controllers Import
const {createSubSection,updateSubSection, deleteSubSection,} = require("../controllers/SubSection");
  
//& Rating Controllers Import
 const {createRating,getAverageRating,getAllRating,} = require("../controllers/RatingAndReview");
  
//& Importing Middlewares
const { authZ, isInstructor, isStudent, hasPermission } = require("../middlewares/Authorization");


// ********************************************************************************************************
//?                                      Course routes
// ********************************************************************************************************

//! Courses can Only be Created by Instructors

router.post("/createCourse", authZ, isInstructor, createCourse)
router.post("/editCourse", authZ, isInstructor, editCourse)
router.get("/getInstructorCourses", authZ, isInstructor, getInstructorCourses)
//Add a Section to a Course
router.post("/addSection", authZ, isInstructor, createSection)
// Update a Section
router.post("/updateSection", authZ, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", authZ, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", authZ, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", authZ, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", authZ, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
// Delete a Course
router.delete("/deleteCourse", deleteCourse)
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", authZ, getFullCourseDetails)

// To Update Course Progress
router.post("/updateCourseProgress", authZ, isStudent, updateCourseProgress)

// Remove Student from Course
router.delete("/removeStudent", authZ, isInstructor, removeStudentFromCourse)

// ********************************************************************************************************
//                                      In-course Notes (Enrolled-only access)
// ********************************************************************************************************
router.post("/addExamNote", authZ, isInstructor, addExamNote)
router.post("/deleteExamNote", authZ, isInstructor, deleteExamNote)
router.post("/addSubSectionNote", authZ, isInstructor, addSubSectionNote)
router.post("/deleteSubSectionNote", authZ, isInstructor, deleteSubSectionNote)
router.post("/getExamNotes", authZ, isStudent, getExamNotes)
router.post("/getSubSectionNotes", authZ, isStudent, getSubSectionNotes)

// ********************************************************************************************************
//                                      Category routes (Elevated Instructor)
// ********************************************************************************************************
// Category can only be created by an Instructor with permissions
router.post("/createCategory", authZ, isInstructor, createCategory)
router.delete("/deleteCategory", authZ, isInstructor, deleteCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)


// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", authZ, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router;
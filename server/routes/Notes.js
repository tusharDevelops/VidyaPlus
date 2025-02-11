const express = require('express');
const router = express.Router();

// Importing controller methods
const { 
  createClass, 
  addSubject, 
  addChapter, 
  updateClassName,
  updateSubjectName,
  updateChapter,
  deleteClass,
  deleteSubject,
  deleteChapter,
  getClassData ,
  getAllData
} = require('../controllers/Notes');

// Importing Middlewares
const { authZ, isInstructor } = require("../middlewares/Authorization");

// Routes for creating resources
router.post("/classes", authZ, isInstructor, createClass);
router.post("/classes/:classId/subjects", authZ, isInstructor, addSubject);
router.post("/classes/:classId/subjects/:subjectId/chapters", authZ, isInstructor, addChapter);

// Routes for updating resources
router.put("/classes/:classId", authZ, isInstructor, updateClassName);
router.put("/classes/:classId/subjects/:subjectId", authZ, isInstructor, updateSubjectName);
router.put("/classes/:classId/subjects/:subjectId/chapters/:chapterId/content", authZ, isInstructor, updateChapter);

// Routes for deleting resources
router.delete("/classes/:classId", authZ, isInstructor, deleteClass);
router.delete("/classes/:classId/subjects/:subjectId", authZ, isInstructor, deleteSubject);
router.delete("/classes/:classId/subjects/:subjectId/chapters/:chapterId",authZ, isInstructor, deleteChapter);

// Route for retrieving class data
router.get("/classes/:classId", getClassData);
router.get("/getAllData", getAllData);

module.exports = router;

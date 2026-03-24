const express = require("express");
const router = express.Router();
const { getMyStudents, logStudentCashPayment } = require("../controllers/InstructorCRM");
const { authZ, isInstructor } = require("../middlewares/Authorization");

router.get("/my-students", authZ, isInstructor, getMyStudents);
router.post("/log-cash", authZ, isInstructor, logStudentCashPayment);

module.exports = router;

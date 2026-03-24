const Course = require("../models/course");
const User = require("../models/user");

exports.getMyStudents = async (req, res) => {
    try {
        const instructorId = req.user.id;
        
        // Find all courses by this instructor
        const instructorCourses = await Course.find({ instructor: instructorId });
        
        // Extract all student IDs from those courses
        const studentIds = [...new Set(instructorCourses.flatMap(course => course.studentsEnrolled))];
        
        // Fetch student details
        const students = await User.find({ _id: { $in: studentIds } })
            .select("firstName lastName email image")
            .exec();

        return res.status(200).json({
            success: true,
            data: students,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch students",
            error: error.message,
        });
    }
};

exports.logStudentCashPayment = async (req, res) => {
    // Simplified: Just for logging purposes or manual enrollment
    return res.status(200).json({
        success: true,
        message: "Feature simplified for Solo Instructor. Use manual enrollment tools instead.",
    });
};

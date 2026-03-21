const mongoose = require('mongoose');
require('dotenv').config({ path: 'server/.env' });
const Course = require('./server/models/course');
const User = require('./server/models/user');
const { deleteCourseRecord } = require('./server/utilities/courseDeletion');

mongoose.connect(process.env.MONGO_DB_URL).then(async () => {
    console.log("Connected to MongoDB. Scanning for orphaned courses...");
    
    const courses = await Course.find({});
    let orphanedCount = 0;
    
    for (const course of courses) {
        const instructorExists = await User.exists({ _id: course.instructor });
        if (!instructorExists) {
            console.log(`ORPHANED COURSE FOUND: "${course.courseName}" (ID: ${course._id}) - Instructor: ${course.instructor}`);
            await deleteCourseRecord(course._id);
            orphanedCount++;
        }
    }
    
    console.log(`\nScan complete. Purged ${orphanedCount} orphaned courses.`);
    process.exit(0);
}).catch(err => {
    console.error("Database connection error:", err);
    process.exit(1);
});

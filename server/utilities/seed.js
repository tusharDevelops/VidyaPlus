const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/user");
const Profile = require("../models/profile");
const Category = require("../models/category");
const Course = require("../models/course");
const Section = require("../models/section");
const Subsection = require("../models/subSection");
const RatingAndReview = require("../models/ratingAndReview");
const CourseProgress = require("../models/courseProgress");
const Certificate = require("../models/certificate");
const bcrypt = require("bcryptjs");

dotenv.config({ path: "./server/.env" });

const categories = [
    { name: "Class 1", description: "Foundational courses for Class 1 students." },
    { name: "Class 2", description: "Foundational courses for Class 2 students." },
    { name: "Class 3", description: "Foundational courses for Class 3 students." },
    { name: "Class 4", description: "Foundational courses for Class 4 students." },
    { name: "Class 5", description: "Core courses for Class 5 students." },
    { name: "Class 6", description: "Middle school courses for Class 6 students." },
    { name: "Class 7", description: "Middle school courses for Class 7 students." },
    { name: "Class 8", description: "Middle school courses for Class 8 students." },
    { name: "Class 9", description: "Secondary school courses for Class 9 students." },
    { name: "Class 10", description: "Secondary school courses for Class 10 students." },
    { name: "Class 11", description: "Higher secondary courses for Class 11 students." },
    { name: "Class 12", description: "Higher secondary courses for Class 12 students." },
];

async function seedDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to MongoDB");

        // Clear existing data
        console.log("Clearing existing data...");
        await User.deleteMany({});
        await Profile.deleteMany({});
        await Category.deleteMany({});
        await Course.deleteMany({});
        await Section.deleteMany({});
        await Subsection.deleteMany({});
        await RatingAndReview.deleteMany({});
        await CourseProgress.deleteMany({});
        await Certificate.deleteMany({});
        console.log("Data cleared successfully.");

        // Create Categories
        console.log("Seeding categories...");
        const seededCategories = await Category.insertMany(categories);
        console.log(`${seededCategories.length} categories seeded.`);

        // ─── Instructor ──────────────────────────────────────────────────
        const instructorProfile = await Profile.create({
            gender: "Male",
            dateOfBirth: "1990-01-01",
            about: "Passionate instructor with years of EdTech experience.",
            contactNumber: 1234567890,
        });

        const instructorPwd = await bcrypt.hash("Instructor@123", 10);
        const instructor = await User.create({
            firstName: "Vidya",
            lastName: "Instructor",
            email: "instructor@vidyaplus.com",
            password: instructorPwd,
            accountType: "Instructor",
            additionalDetails: instructorProfile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=Vidya+Instructor`,
            approved: true,
            active: true,
        });
        console.log(`Instructor seeded → email: instructor@vidyaplus.com | password: Instructor@123`);

        // ─── Student ──────────────────────────────────────────────────────
        const studentProfile = await Profile.create({
            gender: "Female",
            dateOfBirth: "2010-05-15",
            about: "Class 10 student preparing for board exams.",
            contactNumber: 9876543210,
        });

        const studentPwd = await bcrypt.hash("Student@123", 10);
        const student = await User.create({
            firstName: "Priya",
            lastName: "Student",
            email: "student@vidyaplus.com",
            password: studentPwd,
            accountType: "Student",
            additionalDetails: studentProfile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=Priya+Student`,
            approved: true,
            active: true,
        });
        console.log(`Student seeded    → email: student@vidyaplus.com | password: Student@123`);

        console.log("\n========================================");
        console.log("  Database seeding completed!");
        console.log("  Instructor: instructor@vidyaplus.com / Instructor@123");
        console.log("  Student:    student@vidyaplus.com    / Student@123");
        console.log("========================================\n");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

seedDB();

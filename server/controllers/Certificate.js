const crypto = require("crypto")
const Certificate = require("../models/certificate")
const Course = require("../models/course")
const User = require("../models/user")

function generateCertificateNumber() {
  const year = new Date().getFullYear()
  // Generate 5 random bytes (10 hex characters) for the unique alphanumeric-like identifier
  const rand = crypto.randomBytes(5).toString("hex").toUpperCase()
  return `VP-${year}-${rand}`
}

exports.issueCertificateIfEligible = async ({ userId, courseId }) => {
  // idempotent: unique index (userId, courseId) prevents duplicates
  const existing = await Certificate.findOne({ userId, courseId })
  if (existing) return { issued: true, certificate: existing }

  const [user, course] = await Promise.all([
    User.findById(userId).select("firstName lastName"),
    Course.findById(courseId).select("courseName"),
  ])

  if (!user || !course) return { issued: false }

  // ensure unique certificateNumber (rare collision, but loop safely)
  for (let i = 0; i < 5; i++) {
    const certificateNumber = generateCertificateNumber()
    try {
      const doc = await Certificate.create({
        certificateNumber,
        userId,
        courseId,
        completionSnapshot: {
          userName: `${user.firstName} ${user.lastName}`,
          courseName: course.courseName,
        },
      })
      return { issued: true, certificate: doc }
    } catch (e) {
      // retry on duplicate certificateNumber
      if (e?.code === 11000) continue
      throw e
    }
  }

  throw new Error("Could not generate unique certificate number")
}

exports.generateCertificate = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id

    if (!courseId) {
       return res.status(400).json({ success: false, message: "courseId is required" })
    }

    const { CourseProgress } = require("../models/courseProgress")
    // Wait, CourseProgress is imported below. I'll just use mongoose.model
    const mongoose = require("mongoose")
    const Progress = mongoose.model("CourseProgress")
    const courseProgress = await Progress.findOne({ courseID: courseId, userId })
    
    if (!courseProgress) {
       return res.status(403).json({ success: false, message: "Course progress not found" })
    }

    const course = await Course.findById(courseId).select("courseContent")
    const Section = mongoose.model("Section")
    const sections = await Section.find({ _id: { $in: course.courseContent } }).select("subSection")
    
    const totalLectures = sections.reduce(
      (acc, s) => acc + (Array.isArray(s.subSection) ? s.subSection.length : 0),
      0
    )
    
    const completed = courseProgress.completedVideos.length
    if (totalLectures === 0 || completed < totalLectures) {
       return res.status(403).json({ success: false, message: "Course not fully completed yet" })
    }

    const result = await exports.issueCertificateIfEligible({ userId, courseId })
    if (result.issued) {
        return res.status(200).json({ success: true, data: result.certificate })
    }

    return res.status(500).json({ success: false, message: "Failed to issue certificate" })

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

exports.getMyCertificates = async (req, res) => {
  try {
    const userId = req.user.id
    const certs = await Certificate.find({ userId })
      .sort({ issuedAt: -1 })
      .select("certificateNumber courseId issuedAt completionSnapshot")
      .populate({ path: "courseId", select: "courseName thumbnail" })

    return res.status(200).json({ success: true, data: certs })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

exports.verifyCertificate = async (req, res) => {
  try {
    const { certificateNumber } = req.body
    if (!certificateNumber) {
      return res.status(400).json({ success: false, message: "certificateNumber is required" })
    }

    const cert = await Certificate.findOne({ certificateNumber }).select(
      "certificateNumber issuedAt completionSnapshot courseId userId"
    )

    if (!cert) {
      return res.status(404).json({ success: false, message: "Certificate not found" })
    }

    // minimal public fields
    return res.status(200).json({
      success: true,
      data: {
        certificateNumber: cert.certificateNumber,
        issuedAt: cert.issuedAt,
        courseName: cert.completionSnapshot.courseName,
        userName: cert.completionSnapshot.userName,
      },
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}


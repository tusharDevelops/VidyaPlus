const Course = require("../models/course")
const Section = require("../models/section")
const SubSection = require("../models/subSection")
const User = require("../models/user")
const cloudinary = require("cloudinary").v2

async function requireEnrolledStudent({ courseId, userId }) {
  const course = await Course.findById(courseId).select("studentsEnrolled")
  if (!course) return { ok: false, status: 404, message: "Course not found" }

  const isEnrolled = course.studentsEnrolled?.some(
    (id) => id.toString() === userId.toString()
  )
  if (!isEnrolled)
    return { ok: false, status: 403, message: "You are not enrolled in this course" }

  return { ok: true, course }
}

async function requireCourseInstructorOrModerator({ courseId, instructorId, permissions }) {
  const course = await Course.findById(courseId).select("instructor")
  if (!course) return { ok: false, status: 404, message: "Course not found" }

  const isOwner = course.instructor.toString() === instructorId.toString()
  const canModerate = Array.isArray(permissions) && permissions.includes("MODERATE_CONTENT")
  if (!isOwner && !canModerate) {
    return { ok: false, status: 403, message: "Not allowed" }
  }
  return { ok: true, course }
}

exports.addExamNote = async (req, res) => {
  try {
    const { courseId, title } = req.body
    const instructorId = req.user.id
    const permissions = req.user.permissions || []

    if (!courseId || !title) {
      return res.status(400).json({ success: false, message: "courseId and title are required" })
    }
    if (!req.files || !req.files.pdf) {
      return res.status(400).json({ success: false, message: "pdf file is required" })
    }

    const access = await requireCourseInstructorOrModerator({
      courseId,
      instructorId,
      permissions,
    })
    if (!access.ok) {
      return res.status(access.status).json({ success: false, message: access.message })
    }

    const upload = await cloudinary.uploader.upload(req.files.pdf.tempFilePath, {
      folder: process.env.FOLDER_NAME,
      resource_type: "raw",
      format: "pdf",
    })

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          examNotes: {
            title,
            url: upload.secure_url,
            publicId: upload.public_id,
          },
        },
      },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: { path: "subSection" },
    }).exec()

    return res.status(200).json({ success: true, message: "Exam note added", data: updatedCourse })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

exports.deleteExamNote = async (req, res) => {
  try {
    const { courseId, noteId } = req.body
    const instructorId = req.user.id
    const permissions = req.user.permissions || []

    if (!courseId || !noteId) {
      return res.status(400).json({ success: false, message: "courseId and noteId are required" })
    }

    const access = await requireCourseInstructorOrModerator({
      courseId,
      instructorId,
      permissions,
    })
    if (!access.ok) {
      return res.status(access.status).json({ success: false, message: access.message })
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: { examNotes: { _id: noteId } },
      },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: { path: "subSection" },
    }).exec()

    return res.status(200).json({ success: true, message: "Exam note removed", data: updatedCourse })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

exports.addSubSectionNote = async (req, res) => {
  try {
    const { courseId, subSectionId, title } = req.body
    const instructorId = req.user.id
    const permissions = req.user.permissions || []

    if (!courseId || !subSectionId || !title) {
      return res
        .status(400)
        .json({ success: false, message: "courseId, subSectionId, and title are required" })
    }
    if (!req.files || !req.files.pdf) {
      return res.status(400).json({ success: false, message: "pdf file is required" })
    }

    const access = await requireCourseInstructorOrModerator({
      courseId,
      instructorId,
      permissions,
    })
    if (!access.ok) {
      return res.status(access.status).json({ success: false, message: access.message })
    }

    // Ensure subsection actually belongs to the course
    const section = await Section.findOne({ subSection: subSectionId }).select("_id")
    if (!section) {
      return res.status(404).json({ success: false, message: "SubSection not found in any section" })
    }
    const course = await Course.findOne({ _id: courseId, courseContent: section._id }).select("_id")
    if (!course) {
      return res.status(400).json({ success: false, message: "SubSection does not belong to course" })
    }

    const upload = await cloudinary.uploader.upload(req.files.pdf.tempFilePath, {
      folder: process.env.FOLDER_NAME,
      resource_type: "raw",
      format: "pdf",
    })

    await SubSection.findByIdAndUpdate(
      subSectionId,
      {
        $push: {
          notes: {
            title,
            url: upload.secure_url,
            publicId: upload.public_id,
          },
        },
      },
      { new: true }
    )

    return res.status(200).json({ success: true, message: "Subsection note added" })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

exports.deleteSubSectionNote = async (req, res) => {
  try {
    const { courseId, subSectionId, noteId } = req.body
    const instructorId = req.user.id
    const permissions = req.user.permissions || []

    if (!courseId || !subSectionId || !noteId) {
      return res.status(400).json({
        success: false,
        message: "courseId, subSectionId, and noteId are required",
      })
    }

    const access = await requireCourseInstructorOrModerator({
      courseId,
      instructorId,
      permissions,
    })
    if (!access.ok) {
      return res.status(access.status).json({ success: false, message: access.message })
    }

    await SubSection.findByIdAndUpdate(
      subSectionId,
      {
        $pull: { notes: { _id: noteId } },
      },
      { new: true }
    )

    return res.status(200).json({ success: true, message: "Subsection note removed" })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

exports.getExamNotes = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    if (!courseId) {
      return res.status(400).json({ success: false, message: "courseId is required" })
    }

    const gate = await requireEnrolledStudent({ courseId, userId })
    if (!gate.ok) {
      return res.status(gate.status).json({ success: false, message: gate.message })
    }

    const course = await Course.findById(courseId).select("examNotes courseName")
    return res.status(200).json({ success: true, data: course.examNotes || [] })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

exports.getSubSectionNotes = async (req, res) => {
  try {
    const { courseId, subSectionId } = req.body
    const userId = req.user.id
    if (!courseId || !subSectionId) {
      return res
        .status(400)
        .json({ success: false, message: "courseId and subSectionId are required" })
    }

    const gate = await requireEnrolledStudent({ courseId, userId })
    if (!gate.ok) {
      return res.status(gate.status).json({ success: false, message: gate.message })
    }

    const sub = await SubSection.findById(subSectionId).select("notes")
    if (!sub) {
      return res.status(404).json({ success: false, message: "SubSection not found" })
    }

    return res.status(200).json({ success: true, data: sub.notes || [] })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}


const Course = require("../models/course")
const Section = require("../models/section")
const SubSection = require("../models/subSection")
const User = require("../models/user")
const { deleteResourceFromCloudinary } = require("./mediaCleanup")

exports.deleteCourseRecord = async (courseId) => {
  const course = await Course.findById(courseId)
  if (!course) return

  // Unenroll students
  const studentsEnrolled = course.studentsEnrolled
  for (const studentId of studentsEnrolled) {
    await User.findByIdAndUpdate(studentId, {
      $pull: { courses: courseId },
    })
  }

  // Delete thumbnail
  if (course.thumbnailPublicId) {
    await deleteResourceFromCloudinary(course.thumbnailPublicId)
  }

  // Delete exam notes
  if (course.examNotes && course.examNotes.length > 0) {
    for (const note of course.examNotes) {
      if (note.publicId) {
        await deleteResourceFromCloudinary(note.publicId, "raw")
      }
    }
  }

  // Delete sections and sub-sections
  const courseSections = course.courseContent
  for (const sectionId of courseSections) {
    const section = await Section.findById(sectionId)
    if (section) {
      const subSections = section.subSection
      for (const subSectionId of subSections) {
        const subSection = await SubSection.findById(subSectionId)
        if (subSection) {
          // Delete video
          if (subSection.videoPublicId) {
            await deleteResourceFromCloudinary(subSection.videoPublicId, "video")
          }
          // Delete notes
          if (subSection.notes && subSection.notes.length > 0) {
            for (const note of subSection.notes) {
              if (note.publicId) {
                await deleteResourceFromCloudinary(note.publicId, "raw")
              }
            }
          }
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }
      await Section.findByIdAndDelete(sectionId)
    }
  }

  // Delete the course
  await Course.findByIdAndDelete(courseId)
}

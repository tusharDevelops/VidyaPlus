const Category = require("../models/category");
const User = require("../models/user");
const Section = require("../models/section");
const SubSection = require("../models/subSection");
const Course = require("../models/course");
const CourseProgress = require("../models/courseProgress");
const Profile = require("../models/profile");
const {uploadImageToCloudinary} = require("../utilities/imageUploader");
const { deleteResourceFromCloudinary } = require("../utilities/mediaCleanup");
const { deleteCourseRecord } = require("../utilities/courseDeletion");
const { convertSecondsToDuration } = require("../utilities/secToduration")

exports.createCourse = async(req,res)=>{
    try {
        //fetch data;
        const {courseName, courseDescription, whatYouWillLearn, price, tag, category,status,instructions, certificateSettings} = req.body;

        //fetch thumbnail image
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag
             || !thumbnail || !category ) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }

        if (!status || status === undefined) {
			status = "Draft";
		}

        //check for Instructor kya vo User present bhi hai
        const userId = req.user.id;
        // Check if the user is an instructor
		const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});

        if(!instructorDetails) {
            return res.status(404).json({
                success:false,
                message:'Instructor Details not found',
            });
        }


        //console.log("Instructor Details: " , instructorDetails);
        //TODO: Verify that userId and instructorDetails._id  are same or different ?

     

        //check given category is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails) {
            return res.status(404).json({
                success:false,
                message:'Category not found',
            });
        }

        //upoad a thumbnail to cloud and create a secured url entry in db
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            thumbnailPublicId: thumbnailImage.public_id,
            status: status,
			instructions: instructions,
            certificateSettings: certificateSettings ? JSON.parse(certificateSettings) : { enabled: true },
        });

        // add new course to user schema of instructor
        await User.findByIdAndUpdate({_id: instructorDetails._id},
        {
            $push:{courses: newCourse._id}
        },
        {new: true}
        );

        //tag scema update karo 

        await Category.findByIdAndUpdate({_id: categoryDetails._id},
        {
          $push:{courses: newCourse._id}  
        },{ new: true });

        //return response
        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse,
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create Course',
            error: error.message,
        });
    }

};


exports.getAllCourses = async (req, res) => {
    try {
            //TODO: change the below statement incrementally
    const allCourses = await Course.find(
        { visibility: { $ne: "Private" } },
        {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnroled: true,
        }
    )
        .populate("instructor")
        .exec();
    return res.status(200).json({
        success: true,
        data: allCourses,
    });

}
    catch(error) {

        return res.status(500).json({
            success:false,
            message:'Cannot Fetch course data',
            error:error.message,
        })
    }
};

//getCourseDetails
exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .exec()

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        //console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        // Delete old thumbnail
        if (course.thumbnailPublicId) {
            await deleteResourceFromCloudinary(course.thumbnailPublicId);
        }
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
        course.thumbnailPublicId = thumbnailImage.public_id
      }
      
      // If Exam Notes are found, update them
      if (req.files && req.files.examNotes) {
        const notes = req.files.examNotes
        // Delete old exam notes
        if (course.examNotes && course.examNotes.length > 0) {
            for (const note of course.examNotes) {
                if (note.publicId) {
                    await deleteResourceFromCloudinary(note.publicId, "raw");
                }
            }
        }
        const notesUpload = await uploadImageToCloudinary(
          notes,
          process.env.FOLDER_NAME
        )
        course.examNotes = [{ title: "Exam Note", url: notesUpload.secure_url, publicId: notesUpload.public_id }]
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions" || key === "certificateSettings") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }

      // Handle custom signature upload if provided
      if (req.files && req.files.signatureImage) {
        const signature = req.files.signatureImage;
        if (course.certificateSettings?.signaturePublicId) {
            await deleteResourceFromCloudinary(course.certificateSettings.signaturePublicId);
        }
        const signatureImage = await uploadImageToCloudinary(signature, process.env.FOLDER_NAME);
        
        // ensure certificateSettings object exists
        if (!course.certificateSettings) course.certificateSettings = { enabled: true };
        
        course.certificateSettings.signatureUrl = signatureImage.secure_url;
        course.certificateSettings.signaturePublicId = signatureImage.public_id;
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }


  // Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}


// Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    await deleteCourseRecord(courseId)
    
    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

   // console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // Enrolled-only gating for full course content (videos + in-course notes)
    const isEnrolled = courseDetails.studentsEnrolled?.some(
      (id) => id.toString() === userId.toString()
    )
    const isInstructor = courseDetails.instructor?._id?.toString() === userId.toString()
    
    if (!isEnrolled && !isInstructor) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course, nor are you the instructor",
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.removeStudentFromCourse = async (req, res) => {
  try {
    const { courseId, studentId } = req.body
    const instructorId = req.user.id

    if (!courseId || !studentId) {
       return res.status(400).json({ success: false, message: "Course ID and Student ID are required" })
    }

    const course = await Course.findById(courseId)
    if (!course) {
       return res.status(404).json({ success: false, message: "Course not found" })
    }
    if (course.instructor.toString() !== instructorId) {
       return res.status(403).json({ success: false, message: "Unauthorized to manage this course" })
    }

    await Course.findByIdAndUpdate(courseId, {
      $pull: { studentsEnrolled: studentId }
    })

    await User.findByIdAndUpdate(studentId, {
      $pull: { courses: courseId }
    })

    await CourseProgress.deleteMany({ courseID: courseId, userId: studentId })

    const Certificate = require("../models/certificate")
    await Certificate.deleteMany({ courseId: courseId, userId: studentId })

    return res.status(200).json({
      success: true,
      message: "Student removed from course successfully"
    })
  } catch (error) {
    console.error("Remove Student Error:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while removing student",
      error: error.message,
    })
  }
}
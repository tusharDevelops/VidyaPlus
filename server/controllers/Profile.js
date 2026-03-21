const Profile = require("../models/profile");
const User = require("../models/user");
const Course = require("../models/course");
const {uploadImageToCloudinary} = require("../utilities/imageUploader");
const { deleteResourceFromCloudinary } = require("../utilities/mediaCleanup")
const { convertSecondsToDuration } = require("../utilities/secToduration")
const CourseProgress = require("../models/courseProgress")
const { deleteCourseRecord } = require("../utilities/courseDeletion")

exports.updateProfile = async (req, res) => {
    try{
            //get data
            const {dateOfBirth="", about="", contactNumber, gender} = req.body;
            //get userId
            const id = req.user.id;
            //validation
            if(!contactNumber || !gender || !id) {
                return res.status(400).json({
                    success:false,
                    message:'All fields are required',
                });
            } 
            //find profile
            const userDetails = await User.findById(id);
            const profileId = userDetails.additionalDetails;
            const profileDetails = await Profile.findById(profileId);

            //update profile
            profileDetails.dateOfBirth = dateOfBirth;
            profileDetails.about = about;
            profileDetails.gender = gender;
            profileDetails.contactNumber = contactNumber;
            await profileDetails.save();
            //return response
            return res.status(200).json({
                success:true,
                message:'Profile Updated Successfully',
                updatedUserDetails:userDetails,
            });

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            error:error.message,
        });
    }
};  


exports.getAllUserDetails = async (req, res) => {

    try {
        //get id
        const id = req.user.id;

        //validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        //return response
        return res.status(200).json({
            success:true,
            message:'User Data Fetched Successfully',
            data: userDetails
        });
       
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};


//deleteAccount
//Explore -> how can we schedule this deletion operation

// TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);
exports.deleteAccount = async (req, res) => {
    try{
        //get id 
        const id = req.user.id;
        //validation
        const userDetails = await User.findById(id);
        
        if(!userDetails) {
            return res.status(404).json({
                success:false,
                message:'User not found',
            });
        } 
        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        // Cascade delete instructor courses
        if (userDetails.accountType === "Instructor") {
            const courses = await Course.find({ instructor: id });
            for (const course of courses) {
                await deleteCourseRecord(course._id);
            }
        }

        const enrolledCourses = userDetails.courses;
        if (enrolledCourses.length !== 0) {
            try {
                // Loop through each enrolled course
                for (const courseId of enrolledCourses) {
                    // Find the course and update enrolled users
                    await Course.findByIdAndUpdate(
                        courseId,
                        { $pull: { studentsEnrolled: id } },
                        { new: true }
                    );
                }
            } catch (error) {
                // Handle error if unenrolling fails
                console.error("Error unenrolling user from courses:", error);
                return res.status(500).json({
                    success: false,
                    message: "Error unenrolling user from courses",
                    error: error.message,
                });
            }
        }

        // Delete user profile image from Cloudinary
        if (userDetails.imagePublicId) {
            await deleteResourceFromCloudinary(userDetails.imagePublicId);
        }

        //delete user
        await User.findByIdAndDelete({_id:id});
       
        //return response
        return res.status(200).json({
            success:true,
            message:'User Deleted Successfully',
        })

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User cannot be deleted successfully',
        });
    }
};


exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      
      const user = await User.findById(userId);
      // Delete old image if it exists
      if (user.imagePublicId) {
          await deleteResourceFromCloudinary(user.imagePublicId);
      }

      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { 
            image: image.secure_url,
            imagePublicId: image.public_id
        },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    }  catch (error) {
      return res.status(500).json({
        success: false,
        message: `File not uploaded: ${error.message}`,
      })
    }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()
    userDetails = userDetails.toObject()
    var SubsectionLength = 0
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      })
      courseProgressCount = courseProgressCount?.completedVideos.length
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}
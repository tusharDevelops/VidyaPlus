import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../../services/operations/profileAPI"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);

      setEnrolledCourses(res);
      
      
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  };
  useEffect(() => {
    getEnrolledCourses();
    //eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="text-2xl text-richblack-50 sm:text-3xl">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-sm text-richblack-5 sm:text-base">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-6 overflow-x-auto text-richblack-5 sm:my-8">
          {/* Headings - Hidden on mobile, shown on sm */}
          <div className="hidden rounded-t-lg bg-richblack-500 sm:flex">
            <p className="w-[45%] px-4 py-3 text-sm">Course Name</p>
            <p className="w-1/4 px-2 py-3 text-sm">Duration</p>
            <p className="flex-1 px-2 py-3 text-sm">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex flex-col gap-4 border border-richblack-700 p-4 sm:flex-row sm:items-center ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex w-full cursor-pointer items-center gap-3 sm:w-[45%] sm:px-5 sm:py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-12 w-12 flex-shrink-0 rounded-lg object-cover sm:h-14 sm:w-14"
                />
                <div className="flex flex-1 flex-col gap-2 overflow-hidden">
                  <p className="text-sm font-semibold sm:text-base">{course.courseName}</p>
                  <p className="hidden text-xs text-richblack-300 sm:block">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="hidden w-1/4 px-2 py-3 text-sm sm:block">{course?.totalDuration}</div>
              <div className="flex w-full flex-col gap-2 sm:w-1/5 sm:px-2 sm:py-3">
                <p className="text-xs sm:text-sm">Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="6px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

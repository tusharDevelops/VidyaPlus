import React from "react"
// import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart } from "../../../redux/slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constant"


function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    // _id: courseId,
  } = course

  // const handleShare = () => {
  //   copy(window.location.href)
  //   toast.success("Link copied to clipboard")
  // }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  // console.log("Student already enrolled ", course?.studentsEnroled, user?._id)

  return (
    <>
      <div className="flex flex-col gap-6 rounded-2xl bg-richblack-700 p-6 text-richblack-5 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        {/* Course Image */}
        <div className="relative overflow-hidden rounded-xl group">
          <img
            src={ThumbnailImage}
            alt={course?.courseName}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-56 lg:h-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-richblack-900 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-richblack-300 mb-2">Price</p>
            <p className="text-4xl font-bold text-yellow-5">Rs. {CurrentPrice}</p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              className="w-full rounded-lg bg-gradient-to-r from-yellow-200 to-yellow-50 py-3 px-4 font-semibold text-richblack-900 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0"
              onClick={
                user && course?.studentsEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {user && course?.studentsEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
              <button 
                onClick={handleAddToCart}
                className="w-full rounded-lg border-2 border-yellow-5 bg-transparent py-3 px-4 font-semibold text-yellow-5 hover:bg-yellow-5/10 transition-all duration-200"
              >
                Add to Cart
              </button>
            )}
          </div>

          <div className="rounded-lg bg-richblack-800 p-4 text-center">
            <p className="text-sm font-semibold text-richblack-200">
              30-Day Money-Back Guarantee
            </p>
          </div>

          <div>
            <p className="mb-4 text-lg font-semibold text-richblack-5">
              This Course Includes:
            </p>
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
              {course?.instructions?.map((item, i) => {
                return (
                  <div className="flex gap-3 items-start" key={i}>
                    <BsFillCaretRightFill className="flex-shrink-0 mt-1" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <button
            className="flex items-center justify-center gap-2 py-3 text-yellow-100 hover:text-yellow-25 font-semibold transition-colors duration-200 border-t border-richblack-600 pt-4"
          >
            <FaShareSquare size={16} /> Share This Course
          </button>
        </div>
      </div>
    </>
  )
}

export default CourseDetailsCard

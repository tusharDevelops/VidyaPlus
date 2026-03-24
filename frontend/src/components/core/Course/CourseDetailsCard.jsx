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
    instructions: rawInstructions,
  } = course

  const parseData = (data) => {
    if (!data) return [];
    if (typeof data === 'string') {
      try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch (e) { return [data]; }
    }
    if (Array.isArray(data)) {
      if (data.length === 1 && typeof data[0] === 'string' && data[0].startsWith('[')) {
        try {
          const parsed = JSON.parse(data[0]);
          return Array.isArray(parsed) ? parsed : [parsed];
        } catch (e) { return data; }
      }
      return data;
    }
    return [];
  }

  const instructions = parseData(rawInstructions);

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
      <div
        className="flex flex-col gap-6 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl shadow-indigo-500/10 dark:shadow-none backdrop-blur-md"
      >
        {/* Course Image */}
        <div className="relative group overflow-hidden rounded-3xl aspect-video">
          <img
            src={ThumbnailImage}
            alt={course?.courseName}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-4 right-4 group/share shadow-lg rounded-full">
             <div className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-white/20 transition-all duration-300 group-hover/share:bg-indigo-600 group-hover/share:text-white">
                <FaShareSquare className="text-base" />
             </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
              ₹{CurrentPrice}
            </p>
            <div className="px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
               LIFETIME ACCESS
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 transform hover:-translate-y-1 active:translate-y-0 active:scale-95"
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
                className="w-full py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-black hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border-2 border-slate-200 dark:border-slate-700 active:scale-95 shadow-sm"
              >
                Add to Cart
              </button>
            )}
          </div>

          <p className="text-center text-xs font-bold text-slate-500 dark:text-slate-400">
            30-Day Money-Back Guarantee
          </p>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-4">
              This Course Includes:
            </p>
            <div className="flex flex-col gap-3">
              {instructions?.map((item, i) => (
                <div className="flex items-start gap-3 group" key={i}>
                  <div className="mt-1 w-4 h-4 rounded-full bg-indigo-600/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 transition-all group-hover:bg-indigo-600 group-hover:text-white">
                    <BsFillCaretRightFill className="text-[10px]" />
                  </div>
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              className="px-6 py-2.5 rounded-xl flex items-center gap-2 text-[10px] font-black text-slate-500 dark:text-slate-400 transition-all uppercase tracking-[0.2em] border-2 border-slate-100 dark:border-slate-800 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 shadow-sm"
              // onClick={handleShare}
            >
              <FaShareSquare size={12} /> Share Course
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseDetailsCard
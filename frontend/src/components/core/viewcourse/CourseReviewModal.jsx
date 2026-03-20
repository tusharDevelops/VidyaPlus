import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component"
import { useSelector } from "react-redux"

import { createRating } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ratingChanged = (newRating) => {
    // console.log(newRating)
    setValue("courseRating", newRating)
  }

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )
    setReviewModal(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-slate-900/60 backdrop-blur-md p-4">
      <div className="my-10 w-full max-w-[650px] rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl shadow-indigo-500/10 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-slate-100 dark:border-slate-800">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                 <span className="text-xl">🌟</span>
              </div>
              <div>
                 <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1">
                   Share Your Experience
                 </p>
                 <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">COURSE REVIEW / RATING</p>
              </div>
           </div>
          <button 
            onClick={() => setReviewModal(false)}
            className="p-2 rounded-xl bg-slate-200/50 dark:bg-slate-700/50 text-slate-500 hover:text-red-500 transition-all hover:rotate-90"
          >
            <RxCross2 className="text-2xl" />
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-8">
          <div className="flex items-center gap-x-5 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 mb-8">
            <img
              src={user?.image}
              alt={user?.firstName}
              className="aspect-square w-[60px] rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-md"
            />
            <div className="space-y-1">
              <p className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                {user?.firstName} {user?.lastName}
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Public Review</p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center"
          >
            <div className="mb-8 p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/50 w-full flex flex-col items-center gap-4">
               <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Select Rating</p>
               <ReactStars
                count={5}
                onChange={ratingChanged}
                size={40}
                activeColor="#4f46e5"
                color="#cbd5e1"
              />
            </div>

            <div className="flex w-full flex-col space-y-2">
              <label
                className="lable-style"
                htmlFor="courseExperience"
              >
                Detailed Experience <sup className="text-red-500 font-bold">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="What did you think of this course? Your feedback helps other students."
                {...register("courseExperience", { required: true })}
                className="form-style resize-none min-h-[140px] w-full"
              />
              {errors.courseExperience && (
                <span className="ml-2 text-xs font-bold tracking-wide text-red-500">
                  Please share your learning experience
                </span>
              )}
            </div>

            <div className="mt-10 flex w-full justify-end gap-x-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="px-8 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                Cancel
              </button>
              <IconBtn 
                text="Submit Review" 
                customClasses="px-10 py-3 rounded-xl shadow-lg shadow-indigo-600/20"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

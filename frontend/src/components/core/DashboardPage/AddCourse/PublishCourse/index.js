import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
import { resetCourseState, setStep } from "../../../../../redux/slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constant"
import IconBtn from "../../../../common/IconBtn"

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
    //eslint-disable-next-line
  }, [])

  const goBack = () => {
    dispatch(setStep(3))
  }

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async () => {
    // check if form has been updated or not
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated
      // no need to make api call
      goToCourses()
      return
    }
    const formData = new FormData()
    formData.append("courseId", course._id)
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus)
    setLoading(true)
    const result = await editCourseDetails(formData, token)
    if (result) {
      goToCourses()
    }
    setLoading(false)
  }

  const onSubmit = (data) => {
    // console.log(data)
    handleCoursePublish()
  }

  return (
    <div className='space-y-6 sm:space-y-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-4 sm:p-8 shadow-2xl shadow-indigo-500/5 dark:shadow-none animate-in fade-in duration-700'>
      <header className="space-y-1 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-1">
           <span className="px-2 py-0.5 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest">
             STEP 04
           </span>
        </div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Deployment & Visibility</h2>
        <p className="text-sm sm:text-base font-bold text-slate-500 dark:text-slate-400">Finalize your curriculum's visibility parameters.</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-6 sm:my-8 p-4 sm:p-8 rounded-2xl bg-indigo-600/[0.02] dark:bg-indigo-400/[0.01] border border-indigo-600/10 shadow-inner group">
          <label htmlFor="public" className="inline-flex items-start cursor-pointer group/label">
            <div className="relative flex items-center mt-1">
              <input
                type="checkbox"
                id="public"
                {...register("public")}
                className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 checked:bg-indigo-600 checked:border-indigo-600 transition-all duration-500 shadow-sm"
              />
              <svg
                className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-all duration-500 scale-50 peer-checked:scale-100 pointer-events-none left-1.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div className="ml-3 sm:ml-4 flex flex-col">
              <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover/label:text-indigo-600 dark:group-hover/label:text-indigo-400 transition-colors tracking-tight leading-snug">
                Authorize Public Access
              </span>
              <p className="mt-1 text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed max-w-[500px]">
                 Make this course visible to all students across the platform.
              </p>
            </div>
          </label>
        </div>

        {/* Next Prev Button */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-8 border-t border-slate-100 dark:border-slate-800">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center justify-center gap-x-2 rounded-xl bg-slate-100 dark:bg-slate-800 py-3 px-8 font-black text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 w-full sm:w-auto"
          >
            Back
          </button>
          <IconBtn 
            disabled={loading} 
            text="Deploy Course" 
            customClasses="w-full sm:w-auto px-8 py-3 rounded-xl shadow-2xl shadow-indigo-600/20 text-[10px] font-black uppercase tracking-widest flex justify-center"
          />
        </div>
      </form>
    </div>
  )
}
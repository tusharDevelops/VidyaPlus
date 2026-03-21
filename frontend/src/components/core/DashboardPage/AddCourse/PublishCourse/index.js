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
    dispatch(setStep(2))
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
    <div className='space-y-12 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-10 shadow-2xl shadow-indigo-500/5 dark:shadow-none animate-in fade-in zoom-in-95 duration-700'>
      <header className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-8">
        <div className="flex items-center gap-3 mb-1">
           <span className="px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
             STEP 03
           </span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Deployment & Visibility</h2>
        <p className="text-lg font-bold text-slate-500 dark:text-slate-400">Finalize your curriculum's accessibility parameters before synchronization.</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-10 p-10 rounded-[2.5rem] bg-indigo-600/[0.02] dark:bg-indigo-400/[0.01] border border-indigo-600/10 shadow-inner group">
          <label htmlFor="public" className="inline-flex items-start cursor-pointer group/label">
            <div className="relative flex items-center mt-1">
              <input
                type="checkbox"
                id="public"
                {...register("public")}
                className="peer h-7 w-7 cursor-pointer appearance-none rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 checked:bg-indigo-600 checked:border-indigo-600 transition-all duration-500 shadow-sm"
              />
              <svg
                className="absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-all duration-500 scale-50 peer-checked:scale-100 pointer-events-none left-1.5"
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
            <div className="ml-6 flex flex-col">
              <span className="text-xl font-black text-slate-900 dark:text-white group-hover/label:text-indigo-600 dark:group-hover/label:text-indigo-400 transition-colors tracking-tight">
                Authorize Public Access
              </span>
              <p className="mt-2 text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed max-w-[500px]">
                 Publicly authorized curricula are indexed within the global directory and available for student enrollment across all verified sectors.
              </p>
            </div>
          </label>
           <div className="mt-8 pt-8 border-t border-indigo-600/5 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></div>
              <p className="text-[10px] font-black text-indigo-600/50 dark:text-indigo-400/50 uppercase tracking-[0.2em]">STATUS: PENDING AUTHORIZATION</p>
           </div>
        </div>

        {/* Next Prev Button */}
        <div className="flex justify-end items-center gap-x-6 pt-12 border-t border-slate-100 dark:border-slate-800">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-[1.25rem] bg-slate-100 dark:bg-slate-800 py-4 px-10 font-black text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
          >
            Revisit Architecture
          </button>
          <IconBtn 
            disabled={loading} 
            text="Commit & Deploy" 
            customClasses="px-12 py-4 rounded-[1.25rem] shadow-2xl shadow-indigo-600/20 text-xs font-black uppercase tracking-widest"
          />
        </div>
      </form>
    </div>
  )
}
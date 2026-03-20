import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import CoursesTable from "./InstructorCourses/CourseTable"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-10">
        <div className="space-y-2">
           <div className="flex items-center gap-3 mb-1">
             <span className="px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                CONTENT MANAGER
             </span>
           </div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Your Curriculum</h1>
          <p className="text-lg font-bold text-slate-500 dark:text-slate-400">Manage, iterate, and deploy your instructional high-fidelity assets.</p>
        </div>
        <IconBtn
          text="Initialize New Curriculum"
          onclick={() => navigate("/dashboard/add-course")}
          customClasses="w-full sm:w-auto px-8 py-4 rounded-[1.25rem] shadow-2xl shadow-indigo-600/20 text-xs font-black uppercase tracking-widest"
        >
          <VscAdd size={20} />
        </IconBtn>
      </div>
      <div className="animate-in slide-in-from-bottom-8 duration-1000">
         {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
      </div>
    </div>
  )
}
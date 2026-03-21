import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import {
  
  getFullDetailsOfCourse,
} from "../../../../services/operations/courseDetailsAPI"
import { setCourse, setEditCourse } from "../../../../redux/slices/courseSlice"
import RenderSteps from "../AddCourse/RenderSteps"

export default function EditCourse() {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const result = await getFullDetailsOfCourse(courseId, token)
      if (result?.courseDetails) {
        dispatch(setEditCourse(true))
        dispatch(setCourse(result?.courseDetails))
      }
      setLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="border-b border-slate-200 dark:border-slate-800 pb-10">
        <div className="flex items-center gap-3 mb-2">
           <span className="px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
              CURRICULUM REFINEMENT
           </span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Edit Course Artifact
        </h1>
        <p className="text-lg font-bold text-slate-500 dark:text-slate-400">Modify credentials, pedagogical structure, and deployment parameters.</p>
      </header>
      
      <div className="animate-in slide-in-from-bottom-8 duration-1000 max-w-[800px]">
        {course ? (
          <RenderSteps />
        ) : (
          <div className="mt-20 flex flex-col items-center justify-center p-12 text-center rounded-[4rem] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white/5 dark:bg-slate-900/20 backdrop-blur-sm group">
             <div className="relative mb-12">
                <div className="absolute inset-0 bg-red-600/20 rounded-full blur-3xl"></div>
                <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 text-2xl shadow-2xl">
                  🔍
                </div>
             </div>
             <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Curriculum Not Found</h2>
             <p className="text-xl font-bold text-slate-500 dark:text-slate-400 max-w-md mx-auto">The requested instructional asset could not be retrieved from the repository.</p>
          </div>
        )}
      </div>
    </div>
  )
}
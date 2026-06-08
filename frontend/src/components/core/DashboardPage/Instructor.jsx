import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../services/operations/profileAPI"
import InstructorChart from "./InstructorDashboard/InstructorChart"

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
     // console.log(instructorApiData)
      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    })()
    //eslint-disable-next-line
  }, [])

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  )

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  )

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="space-y-2">
           <div className="flex items-center gap-3 mb-1">
             <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-hairline text-ink dark:text-white text-[10px] font-black uppercase tracking-widest">
                INSTRUCTOR PORTAL
             </span>
           </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
            Welcome, {user?.firstName} 👋
          </h1>
          <p className="text-base font-bold text-slate-500 dark:text-slate-400">
            Mange your courses and view your students' progress.
          </p>
        </div>
        <Link to="/dashboard/add-course" className="w-full sm:w-auto">
           <button className="btn-primary w-full sm:w-auto px-6 py-3">
             Create New Course
           </button>
        </Link>
      </div>
      
      {loading ? (
        <div className="flex h-[400px] items-center justify-center">
           <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : courses.length > 0 ? (
        <div className="space-y-12">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Render chart / graph */}
            <div className="flex-1 rounded-2xl border border-hairline dark:border-slate-800 bg-white dark:bg-slate-900/40 p-4 sm:p-8 shadow-sm relative overflow-hidden group">
              {totalAmount > 0 || totalStudents > 0 ? (
                <div className="relative z-10 flex flex-col">
                   <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">ANALYTICS</p>
                        <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">Statistics Overview</h2>
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-ink dark:text-white text-xl shadow-sm group-hover:scale-110 transition-transform duration-500">📈</div>
                   </div>
                   <InstructorChart courses={instructorData} />
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center py-12">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl mb-6 shadow-inner rotate-3 group-hover:rotate-0 transition-transform duration-700">📊</div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Visualize Your Data</h3>
                  <p className="mt-3 text-slate-500 font-bold max-w-sm text-sm leading-relaxed">Once students enroll in your courses, your statistics will be shown here.</p>
                </div>
              )}
            </div>

            {/* Total Statistics — row on mobile, column sidebar on lg */}
            <div className="lg:w-[280px] rounded-2xl border border-hairline dark:border-slate-800 bg-white dark:bg-slate-900/40 p-4 sm:p-8 shadow-sm relative overflow-hidden group">
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 relative z-10">SUMMARY</p>
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-6 relative z-10">
                <div className="relative group/stat">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Total Courses</p>
                   <p className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tighter transition-transform group-hover/stat:-translate-y-1 duration-500">
                     {courses.length}
                   </p>
                </div>
                
                <div className="relative group/stat">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Total Students</p>
                   <p className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tighter transition-transform group-hover/stat:-translate-y-1 duration-500">
                     {totalStudents}
                   </p>
                </div>

                <div className="relative group/stat">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Total Income</p>
                   <div className="flex items-baseline gap-1 transition-transform group-hover/stat:-translate-y-1 duration-500">
                     <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₹</span>
                     <p className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">
                       {totalAmount}
                     </p>
                   </div>
                </div>
              </div>
            </div>
          </div>

            <div className="rounded-2xl border border-hairline dark:border-slate-800 bg-white dark:bg-slate-900/40 p-8 shadow-sm animate-in slide-in-from-bottom-12 duration-1000">
            {/* Render 3 courses */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-hairline dark:border-slate-800">
              <div className="space-y-1">
                 <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Your Courses</h2>
                 <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-0.5">RECENT COURSES</p>
              </div>
              <Link to="/dashboard/my-courses" className="btn-secondary text-xs px-6 py-3">
                View All →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md group-hover:shadow-indigo-500/20 transition-all duration-500 aspect-video bg-slate-100 dark:bg-slate-800">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-full w-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="mt-4 space-y-2 px-1">
                    <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-brand-coral transition-colors tracking-tight leading-tight">
                      {course.courseName}
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">
                           {course.studentsEnrolled.length} Students
                         </span>
                      </div>
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] font-bold text-slate-900 dark:text-slate-200 tracking-widest uppercase mt-1">
                           ₹{course.price}
                         </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-hairline dark:border-slate-800 bg-white dark:bg-slate-900/20 p-8 text-center relative overflow-hidden group">
           <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 border border-hairline dark:border-slate-800 rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-sm">
             <span className="text-2xl">📚</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
            Create Your First Course
          </h2>
          <p className="text-base font-bold text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed mb-8">
            Create your first course and start teaching students from all around the globe today.
          </p>
          <Link to="/dashboard/add-course">
            <button className="btn-primary px-8 py-4">
              Create a Course
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

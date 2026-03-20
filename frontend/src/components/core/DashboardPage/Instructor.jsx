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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 border-b border-slate-200 dark:border-slate-800 pb-10">
        <div className="space-y-2">
           <div className="flex items-center gap-3 mb-1">
             <span className="px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                INSTRUCTOR PORTAL
             </span>
           </div>
          <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
            Welcome, {user?.firstName} <span className="animate-pulse inline-block origin-bottom">✨</span>
          </h1>
          <p className="text-xl font-bold text-slate-500 dark:text-slate-400">
            Orchestrate your instructional empire and monitor academic growth.
          </p>
        </div>
        <Link to="/dashboard/add-course" className="w-full sm:w-auto">
           <button className="w-full sm:w-auto px-10 py-5 rounded-[1.5rem] bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 transform hover:-translate-y-1 active:translate-y-0 text-sm uppercase tracking-widest">
             Initialize New Course
           </button>
        </Link>
      </div>
      
      {loading ? (
        <div className="flex h-[400px] items-center justify-center">
           <div className="w-16 h-16 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : courses.length > 0 ? (
        <div className="space-y-16">
          <div className="flex flex-col lg:flex-row gap-10 h-auto lg:h-[550px]">
            {/* Render chart / graph */}
            <div className="flex-1 rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-12 shadow-2xl shadow-indigo-500/5 dark:shadow-none overflow-hidden group relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-600/[0.03] rounded-full blur-3xl transition-transform group-hover:scale-150 duration-1000"></div>
              {totalAmount > 0 || totalStudents > 0 ? (
                <div className="h-full relative z-10 flex flex-col">
                   <div className="flex items-center justify-between mb-10">
                      <div>
                        <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-2">ANALYTICS ENGINE</p>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Financial & Academic Growth</h2>
                      </div>
                      <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-2xl shadow-inner group-hover:scale-110 transition-transform duration-500">📈</div>
                   </div>
                   <div className="flex-1 min-h-[300px]">
                      <InstructorChart courses={instructorData} />
                   </div>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 rounded-[2rem] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-4xl mb-8 shadow-inner rotate-3 group-hover:rotate-0 transition-transform duration-700">📊</div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Visualize Your Trajectory</h3>
                  <p className="mt-4 text-slate-500 font-bold max-w-sm text-lg leading-relaxed">Once initial student enrollment commences, your growth indices will be synthesized here.</p>
                </div>
              )}
            </div>

            {/* Total Statistics */}
            <div className="flex lg:w-[420px] flex-col rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-12 shadow-2xl shadow-indigo-500/5 dark:shadow-none relative overflow-hidden group">
               <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/[0.02] rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
              <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-12 relative z-10">REAL-TIME DATA SYNC</p>
              <div className="space-y-10 relative z-10">
                <div className="relative group/stat">
                   <div className="absolute inset-x-0 -inset-y-4 bg-indigo-600/[0.02] rounded-[2rem] blur-xl opacity-0 group-hover/stat:opacity-100 transition-opacity"></div>
                   <div className="relative">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-1">Instructional Portfolio</p>
                      <div className="flex items-center gap-4">
                        <p className="text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tighter transition-transform group-hover/stat:-translate-y-1 duration-500">
                          {courses.length}
                        </p>
                        <span className="text-[10px] font-black px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">ACTIVE</span>
                      </div>
                   </div>
                </div>
                
                <div className="relative group/stat">
                   <div className="absolute inset-x-0 -inset-y-4 bg-blue-600/[0.02] rounded-[2rem] blur-xl opacity-0 group-hover/stat:opacity-100 transition-opacity"></div>
                   <div className="relative">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-1">Authenticated Enrollees</p>
                      <div className="flex items-center gap-4">
                        <p className="text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tighter transition-transform group-hover/stat:-translate-y-1 duration-500">
                          {totalStudents}
                        </p>
                        <span className="text-[10px] font-black px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">VERIFIED</span>
                      </div>
                   </div>
                </div>

                <div className="relative group/stat">
                   <div className="absolute inset-x-0 -inset-y-4 bg-emerald-600/[0.02] rounded-[2rem] blur-xl opacity-0 group-hover/stat:opacity-100 transition-opacity"></div>
                   <div className="relative">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-1">Gross Revenue Capital</p>
                      <div className="flex items-baseline gap-3 transition-transform group-hover/stat:-translate-y-1 duration-500">
                        <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">₹</span>
                        <p className="text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">
                          {totalAmount}
                        </p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-12 shadow-2xl shadow-indigo-500/5 dark:shadow-none animate-in slide-in-from-bottom-12 duration-1000">
            {/* Render 3 courses */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 pb-8 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-2">
                 <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Curriculum Showcase</h2>
                 <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] px-1 italic">PREMIUM ASSET PORTFOLIO</p>
              </div>
              <Link to="/dashboard/my-courses" className="group flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] bg-slate-50 dark:bg-slate-800 text-xs font-black text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all duration-500 border border-slate-100 dark:border-slate-700 uppercase tracking-widest">
                Access Full Catalog
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl group-hover:shadow-indigo-500/20 transition-all duration-700 aspect-video bg-slate-100 dark:bg-slate-800">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-full w-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-700"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                       <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-6 group-hover:translate-y-0">
                          <span className="text-[9px] font-black text-white uppercase tracking-widest bg-indigo-600/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-2xl border border-indigo-400/30">MANAGEMENT PORTAL</span>
                          <span className="text-[9px] font-black text-white px-2 py-1 rounded bg-white/20 backdrop-blur-md border border-white/20 hover:bg-white hover:text-indigo-600 transition-all">ASSETS ↗</span>
                       </div>
                    </div>
                  </div>
                  <div className="mt-8 space-y-4 px-3">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight leading-tight">
                      {course.courseName}
                    </h3>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div>
                         <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                           {course.studentsEnrolled.length} Authorized Users
                         </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                         <span className="text-[10px] font-black text-slate-900 dark:text-slate-100 tracking-widest uppercase">
                           ₹{course.price} Val.
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
        <div className="mt-14 flex flex-col items-center justify-center rounded-[4rem] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/20 p-24 text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-600/30 to-transparent"></div>
          <div className="w-32 h-32 bg-indigo-600/5 dark:bg-indigo-900/30 rounded-[2.5rem] flex items-center justify-center mb-10 border border-indigo-200/50 dark:border-indigo-800/50 rotate-3 group-hover:rotate-0 transition-transform duration-700 shadow-inner">
             <span className="text-6xl animate-pulse">✏️</span>
          </div>
          <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-tight">
            Architect Your Global Legacy
          </h2>
          <p className="text-xl font-bold text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-14">
            Synthesize your expertise into high-fidelity instructional units. Initiate your first curriculum and deploy it to the global directory today.
          </p>
          <Link to="/dashboard/add-course">
            <button className="px-16 py-6 rounded-[1.75rem] bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all shadow-[0_20px_50px_rgba(79,70,229,0.3)] transform hover:scale-105 active:scale-95 text-base uppercase tracking-widest">
              Deploy First Curriculum
            </button>
          </Link>
          <div className="mt-12 flex items-center gap-3">
             <span className="w-3 h-3 rounded-full bg-indigo-600/20 animate-ping"></span>
             <p className="text-[10px] font-black text-indigo-600/40 uppercase tracking-[0.4em]">Awaiting Content Initialization</p>
          </div>
        </div>
      )}
    </div>
  )
}

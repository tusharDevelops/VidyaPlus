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
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="border-b border-slate-200 dark:border-slate-800 pb-10">
        <div className="flex items-center gap-3 mb-2">
           <span className="px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
              SCHOLARSHIP PORTFOLIO
           </span>
        </div>
        <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Enrolled Curriculum
        </h1>
        <p className="text-lg font-bold text-slate-500 dark:text-slate-400">Track your pedagogical trajectory and resume module execution.</p>
      </header>

      {!enrolledCourses ? (
        <div className="flex h-[400px] items-center justify-center">
          <div className="w-16 h-16 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <div className="mt-20 flex flex-col items-center justify-center p-24 text-center rounded-[4rem] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white/5 dark:bg-slate-900/20 backdrop-blur-sm group hover:border-indigo-600/20 transition-all duration-500">
           <div className="relative mb-12">
              <div className="absolute inset-0 bg-indigo-600/20 rounded-full blur-3xl group-hover:bg-indigo-600/40 transition-colors duration-1000"></div>
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 text-6xl group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                📚
              </div>
           </div>
           <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Portfolio is Vacant</h2>
           <p className="text-xl font-bold text-slate-500 dark:text-slate-400 max-w-md mx-auto">No pedagogical assets have been registered yet. Discover premium curricula to begin your academic odyssey.</p>
           <button 
             onClick={() => navigate("/catalog")}
             className="mt-12 px-12 py-5 rounded-[2rem] bg-indigo-600 text-white text-sm font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:shadow-indigo-600/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
           >
             Explore Full Catalog
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 animate-in slide-in-from-bottom-8 duration-1000 pb-10">
          {enrolledCourses.map((course, i) => (
            <div
              key={i}
              className="group relative flex flex-col lg:flex-row items-center gap-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-8 px-10 shadow-2xl shadow-indigo-500/[0.03] hover:shadow-indigo-500/[0.08] transition-all duration-500 overflow-hidden cursor-pointer"
              onClick={() => {
                navigate(
                  `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                )
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/[0.02] rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
              
              <div className="relative shrink-0 overflow-hidden rounded-[2rem] border-4 border-white dark:border-slate-800 shadow-xl group-hover:scale-105 transition-transform duration-700">
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-[140px] w-full lg:w-[220px] object-cover rounded-[1.5rem]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <div className="flex flex-1 flex-col justify-between gap-6 relative z-10 w-full">
                <div className="space-y-2 text-center lg:text-left">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em]">Module Title</p>
                     <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {course.courseName}
                     </h3>
                  </div>
                  <p className="text-base font-bold text-slate-500 dark:text-slate-400 line-clamp-1 opacity-80 max-w-2xl">
                    {course.courseDescription}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-10">
                   <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 px-5 py-2 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Tempo</span>
                      <span className="text-sm font-black text-slate-700 dark:text-slate-200 tracking-tight">{course?.totalDuration || "0h 0m"}</span>
                   </div>

                   <div className="flex-1 w-full space-y-3">
                      <div className="flex justify-between items-center">
                         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Execution Progress</p>
                         <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 bg-indigo-600/10 px-3 py-1 rounded-full">{course.progressPercentage || 0}%</span>
                      </div>
                      <ProgressBar
                        completed={course.progressPercentage || 0}
                        height="8px"
                        isLabelVisible={false}
                        baseBgColor="rgba(100, 116, 139, 0.05)"
                        bgColor="linear-gradient(90deg, #4f46e5 0%, #818cf8 100%)"
                        className="overflow-hidden rounded-full shadow-inner"
                        animateOnRender
                      />
                   </div>
                </div>
              </div>

              <div className="flex items-center justify-center w-16 h-16 rounded-[1.5rem] bg-indigo-600 text-white group-hover:scale-110 group-hover:shadow-[0_15px_30px_rgba(79,70,229,0.4)] transition-all duration-500 shadow-xl relative z-10 border-4 border-white dark:border-slate-800">
                 <span className="text-2xl ml-1">▶</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  )
}
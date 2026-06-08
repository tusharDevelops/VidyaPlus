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

    }
  };
  useEffect(() => {
    getEnrolledCourses();
    //eslint-disable-next-line
  }, [])

  return (
    <>
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
           <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-hairline text-ink dark:text-white text-[10px] font-black uppercase tracking-widest">
              ENROLLED
           </span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Enrolled Courses
        </h1>
        <p className="text-base font-bold text-slate-500 dark:text-slate-400">View and continue your enrolled courses.</p>
      </header>

      {!enrolledCourses ? (
        <div className="flex h-[400px] items-center justify-center">
          <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-800 border-t-ink dark:border-t-white rounded-full animate-spin"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <div className="mt-12 flex flex-col items-center justify-center p-12 text-center rounded-hero border-2 border-dashed border-hairline dark:border-slate-800 bg-white/50 dark:bg-slate-900/20 group hover:shadow-lg transition-all duration-500">
           <div className="relative mb-8">
              <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-3xl group-hover:scale-110 transition-transform duration-500 shadow-sm">
                📚
              </div>
           </div>
           <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-3">No Courses Found</h2>
           <p className="text-base font-bold text-slate-500 dark:text-slate-400 max-w-sm mx-auto">You haven't enrolled in any courses yet. Discover premium courses to start learning.</p>
           <button 
             onClick={() => navigate("/catalog")}
             className="mt-8 px-8 py-3.5 btn-primary"
           >
             Explore Catalog
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 animate-in slide-in-from-bottom-8 duration-1000 pb-10">
          {enrolledCourses.map((course, i) => (
            <div
              key={i}
              className="group relative flex flex-col lg:flex-row items-center gap-6 rounded-hero border border-hairline dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 px-8 shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden cursor-pointer"
              onClick={() => {
                navigate(
                  `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                )
              }}
            >
              
              <div className="relative shrink-0 overflow-hidden rounded-[1rem] border border-white dark:border-slate-800 shadow-md group-hover:scale-[1.03] transition-transform duration-700">
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-28 w-full lg:w-48 object-cover rounded-[1rem]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <div className="flex flex-1 flex-col justify-between gap-4 relative z-10 w-full">
                <div className="space-y-1 text-center lg:text-left">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-brand-coral uppercase tracking-widest">COURSE</p>
                     <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-brand-coral transition-colors">
                        {course.courseName}
                     </h3>
                  </div>
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400 line-clamp-1 opacity-80 max-w-xl">
                    {course.courseDescription}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-6">
                   <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-4 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Duration</span>
                      <span className="text-xs font-black text-slate-700 dark:text-slate-200 tracking-tight">{course?.totalDuration || "0h 0m"}</span>
                   </div>

                   <div className="flex-1 w-full space-y-2">
                      <div className="flex justify-between items-center">
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Progress</p>
                         <span className="text-[10px] font-black text-white bg-brand-emerald px-2 py-0.5 rounded-full">{course.progressPercentage || 0}%</span>
                      </div>
                      <ProgressBar
                        completed={course.progressPercentage || 0}
                        height="6px"
                        isLabelVisible={false}
                        baseBgColor="rgba(100, 116, 139, 0.05)"
                        bgColor="#20b2aa"
                        className="overflow-hidden rounded-full shadow-sm"
                        animateOnRender
                      />
                   </div>
                </div>
              </div>

              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-coral text-white group-hover:scale-110 group-hover:shadow-lg transition-all duration-500 shadow-sm relative z-10 border-4 border-white dark:border-slate-800">
                 <span className="text-lg ml-0.5">▶</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  )
}
import {  useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"

//import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { formatDate } from "../../../../services/FormatDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constant"
import ConfirmationModal from "../../../common/ConfirmationModal"

export default function CoursesTable({ courses, setCourses }) {
 
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  // console.log("All Course ", courses)

  return (
    <>
      <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-md overflow-hidden shadow-2xl shadow-indigo-500/5 dark:shadow-none">
        <Table className="w-full">
          <Thead>
            <Tr className="flex gap-x-10 border-b border-slate-100 dark:border-slate-800 px-10 py-6 bg-slate-50/50 dark:bg-slate-900/40">
              <Th className="flex-1 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                Course Artifact
              </Th>
              <Th className="text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 w-[120px]">
                Duration
              </Th>
              <Th className="text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 w-[100px]">
                Valuation
              </Th>
              <Th className="text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 w-[100px]">
                Control
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses?.length === 0 ? (
              <Tr>
                <Td className="py-32 text-center">
                   <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl">📭</div>
                      <p className="text-xl font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">No Curriculum Found</p>
                   </div>
                </Td>
              </Tr>
            ) : (
              courses?.map((course) => (
                <Tr
                  key={course._id}
                  className="flex gap-x-10 border-b border-slate-50 dark:border-slate-800/30 px-10 py-10 last:border-0 hover:bg-indigo-600/[0.02] dark:hover:bg-indigo-400/[0.02] transition-colors group relative"
                >
                  <Td className="flex flex-1 gap-x-8">
                    <div className="relative h-[140px] w-[240px] flex-shrink-0 overflow-hidden rounded-[1.5rem] border border-slate-200 dark:border-slate-800 shadow-sm group-hover:shadow-indigo-500/10 transition-all duration-500">
                      <img
                        src={course?.thumbnail}
                        alt={course?.courseName}
                        className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="flex flex-col justify-center gap-3">
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight leading-tight">
                          {course.courseName}
                        </h3>
                        <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400 line-clamp-2 max-w-md">
                          {course.courseDescription}
                        </p>
                      </div>
                      <div className="flex items-center gap-6 mt-1">
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SYNCED:</span>
                           <span className="text-[10px] font-black text-slate-900 dark:text-slate-200 uppercase tracking-widest">{formatDate(course.createdAt)}</span>
                        </div>
                        {course.status === COURSE_STATUS.DRAFT ? (
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse"></div>
                            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">DRAFT</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                            <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">LIVE</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Td>
                  <Td className="text-xs font-black text-slate-700 dark:text-slate-300 flex items-center w-[120px] uppercase tracking-widest">
                    {course?.duration || "Variable"}
                  </Td>
                  <Td className="text-xl font-black text-emerald-600 dark:text-emerald-400 flex items-center w-[100px] tracking-tighter">
                    ₹{course.price}
                  </Td>
                  <Td className="flex items-center gap-3 w-[100px]">
                    <button
                      disabled={loading}
                      onClick={() => {
                        navigate(`/dashboard/edit-course/${course._id}`)
                      }}
                      title="Refine Curriculum"
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 shadow-sm border border-slate-200/50 dark:border-slate-700/50"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Archive this course?",
                          text2:
                            "This curriculum will be moved to deep storage. All metadata will be preserved.",
                          btn1Text: !loading ? "Archive" : "Processing...",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => handleCourseDelete(course._id)
                            : () => {},
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        })
                      }}
                      title="Archive Course"
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all duration-300 shadow-sm border border-slate-200/50 dark:border-slate-700/50"
                    >
                      <RiDeleteBin6Line size={16} />
                    </button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
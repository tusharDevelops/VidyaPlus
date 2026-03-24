import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { VscSearch, VscMail, VscDeviceMobile, VscMortarBoard, VscChevronDown, VscChevronUp, VscTrash } from 'react-icons/vsc'
import { getInstructorStudents, removeStudentFromCourse } from '../../../services/operations/profileAPI'
import ConfirmationModal from "../../common/ConfirmationModal"

export default function InstructorStudents() {
  const { token } = useSelector((state) => state.auth)
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedStudent, setExpandedStudent] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const fetchStudents = async () => {
      setLoading(true)
      const result = await getInstructorStudents(token)
      if (result) {
        setStudents(result)
      }
      setLoading(false)
  }

  useEffect(() => {
    fetchStudents()
  }, [token])

  const handleRemoveStudent = async (studentId, courseId) => {
    const success = await removeStudentFromCourse(studentId, courseId, token)
    if (success) {
      fetchStudents()
    }
    setConfirmationModal(null)
  }

  const filteredStudents = students.filter(student => 
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student._id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleStudent = (id) => {
    setExpandedStudent(expandedStudent === id ? null : id)
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
              MONITORING PANEL
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
            Student Analytics
          </h1>
          <p className="text-base font-bold text-slate-500 dark:text-slate-400">
            Track student registrations and their progress across your courses.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-sm group">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <VscSearch />
          </div>
          <input 
            type="text" 
            placeholder="Search by name, email or ID..." 
            className="bg-transparent border-none outline-none text-sm font-bold text-slate-700 dark:text-slate-200 w-64 placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex h-[400px] items-center justify-center">
          <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl overflow-hidden shadow-xl shadow-indigo-500/5 dark:shadow-none">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="py-5 px-8 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">STUDENT DETAILS</th>
                  <th className="py-5 px-8 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">CONTACT / ID</th>
                  <th className="py-5 px-8 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">ENROLLMENTS</th>
                  <th className="py-5 px-8 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {filteredStudents.map((student) => (
                  <React.Fragment key={student._id}>
                    <tr className="group hover:bg-indigo-50/[0.02] transition-colors">
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-4">
                          <img 
                            src={student.image} 
                            alt={student.firstName} 
                            className="w-12 h-12 rounded-2xl object-cover ring-4 ring-indigo-600/5 shadow-md"
                          />
                          <div>
                            <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                              {student.firstName} {student.lastName}
                            </h3>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <VscMail className="text-indigo-500" />
                                {student.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 tracking-wider">ID: {student._id}</p>
                          {student.contactNumber && (
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-widest">
                              <VscDeviceMobile />
                              {student.contactNumber}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                            {student.courses.length} Courses
                          </span>
                        </div>
                      </td>
                      <td className="py-6 px-8 text-right">
                        <button 
                          onClick={() => toggleStudent(student._id)}
                          className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ml-auto"
                        >
                          Details
                          {expandedStudent === student._id ? <VscChevronUp /> : <VscChevronDown />}
                        </button>
                      </td>
                    </tr>
                    {expandedStudent === student._id && (
                      <tr className="bg-slate-50/30 dark:bg-slate-900/30">
                        <td colSpan="4" className="px-8 py-8 animate-in slide-in-from-top-2 duration-300">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                                <VscMortarBoard className="text-indigo-600" />
                                Instructor Courses Enrolled
                              </h4>
                              <div className="space-y-2">
                                {student.courses.map((course) => (
                                  <div key={course._id} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between group/course hover:border-indigo-500 transition-colors">
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{course.courseName}</span>
                                    <div className="flex items-center gap-3">
                                      <span className="text-[10px] font-black text-indigo-600 opacity-100 md:opacity-0 group-hover/course:opacity-100 transition-opacity">ENROLLED</span>
                                      <button
                                        onClick={() => setConfirmationModal({
                                          text1: "Remove Student?",
                                          text2: `Are you sure you want to completely remove ${student.firstName} from ${course.courseName}? This action cannot be undone.`,
                                          btn1Text: "Remove",
                                          btn2Text: "Cancel",
                                          btn1Handler: () => handleRemoveStudent(student._id, course._id),
                                          btn2Handler: () => setConfirmationModal(null),
                                        })}
                                        className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-100 md:opacity-0 group-hover/course:opacity-100"
                                        title="Remove Student from Course"
                                      >
                                        <VscTrash size={16} />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-4">
                              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                                ✨ Student Snapshot
                              </h4>
                              <div className="p-6 rounded-3xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                                <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">CURRENT STATUS</p>
                                <p className="text-xl font-black">Active Learner</p>
                                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                                  <div>
                                    <p className="text-[8px] font-black text-white/50 uppercase tracking-widest">GENDER</p>
                                    <p className="text-xs font-bold capitalize">{student.gender || "Not Specified"}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-[8px] font-black text-white/50 uppercase tracking-widest">JOINED</p>
                                    <p className="text-xs font-bold">VidyaPlus Scholar</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-6 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-4xl">👥</div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">No Students Found</h3>
            <p className="text-slate-500 font-bold max-w-sm mx-auto">Try adjusting your search criteria or wait for new students to enroll in your courses.</p>
          </div>
        </div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

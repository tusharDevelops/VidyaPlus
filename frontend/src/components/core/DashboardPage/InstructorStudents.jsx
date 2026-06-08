import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  VscSearch, VscMail, VscDeviceMobile, VscMortarBoard,
  VscChevronDown, VscChevronUp, VscTrash, VscPersonAdd,
  VscOrganization, VscVerified, VscPerson, VscCalendar,
} from 'react-icons/vsc'
import { getAllStudents, getInstructorStudents, removeStudentFromCourse } from '../../../services/operations/profileAPI'
import ConfirmationModal from "../../common/ConfirmationModal"

const TABS = { ALL: 'all', ENROLLED: 'enrolled' }

function Avatar({ src, name }) {
  return src
    ? <img src={src} alt={name} className="w-11 h-11 rounded-2xl object-cover ring-4 ring-indigo-600/10 shadow-md flex-shrink-0" />
    : <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-base flex-shrink-0 shadow-md">
        {name?.[0]?.toUpperCase() || '?'}
      </div>
}

function EnrollmentBadge({ enrolled }) {
  return enrolled
    ? <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
        <VscVerified /> Enrolled with me
      </span>
    : <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 text-[9px] font-black uppercase tracking-widest">
        Not enrolled
      </span>
}

export default function InstructorStudents() {
  const { token } = useSelector((state) => state.auth)
  const [activeTab, setActiveTab] = useState(TABS.ALL)

  // All students state
  const [allStudents, setAllStudents] = useState([])
  const [allLoading, setAllLoading] = useState(false)

  // Enrolled students state (my students)
  const [enrolledStudents, setEnrolledStudents] = useState([])
  const [enrolledLoading, setEnrolledLoading] = useState(false)
  const [expandedStudent, setExpandedStudent] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')

  // Fetch all platform students
  const fetchAllStudents = async () => {
    setAllLoading(true)
    const result = await getAllStudents(token)
    if (result) setAllStudents(result)
    setAllLoading(false)
  }

  // Fetch enrolled students
  const fetchEnrolledStudents = async () => {
    setEnrolledLoading(true)
    const result = await getInstructorStudents(token)
    if (result) setEnrolledStudents(result)
    setEnrolledLoading(false)
  }

  useEffect(() => {
    fetchAllStudents()
    fetchEnrolledStudents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleRemoveStudent = async (studentId, courseId) => {
    const success = await removeStudentFromCourse(studentId, courseId, token)
    if (success) {
      fetchEnrolledStudents()
      fetchAllStudents()
    }
    setConfirmationModal(null)
  }

  const toggleStudent = (id) => {
    setExpandedStudent(expandedStudent === id ? null : id)
  }

  // Search filter
  const filterBySearch = (list) => {
    const q = searchTerm.toLowerCase()
    if (!q) return list
    return list.filter(s =>
      s.firstName?.toLowerCase().includes(q) ||
      s.lastName?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s._id?.toLowerCase().includes(q)
    )
  }

  const filteredAll = filterBySearch(allStudents)
  const filteredEnrolled = filterBySearch(enrolledStudents)

  const enrolledCount = allStudents.filter(s => s.isEnrolledWithMe).length

  return (
    <div className="space-y-8 animate-in fade-in duration-700">

      {/* ── Page Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest inline-block">
            STUDENT MANAGEMENT
          </span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mt-1">
            Students
          </h1>
          <p className="text-base font-bold text-slate-500 dark:text-slate-400">
            View all registered students and track who is enrolled in your courses.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-2.5 shadow-sm">
            <VscSearch className="text-indigo-500 text-base flex-shrink-0" />
            <input
              type="text"
              placeholder="Search name, email or ID..."
              className="bg-transparent border-none outline-none text-sm font-bold text-slate-700 dark:text-slate-200 w-52 placeholder:text-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Register CTA */}
          <Link
            to="/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest
              hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/25 transition-all duration-300 whitespace-nowrap"
          >
            <VscPersonAdd className="text-base" />
            Register New Student
          </Link>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total on Platform', value: allStudents.length, icon: <VscOrganization />, color: 'indigo' },
          { label: 'Enrolled with Me', value: enrolledCount, icon: <VscVerified />, color: 'emerald' },
          { label: 'Not Yet Enrolled', value: allStudents.length - enrolledCount, icon: <VscPerson />, color: 'amber' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 flex items-center gap-4`}>
            <div className={`w-10 h-10 rounded-xl bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400 flex items-center justify-center text-lg`}>
              {icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white leading-none mt-0.5">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800">
        {[
          { key: TABS.ALL, label: 'All Students', count: filteredAll.length },
          { key: TABS.ENROLLED, label: 'My Enrolled Students', count: filteredEnrolled.length },
        ].map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => { setActiveTab(key); setExpandedStudent(null) }}
            className={`pb-3 px-4 text-[11px] font-black uppercase tracking-widest transition-all border-b-2 -mb-[1px] flex items-center gap-2
              ${activeTab === key
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
          >
            {label}
            <span className={`text-[9px] px-2 py-0.5 rounded-full font-black
              ${activeTab === key
                ? 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════
           TAB: ALL STUDENTS
         ══════════════════════════════════════════════════════════ */}
      {activeTab === TABS.ALL && (
        <div>
          {allLoading ? (
            <LoadingSpinner />
          ) : filteredAll.length === 0 ? (
            <EmptyState message={searchTerm ? 'No students match your search.' : 'No students registered on the platform yet.'} />
          ) : (
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 overflow-hidden shadow-xl shadow-indigo-500/5 dark:shadow-none">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Student</th>
                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hidden md:table-cell">Contact</th>
                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hidden sm:table-cell">Joined</th>
                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hidden lg:table-cell">Platform Courses</th>
                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                  {filteredAll.map((student) => (
                    <tr key={student._id} className="group hover:bg-slate-50/40 dark:hover:bg-slate-800/20 transition-colors">
                      {/* Student name + email */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <Avatar src={student.image} name={student.firstName} />
                          <div>
                            <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
                              {student.firstName} {student.lastName}
                            </p>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 mt-0.5">
                              <VscMail className="text-indigo-400" />
                              {student.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      {/* Contact */}
                      <td className="py-4 px-6 hidden md:table-cell">
                        <div className="space-y-0.5">
                          {student.contactNumber
                            ? <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400"><VscDeviceMobile />{student.contactNumber}</div>
                            : <span className="text-[10px] text-slate-300 dark:text-slate-600 font-bold">—</span>
                          }
                          {student.gender && (
                            <p className="text-[10px] font-bold text-slate-400 capitalize">{student.gender}</p>
                          )}
                        </div>
                      </td>
                      {/* Joined */}
                      <td className="py-4 px-6 hidden sm:table-cell">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                          <VscCalendar className="text-indigo-400" />
                          {student.joinedAt
                            ? new Date(student.joinedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                            : '—'
                          }
                        </div>
                      </td>
                      {/* Platform Courses */}
                      <td className="py-4 px-6 hidden lg:table-cell">
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-black">
                          {student.totalCoursesOnPlatform} course{student.totalCoursesOnPlatform !== 1 ? 's' : ''}
                        </span>
                      </td>
                      {/* Enrollment status */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1">
                          <EnrollmentBadge enrolled={student.isEnrolledWithMe} />
                          {student.isEnrolledWithMe && student.enrolledInMyCourses.length > 0 && (
                            <p className="text-[9px] font-bold text-slate-400 pl-0.5">
                              {student.enrolledInMyCourses.map(c => c.courseName).join(', ')}
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
           TAB: MY ENROLLED STUDENTS
         ══════════════════════════════════════════════════════════ */}
      {activeTab === TABS.ENROLLED && (
        <div>
          {enrolledLoading ? (
            <LoadingSpinner />
          ) : filteredEnrolled.length === 0 ? (
            <EmptyState message={searchTerm ? 'No enrolled students match your search.' : 'No students have enrolled in your courses yet.'} />
          ) : (
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 overflow-hidden shadow-xl shadow-indigo-500/5 dark:shadow-none">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Student</th>
                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hidden md:table-cell">Contact / ID</th>
                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Enrollments</th>
                    <th className="py-4 px-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                  {filteredEnrolled.map((student) => (
                    <React.Fragment key={student._id}>
                      <tr className="group hover:bg-slate-50/40 dark:hover:bg-slate-800/20 transition-colors">
                        {/* Student */}
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-3">
                            <Avatar src={student.image} name={student.firstName} />
                            <div>
                              <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
                                {student.firstName} {student.lastName}
                              </p>
                              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 mt-0.5">
                                <VscMail className="text-indigo-400" />{student.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        {/* Contact / ID */}
                        <td className="py-5 px-6 hidden md:table-cell">
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 tracking-wider">ID: {student._id}</p>
                            {student.contactNumber && (
                              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400"><VscDeviceMobile />{student.contactNumber}</div>
                            )}
                          </div>
                        </td>
                        {/* Enrollments count */}
                        <td className="py-5 px-6">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black">
                            {student.courses.length} course{student.courses.length !== 1 ? 's' : ''}
                          </span>
                        </td>
                        {/* Expand details */}
                        <td className="py-5 px-6 text-right">
                          <button
                            onClick={() => toggleStudent(student._id)}
                            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ml-auto"
                          >
                            Details
                            {expandedStudent === student._id ? <VscChevronUp /> : <VscChevronDown />}
                          </button>
                        </td>
                      </tr>

                      {/* Expanded row */}
                      {expandedStudent === student._id && (
                        <tr className="bg-slate-50/30 dark:bg-slate-900/30">
                          <td colSpan="4" className="px-8 py-8 animate-in slide-in-from-top-2 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              {/* Courses list */}
                              <div className="space-y-3">
                                <h4 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                                  <VscMortarBoard className="text-indigo-600" /> My Courses Enrolled
                                </h4>
                                {student.courses.map((course) => (
                                  <div key={course._id} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between group/course hover:border-indigo-500 transition-colors">
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{course.courseName}</span>
                                    <button
                                      onClick={() => setConfirmationModal({
                                        text1: "Remove Student?",
                                        text2: `Remove ${student.firstName} from "${course.courseName}"? This cannot be undone.`,
                                        btn1Text: "Remove",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => handleRemoveStudent(student._id, course._id),
                                        btn2Handler: () => setConfirmationModal(null),
                                      })}
                                      className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all ml-3 flex-shrink-0"
                                      title="Remove from course"
                                    >
                                      <VscTrash size={14} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                              {/* Snapshot */}
                              <div className="space-y-3">
                                <h4 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">✨ Student Snapshot</h4>
                                <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden">
                                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                                  <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">STATUS</p>
                                  <p className="text-lg font-black">Active Learner</p>
                                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                                    <div>
                                      <p className="text-[8px] font-black text-white/50 uppercase tracking-widest">GENDER</p>
                                      <p className="text-xs font-bold capitalize">{student.gender || 'Not specified'}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-[8px] font-black text-white/50 uppercase tracking-widest">COURSES</p>
                                      <p className="text-xs font-bold">{student.courses.length} enrolled</p>
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
          )}
        </div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  )
}

function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-5 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
      <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-3xl">👥</div>
      <div>
        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">No Students Found</h3>
        <p className="text-slate-500 font-bold max-w-xs mx-auto mt-1 text-sm">{message}</p>
      </div>
    </div>
  )
}

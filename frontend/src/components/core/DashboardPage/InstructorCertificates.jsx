import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { VscVerified, VscTrash, VscAdd, VscSearch } from 'react-icons/vsc'
import { toast } from 'react-hot-toast'
import { 
  getInstructorCertificates, 
  issueCertificate, 
  revokeCertificate 
} from '../../../services/operations/certificateAPI'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
import ConfirmationModal from '../../common/ConfirmationModal'

export default function InstructorCertificates() {
  const { token } = useSelector((state) => state.auth)
  const [certificates, setCertificates] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  
  // Manual Issuance State
  const [selectedCourse, setSelectedCourse] = useState("")
  const [studentId, setStudentId] = useState("") // In this app, we might need studentId or Email. 
  // For simplicity, let's assume we need studentId (which is common in the internal APIs) 
  // but a better UX would be email. Let's stick to userId for now as per controller.
  
  const dispatch = useDispatch()

  const fetchCertData = async () => {
    setLoading(true)
    const certs = await dispatch(getInstructorCertificates(token))
    const instrCourses = await fetchInstructorCourses(token)
    if (certs) setCertificates(certs)
    if (instrCourses) setCourses(instrCourses)
    setLoading(false)
  }

  useEffect(() => {
    fetchCertData()
    // eslint-disable-next-line
  }, [])

  const handleManualIssue = async () => {
    if (!selectedCourse || !studentId) {
      toast.error("Please select a course and enter Student ID")
      return
    }
    const success = await dispatch(issueCertificate(studentId, selectedCourse, token))
    if (success) {
      setStudentId("")
      setSelectedCourse("")
      fetchCertData()
    }
  }

  const handleRevoke = async (certificateId) => {
    const success = await dispatch(revokeCertificate(certificateId, token))
    if (success) {
      fetchCertData()
    }
    setConfirmationModal(null)
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
              CERTIFICATE ENGINE
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
            Credential Management
          </h1>
          <p className="text-base font-bold text-slate-500 dark:text-slate-400">
            Issue, verify, and manage certificates for your graduates.
          </p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl shadow-xl shadow-indigo-600/20">
          <VscVerified />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Manual Issuance Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-8 shadow-xl shadow-indigo-500/5 dark:shadow-none relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-600/[0.03] rounded-full blur-2xl"></div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <VscAdd />
              </span>
              Manual Issue
            </h2>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">SELECT COURSE</label>
                <select 
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">Select a Course</option>
                  {courses.map(course => (
                    <option key={course._id} value={course._id}>{course.courseName}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">STUDENT ID (OBJECT ID)</label>
                <div className="relative">
                  <VscSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Enter User ID..."
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                </div>
              </div>

              <button 
                onClick={handleManualIssue}
                className="w-full py-4 rounded-xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 text-xs uppercase tracking-[0.2em] mt-2 active:scale-95"
              >
                Issue Certificate
              </button>
            </div>
            
            <div className="mt-8 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50">
               <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 leading-relaxed uppercase tracking-widest text-center">
                 Issuing manually bypasses automatic completion checks.
               </p>
            </div>
          </div>
        </div>

        {/* Issued Certificates Table */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-8 shadow-xl shadow-indigo-500/5 dark:shadow-none">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Issued Credentials</h2>
              <span className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">
                {certificates.length} TOTAL
              </span>
            </div>

            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="w-10 h-10 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
              </div>
            ) : certificates.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-3xl">📭</div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">No Certificates Issued</h3>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Issued credentials for your courses will appear here.</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <th className="py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">STUDENT</th>
                      <th className="py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">COURSE</th>
                      <th className="py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">ID / DATE</th>
                      <th className="py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                    {certificates.map((cert) => (
                      <tr key={cert._id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                        <td className="py-5">
                          <div className="flex items-center gap-3">
                            <img src={cert.userId?.image} alt="" className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-600/10" />
                            <div>
                              <p className="text-sm font-black text-slate-900 dark:text-white line-clamp-1">
                                {cert.userId?.firstName} {cert.userId?.lastName}
                              </p>
                              <p className="text-[10px] font-bold text-slate-400 line-clamp-1">{cert.userId?.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-5">
                          <p className="text-xs font-black text-slate-700 dark:text-slate-300 line-clamp-1 max-w-[150px]">
                            {cert.courseId?.courseName}
                          </p>
                        </td>
                        <td className="py-5">
                          <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 tracking-wider mb-0.5">#{cert.certificateNumber}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {new Date(cert.issuedAt).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="py-5 text-right">
                          <button 
                            onClick={() => setConfirmationModal({
                              text1: "Revoke Certificate?",
                              text2: "This action is permanent. The student will lose access to this credential immediately.",
                              btn1Text: "Revoke",
                              btn2Text: "Cancel",
                              btn1Handler: () => handleRevoke(cert._id),
                              btn2Handler: () => setConfirmationModal(null),
                            })}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                          >
                            <VscTrash size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiConnector } from '../../../services/apiConnector'
import { certificateEndpoints } from '../../../services/apis'
import { RiDeleteBin6Line } from "react-icons/ri"
import { FiSearch } from "react-icons/fi"
import ConfirmationModal from "../../common/ConfirmationModal"
import toast from "react-hot-toast"

export default function InstructorCertificates() {
  const { token } = useSelector((state) => state.auth)
  const [certs, setCerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchCerts = React.useCallback(async () => {
    setLoading(true)
    try {
      const res = await apiConnector("GET", certificateEndpoints.INSTRUCTOR_CERTIFICATES_API, null, {
        Authorization: `Bearer ${token}`,
      })
      if (res?.data?.success) {
        setCerts(res.data.data)
      }
    } catch (error) {
      console.error("Error fetching certificates:", error)
      toast.error("Failed to load credentials")
    }
    setLoading(false)
  }, [token])

  useEffect(() => {
    fetchCerts()
  }, [fetchCerts])

  const handleDelete = async (certificateId) => {
    try {
      const res = await apiConnector("DELETE", `${certificateEndpoints.DELETE_CERTIFICATE_API}/${certificateId}`, null, {
        Authorization: `Bearer ${token}`,
      })
      if (res?.data?.success) {
        toast.success("Certificate Revoked")
        fetchCerts()
      }
    } catch (error) {
      toast.error("Could not revoke certificate")
    }
    setConfirmationModal(null)
  }

  const filteredCerts = certs.filter(c => 
    c.completionSnapshot.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.courseId.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='space-y-8 animate-in fade-in duration-700'>
      <header className="space-y-3 pb-8 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className='space-y-1'>
           <div className="flex items-center gap-2 mb-1">
             <span className="px-2 py-0.5 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest">
               REGISTRY MANAGEMENT
             </span>
           </div>
           <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Certificate Registry</h1>
           <p className="text-base font-bold text-slate-500 dark:text-slate-400">Inventory of all professional credentials issued to your students.</p>
        </div>
        
        <div className="relative group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by student, ID, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-11 pr-6 py-3 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all text-sm font-bold w-full md:w-[320px]"
          />
        </div>
      </header>

      {loading ? (
        <div className="grid place-items-center min-h-[40vh]">
          <div className="spinner"></div>
        </div>
      ) : filteredCerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] bg-slate-50/50 dark:bg-slate-900/20 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800 p-12 text-center">
           <div className='w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl mb-4'>📜</div>
           <p className="text-xl font-black text-slate-900 dark:text-white mb-2">Registry is Empty</p>
           <p className="text-sm font-bold text-slate-500 dark:text-slate-400 max-w-sm">No certificates have been issued yet. They will appear here automatically when students complete your courses.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl shadow-indigo-500/5">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Student</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Course Context</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Credential ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Issuance Date</th>
                <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100 dark:divide-slate-800'>
              {filteredCerts.map((c) => (
                <tr key={c._id} className="group hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-all duration-300">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <img src={c.userId?.image} className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-800" alt="Student" />
                      <div className='space-y-0.5'>
                        <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">{c.completionSnapshot.userName}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{c.userId?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className='space-y-0.5'>
                       <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-tight">{c.courseId?.courseName}</p>
                       <p className='text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-[0.12em]'>Verified Mastery</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <code className="text-[11px] font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                      {c.certificateNumber}
                    </code>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-slate-500">
                      {new Date(c.issuedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button
                      onClick={() => setConfirmationModal({
                        text1: "Revoke Credential?",
                        text2: "This will permanently invalidate this certificate Number. The student will lose their verified status for this course.",
                        btn1Text: "Revoke Certificate",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDelete(c._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })}
                      className="p-3 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm opacity-40 group-hover:opacity-100"
                    >
                      <RiDeleteBin6Line size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

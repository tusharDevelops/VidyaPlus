import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { apiConnector } from "../../../services/apiConnector"
import { certificateEndpoints } from "../../../services/apis"
import { Link } from "react-router-dom"

export default function Certificates() {
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(true)
  const [certs, setCerts] = useState([])

  useEffect(() => {
    const run = async () => {
      try {
        const res = await apiConnector("GET", certificateEndpoints.MY_CERTIFICATES_API, null, {
          Authorization: `Bearer ${token}`,
        })
        if (res?.data?.success) {
          setCerts(res.data.data || [])
        }
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [token])

  if (loading) return <div className="text-richblack-5">Loading...</div>

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Certificates</h1>
        <p className="text-lg font-medium text-slate-500 dark:text-slate-400">Your earned course completion certificates.</p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6">
        {certs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/20 p-12 text-center">
            <div className="text-2xl mb-4">📜</div>
            <p className="text-xl font-bold text-slate-600 dark:text-slate-400">No certificates earned yet.</p>
            <p className="text-sm text-slate-400 mt-2">Complete your courses to unlock your professional certifications!</p>
          </div>
        ) : (
          certs.map((c) => (
            <div
              key={c._id}
              className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-800/40 backdrop-blur-md p-8 shadow-sm hover:shadow-indigo-500/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
                    <span className="text-2xl">🎓</span>
                 </div>
                 <div className="space-y-1">
                   <p className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                     {c?.completionSnapshot?.courseName}
                   </p>
                   <div className="flex items-center gap-3">
                     <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                       Issued: {c?.issuedAt ? new Date(c.issuedAt).toLocaleDateString() : "-"}
                     </span>
                     <span className="h-1 w-1 rounded-full bg-slate-400"></span>
                     <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400">
                        #{c.certificateNumber}
                     </span>
                   </div>
                 </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <Link
                  to={`/certificate/${c.certificateNumber}`}
                  className="flex-1 md:flex-none text-center px-6 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                >
                  View
                </Link>
                <Link
                  to={`/verify-certificate`}
                  className="flex-1 md:flex-none text-center px-6 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                >
                  Verify
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}


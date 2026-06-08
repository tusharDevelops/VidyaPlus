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
          <div className="rounded-hero border border-dashed border-hairline bg-slate-50/50 dark:bg-slate-800/20 p-12 text-center">
            <div className="text-2xl mb-4">📜</div>
            <p className="text-xl font-bold text-slate-600 dark:text-slate-400">No certificates earned yet.</p>
            <p className="text-sm text-slate-400 mt-2">Complete your courses to unlock your professional certifications!</p>
          </div>
        ) : (
          certs.map((c) => (
            <div
              key={c._id}
              className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-hero border border-hairline bg-white/50 dark:bg-slate-800/40 p-8 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 rounded-2xl bg-brand-coral flex items-center justify-center shadow-sm">
                    <span className="text-2xl">🎓</span>
                 </div>
                 <div className="space-y-1">
                   <p className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-coral transition-colors">
                     {c?.completionSnapshot?.courseName}
                   </p>
                   <div className="flex items-center gap-3">
                     <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                       Issued: {c?.issuedAt ? new Date(c.issuedAt).toLocaleDateString() : "-"}
                     </span>
                     <span className="h-1 w-1 rounded-full bg-slate-400"></span>
                     <span className="text-xs font-bold text-brand-coral">
                        #{c.certificateNumber}
                     </span>
                   </div>
                 </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <Link
                  to={`/certificate/${c.certificateNumber}`}
                  className="flex-1 md:flex-none text-center px-6 py-2 btn-primary"
                >
                  View
                </Link>
                <Link
                  to={`/verify-certificate`}
                  className="flex-1 md:flex-none text-center px-6 py-2 btn-secondary"
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


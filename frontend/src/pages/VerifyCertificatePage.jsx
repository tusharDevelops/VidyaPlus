import { useState } from "react"
import { apiConnector } from "../services/apiConnector"
import { certificateEndpoints } from "../services/apis"

export default function VerifyCertificatePage() {
  const [certificateNumber, setCertificateNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")

  const verify = async (e) => {
    e.preventDefault()
    setError("")
    setResult(null)
    if (!certificateNumber.trim()) return

    setLoading(true)
    try {
      const res = await apiConnector("POST", certificateEndpoints.VERIFY_CERTIFICATE_API, {
        certificateNumber: certificateNumber.trim(),
      })
      if (!res?.data?.success) {
        throw new Error(res?.data?.message || "Verification failed")
      }
      setResult(res.data.data)
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Certificate not found")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <div className="mx-auto w-11/12 max-w-[720px] pt-24 pb-20">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Verify Certificate</h1>
        <p className="mt-4 text-lg font-medium text-slate-600 dark:text-slate-400">
          Enter your unique certificate number to verify its authenticity and details.
        </p>

        <form onSubmit={verify} className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <input
            value={certificateNumber}
            onChange={(e) => setCertificateNumber(e.target.value)}
            placeholder="e.g. VP-2026-AB12CD34EF"
            className="form-style w-full sm:flex-1"
          />
          <button
            disabled={loading || !certificateNumber.trim()}
            className="yellowButton w-full sm:w-fit"
            type="submit"
          >
            {loading ? "Verifying..." : "Verify Certificate"}
          </button>
        </form>

        {error ? (
          <div className="mt-10 rounded-2xl border border-rose-200 dark:border-rose-900/30 bg-rose-50 dark:bg-rose-900/10 p-5 text-rose-700 dark:text-rose-400 font-medium">
            {error}
          </div>
        ) : null}

        {result ? (
          <div className="mt-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 p-8 shadow-xl shadow-indigo-500/5 backdrop-blur-sm animate-fadeInScale">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">Authentic Certificate</p>
            </div>
            
            <div className="grid gap-6 text-slate-900 dark:text-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-b border-slate-100 dark:border-slate-700/50 pb-4">
                <span className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest">Certificate Number</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{result.certificateNumber}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-b border-slate-100 dark:border-slate-700/50 pb-4">
                <span className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest">Student Name</span>
                <span className="font-bold">{result.userName}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-b border-slate-100 dark:border-slate-700/50 pb-4">
                <span className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest">Course Completed</span>
                <span className="font-bold">{result.courseName}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <span className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest">Issued On</span>
                <span className="font-medium">{new Date(result.issuedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}


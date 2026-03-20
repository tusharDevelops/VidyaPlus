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
    <div className="mx-auto w-11/12 max-w-[720px] py-12 text-richblack-5">
      <h1 className="text-3xl font-semibold">Verify Certificate</h1>
      <p className="mt-2 text-richblack-200">
        Enter the certificate number to verify authenticity.
      </p>

      <form onSubmit={verify} className="mt-6 flex flex-col gap-3">
        <input
          value={certificateNumber}
          onChange={(e) => setCertificateNumber(e.target.value)}
          placeholder="e.g. VP-2026-AB12CD34EF"
          className="w-full rounded-md bg-richblack-800 p-3 text-richblack-5 outline-none ring-1 ring-richblack-700 focus:ring-2 focus:ring-yellow-50"
        />
        <button
          disabled={loading || !certificateNumber.trim()}
          className="yellowButton w-fit"
          type="submit"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {error ? (
        <div className="mt-6 rounded-md border border-pink-400/30 bg-pink-500/10 p-4 text-pink-200">
          {error}
        </div>
      ) : null}

      {result ? (
        <div className="mt-6 rounded-md border border-richblack-700 bg-richblack-800 p-5">
          <p className="text-lg font-semibold text-green-200">Valid certificate</p>
          <div className="mt-3 grid gap-2 text-richblack-50">
            <div>
              <span className="text-richblack-300">Certificate Number: </span>
              {result.certificateNumber}
            </div>
            <div>
              <span className="text-richblack-300">Student: </span>
              {result.userName}
            </div>
            <div>
              <span className="text-richblack-300">Course: </span>
              {result.courseName}
            </div>
            <div>
              <span className="text-richblack-300">Issued At: </span>
              {new Date(result.issuedAt).toLocaleString()}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}


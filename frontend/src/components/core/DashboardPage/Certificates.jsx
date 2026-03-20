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
    <div className="text-richblack-5">
      <h1 className="text-2xl font-semibold">Certificates</h1>
      <p className="mt-1 text-richblack-200">Your earned course completion certificates.</p>

      <div className="mt-6 grid gap-4">
        {certs.length === 0 ? (
          <div className="rounded-md border border-richblack-700 bg-richblack-800 p-4 text-richblack-200">
            No certificates yet.
          </div>
        ) : (
          certs.map((c) => (
            <div
              key={c._id}
              className="flex flex-col gap-2 rounded-md border border-richblack-700 bg-richblack-800 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{c?.completionSnapshot?.courseName}</p>
                  <p className="text-sm text-richblack-300">
                    Issued: {c?.issuedAt ? new Date(c.issuedAt).toLocaleDateString() : "-"}
                  </p>
                </div>
                <div className="flex gap-4">
                  <Link
                    to={`/certificate/${c.certificateNumber}`}
                    className="text-sm font-medium text-yellow-50 underline"
                  >
                    View
                  </Link>
                  <Link
                    to={`/verify-certificate`}
                    className="text-sm font-medium text-richblack-300 underline"
                  >
                    Verify
                  </Link>
                </div>
              </div>

              <div className="text-sm text-richblack-50">
                <span className="text-richblack-300">Certificate Number: </span>
                {c.certificateNumber}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}


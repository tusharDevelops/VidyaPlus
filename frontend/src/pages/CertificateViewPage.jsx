import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { apiConnector } from "../services/apiConnector"
import { certificateEndpoints } from "../services/apis"
import { IoIosArrowBack, IoIosPrint } from "react-icons/io"
import logo from "../assets/Logo/vidyaplus-removebg-preview.png"

export default function CertificateViewPage() {
  const { certificateId } = useParams()
  const [loading, setLoading] = useState(true)
  const [cert, setCert] = useState(null)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCert = async () => {
      try {
        // We'll use the verify endpoint for public/easy access since we have the ID
        // Or if we have a specific "get by ID" we can use that.
        // For now, let's assume we can fetch it via a specific endpoint or verify.
        // Actually, getMyCertificates returns the list. Let's see if we need a new endpoint.
        // Since we're in the student dashboard context, we can fetch all and filter,
        // or just use the verify logic if it takes the ID.
        
        // Let's use the verify endpoint but we need the certificateNumber. 
        // If the URL has certificateNumber instead of ID, it's easier.
        // Let's assume the param is certificateNumber.
        
        const res = await apiConnector("POST", certificateEndpoints.VERIFY_CERTIFICATE_API, {
          certificateNumber: certificateId,
        })
        
        if (res?.data?.success) {
          setCert(res.data.data)
        } else {
          setError("Certificate not found")
        }
      } catch (err) {
        setError("Invalid or expired certificate")
      } finally {
        setLoading(false)
      }
    }
    fetchCert()
  }, [certificateId])

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center text-richblack-5">
        <div className="spinner"></div>
      </div>
    )
  }

  if (error || !cert) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center text-richblack-5">
        <div className="text-center">
          <p className="text-3xl font-semibold mb-4 text-pink-200">Oops! {error}</p>
          <button onClick={() => navigate(-1)} className="yellowButton">Go Back</button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-12">
      {/* Back Button and Print (Hidden on print) */}
      <div className="mb-8 flex items-center justify-between no-print">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-richblack-300 hover:text-richblack-5 transition-all"
        >
          <IoIosArrowBack /> Back to Dashboard
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-md bg-yellow-50 px-5 py-2 font-semibold text-richblack-900 hover:scale-95 transition-all"
        >
          <IoIosPrint /> Print Certificate
        </button>
      </div>

      {/* Certificate Container */}
      <div className="relative overflow-hidden rounded-lg border-[12px] border-double border-yellow-50 bg-white p-12 text-center shadow-2xl certificate-layout">
        {/* Decorative Corner Elements */}
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full border-4 border-yellow-50 opacity-10"></div>
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full border-4 border-yellow-50 opacity-10"></div>
        
        {/* Header */}
        <div className="mb-10">
          <img src={logo} alt="VidyaPlus" className="mx-auto mb-4 h-12 grayscale brightness-0" />
          <h1 className="font-serif text-3xl font-bold uppercase tracking-[0.2em] text-richblack-900">
            Certificate
          </h1>
          <p className="text-xl font-medium uppercase tracking-[0.3em] text-richblack-600">
            of Completion
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <p className="text-xl italic text-richblack-700">This is to certify that</p>
          
          <h2 className="border-b-2 border-richblack-900 pb-2 font-serif text-2xl font-bold text-richblack-900">
            {cert.userName}
          </h2>
          
          <p className="text-lg text-richblack-700">
            has successfully completed the premium online course
          </p>
          
          <h3 className="text-3xl font-bold text-yellow-100 mix-blend-difference">
            {cert.courseName}
          </h3>
          
          <p className="mx-auto max-w-[600px] text-sm leading-relaxed text-richblack-500">
            demonstrating exceptional dedication, skill acquisition, and mastery of the core concepts 
            outlined in the curriculum of VidyaPlus. This achievement marks a significant milestone 
            in their academic and professional journey.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 flex items-end justify-between border-t border-richblack-100 pt-8">
          <div className="text-left">
            <p className="text-xs uppercase tracking-widest text-richblack-400">Issued On</p>
            <p className="font-bold text-richblack-900">
              {new Date(cert.issuedAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          
          <div className="text-center">
             <div className="mb-1 h-12 w-48 border-b border-richblack-900 flex items-end justify-center">
                <p className="font-serif text-xl italic text-richblack-900 opacity-80">VidyaPlus Team</p>
             </div>
             <p className="text-[10px] uppercase tracking-widest text-richblack-400">Authorized Signature</p>
          </div>

          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-richblack-400">Certificate ID</p>
            <p className="font-mono font-bold text-richblack-900">{cert.certificateNumber}</p>
          </div>
        </div>

        {/* Logo Mark */}
        <div className="mt-12 opacity-20">
            <p className="text-[8px] uppercase tracking-[0.5em] text-richblack-900">VidyaPlus - Empowering Future Leaders</p>
        </div>
      </div>

      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background-color: white !important;
          }
          .certificate-layout {
            box-shadow: none !important;
            border-width: 8px !important;
            margin: 0 !important;
            width: 100% !important;
          }
        }
        .certificate-layout {
           font-family: 'Inter', sans-serif;
           background-image: 
            radial-gradient(circle at 2px 2px, rgba(0,0,0,0.02) 1px, transparent 0);
           background-size: 24px 24px;
        }
      `}</style>
    </div>
  )
}

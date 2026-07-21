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
  const [isPending, setIsPending] = useState(false)
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
        if (err.response?.data?.isPending) {
           setIsPending(true)
        } else {
           setError("Invalid or expired certificate")
        }
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

  if (isPending) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center text-richblack-5 bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
        <div className="text-center bg-white dark:bg-slate-800 p-12 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 backdrop-blur-xl max-w-lg min-h-[400px] flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-[2rem] bg-amber-500/10 flex items-center justify-center text-5xl mb-6 shadow-inner animate-pulse">⏳</div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Awaiting Final Issuance</h2>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            Congratulations on completing the course! Your certificate has been recorded and is currently in the draft stage. 
            Final issuance rights remain with your instructor. You will be able to view and print your certificate as soon as they authorize it.
          </p>
          <button onClick={() => navigate(-1)} className="px-8 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 dark:hover:bg-slate-600 transition-all cursor-pointer">Return to Dashboard</button>
        </div>
      </div>
    )
  }

  if (error || !cert) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center text-richblack-5">
        <div className="text-center">
          <p className="text-3xl font-semibold mb-4 text-pink-200">Oops! {error}</p>
          <button onClick={() => navigate(-1)} className="yellowButton cursor-pointer">Go Back</button>
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
      <div className="relative overflow-hidden bg-white p-16 text-center shadow-2xl certificate-layout w-full max-w-[1000px] aspect-[1.414/1] flex flex-col justify-between">
        
        {/* Background Corners & Borders */}
        <div className="absolute inset-4 border border-[#d4af37] z-10 pointer-events-none"></div>
        
        {/* Top Left Decoration (Blue & Gold curve) */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#0a2342] rounded-br-[100%] z-0 -translate-x-12 -translate-y-12"></div>
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#d4af37] opacity-40 rounded-br-[100%] z-0 -translate-x-16 -translate-y-16"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#f5f0e1] opacity-50 rounded-br-[100%] z-0 -translate-x-20 -translate-y-20"></div>
        
        {/* Bottom Right Decoration (Gold curves) */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#d4af37] opacity-30 rounded-tl-[100%] z-0 translate-x-12 translate-y-12"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f5f0e1] opacity-60 rounded-tl-[100%] z-0 translate-x-20 translate-y-20"></div>

        {/* Top Left Gold Seal/Ribbon SVG */}
        <div className="absolute top-12 left-12 z-20">
          <svg width="80" height="120" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ribbon Tails */}
            <path d="M20 70 L20 140 L50 120 L80 140 L80 70 Z" fill="#d4af37" opacity="0.8"/>
            <path d="M30 70 L30 130 L50 115 L70 130 L70 70 Z" fill="#b89326"/>
            {/* Gold Seal Base */}
            <circle cx="50" cy="50" r="45" fill="url(#goldGrad)" stroke="#eedc82" strokeWidth="2"/>
            {/* Inner Ring */}
            <circle cx="50" cy="50" r="35" stroke="#eedc82" strokeWidth="1" strokeDasharray="3 3"/>
            {/* Starburst/Ridges */}
            <path d="M50 10 L54 18 L62 14 L62 23 L71 23 L68 31 L76 35 L70 42 L77 48 L70 54 L75 62 L66 64 L67 73 L58 72 L54 80 L46 80 L42 72 L33 73 L34 64 L25 62 L30 54 L23 48 L30 42 L24 35 L32 31 L29 23 L38 23 L38 14 L46 18 Z" fill="#d4af37" opacity="0.5"/>
            <defs>
              <radialGradient id="goldGrad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                <stop offset="0%" stopColor="#fff8cc"/>
                <stop offset="50%" stopColor="#d4af37"/>
                <stop offset="100%" stopColor="#8a7322"/>
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Top Right Certificate No */}
        <div className="absolute top-16 right-16 z-20 text-right">
          <p className="font-bold text-[#0a2342] text-sm tracking-wide font-sans">
            Certificate No. {cert.certificateNumber}
          </p>
        </div>

        {/* Header content */}
        <div className="relative z-20 pt-4 flex flex-col items-center">
          <div className="flex flex-col items-center mb-4">
             <span className="text-3xl font-black tracking-widest text-[#0a2342] font-serif uppercase">
                Vidya<span className="text-red-600">+</span>
             </span>
             <img src={logo} alt="VidyaPlus Feather" className="h-14 object-contain drop-shadow-md" />
          </div>
          <h1 className="font-serif text-[3.5rem] font-medium tracking-wide text-[#0a2342] leading-none mb-2">
            CERTIFICATE
          </h1>
          <p className="text-xl font-medium tracking-[0.2em] text-[#0a2342] mb-8 font-sans">
            OF COMPLETION
          </p>
          <p className="text-lg text-[#333333] font-sans font-medium">
            This certificate is proudly presented to
          </p>
        </div>

        {/* Recipient Name */}
        <div className="relative z-20 w-full px-20 my-2">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex-1 h-[1px] bg-slate-400"></div>
            <h2 className="font-serif text-[3.5rem] font-bold text-[#14476a] whitespace-nowrap px-8 drop-shadow-sm">
              {cert.userName}
            </h2>
            <div className="flex-1 h-[1px] bg-slate-400"></div>
          </div>
        </div>

        {/* Certificate Body */}
        <div className="relative z-20 px-24 mb-4">
          <p className="text-[1.1rem] leading-relaxed text-[#333333] font-sans whitespace-pre-wrap">
            {cert.customMessage || `This is to certify that ${cert.userName} has successfully completed the ${cert.courseName} course at Vidya+ Academy. They have demonstrated an exceptional understanding of the curriculum and mastery of the core concepts during the period ending on ${new Date(cert.issuedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.`}
          </p>
        </div>

        {/* Footer Area */}
        <div className="relative z-20 flex justify-between items-end px-16 pb-8 w-full mt-auto">
          {/* QR Code Placeholder */}
          <div className="flex flex-col items-start">
             <img 
               src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${window.location.href}`} 
               alt="Verify Certificate" 
               className="w-24 h-24 border-4 border-white shadow-md bg-white rounded-md"
             />
             <p className="text-[0.6rem] text-slate-500 mt-2 font-mono uppercase tracking-wider">Scan to Verify</p>
          </div>

          {/* Signature */}
          <div className="flex flex-col items-center">
             <div className="mb-2 h-16 w-48 flex items-end justify-center border-b-[1.5px] border-slate-800">
                {cert.signatureUrl ? (
                   <img src={cert.signatureUrl} alt="Signature" className="max-h-full object-contain mb-1" />
                ) : (
                   <span className="font-serif text-3xl text-[#0a2342] opacity-80" style={{fontFamily: "'Brush Script MT', cursive"}}>{cert.issuerName || "VidyaPlus Team"}</span>
                )}
             </div>
             <p className="font-bold text-[#0a2342] text-lg font-sans">{cert.issuerName || "VidyaPlus Team"}</p>
             <p className="text-sm text-slate-600 font-sans tracking-wide">Authorized Issuer</p>
          </div>
        </div>

      </div>

      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background-color: white !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .certificate-layout {
            box-shadow: none !important;
            border-width: 0 !important;
            margin: 0 auto !important;
            width: 100% !important;
            height: auto !important;
            page-break-after: avoid;
            page-break-inside: avoid;
          }
        }
        .certificate-layout {
           font-family: 'Inter', sans-serif;
           background-color: #ffffff;
        }
      `}</style>
    </div>
  )
}

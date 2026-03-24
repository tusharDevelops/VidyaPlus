import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { apiConnector } from "../../../../services/apiConnector"
import { FiUpload } from "react-icons/fi"
import { setStep, setCourse } from "../../../../redux/slices/courseSlice"
import IconBtn from "../../../common/IconBtn"
import { MdNavigateNext } from "react-icons/md"

export default function CertificateEditor() {
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [previewSignature, setPreviewSignature] = useState(course?.certificateSettings?.signatureUrl || null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      enabled: course?.certificateSettings?.enabled ?? true,
      issuerName: course?.certificateSettings?.issuerName || "",
      customMessage: course?.certificateSettings?.customMessage || "",
    },
  })

  const isEnabled = watch("enabled")

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setValue("signatureImage", file)
      const reader = new FileReader()
      reader.onloadend = () => setPreviewSignature(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    const formData = new FormData()
    formData.append("courseId", course._id)
    formData.append("certificateSettings", JSON.stringify({
      enabled: data.enabled,
      issuerName: data.issuerName,
      customMessage: data.customMessage,
    }))
    
    if (data.signatureImage) {
      formData.append("signatureImage", data.signatureImage)
    }

    try {
      const response = await apiConnector("POST", "/api/v1/course/editCourse", formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      if (response.data.success) {
        dispatch(setCourse(response.data.data))
        dispatch(setStep(4))
      }
    } catch (error) {
      console.error("Error updating certificate settings:", error)
    }
    setLoading(false)
  }

  const goBack = () => {
    dispatch(setStep(2))
  }



  return (
    <div className='space-y-6 sm:space-y-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-4 sm:p-8 shadow-2xl shadow-indigo-500/5 dark:shadow-none animate-in fade-in duration-700'>
      <header className="space-y-1 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-1">
           <span className="px-2 py-0.5 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest">
             STEP 03
           </span>
        </div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Credential Engineering</h2>
        <p className="text-sm sm:text-base font-bold text-slate-500 dark:text-slate-400">Define the recognition for course mastery.</p>
      </header>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Toggle Enabled */}
        <div className="p-4 sm:p-6 rounded-2xl bg-indigo-600/[0.02] dark:bg-indigo-400/[0.01] border border-indigo-600/10 shadow-inner">
          <label className="inline-flex items-center cursor-pointer gap-x-3 group">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id="enabled"
                {...register("enabled")}
                className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 checked:bg-indigo-600 checked:border-indigo-600 transition-all duration-500 shadow-sm"
              />
              <svg className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-all duration-500 scale-50 peer-checked:scale-100 pointer-events-none left-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div>
              <span className="text-base font-black text-slate-900 dark:text-white transition-colors tracking-tight">Enable Professional Certification</span>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">Automated issuance upon full completion</p>
            </div>
          </label>
        </div>

        {isEnabled && (
          <div className="space-y-6 pt-4 animate-in slide-in-from-top-4 duration-500">
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1">
                Authorized Issuer <sup className="text-red-500 font-bold">*</sup>
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Training Center / Senior Instructor"
                {...register("issuerName", { required: isEnabled })}
                className="form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 transition-all py-3 px-4 rounded-xl font-bold text-sm text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1">
                Motivational Endorsement
              </label>
              <textarea
                placeholder="Congratulations on completing the advanced module..."
                {...register("customMessage")}
                rows={3}
                className="form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 transition-all py-3 px-4 rounded-xl font-bold text-sm text-slate-900 dark:text-white resize-none"
              />
            </div>

            <div className="flex flex-col space-y-3">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1">
                Authentication Signature
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <label className="cursor-pointer bg-slate-50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center w-full sm:w-48 h-32 hover:border-indigo-600/30 transition-all group/upload">
                  <FiUpload className="text-2xl text-slate-300 dark:text-slate-700 group-hover/upload:text-indigo-600 transition-colors mb-2" />
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Upload Key</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                {previewSignature && (
                  <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-sm transition-all animate-in zoom-in duration-500 h-32 w-full sm:w-64 flex items-center justify-center overflow-hidden">
                    <img
                      src={previewSignature}
                      alt="Signature Preview"
                      className="max-h-full max-w-full object-contain grayscale brightness-75 contrasts-125"
                    />
                  </div>
                )}
              </div>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.15em] px-1">Optimum results with transparent PNG (Dark Ink)</p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center justify-center gap-x-2 rounded-xl bg-slate-100 dark:bg-slate-800 py-3 px-8 font-black text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 w-full sm:w-auto"
          >
            Back
          </button>
          <IconBtn 
            disabled={loading} 
            text={loading ? "Synchronizing..." : "Next Stage"} 
            type="submit"
            customClasses="w-full sm:w-auto px-8 py-3 rounded-xl shadow-2xl shadow-indigo-600/20 text-[10px] font-black uppercase tracking-widest flex justify-center"
          >
            <MdNavigateNext className="text-xl" />
          </IconBtn>
        </div>
      </form>
    </div>
  )
}

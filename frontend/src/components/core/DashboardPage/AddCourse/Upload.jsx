import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"

import "video-react/dist/video-react.css"
import { Player } from "video-react"

function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  pdf = false,
  viewData = null,
  editData = null,
}) {

  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: pdf
      ? { "application/pdf": [".pdf"] }
      : video
      ? { "video/*": [".mp4"] }
      : { "image/*": [".jpeg", ".jpg", ".png"] },
    onDrop,
  })

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  useEffect(() => {
    register(name, { required: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register])

  useEffect(() => {
    setValue(name, selectedFile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile, setValue])

  return (
  <div className="flex flex-col space-y-4">
      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]" htmlFor={name}>
        {label} {!viewData && <sup className="text-red-500 font-bold">*</sup>}
      </label>

      <div
        className={`${
          isDragActive ? "bg-indigo-600/5 ring-4 ring-indigo-600/10 border-indigo-600" : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800"
        } flex min-h-[320px] cursor-pointer items-center justify-center rounded-[2.5rem] border-2 border-dashed backdrop-blur-xl transition-all duration-500 hover:border-indigo-600 group relative overflow-hidden`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-10 animate-in fade-in zoom-in-95 duration-500">
            {pdf ? (
              <div className="flex flex-col items-center gap-6 py-10">
                <div className="w-16 h-16 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-2xl shadow-2xl shadow-indigo-600/30 group-hover:scale-110 transition-transform duration-500">
                   📄
                </div>
                <div className="text-center space-y-1">
                   <p className="text-slate-900 dark:text-white font-black text-xl tracking-tight leading-tight">
                     {selectedFile?.name || "Document Ready"}
                   </p>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Portable Document Format</p>
                </div>
                <button
                  type="button"
                  className="px-8 py-3 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 transform hover:-translate-y-1"
                  onClick={() => window.open(previewSource, "_blank")}
                >
                  Inspect Content
                </button>
              </div>
            ) : video ? (
              <div className="rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-black aspect-video">
                 <Player aspectRatio="16:9" playsInline src={previewSource} />
              </div>
            ) : (
              <div className="relative group overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl aspect-video">
                <img
                  src={previewSource}
                  alt="Preview"
                  className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-8 self-center text-xs font-black text-slate-400 hover:text-red-500 transition-all uppercase tracking-widest flex items-center gap-2 group/btn"
              >
                <span className="w-6 h-[1px] bg-slate-200 dark:bg-slate-800 group-hover/btn:bg-red-500 transition-colors"></span>
                Modify Media
                <span className="w-6 h-[1px] bg-slate-200 dark:bg-slate-800 group-hover/btn:bg-red-500 transition-colors"></span>
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col items-center p-8 text-center group"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div className="relative">
               <div className="absolute inset-0 bg-indigo-600/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <div className="relative grid aspect-square w-24 place-items-center rounded-[2rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20 transform group-hover:-translate-y-2 transition-transform duration-500">
                 <FiUploadCloud className="text-2xl" />
               </div>
            </div>
            
            <div className="mt-10 space-y-2">
               <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Deploy your {pdf ? "Module Notes" : video ? "Lecture Video" : "Course Artwork"}
               </p>
               <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                 Drag and drop the asset or <span className="text-indigo-600 dark:text-indigo-400 font-black cursor-pointer hover:underline underline-offset-4">Internal Browse</span>
               </p>
            </div>

            {!pdf && (
              <div className="mt-10 flex gap-4 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-2xl border border-slate-100 dark:border-slate-800">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-3 py-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">16:9 RATIO</span>
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-3 py-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">1024x576 REQ</span>
              </div>
            )}
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
          This artifact is mandatory for the curriculum
        </span>
      )}
    </div>
  );
}

export default Upload;
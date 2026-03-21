import React, { useRef, useState,useEffect } from 'react'
import IconBtn from '../../../common/IconBtn'
import { useDispatch, useSelector } from 'react-redux'
import { FiUpload } from "react-icons/fi"
import { updateDisplayPicture } from '../../../../services/operations/settingAPI'
import toast from 'react-hot-toast'




export default function ChangeProfilePicture() {

  const{user}=useSelector((state)=>state.profile)
  const{token}=useSelector((state)=>state.auth)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef()
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)
  const dispatch = useDispatch()
  const [selectimgFlag, setSelectimgFlag] = useState(false)

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }


  function handleFileChange(e){
    const file = e.target.files[0];
    setSelectimgFlag(true)
    //console.log(file)
    if (file) {
      setImageFile(file)
      previewFile(file)
      
    }
  }

  function handleFileUploadDB(){

    if(!selectimgFlag){
      toast.error("🤭hmmm... too much hurry, please select image first")
      return;

    }

    try {
      //console.log("uploading")
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      dispatch(updateDisplayPicture(token,formData)).then(()=>setLoading(false))
      
    } catch (error) {

    }
    setSelectimgFlag(false);
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])

  return (
    <>
    <div className="group relative flex flex-col sm:flex-row items-center justify-between rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-10 px-14 shadow-2xl shadow-indigo-500/5 transition-all duration-500 overflow-hidden">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/[0.03] rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
      <div className="flex flex-col sm:flex-row items-center gap-10 relative z-10">
        <div className="relative">
           <div className="absolute inset-0 bg-indigo-600/20 rounded-full blur-xl group-hover:bg-indigo-600/40 transition-colors duration-500"></div>
           <img
             src={previewSource || user?.image}
             alt={`profile-${user?.firstName}`}
             className="relative aspect-square w-[100px] rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-2xl transition-transform duration-500 group-hover:scale-105"
           />
        </div>
        <div className="space-y-4 text-center sm:text-left">
          <div className="space-y-1">
             <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em]">AVATAR CONFIGURATION</p>
             <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Identity Visual</h2>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            <input
              type="file"
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button
              disabled={loading}
              onClick={()=>fileInputRef.current.click()}
              className="cursor-pointer rounded-2xl bg-slate-50 dark:bg-slate-800 py-3.5 px-8 text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 active:scale-95 disabled:opacity-50 border border-slate-200 dark:border-slate-700"
            >
              Select New Asset
            </button>
            <IconBtn
              text={loading ? "Synchronizing..." : "Commit Update"}
              onclick={handleFileUploadDB}
              customClasses="px-8 py-3.5 rounded-2xl shadow-xl shadow-indigo-600/20 text-xs font-black uppercase tracking-widest"
            >
              {!loading && (
                <FiUpload size={18} />
              )}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

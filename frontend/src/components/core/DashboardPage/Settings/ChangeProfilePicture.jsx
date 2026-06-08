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
    <div className="group relative flex flex-col sm:flex-row items-center justify-between rounded-hero border border-hairline dark:border-slate-800 bg-canvas dark:bg-slate-900 p-10 px-8 shadow-sm transition-all duration-500 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
        <div className="relative">
           <img
             src={previewSource || user?.image}
             alt={`profile-${user?.firstName}`}
             className="relative aspect-square w-[100px] rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-2xl transition-transform duration-500 group-hover:scale-105"
           />
        </div>
        <div className="space-y-4 text-center sm:text-left">
          <div className="space-y-1">
             <p className="text-[10px] font-black text-ink dark:text-white uppercase tracking-[0.3em]">AVATAR CONFIGURATION</p>
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
              className="btn-secondary py-3.5 px-8 text-xs disabled:opacity-50"
            >
              Select New Asset
            </button>
            <IconBtn
              text={loading ? "Synchronizing..." : "Commit Update"}
              onclick={handleFileUploadDB}
              customClasses="btn-primary py-3.5 px-8 text-xs"
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

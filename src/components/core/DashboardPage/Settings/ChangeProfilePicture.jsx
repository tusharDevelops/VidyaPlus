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
      console.log("uploading")
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      dispatch(updateDisplayPicture(token,formData)).then(()=>setLoading(false))
      
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
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
    <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
      <div className="flex items-center gap-x-4">
        <img
          src={previewSource || user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div className="space-y-2">
          <p>Change Profile Picture</p>
          <div className="flex flex-row gap-3">
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
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Select
            </button>
            <IconBtn
              text={loading ? "Uploading..." : "Upload"}
              onclick={handleFileUploadDB}
            >
              {!loading && (
                <FiUpload className="text-lg text-richblack-900" />
              )}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

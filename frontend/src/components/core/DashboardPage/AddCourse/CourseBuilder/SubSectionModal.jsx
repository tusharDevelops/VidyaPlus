import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import ReactDOM from "react-dom"
import { useDispatch, useSelector } from "react-redux"
import Upload from '../Upload'
import IconBtn from "../../../../common/IconBtn"
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../redux/slices/courseSlice"


export default function SubSectionModal({  
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
    })
  
  {
    
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
      getValues,
    } = useForm()


  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [videoSource, setVideoSource] = useState(
    modalData?.videoUrl?.includes("youtube.com") || modalData?.videoUrl?.includes("youtu.be") 
    ? "youtube" 
    : "upload"
  )

    useEffect(()=>{
      if(view||edit){
          setValue("lectureTitle", modalData.title)
          setValue("lectureDesc", modalData.description)
          setValue("lectureVideo", modalData.videoUrl)
      }
      //eslint-disable-next-line
    },[])

     // detect whether form is updated or not
  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl ||
      currentValues.videoUrl !== modalData.videoUrl
    ) {
      return true
    }
    return false
  }

    // handle the editing of subsection
    const handleEditSubsection = async () => {
      const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      const formData = new FormData()
      // console.log("Values After Editing form values:", currentValues)
      formData.append("sectionId", modalData.sectionId)
      formData.append("subSectionId", modalData._id)
      if (currentValues.lectureTitle !== modalData.title) {
        formData.append("title", currentValues.lectureTitle)
      }
      if (currentValues.lectureDesc !== modalData.description) {
        formData.append("description", currentValues.lectureDesc)
      }
      if (currentValues.lectureVideo !== modalData.videoUrl && videoSource === "upload") {
        formData.append("video", currentValues.lectureVideo)
      }
      if (videoSource === "youtube" && currentValues.videoUrl !== modalData.videoUrl) {
        formData.append("videoUrl", currentValues.videoUrl)
      }
      if (currentValues.lectureNote) {
        formData.append("pdf", currentValues.lectureNote)
      }
      setLoading(true)
      const result = await updateSubSection(formData, token)
      if (result) {
        // console.log("result", result)
        // update the structure of course
        const updatedCourseContent = course.courseContent.map((section) =>
          section._id === modalData.sectionId ? result : section
        )
        const updatedCourse = { ...course, courseContent: updatedCourseContent }
        dispatch(setCourse(updatedCourse))
      }
      setModalData(null)
      setLoading(false)
    }

  const onSubmit = async (data) => {
    // console.log(data)
      if (view) return

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        handleEditSubsection()
      }
      return
    } 

  
    const formData = new FormData()
    formData.append("sectionId", modalData)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    if (videoSource === "upload") {
      formData.append("video", data.lectureVideo)
    } else {
      formData.append("videoUrl", data.videoUrl)
    }
    if (data.lectureNote) {
      formData.append("pdf", data.lectureNote)
    }
 
    
    setLoading(true)
    
    const result = await createSubSection(formData, token)
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
    
  }





  return ReactDOM.createPortal(
    <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-slate-900/60 backdrop-blur-md p-4'>

      {/* BOX */}
      <div className='my-10 w-full max-w-[700px] rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_0_100px_rgba(79,70,229,0.1)] overflow-hidden flex flex-col max-h-[90vh]'>
       
        {/* Modal Header */}
        <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 sm:gap-4">
             <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                <span className="text-base">📹</span>
             </div>
             <div>
                <p className="text-base sm:text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1">
                  {view && "Lecture Preview"} {add && "Integrate New Lecture"} {edit && "Refine Lecture Details"}
                </p>
                <p className="text-[8px] sm:text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">INSTRUCTIONAL UNIT</p>
             </div>
          </div>
          <button 
            onClick={() => (!loading ? setModalData(null) : {})}
            className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-slate-400 hover:text-red-500 transition-all border border-slate-100 dark:border-slate-700 shadow-sm"
          >
            <RxCross2 size={18} />
          </button>
        </div>        {/* Modal Form */}
        <form className="space-y-4 sm:space-y-6 p-4 sm:p-8 overflow-y-auto" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Video Source Toggle */}
          {!view && (
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
               <button 
                 type="button"
                 onClick={() => setVideoSource("upload")}
                 className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${videoSource === "upload" ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-500'}`}
               >
                 Upload File
               </button>
               <button 
                 type="button"
                 onClick={() => setVideoSource("youtube")}
                 className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${videoSource === "youtube" ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-500'}`}
               >
                 YouTube Link
               </button>
            </div>
          )}

          {/* Lecture Video Upload / Link */}
          <div className="animate-in fade-in slide-in-from-top-4 duration-700">
             {videoSource === "upload" ? (
               <Upload
                 name="lectureVideo"
                 label="Instructional Video (Optional)"
                 register={register}
                 setValue={setValue}
                 errors={errors}
                 video={true}
                 viewData={view ? modalData.videoUrl : null}
                 editData={edit ? modalData.videoUrl : null}
                 required={false}
               />
             ) : (
               <div className="flex flex-col space-y-2 sm:space-y-3">
                 <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1" htmlFor="videoUrl">
                   YouTube Video URL (Optional)
                 </label>
                 <input
                   disabled={view || loading}
                   id="videoUrl"
                   defaultValue={modalData?.videoUrl || ""}
                   placeholder="https://www.youtube.com/watch?v=..."
                   {...register("videoUrl", { required: false })}
                   className="form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-3 px-4 rounded-xl font-bold text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                 />
                 {errors.videoUrl && (
                   <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
                     YouTube URL is mandatory
                   </span>
                 )}
               </div>
             )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-5">
            {/* Lecture Title */}
            <div className="flex flex-col space-y-2 sm:space-y-3">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1" htmlFor="lectureTitle">
                Instructional Title {!view && <sup className="text-red-500 font-bold">*</sup>}
              </label>
              <input
                disabled={view || loading}
                id="lectureTitle"
                placeholder="e.g. 01. Conceptual Framework"
                {...register("lectureTitle", { required: true })}
                className="form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-3 px-4 rounded-xl font-bold text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              />
              {errors.lectureTitle && (
                <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
                  Title is mandatory
                </span>
              )}
            </div>

            {/* Lecture Description */}
            <div className="flex flex-col space-y-2 sm:space-y-3">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1" htmlFor="lectureDesc">
                Instructional Abstract (Optional)
              </label>
              <textarea
                disabled={view || loading}
                id="lectureDesc"
                placeholder="Expound upon the core concepts addressed within this unit..."
                {...register("lectureDesc", { required: false })}
                className="form-style resize-none min-h-[100px] sm:min-h-[120px] w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-3 px-4 rounded-xl font-bold text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Lecture Notes Upload */}
          <div className="p-4 sm:p-6 rounded-2xl border border-indigo-600/10 bg-indigo-600/[0.02] dark:bg-indigo-400/[0.01]">
            <Upload
              name="lectureNote"
              label="Supplemental Artifacts (Optional)"
              register={register}
              setValue={setValue}
              errors={errors}
              pdf={true}
              viewData={view ? (modalData.notes?.[0]?.url || null) : null}
              editData={edit ? (modalData.notes?.[0]?.url || null) : null}
              required={false}
            />
          </div>

          {!view && (
            <div className="flex justify-end pt-4 sm:pt-8 border-t border-slate-100 dark:border-slate-800">
              <IconBtn
                disabled={loading}
                text={loading ? "Saving..." : edit ? "Save Changes" : "Create Lecture"}
                customClasses="px-8 py-3 rounded-xl shadow-2xl shadow-indigo-600/20 text-[10px] font-black uppercase tracking-widest"
              />
            </div>
          )}
        </form>
      </div>
    </div>,
    document.body
  )
}

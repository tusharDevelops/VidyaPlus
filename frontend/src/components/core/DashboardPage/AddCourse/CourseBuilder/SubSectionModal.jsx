import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
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
      currentValues.lectureVideo !== modalData.videoUrl
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
      if (currentValues.lectureVideo !== modalData.videoUrl) {
        formData.append("video", currentValues.lectureVideo)
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
    formData.append("video", data.lectureVideo)
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





  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-slate-900/60 backdrop-blur-md p-4'>

      {/* BOX */}
      <div className='my-10 w-full max-w-[800px] rounded-[3rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_0_100px_rgba(79,70,229,0.1)] overflow-hidden transition-all duration-500 transform scale-100'>
       
        {/* Modal Header */}
        <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/40 p-8 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                <span className="text-xl">📹</span>
             </div>
             <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1">
                  {view && "Lecture Preview"} {add && "Integrate New Lecture"} {edit && "Refine Lecture Details"}
                </p>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">CURRICULUM ARCHITECTURE / INSTRUCTIONAL UNIT</p>
             </div>
          </div>
          <button 
            onClick={() => (!loading ? setModalData(null) : {})}
            className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800 text-slate-400 hover:text-red-500 transition-all hover:rotate-90 border border-slate-100 dark:border-slate-700 shadow-sm"
          >
            <RxCross2 size={24} />
          </button>
        </div>

        {/* Modal Form */}
        <form className="space-y-12 p-10" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Lecture Video Upload */}
          <div className="animate-in fade-in slide-in-from-top-4 duration-700">
             <Upload
               name="lectureVideo"
               label="Instructional Video (MP4/WebM)"
               register={register}
               setValue={setValue}
               errors={errors}
               video={true}
               viewData={view ? modalData.videoUrl : null}
               editData={edit ? modalData.videoUrl : null}
             />
          </div>

          <div className="grid grid-cols-1 gap-10">
            {/* Lecture Title */}
            <div className="flex flex-col space-y-3">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1" htmlFor="lectureTitle">
                Instructional Title {!view && <sup className="text-red-500 font-bold">*</sup>}
              </label>
              <input
                disabled={view || loading}
                id="lectureTitle"
                placeholder="e.g. 01. Conceptual Framework & Protocol"
                {...register("lectureTitle", { required: true })}
                className="form-style w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-4 px-6 rounded-2xl font-bold text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              />
              {errors.lectureTitle && (
                <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
                  Instructional identity is mandatory
                </span>
              )}
            </div>

            {/* Lecture Description */}
            <div className="flex flex-col space-y-3">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1" htmlFor="lectureDesc">
                Instructional Abstract{" "}
                {!view && <sup className="text-red-500 font-bold">*</sup>}
              </label>
              <textarea
                disabled={view || loading}
                id="lectureDesc"
                placeholder="Expound upon the core concepts addressed within this unit..."
                {...register("lectureDesc", { required: true })}
                className="form-style resize-none min-h-[160px] w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-4 px-6 rounded-2xl font-bold text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              />
              {errors.lectureDesc && (
                <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
                  Academic abstract is required
                </span>
              )}
            </div>
          </div>

          {/* Lecture Notes Upload */}
          <div className="p-10 rounded-[2.5rem] border border-indigo-600/10 bg-indigo-600/[0.02] dark:bg-indigo-400/[0.01]">
            <Upload
              name="lectureNote"
              label="Supplemental Artifacts (PDF)"
              register={register}
              setValue={setValue}
              errors={errors}
              pdf={true}
              viewData={view ? (modalData.notes?.[0]?.url || null) : null}
              editData={edit ? (modalData.notes?.[0]?.url || null) : null}
            />
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-6 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-indigo-600/30"></span>
                OPTIONAL LEARNING RESOURCES
             </p>
          </div>

          {!view && (
            <div className="flex justify-end pt-10 border-t border-slate-100 dark:border-slate-800">
              <IconBtn
                disabled={loading}
                text={loading ? "Synchronizing..." : edit ? "Commit Modifications" : "Initialize Unit"}
                customClasses="px-10 py-4 rounded-[1.25rem] shadow-2xl shadow-indigo-600/20 text-xs font-black uppercase tracking-widest"
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

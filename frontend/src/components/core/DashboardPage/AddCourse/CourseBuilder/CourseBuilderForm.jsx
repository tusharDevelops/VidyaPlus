import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI"
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../redux/slices/courseSlice"
import IconBtn from "../../../../common/IconBtn"
import NestedView from "./NestedView"
import ExamNoteModal from "./ExamNoteModal"
import { RxCross2 } from "react-icons/rx"

export default function CourseBuilderForm() {


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null)
  const [examNoteModalData, setExamNoteModalData] = useState(null)
  const dispatch = useDispatch()



  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

// handle form submission
const onSubmit = async (data) => {
  // console.log(data)
  setLoading(true)
 

  let result

  if (editSectionName) {
    result = await updateSection(
      {
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id,
      },
      token
    )
    // console.log("edit", result)
  } else {
    result = await createSection(
      {
        sectionName: data.sectionName,
        courseId: course._id,
      },
      token
    )
  }
  if (result) {
    // console.log("section result", result)
    dispatch(setCourse(result))
    setEditSectionName(null)
    setValue("sectionName", "")
  }
  setLoading(false)
  
}

const goToNext = () => {
  if (course.courseContent.length === 0) {
    toast.error("Please add atleast one section")
    return
  }
  if (
    course.courseContent.some((section) => section.subSection.length === 0)
  ) {
    toast.error("Please add atleast one lecture in each section")
    return
  }
  dispatch(setStep(3))
}

const goBack = () => {
  dispatch(setStep(1))
  dispatch(setEditCourse(true))
}

const handleChangeEditSectionName = (sectionId, sectionName) => {
  if (editSectionName === sectionId) {
    cancelEdit()
    return
  }
  setEditSectionName(sectionId)
  setValue("sectionName", sectionName)
}


  return (
    <div className='space-y-12 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-xl p-10 shadow-2xl shadow-indigo-500/5 dark:shadow-none'>
      <header className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-8">
        <div className="flex items-center gap-3 mb-1">
           <span className="px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
             STEP 02
           </span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Curriculum Architecture</h2>
        <p className="text-lg font-bold text-slate-500 dark:text-slate-400">Organize your expertise into logical modules and refined instructional units.</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-10 shadow-inner group">
        <div className="flex flex-col space-y-3">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1" htmlFor="sectionName">
            Module Designation <sup className="text-red-500 font-bold">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="e.g. Fundamental Principles & Architecture"
            {...register("sectionName", { required: true })}
            className="form-style w-full bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-indigo-600/5 transition-all py-4 px-6 rounded-2xl font-bold text-sm"
          />
          {errors.sectionName && (
            <span className="ml-2 text-[10px] font-black tracking-widest text-red-500 uppercase">
              Module designation is mandatory
            </span>
          )}
        </div>
        <div className="flex items-center gap-x-6">
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Synchronize Updates" : "Initialize Module"}
            outline={true}
            customClasses="shadow-xl shadow-indigo-600/5 border-2 rounded-[1.25rem] px-8 py-3 font-black text-xs uppercase tracking-widest"
          >
            <IoAddCircleOutline size={20} className="text-indigo-600 dark:text-indigo-400" />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-xs font-black text-slate-400 hover:text-red-500 transition-all uppercase tracking-widest flex items-center gap-2 group/cancel"
            >
              <span className="w-6 h-[1px] bg-slate-200 dark:bg-slate-800 group-hover/cancel:bg-red-500 transition-colors"></span>
              Abort Edit
            </button>
          )}
        </div>
      </form>

        {/* NestedView (very imp) */}
        <div className="pt-4">
           <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        </div>

      {/* Exam Notes Section */}
      <section className="space-y-8 rounded-[2rem] border border-indigo-600/10 bg-indigo-600/[0.02] dark:bg-indigo-400/[0.01] p-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">ENHANCED MATERIAL</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Curriculum Artifacts (PDF)</p>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Deploy high-resolution instructional assets for your students.</p>
          </div>
          <IconBtn
            text="Deploy PDF Asset"
            onclick={() => setExamNoteModalData(true)}
            outline={true}
            customClasses="w-full md:w-auto px-8 py-3 rounded-[1.25rem] border-2 font-black text-xs uppercase tracking-widest"
          >
            <IoAddCircleOutline size={20} className="text-indigo-600 dark:text-indigo-400" />
          </IconBtn>
        </div>
        
        {course?.examNotes?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {course.examNotes.map((note) => (
              <div key={note._id} className="group flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-white dark:border-slate-700 shadow-sm hover:border-indigo-600/30 hover:shadow-2xl hover:shadow-indigo-600/5 transition-all duration-500">
                <a href={note.url} target="_blank" rel="noreferrer" className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
                     📄
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="text-sm font-black text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 transition-colors truncate">
                      {note.title}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">VERIFIED ARTIFACT</span>
                  </div>
                </a>
                <button
                  type="button"
                  title="Purge Artifact"
                  onClick={async () => {
                    setLoading(true)
                    const { deleteExamNote } = await import("../../../../../services/operations/courseDetailsAPI")
                    const result = await deleteExamNote({ courseId: course._id, noteId: note._id }, token)
                    if (result) dispatch(setCourse(result))
                    setLoading(false)
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all ml-4"
                >
                   <RxCross2 size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50/50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 text-center animate-in fade-in duration-700">
             <div className="w-12 h-12 rounded-3xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-3xl mx-auto mb-6">📂</div>
             <p className="text-lg font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.2em]">Repository Depleted</p>
             <p className="text-sm font-bold text-slate-400 dark:text-slate-500 mt-2">Add high-fidelity instructional materials to bolster your curriculum.</p>
          </div>
        )}
      </section>

      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-6 pt-12 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={goBack}
          className="flex cursor-pointer items-center gap-x-2 rounded-[1.25rem] bg-slate-100 dark:bg-slate-800 py-4 px-10 font-black text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
        >
          Revisit Info
        </button>
        <IconBtn disabled={loading} text="Commit Phase 02" onclick={goToNext} customClasses="px-10 py-4 rounded-[1.25rem] shadow-2xl shadow-indigo-600/20 text-xs font-black uppercase tracking-widest">
          <MdNavigateNext className="text-2xl" />
        </IconBtn>
      </div>

      {/* Exam Note Modal */}
      {examNoteModalData && (
        <ExamNoteModal setModalData={setExamNoteModalData} />
      )}
    </div>
  )
}

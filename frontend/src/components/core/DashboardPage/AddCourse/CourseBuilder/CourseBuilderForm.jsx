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
    <div className='space-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 md:space-y-8 md:p-6'>
      <p className="text-xl font-semibold text-richblack-5 md:text-2xl">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="form-style w-full"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>
        <div className="flex items-end gap-x-4">
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

        {/* NestedView (very imp) */}
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>

      {/* Exam Notes Section */}
      <div className="space-y-4 rounded-md border border-richblack-600 bg-richblack-700 p-6">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold text-richblack-5">Course Exam Notes</p>
          <IconBtn
            text="Add Exam Note"
            onclick={() => setExamNoteModalData(true)}
            outline={true}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>
        </div>
        
        {course?.examNotes?.length > 0 ? (
          <div className="flex flex-col gap-3">
            {course.examNotes.map((note) => (
              <div key={note._id} className="flex items-center justify-between border-b border-richblack-600 pb-2">
                <a href={note.url} target="_blank" rel="noreferrer" className="text-sm font-medium text-richblack-50 hover:text-yellow-50 hover:underline flex items-center gap-2">
                  <span>📄</span> {note.title}
                </a>
                <button
                  type="button"
                  title="Delete Exam Note"
                  onClick={async () => {
                    setLoading(true)
                    const { deleteExamNote } = await import("../../../../../services/operations/courseDetailsAPI")
                    const result = await deleteExamNote({ courseId: course._id, noteId: note._id }, token)
                    if (result) dispatch(setCourse(result))
                    setLoading(false)
                  }}
                  className="text-richblack-300 hover:text-pink-200 transition-all hover:scale-110"
                >
                   <RxCross2 size={20} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-richblack-300">No exam notes added yet</p>
        )}
      </div>

      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>
        <IconBtn disabled={loading} text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>

      {/* Exam Note Modal */}
      {examNoteModalData && (
        <ExamNoteModal setModalData={setExamNoteModalData} />
      )}
    </div>
  )
}

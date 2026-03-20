import { useRef, useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../redux/slices/courseSlice"
import ConfirmationModal from "../../../../common/ConfirmationModal"
import SubSectionModal from "./SubSectionModal"

export default function NestedView({handleChangeEditSectionName}) {

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
 // console.log(course)
  // States to keep track of mode of modal [add, view, edit]
  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)

  const rotateRef = useRef()


  const handleDeleleSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    })
    if (result) {
      dispatch(setCourse(result))
    }
    setConfirmationModal(null)
  }

  const rotateElement = () => {
   
  rotateRef.current.style.transform = 'rotate(180deg)'
     
    
  };

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token })
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
  }


  
  return (
    <>
      <div className='rounded-[2rem] bg-slate-50/50 dark:bg-slate-900/30 p-10 border border-slate-200 dark:border-slate-800 shadow-inner overflow-hidden space-y-6' id="nestedViewContainer">
        {course?.courseContent?.map((section, index) => (
           <details key={index} open className="group transition-all duration-500 bg-white dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-600/5 transition-all">
              <summary className="flex cursor-pointer items-center justify-between py-6 px-8 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all select-none">
                  <div className="flex items-center gap-x-5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 group-hover:scale-105 transition-transform">
                       <RxDropdownMenu className="text-2xl"/>
                    </div>
                    <div>
                       <p className="text-xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight leading-tight">
                        {section.sectionName}
                       </p>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                          {section.subSection.length} {section.subSection.length === 1 ? 'Instructional Unit' : 'Instructional Units'}
                       </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-4" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 shadow-sm border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all"
                      onClick={() =>
                        handleChangeEditSectionName(
                          section._id,
                          section.sectionName
                        )
                      }
                      title="Refine Module Nomenclature"
                    >
                      <MdEdit size={18} />
                    </button>
                    <button
                      className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-red-500 hover:bg-white dark:hover:bg-slate-800 shadow-sm border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all"
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Deconstruct this Module?",
                          text2: "Synthesizing this action will permanently remove all associated instructional units from the curriculum.",
                          btn1Text: "Deconstruct",
                          btn2Text: "Abort",
                          btn1Handler: () => handleDeleleSection(section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                      title="Purge Module"
                    >
                      <RiDeleteBin6Line size={18} />
                    </button>
                    <div className="h-8 w-[1px] bg-slate-100 dark:bg-slate-700 mx-1"></div>
                    <AiFillCaretDown className="text-xl text-slate-300 dark:text-slate-600 group-open:rotate-180 transition-transform duration-500" />
                  </div>
              </summary>

              <div className="px-10 pb-8 pt-2 space-y-4 bg-slate-50/50 dark:bg-slate-900/20 border-t border-slate-50 dark:border-slate-800/50 animate-in slide-in-from-top-4 duration-500">
                {/* Render All Sub Sections Within a Section */}
                <div className="space-y-3">
                  {section.subSection.map((data) => (
                    <div
                      key={data?._id}
                      onClick={() => setViewSubSection(data)}
                      className="flex cursor-pointer items-center justify-between gap-x-4 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-white dark:border-slate-700 shadow-sm hover:shadow-lg hover:shadow-indigo-600/5 hover:border-indigo-600/20 transition-all group/sub"
                    >
                      <div className="flex items-center gap-x-4 flex-1 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-400 dark:text-indigo-600">
                           <RxDropdownMenu className="text-lg" />
                        </div>
                        <div className="flex flex-col truncate">
                          <p className="font-bold text-slate-700 dark:text-slate-200 group-hover/sub:text-indigo-600 transition-colors truncate">
                            {data.title}
                          </p>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">LECTURE UNIT</p>
                        </div>
                      </div>
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-x-2"
                      >
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                          onClick={() =>
                            setEditSubSection({ ...data, sectionId: section._id })
                          }
                        >
                          <MdEdit size={16} />
                        </button>
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 transition-all"
                          onClick={() =>
                            setConfirmationModal({
                              text1: "Purge Instructional Unit?",
                              text2: "This specific lecture will be permanently removed from the curriculum architecture.",
                              btn1Text: "Purge",
                              btn2Text: "Abort",
                              btn1Handler: () =>
                                handleDeleteSubSection(data._id, section._id),
                              btn2Handler: () => setConfirmationModal(null),
                            })
                          }
                        >
                          <RiDeleteBin6Line size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New Lecture to Section */}
                <button
                  onClick={() => setAddSubsection(section._id)}
                  className="w-full flex items-center justify-center gap-x-3 px-6 py-4 rounded-2xl border-2 border-dashed border-indigo-200 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white hover:border-transparent transition-all duration-500 mt-6"
                >
                  <FaPlus className="text-xs" />
                  <span>Integrate New Instructional Unit</span>
                </button>
              </div>
           </details>
          ))
        }
      </div>

      {/* Modal Display */}
      
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}


      {/* Confirmation Modal */}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <></>
      )}
    </>
  )
}

import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-hot-toast"
import { apiConnector } from "../../../services/apiConnector"
import { certificateEndpoints } from "../../../services/apis"

import IconBtn from "../../common/IconBtn"

export default function VideoDetailsSidebar({setReviewModal}) {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)
  const { token } = useSelector((state) => state.auth)

  const handleGenerateCertificate = async () => {
    const toastId = toast.loading("Generating your certificate...")
    try {
      const res = await apiConnector(
        "POST",
        certificateEndpoints.GENERATE_CERTIFICATE_API,
        { courseId: courseEntireData._id },
        { Authorization: `Bearer ${token}` }
      )
      if (res?.data?.success) {
        toast.success("Certificate generated successfully!")
        navigate(`/certificate/${res.data.data.certificateNumber}`)
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to generate certificate")
    }
    toast.dismiss(toastId)
  }
  useEffect(() => {
    ;(() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname])


  console.log("printing courseSection data",courseSectionData)


  return (
<>
      <aside className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 backdrop-blur-xl">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
          <div className="flex w-full items-center justify-between mb-6">
            <button
              onClick={() => navigate(`/dashboard/enrolled-courses`)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm border border-slate-200/50 dark:border-slate-700/50"
              title="Back to Courses"
            >
              <IoIosArrowBack className="text-xl" />
            </button>
            <IconBtn
              text="Add Review"
              customClasses="px-4 py-2 text-xs rounded-xl shadow-lg shadow-indigo-600/20"
              onclick={() => setReviewModal(true)}
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight line-clamp-2">
              {courseEntireData?.courseName}
            </h2>
            <div className="flex items-center gap-2">
               <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-1000" 
                    style={{ width: `${(completedLectures?.length / totalNoOfLectures) * 100}%` }}
                  ></div>
               </div>
               <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                 {completedLectures?.length} / {totalNoOfLectures}
               </span>
            </div>
          </div>
        </div>

        {/* Certificate Section */}
        {completedLectures?.length === totalNoOfLectures && totalNoOfLectures > 0 && (
          <div className="px-6 py-4 bg-indigo-600/5 border-b border-indigo-600/10">
            <button
              onClick={handleGenerateCertificate}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              <span>🎖️</span> Claim Your Certificate
            </button>
          </div>
        )}

        {/* Exam Notes Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {courseEntireData?.examNotes?.length > 0 && (
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 space-y-4">
              <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">
                Essential Material
              </p>
              <div className="space-y-2">
                {courseEntireData.examNotes.map((note, index) => (
                  <a
                    key={index}
                    href={note.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 hover:border-indigo-600/30 hover:bg-indigo-600/5 transition-all group"
                  >
                    <span className="w-6 h-6 rounded-lg bg-indigo-600/10 flex items-center justify-center text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">📄</span>
                    <span className="flex-1 line-clamp-1 group-hover:text-slate-900 dark:group-hover:text-slate-200">{note.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Curriculum Accordion */}
          <div className="py-4 space-y-1">
            {courseSectionData.map((course, index) => (
              <div
                className="group select-none"
                onClick={() => setActiveStatus(course?._id)}
                key={index}
              >
                {/* Section Title */}
                <div className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-colors ${activeStatus === course?._id ? 'bg-indigo-600/5 border-l-4 border-indigo-600' : 'hover:bg-slate-100 dark:hover:bg-slate-800/30 border-l-4 border-transparent'}`}>
                  <p className={`text-sm font-black tracking-tight ${activeStatus === course?._id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-800 dark:text-slate-200'}`}>
                    {course?.sectionName}
                  </p>
                  <BsChevronDown className={`text-xs transition-transform duration-500 ${activeStatus === course?._id ? "rotate-180 text-indigo-600" : "text-slate-400"}`} />
                </div>

                {/* Sub Sections (Lessons) */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeStatus === course?._id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="py-2 bg-slate-100/30 dark:bg-slate-800/10">
                    {course.subSection.map((topic, i) => (
                      <div
                        className={`flex items-center gap-4 px-8 py-3.5 cursor-pointer transition-all border-l-4 border-transparent ${
                          videoBarActive === topic._id
                            ? "bg-indigo-600/10 border-indigo-600 font-black text-indigo-700 dark:text-indigo-300"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800/40 text-slate-500 dark:text-slate-400"
                        }`}
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`)
                          setVideoBarActive(topic._id)
                        }}
                      >
                        <div className="relative flex items-center justify-center">
                           <input
                            type="checkbox"
                            checked={completedLectures.includes(topic?._id)}
                            readOnly
                            className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-600 accent-indigo-600"
                          />
                        </div>
                        <span className="text-sm line-clamp-1">{topic.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}

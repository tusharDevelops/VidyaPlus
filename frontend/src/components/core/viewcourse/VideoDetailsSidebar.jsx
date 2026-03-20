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
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between ">
            <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`)
              }}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              title="back"
            >
              <IoIosArrowBack size={30} />
            </div>
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onclick={() => setReviewModal(true)}
            />
          </div>
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        {/* Exam Notes & Certificate Section */}
        <div className="mx-5 py-4 border-b border-richblack-600">
          {courseEntireData?.examNotes?.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-bold text-yellow-50 mb-2 uppercase tracking-wider">
                📚 Important Exam Notes
              </p>
              <div className="flex flex-col gap-2">
                {courseEntireData.examNotes.map((note, index) => (
                  <a
                    key={index}
                    href={note.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-richblack-100 hover:text-yellow-50 underline flex items-center gap-1"
                  >
                    <span>📄</span> {note.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          {completedLectures?.length === totalNoOfLectures && totalNoOfLectures > 0 && (
            <button
              onClick={handleGenerateCertificate}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-yellow-50 py-2 text-sm font-bold text-richblack-900 transition-all hover:scale-95"
            >
              <span>🎖️</span> Get Certificate
            </button>
          )}
        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => setActiveStatus(course?._id)}
              key={index}
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {course?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  {/* <span className="text-[12px] font-medium">
                    Lession {course?.subSection.length}
                  </span> */}
                  <span
                    className={`${
                      activeStatus === course?._id 
                        ? "rotate-0"
                        : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              {activeStatus === course?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {course.subSection.map((topic, i) => (
                    <div
                      className={`flex gap-3  px-5 py-2
                      ${
                        videoBarActive === topic._id
                          ? "bg-yellow-200 font-semibold text-richblack-800"
                          : "hover:bg-richblack-900"
                      } 
                      `}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        )
                        setVideoBarActive(topic._id)
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {}}
                      />
                      {topic.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        </div>
    </>
  )
}

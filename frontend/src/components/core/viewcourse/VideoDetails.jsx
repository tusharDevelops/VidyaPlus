import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import "video-react/dist/video-react.css"
import { useLocation } from "react-router-dom"
import { BigPlayButton, Player } from "video-react"

 import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
 import { updateCompletedLectures } from "../../../redux/slices/viewCourseSlice"

export default function VideoDetails() {

  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState([])
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (!courseSectionData.length) return
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`)
      } else {
        // console.log("courseSectionData", courseSectionData)
        const filteredData = courseSectionData.filter(
          (sec) => sec._id === sectionId
        )
        // console.log("filteredData", filteredData)
        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId
        )
        // console.log("filteredVideoData", filteredVideoData)
        setVideoData(filteredVideoData[0])
        setPreviewSource(courseEntireData.thumbnail)
        setVideoEnded(false)
      }
    })()
    //eslint-disable-next-line
  }, [courseSectionData, courseEntireData, location.pathname])

    // check if the lecture is the first video of the course
    const isFirstVideo = () => {
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
  
      const currentSubSectionIndx = courseSectionData[
        currentSectionIndx
      ].subSection.findIndex((data) => data._id === subSectionId)
  
      if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
        return true
      } else {
        return false
      }
    }

     // check if the lecture is the last video of the course
  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    ) {
      return true
    } else {
      return false
    }
  }

   // go to the next video
   const goToNextVideo = () => {
    // console.log(courseSectionData)

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    // console.log("no of subsections", noOfSubsections)

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx + 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      )
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
      const nextSubSectionId =
        courseSectionData[currentSectionIndx + 1].subSection[0]._id
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      )
    }
  }

   // go to the previous video
   const goToPrevVideo = () => {
    // console.log(courseSectionData)

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      )
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
      const prevSubSectionLength =
        courseSectionData[currentSectionIndx - 1].subSection.length
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1].subSection[
          prevSubSectionLength - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      )
    }
  }
  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }


  return (
    <div className="flex flex-col gap-8">
    {!videoData ? (
      <div className="relative group overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl">
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center backdrop-blur-[2px]">
           <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white animate-pulse">
              <span className="text-3xl text-white">🎬</span>
           </div>
        </div>
      </div>
    ) : (
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-black group">
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
        >
          <BigPlayButton position="center" />
          {/* Render When Video Ends */}
          {videoEnded && (
            <div
              className="absolute inset-0 z-[100] grid h-full place-content-center bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-500"
            >
              <div className="flex flex-col items-center gap-8 max-w-md text-center p-8">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-indigo-600/40 mb-2">
                   {completedLectures.includes(subSectionId) ? "✅" : "🏆"}
                </div>
                
                <h3 className="text-xl font-black text-white tracking-tight">
                  {completedLectures.includes(subSectionId) ? "Lecture Completed!" : "Great Job Learning!"}
                </h3>
                
                <div className="flex flex-col w-full gap-3">
                  {!completedLectures.includes(subSectionId) && (
                    <button
                      disabled={loading}
                      onClick={() => handleLectureCompletion()}
                      className="w-full py-3 rounded-xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                    >
                      {!loading ? "Mark As Completed" : "Saving Progress..."}
                    </button>
                  )}
                  
                  <button
                    disabled={loading}
                    onClick={() => {
                      if (playerRef?.current) {
                        playerRef?.current?.seek(0)
                        setVideoEnded(false)
                      }
                    }}
                    className="w-full py-3 rounded-xl bg-slate-800 text-white font-black hover:bg-slate-700 transition-all border border-slate-700"
                  >
                    Rewatch Lesson
                  </button>
                </div>
                
                <div className="flex w-full items-center justify-center gap-4 pt-4">
                  {!isFirstVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToPrevVideo}
                      className="flex-1 py-3 rounded-xl bg-slate-100/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10"
                    >
                      Previous
                    </button>
                  )}
                  {!isLastVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToNextVideo}
                      className="flex-1 py-3 rounded-xl bg-white text-slate-900 text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                    >
                      Next Lesson
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </Player>
      </div>
    )}

    <div className="space-y-4">
       <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
            ACTIVE LESSON
          </span>
       </div>
       <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
         {videoData?.title}
       </h1>
       <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-4xl">
         {videoData?.description || "In this lesson, you will dive deep into the core concepts covered in this module. Follow along with the instructor to build a solid foundation."}
       </p>
    </div>

    {/* PDF Notes Section */}
    {videoData?.notes?.length > 0 && (
      <div className="mt-6 pt-8 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-6">
           <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm">📚</div>
           <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Lecture Resources</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videoData.notes.map((note, index) => (
            <a
              key={index}
              href={note.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-indigo-600/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group shadow-sm hover:shadow-lg hover:shadow-indigo-500/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  📄
                </div>
                <div className="space-y-0.5">
                   <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                     {note.title}
                   </p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Download PDF</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-400 group-hover:border-indigo-600 group-hover:text-indigo-600 transition-all">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    )}
    </div>
  )
}

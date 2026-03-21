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


    const isYoutube = videoData?.videoUrl?.includes("youtube.com") || videoData?.videoUrl?.includes("youtu.be");

    const getYoutubeEmbedUrl = (url) => {
      let videoId = "";
      if (url.includes("v=")) {
        videoId = url.split("v=")[1].split("&")[0];
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1];
      }
      return `https://www.youtube.com/embed/${videoId}`;
    };

  return (
    <div className="flex flex-col gap-6">
    {!videoData ? (
      <div className="relative group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl aspect-video">
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center backdrop-blur-[2px]">
           <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white animate-pulse">
              <span className="text-2xl">🎬</span>
           </div>
        </div>
      </div>
    ) : isYoutube ? (
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-black aspect-video">
        <iframe
            className="w-full h-full"
            src={getYoutubeEmbedUrl(videoData.videoUrl)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        ></iframe>
        {/* For YouTube, we show the "Complete" button overlay if not completed, or just a small toggle */}
        {!completedLectures.includes(subSectionId) && (
            <div className="absolute top-4 right-4 z-50">
               <button
                  disabled={loading}
                  onClick={() => handleLectureCompletion()}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                >
                  {loading ? "Saving..." : "Mark Complete"}
                </button>
            </div>
        )}
      </div>
    ) : (
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-black group">
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
              <div className="flex flex-col items-center gap-6 max-w-md text-center p-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-600/40 mb-1">
                   {completedLectures.includes(subSectionId) ? "✅" : "🏆"}
                </div>
                
                <h3 className="text-lg font-black text-white tracking-tight">
                  {completedLectures.includes(subSectionId) ? "Lecture Completed!" : "Great Job Learning!"}
                </h3>
                
                <div className="flex flex-col w-full gap-2">
                  {!completedLectures.includes(subSectionId) && (
                    <button
                      disabled={loading}
                      onClick={() => handleLectureCompletion()}
                      className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 text-xs"
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
                    className="w-full py-2.5 rounded-lg bg-slate-800 text-white font-black hover:bg-slate-700 transition-all border border-slate-700 text-xs"
                  >
                    Rewatch Lesson
                  </button>
                </div>
                
                <div className="flex w-full items-center justify-center gap-3 pt-4">
                  {!isFirstVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToPrevVideo}
                      className="flex-1 py-2.5 rounded-lg bg-slate-100/10 text-white text-[9px] font-black uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10"
                    >
                      Previous
                    </button>
                  )}
                  {!isLastVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToNextVideo}
                      className="flex-1 py-2.5 rounded-lg bg-white text-slate-900 text-[9px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
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
          <span className="px-2 py-0.5 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest">
            ACTIVE LESSON
          </span>
       </div>
       <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
         {videoData?.title}
       </h1>
       <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-4xl">
         {videoData?.description}
       </p>
    </div>

    {/* PDF Notes Section */}
    {videoData?.notes?.length > 0 && (
      <div className="mt-4 pt-6 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-4">
           <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs">📚</div>
           <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Lecture Resources</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videoData.notes.map((note, index) => (
            <a
              key={index}
              href={note.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-indigo-600/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group shadow-sm hover:shadow-lg hover:shadow-indigo-500/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-600/10 flex items-center justify-center text-lg group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  📄
                </div>
                <div className="space-y-0">
                   <p className="text-xs font-black text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                     {note.title}
                   </p>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Download PDF</p>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-400 group-hover:border-indigo-600 group-hover:text-indigo-600 transition-all">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    )}
    </div>
  )
}

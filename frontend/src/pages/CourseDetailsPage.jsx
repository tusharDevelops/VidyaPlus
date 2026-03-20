import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import Error from "./Error"
import ConfirmationModal from "../components/common/ConfirmationModal"
import RatingStars from "../components/common/RatingStars"
import { formatDate } from '../services/FormatDate';
import Footer from '../components/common/Footer'
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import ReactMarkdown from 'react-markdown';
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar'
import { buyCourse } from '../services/operations/StudentFeaturesAPI';

const CourseDetails = () => {

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const {loading} = useSelector((state) => state.profile);
    const {paymentLoading} = useSelector((state)=> state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId}  = useParams();

    const [courseData , setCourseData] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    useEffect(()=> {
        const getCourseFullDetails = async() => {
            try{
                const result = await fetchCourseDetails(courseId);
                //console.log("Printing CourseData-> " , result);
                setCourseData(result);
            }
            catch(error) {
                console.log("Could not fetch coursse details");
            }
        }
        getCourseFullDetails();
        
    }, [courseId]);

    const [avgReviewCount, setAverageReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
        setAverageReviewCount(count);
    },[courseData])

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(()=> {
        let lectures = 0;
        courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures);

    },[courseData]);


    const [isActive, setIsActive] = useState(Array(0))

    const handleActive = (id)=>{
      setIsActive(
        !isActive.includes(id)? isActive.concat([id]):isActive.filter((e)=>e!==id)
      )
    }

    


    const handleBuyCourse = () => {
        
        if(token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1:"you are not Logged in",
            text2:"Please login to purchase the course",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:() => navigate("/login"),
            btn2Handler:()=>setConfirmationModal(null),
        })

    }

    if(loading || !courseData) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
    }


    if (paymentLoading) {
        // console.log("payment loading")
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }

    if(!courseData.success) {
        return (
            <div>
                <Error />
            </div>
        )
    }

    const {
      //  _id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData.data?.courseDetails
   

   
  return (
<>
    <div className='relative w-full bg-slate-900 overflow-hidden'>
        {/* Animated Background Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
        
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative z-10">
            <div className='mx-auto grid min-h-[500px] max-w-maxContentTab justify-items-center py-12 lg:mx-0 
             lg:justify-items-start lg:py-16 xl:max-w-[810px]'>
                <div className="relative block max-h-[30rem] lg:hidden w-full mb-8">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                    <img
                    src={thumbnail}
                    alt="course thumbnail"
                    className="aspect-video w-full rounded-3xl object-cover shadow-2xl"
                    />
                </div>
                
                <div className="flex flex-col justify-center gap-6 text-slate-100">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-indigo-400 mb-2">
                    <span>Course</span>
                    <span className="text-slate-600">/</span>
                    <span className="text-slate-400">{courseData?.data?.courseDetails?.category?.name}</span>
                  </div>
                  
                  <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                    {courseName}
                  </h1>
                  
                  <p className="text-lg text-slate-400 font-medium max-w-[700px] leading-relaxed italic border-l-4 border-indigo-600 pl-6">
                    {courseDescription}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-y-4 gap-x-6 pt-2">
                    <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-2xl border border-slate-700/50 backdrop-blur-md">
                      <span className="text-indigo-400 font-black text-lg">{avgReviewCount}</span>
                      <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
                    </div>
                    <div className="flex items-center gap-6 text-sm font-bold text-slate-400">
                      <span className="hover:text-white transition-colors cursor-default">{`(${ratingAndReviews.length} reviews)`}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                      <span className="hover:text-white transition-colors cursor-default">{`${studentsEnrolled.length} Students`}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-8 pt-4">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-black border-2 border-white/20">
                          {instructor?.firstName?.[0]}
                       </div>
                       <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Instructor</p>
                          <p className="text-sm font-black text-white">{`${instructor.firstName} ${instructor.lastName}`}</p>
                       </div>
                    </div>
                    
                    <div className="flex gap-8 border-l border-slate-800 pl-8">
                       <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                          <BiInfoCircle className="text-indigo-400 text-xl" />
                          <span>{formatDate(createdAt)}</span>
                       </div>
                       <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                          <HiOutlineGlobeAlt className="text-indigo-400 text-xl" />
                          <span>English</span>
                       </div>
                    </div>
                  </div>
                </div>
                
                {/* Mobile Sticky Price Bar (Mockup transition) */}
                <div className="flex w-full flex-col gap-6 border-t border-slate-800 mt-12 pt-8 lg:hidden">
                  <div className="flex items-center justify-between">
                    <div>
                       <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Total investment</p>
                       <p className="text-4xl font-black text-white">₹{price}</p>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 font-black text-xs">
                       90% OFF
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20" onClick={handleBuyCourse}>
                      Enroll Now
                    </button>
                    <button className="px-8 py-4 rounded-2xl bg-slate-800 text-white font-black hover:bg-slate-700 transition-all border border-slate-700">
                      Add to Cart
                    </button>
                  </div>
                </div>
                
            </div>

            {/* Floating Sidebar Card (Desktop) */}
            <div className="right-[3rem] top-[80px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 
            md:translate-y-0 lg:absolute lg:block z-40">
                <CourseDetailsCard
                  course={courseData?.data?.courseDetails}
                  setConfirmationModal={setConfirmationModal}
                  handleBuyCourse={handleBuyCourse}
                />
            </div>
        </div>
    </div>

    
    <div className="mx-auto box-content px-4 pt-20 pb-20 text-start lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="mb-20 p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm">💡</span>
              What you'll learn
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none prose-p:font-medium prose-li:font-bold">
               <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-[830px]">
            <div className="flex flex-col gap-6 mb-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Curriculum</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Over {totalNoOfLectures} expert-led lessons.</p>
                </div>
                <div className="flex items-center gap-6 text-sm font-black text-slate-400">
                  <span className="flex items-center gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400">{courseContent.length}</span> Sections
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="flex items-center gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400">{totalNoOfLectures}</span> Lectures
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="text-slate-900 dark:text-white">{courseData.data?.totalDuration}</span>
                </div>
              </div>
              
              <div className="flex justify-end">
                  <button
                    className="text-sm font-black text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-8 transition-all"
                    onClick={() => setIsActive([])}
                  >
                    COLAPSE ALL SECTIONS
                  </button>
              </div>
            </div>

            {/* Course Details Accordion */}
            <div className="space-y-1">
              {courseContent?.map((section, index) => (
                <CourseAccordionBar
                  section={section}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="mt-24 mb-12 p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
              <p className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-8">Meet your Instructor</p>
              <div className="flex items-center gap-8 mb-8">
                <div className="relative group">
                   <div className="absolute inset-0 bg-indigo-600 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                   <img
                    src={
                      instructor.image
                        ? instructor.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                    }
                    alt={instructor.firstName}
                    className="h-24 w-24 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl relative z-10"
                  />
                </div>
                <div>
                   <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                     {`${instructor.firstName} ${instructor.lastName}`}
                   </h3>
                   <p className="text-slate-500 dark:text-slate-400 font-bold">Expert Educator @ Vidya+</p>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shadow-sm italic text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {instructor?.additionalDetails?.about || "An expert instructor dedicated to providing high-quality education and helping students master complex topics through practical and engaging learning experiences."}
              </div>
            </div>
          </div>
        
        </div>
    </div>

    <Footer/>
    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
</>
  )
}

export default CourseDetails

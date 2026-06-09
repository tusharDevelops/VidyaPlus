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
import { BsFillCaretRightFill } from "react-icons/bs"
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar'
import { buyCourse } from '../services/operations/StudentFeaturesAPI';

const parseData = (data) => {
  if (!data) return [];
  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data);
      return parseData(parsed);
    } catch (e) { 
      if (data.includes('\n')) return data.split(/\r?\n/).filter(line => line.trim());
      return [data]; 
    }
  }
  if (Array.isArray(data)) {
    return data.flatMap(item => {
      if (typeof item === 'string' && item.startsWith('[')) {
        try {
          const parsed = JSON.parse(item);
          return Array.isArray(parsed) ? parsed : [parsed];
        } catch (e) { return item; }
      }
      return item;
    });
  }
  return [];
}

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
                setCourseData(result);
            }
            catch(error) {
               console.error(error);
            }
        }
        getCourseFullDetails();
        
    }, [courseId]);

    const [avgReviewCount, setAverageReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
        setAverageReviewCount(count || 0);
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
            text1:"You are not logged in",
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

    const tags = parseData(courseData.data?.courseDetails?.tag);
    const instructions = parseData(courseData.data?.courseDetails?.instructions);
    const benefits = parseData(courseData.data?.courseDetails?.whatYouWillLearn);

    const {
        courseName,
        courseDescription,
        thumbnail,
        price,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData.data?.courseDetails
   
  return (
<>
    <div className='relative w-full bg-canvas text-ink font-sans min-h-screen'>
        
        {/* Hero Section */}
        <section className="bg-canvas border-b border-hairline py-16 px-4 md:px-16 mx-auto w-full max-w-screen-2xl relative z-10">
            <div className='mx-auto grid min-h-[450px] gap-12 lg:grid-cols-12 items-center'>
                
                {/* Mobile Thumbnail */}
                <div className="relative block lg:hidden w-full mb-6">
                    <img
                    src={thumbnail}
                    alt="course thumbnail"
                    className="aspect-video w-full rounded-[32px] object-cover border border-hairline"
                    />
                </div>
                
                <div className="flex flex-col justify-center gap-6 lg:col-span-8">
                  <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-widest text-muted mb-2">
                    <span>Course</span>
                    <span>/</span>
                    <span className="text-ink">{courseData?.data?.courseDetails?.category?.name}</span>
                  </div>
                  
                  <h1 className="text-[40px] md:text-[56px] font-bold tracking-tight leading-[1.1]">
                    {courseName}
                  </h1>
                  
                  <p className="text-[18px] text-muted max-w-[700px] leading-relaxed">
                    {courseDescription}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {tags?.map((item, i) => (
                      <span key={i} className="px-4 py-2 rounded-full bg-surface text-ink text-[12px] font-semibold uppercase tracking-widest border border-hairline">
                        #{item}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-y-4 gap-x-6 pt-2">
                    <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full border border-hairline">
                      <span className="text-brand-coral font-bold text-[16px]">{avgReviewCount}</span>
                      <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
                    </div>
                    <div className="flex items-center gap-4 text-[14px] font-semibold text-muted">
                      <span>{`(${ratingAndReviews.length} reviews)`}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-hairline"></span>
                      <span>{`${studentsEnrolled.length} Students`}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-8 pt-4">
                    <div className="flex items-center gap-3">
                       <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center text-ink border border-hairline font-bold text-[16px]">
                          {instructor?.firstName?.[0]}
                       </div>
                       <div>
                          <p className="text-[12px] font-semibold text-muted uppercase tracking-widest">Instructor</p>
                          <p className="text-[16px] font-bold text-ink">{`${instructor.firstName} ${instructor.lastName}`}</p>
                       </div>
                    </div>
                    
                    <div className="flex gap-8 border-l border-hairline pl-8">
                       <div className="flex items-center gap-3 text-[14px] font-semibold text-muted">
                          <BiInfoCircle className="text-[20px]" />
                          <span>{formatDate(createdAt)}</span>
                       </div>
                       <div className="flex items-center gap-3 text-[14px] font-semibold text-muted">
                          <HiOutlineGlobeAlt className="text-[20px]" />
                          <span>English</span>
                       </div>
                    </div>
                  </div>
                </div>
                
                {/* Mobile Price Bar (In-flow) */}
                <div className="flex w-full flex-col gap-6 border-t border-hairline mt-8 pt-8 lg:hidden pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                       <p className="text-[12px] font-semibold text-muted uppercase tracking-widest mb-1">Total investment</p>
                       <p className="text-[32px] font-bold">₹{price}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button className="bg-ink text-canvas font-semibold text-[14px] px-8 py-4 rounded-full w-full" onClick={handleBuyCourse}>
                      Enroll Now
                    </button>
                    <button className="bg-canvas border border-ink text-ink font-semibold text-[14px] px-8 py-4 rounded-full w-full">
                      Add to Cart
                    </button>
                  </div>
                </div>
                
            </div>

            {/* Sticky Mobile Enrollment Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-[100] bg-canvas border-t border-hairline p-4 lg:hidden">
               <div className="mx-auto flex items-center justify-between max-w-md">
                  <div className="flex flex-col">
                     <p className="text-[12px] font-semibold text-muted uppercase tracking-widest">Investment</p>
                     <p className="text-[24px] font-bold">₹{price}</p>
                  </div>
                  <button 
                    onClick={handleBuyCourse}
                    className="bg-ink text-canvas font-semibold text-[14px] px-8 py-4 rounded-full"
                  >
                    Enroll Now
                  </button>
               </div>
            </div>

            {/* Floating Sidebar Card (Desktop) */}
            <div className="hidden lg:block absolute right-[4rem] top-[80px] w-1/3 max-w-[410px] z-40">
                <CourseDetailsCard
                  course={courseData?.data?.courseDetails}
                  setConfirmationModal={setConfirmationModal}
                  handleBuyCourse={handleBuyCourse}
                />
            </div>
        </section>

    
        <div className="mx-auto px-4 pt-20 pb-20 lg:w-[1260px]">
            <div className="mx-auto lg:mx-0 xl:max-w-[810px]">
              {/* What will you learn section */}
              <div className="mb-20 p-8 md:p-12 rounded-[32px] bg-canvas border border-hairline">
                <h2 className="text-[32px] font-bold tracking-tight mb-8">
                  What you'll learn
                </h2>
                <div className="text-[16px] text-ink">
                   {benefits.length > 0 ? (
                     <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 list-none pl-0">
                        {benefits.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-1.5 w-6 h-6 rounded-full bg-surface flex items-center justify-center text-ink shrink-0 border border-hairline">
                              <BsFillCaretRightFill className="text-[12px]" />
                            </div>
                            <span className="text-muted">{item.replace(/^-\s*/, '').replace(/^\d+\.\s*/, '')}</span>
                          </li>
                        ))}
                     </ul>
                   ) : (
                     <p className="text-muted italic">No specific learning outcomes listed.</p>
                   )}
                </div>
              </div>

              {/* Requirements Section */}
              {instructions.length > 0 && (
                <div className="mb-20">
                   <h2 className="text-[24px] font-bold tracking-tight mb-6">Requirements</h2>
                   <ul className="space-y-4 list-none pl-0">
                      {instructions.map((item, i) => (
                          <li key={i} className="flex items-center gap-4">
                             <span className="w-2 h-2 rounded-full bg-ink shrink-0"></span>
                             <span className="text-[16px] text-muted font-medium">{item}</span>
                          </li>
                      ))}
                   </ul>
                </div>
              )}

              {/* Course Content Section */}
              <div className="max-w-[830px]">
                <div className="flex flex-col gap-6 mb-10">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="space-y-1">
                      <h2 className="text-[32px] font-bold tracking-tight">Curriculum</h2>
                      <p className="text-[16px] text-muted font-medium">Over {totalNoOfLectures} expert-led lessons.</p>
                    </div>
                    <div className="flex items-center gap-4 text-[14px] font-bold text-muted">
                      <span>{courseContent.length} Sections</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-hairline"></span>
                      <span>{totalNoOfLectures} Lectures</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-hairline"></span>
                      <span className="text-ink">{courseData.data?.totalDuration}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                      <button
                        className="text-[12px] font-bold text-muted hover:text-ink transition-colors uppercase tracking-widest"
                        onClick={() => setIsActive([])}
                      >
                        Collapse All Sections
                      </button>
                  </div>
                </div>

                {/* Course Details Accordion */}
                <div className="space-y-2">
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
                <div className="mt-24 mb-12 p-8 md:p-12 rounded-[32px] bg-surface border border-hairline">
                  <p className="text-[12px] font-bold text-muted uppercase tracking-[0.2em] mb-8">Meet your Instructor</p>
                  <div className="flex items-center gap-8 mb-8">
                    <img
                        src={
                          instructor.image
                            ? instructor.image
                            : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                        }
                        alt={instructor.firstName}
                        className="h-24 w-24 rounded-full object-cover border border-hairline"
                    />
                    <div>
                       <h3 className="text-[28px] font-bold tracking-tight">
                         {`${instructor.firstName} ${instructor.lastName}`}
                       </h3>
                       <p className="text-[16px] text-muted font-semibold mt-1">Expert Educator @ VidyaPlus</p>
                    </div>
                  </div>
                  <div className="text-[16px] text-ink leading-relaxed">
                    {instructor?.additionalDetails?.about || "An expert instructor dedicated to providing high-quality education and helping students master complex topics through practical and engaging learning experiences."}
                  </div>
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

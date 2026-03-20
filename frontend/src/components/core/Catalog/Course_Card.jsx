import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const CourseCard = ({course, Height}) => {


    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])


    
  return (
    <>
      <Link to={`/courses/${course._id}`} className="group block">
        <div className="flex flex-col gap-5">
          <div className="relative aspect-video overflow-hidden rounded-3xl shadow-lg group-hover:shadow-indigo-500/20 transition-all duration-500">
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]"></div>
            
            {/* Price Badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
               <div className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/20 dark:border-slate-700/50 shadow-xl">
                 <p className="text-indigo-600 dark:text-indigo-400 font-black text-sm">
                   ₹{course?.price}
                 </p>
               </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 px-2">
            <h3 className="text-xl font-black text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight">
              {course?.courseName}
            </h3>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase">
                {course?.instructor?.firstName?.[0]}
              </div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                {course?.instructor?.firstName} {course?.instructor?.lastName}
              </p>
            </div>

            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                <span className="text-indigo-600 dark:text-indigo-400 font-black text-sm">{avgReviewCount || 0}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={16} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {course?.ratingAndReviews?.length || 0} reviews
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default CourseCard

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
      <Link to={`/courses/${course._id}`}>
        <div className="group h-full rounded-xl overflow-hidden bg-richblack-800 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
          <div className="relative overflow-hidden">
            <img
              src={course?.thumbnail}
              alt="course thumbnail"
              className={`${Height} w-full object-cover transition-transform duration-300 group-hover:scale-110`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-richblack-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
          </div>
          <div className="flex flex-col gap-3 px-4 py-4 relative z-10">
            <p className="text-base font-semibold text-richblack-5 line-clamp-2 group-hover:text-yellow-5 transition-colors duration-200">
              {course?.courseName}
            </p>
            <p className="text-xs text-richblack-300">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-yellow-5 font-semibold">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400">
                ({course?.ratingAndReviews?.length})
              </span>
            </div>
            <div className="pt-2 border-t border-richblack-700">
              <p className="text-lg font-bold text-yellow-5">Rs. {course?.price}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default CourseCard

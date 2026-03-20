import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"


import CourseCard from './Course_Card'
import { FreeMode, Pagination } from 'swiper/modules'

const CourseSlider = ({Courses}) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          freeMode={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-14 swiper-custom"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i} className="py-8">
              <CourseCard course={course} Height={"h-[280px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 dark:bg-slate-900/40 rounded-[2.5rem] border border-dashed border-slate-300 dark:border-slate-800">
           <p className="text-4xl mb-4">🎓</p>
           <p className="text-xl font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">No Courses Found</p>
           <p className="text-slate-400 dark:text-slate-600 mt-2 font-medium">We couldn't find any courses in this category yet.</p>
        </div>
      )}
    </>
  )
}

export default CourseSlider

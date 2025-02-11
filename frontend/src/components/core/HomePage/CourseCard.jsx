import React from 'react'

export default function CourseCard({cardData,currentCard,setCurrentCard}) {
  return (
    <div className='h-[300px] bg-richblack-800 flex flex-col gap-5 p-5'>
      <h1 className='text-2xl'>{cardData.heading}</h1>
      <p className=' text-richblack-300 font-inter'>{cardData.description}</p>
      <div className='flex mt-auto'>
        <div>{cardData.level}</div>
        <div>{cardData.lessionNumber}</div>
      </div>
    </div>
  )
}

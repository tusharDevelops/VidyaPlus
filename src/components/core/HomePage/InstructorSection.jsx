import React from 'react'
import Instructor from "../../../assets/Images/4669575.jpg"
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='mt-16'>
      <div className='flex flex-col gap-x-11 md:flex-row  items-center'>

        <div className='md:w-[50%]'>
            <img
                src={Instructor}
                alt=""
                height={400}
                width={400}
                className=' rounded-xl'
            />
        </div>

        <div className='flex flex-col gap-10 md:w-[50%] '>
            <div className=' text-4xl mt-4 font-semibold md:w-[50%]'>
                Become an
                <HighlightText text={"Instructor"} />
            </div>

            <p className='font-medium text-base  text-richblack-300 md:w-[80%]'>
            Experienced one can collaborate with our aim to meet our goal by becoming  <HighlightText text={"Instructor"} />
            </p>

            <div className='w-fit'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex text-richblack-900 flex-row gap-2 items-center'>
                        Start Teaching Today
                        <FaArrowRight />
                    </div>
                </CTAButton>
            </div>


        </div>

      </div>
    </div>
  )
}

export default InstructorSection

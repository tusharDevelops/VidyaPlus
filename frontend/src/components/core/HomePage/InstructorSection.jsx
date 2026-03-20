import React from 'react'
import Instructor from "../../../assets/Images/4669575.jpg"
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='mt-20 mb-20'>
      <div className='flex flex-col-reverse lg:flex-row gap-16 items-center'>

        <div className='w-full lg:w-[50%] relative flex justify-center'>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-purple-500/20 dark:bg-purple-900/30 blur-[80px] rounded-full z-0 pointer-events-none"></div>
            <img
                src={Instructor}
                alt="Become an Instructor"
                className='rounded-3xl shadow-xl shadow-indigo-900/10 dark:shadow-indigo-900/30 border border-slate-200 dark:border-slate-800 relative z-10 w-full max-w-[500px] object-cover'
            />
        </div>

        <div className='flex flex-col gap-8 w-full lg:w-[50%]'>
            <div className='text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight'>
                Become an <br/>
                <HighlightText text={"Instructor"} />
            </div>

            <p className='font-medium text-lg text-slate-500 dark:text-slate-400 leading-relaxed'>
            Passionate about teaching? Collaborate with us and share your expertise with a global audience of eager learners. Our platform gives you all the tools you need to build courses, engage students, and monetize your knowledge.
            </p>

            <div className='w-fit mt-4'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center'>
                        Start Teaching Today
                        <FaArrowRight className="text-sm" />
                    </div>
                </CTAButton>
            </div>

        </div>

      </div>
    </div>
  )
}

export default InstructorSection

import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress  from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "../HomePage/Button"

export default function LearnLanguageSection() {
  return (
    <div className='mt-[160px] mb-40 animate-in fade-in slide-in-from-bottom-10 duration-1000'>
      <div className='flex flex-col gap-5 items-center'>

            <div className='text-3xl font-black text-center text-slate-900 dark:text-white tracking-tight leading-tight'>
                Your Swiss Knife for
                <HighlightText text={" learning any language"} />
            </div>

            <div className='text-center text-slate-500 dark:text-slate-400 mx-auto text-lg font-bold w-full max-w-[800px] leading-relaxed italic border-x-4 border-indigo-600/30 px-10'>
              Using spin makes learning multiple languages simple and intuitive. With 20+ languages, realistic voice-overs, progress tracking, and custom scheduling, your academic odyssey starts here.
            </div>

            <div className='flex flex-col lg:flex-row items-center justify-center mt-12 relative'>
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[300px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>
                <img 
                    src = {know_your_progress}
                    alt = "KNowYourProgressImage"
                    className='object-contain lg:-mr-32 relative z-10 hover:scale-105 transition-transform duration-500 hover:z-30 drop-shadow-2xl'
                />
                <img 
                    src = {compare_with_others}
                    alt = "KNowYourProgressImage"
                    className='object-contain relative z-20 hover:scale-110 transition-transform duration-500 hover:z-30 drop-shadow-2xl'
                />
                <img 
                    src = {plan_your_lesson}
                    alt = "KNowYourProgressImage"
                    className='object-contain lg:-ml-36 relative z-10 hover:scale-105 transition-transform duration-500 hover:z-30 drop-shadow-2xl'
                />
            </div>

            <div className='mt-16'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className="px-10 py-2">
                        Initialize Learning Voyage
                    </div>
                </CTAButton>
            </div>

      </div>
    </div>
  )
}

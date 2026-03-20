import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import MapComponent from './MapComponent'

const timeline = [
    {
        Logo: Logo1,
        heading: "Innovative Learning",
        Description: "Harnessing AI tools to enhance education.",
    },
    {
        Logo: Logo2,
        heading: "Student-Centric",
        Description: "Your success is our top priority.",
    },
    {
        Logo: Logo3,
        heading: "Adaptable Education",
        Description: "Flexible learning paths to suit your needs.",
    },
    {
        Logo: Logo4,
        heading: "Problem Solving",
        Description: "Empower your future with coding skills.",
    }
    
];

export default function TimeLineSection() {
  return (
    
      <div className='w-full flex w-11/12 mx-auto flex-col lg:flex-row gap-16 items-center'>

        <div className='w-full lg:w-[45%] flex flex-col gap-14'>
            {
                timeline.map( (element, index) => {
                    return (
                        <div className='flex flex-row gap-6 group' key={index}>
                            <div className='relative w-[56px] h-[56px] rounded-full bg-slate-100 dark:bg-slate-800/80 flex flex-col items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700 transition-all group-hover:bg-purple-50 dark:group-hover:bg-purple-900/30 group-hover:border-purple-200 dark:group-hover:border-purple-800/50'>
                                <img src={element.Logo} width={24} height={24} alt='icon' className="dark:brightness-200 dark:grayscale transition-all opacity-80 group-hover:opacity-100"/>
                                {index !== 3 && <div className="absolute top-[56px] left-1/2 -translate-x-1/2 h-14 w-[2px] border-l-2 border-dashed border-slate-300 dark:border-slate-700"></div>}
                            </div>
                            <div className='flex flex-col justify-center'>
                                <h2 className='font-bold text-[18px] text-slate-900 dark:text-white transition-colors'>{element.heading}</h2>
                                <p className='text-slate-500 dark:text-slate-400 mt-1 leading-relaxed'>{element.Description}</p>
                            </div>
                        </div>
                    )
                } )
            }
        </div>
        
        <div className='relative shadow-2xl shadow-indigo-900/5 dark:shadow-indigo-900/30 w-full h-[450px] overflow-hidden lg:w-[55%] rounded-2xl border border-slate-200 dark:border-slate-800'>
            <MapComponent/>

            <div className='absolute bg-indigo-600/95 dark:bg-slate-900/90 backdrop-blur-md flex flex-row text-white uppercase py-4 px-8 rounded-full
                            left-[50%] bottom-8 translate-x-[-50%] shadow-xl shadow-indigo-900/20 border border-indigo-500/30 dark:border-slate-700'>
                <div className='flex flex-row gap-3 items-center'>
                    <span className="text-xl">📍</span>
                    <p className='text-indigo-50 dark:text-slate-300 text-sm font-bold tracking-widest'>Where to Find Us</p>
                </div>
            </div>
        </div>

      </div>
   
  )
}

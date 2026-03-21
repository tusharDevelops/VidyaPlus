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
    
      <div className='w-full flex w-11/12 mx-auto flex-col lg:flex-row gap-8 items-center'>

        <div className='w-full lg:w-[45%] flex flex-col gap-14'>
            {
                timeline.map( (element, index) => {
                    return (
                        <div className='flex flex-row gap-8 group ml-2' key={index}>
                            <div className='relative w-[64px] h-[64px] rounded-2xl bg-white dark:bg-slate-900 flex flex-col items-center justify-center shadow-2xl shadow-indigo-500/10 border-2 border-slate-100 dark:border-slate-800 transition-all duration-500 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:-translate-y-1'>
                                <img src={element.Logo} width={28} height={28} alt='icon' className="dark:brightness-200 dark:contrast-125 transition-all duration-500 group-hover:brightness-0 group-hover:invert"/>
                                {index !== 3 && (
                                  <div className="absolute top-[72px] left-1/2 -translate-x-1/2 h-10 w-[2px] bg-gradient-to-b from-indigo-600/30 to-transparent"></div>
                                )}
                            </div>
                            <div className='flex flex-col justify-center'>
                                <h2 className='text-xl font-black text-slate-900 dark:text-white transition-colors tracking-tight'>{element.heading}</h2>
                                <p className='text-sm font-bold text-slate-500 dark:text-slate-400 mt-1 leading-relaxed max-w-[320px]'>{element.Description}</p>
                            </div>
                        </div>
                    )
                } )
            }
        </div>
        
        <div className='relative w-full h-[520px] overflow-hidden lg:w-[55%] rounded-[3rem] border-8 border-white dark:border-slate-900 shadow-[0_30px_100px_rgba(79,70,229,0.15)] group'>
            <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10"></div>
            <MapComponent/>

            <div className='absolute bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl flex flex-row items-center gap-4 py-5 px-10 rounded-[2rem]
                            left-[50%] bottom-10 translate-x-[-50%] shadow-2xl shadow-black/10 border border-slate-200/50 dark:border-slate-700/50 z-20 group-hover:-translate-y-2 transition-transform duration-500'>
                <div className='w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-600/30'>
                   📍
                </div>
                <div>
                   <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em] mb-0.5">Global Presence</p>
                   <p className='text-sm font-black text-slate-900 dark:text-white tracking-tight'>Strategic Regional Gateways</p>
                </div>
            </div>
        </div>

      </div>
   
  )
}

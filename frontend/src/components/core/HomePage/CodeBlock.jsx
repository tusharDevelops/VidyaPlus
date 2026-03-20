import React from 'react'
import CTAButton from './Button'
import {FaArrowRight } from 'react-icons/fa6'
import { TypeAnimation } from 'react-type-animation'
export default function CodeBlock({position, heading, subheading, codes,ctabtn1,ctabtn2}) {
  return (
<div className={` my-20 flex flex-col ${position} gap-14 items-center justify-between`}>

  {/* SECTION_1 TEXT & BUTTONS */}
    <div className='w-full md:w-[45%] flex flex-col gap-6 text-center md:text-left'>
        <div>{heading}</div>
        <div className='text-slate-600 dark:text-slate-400 text-lg leading-relaxed'>{subheading}</div>
        <div className='flex justify-center md:justify-start gap-4 mt-4'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}> 
                <div className='flex gap-2 items-center'>
                    {ctabtn1.btnText}
                    <FaArrowRight/>
                </div>
            </CTAButton>
            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                {ctabtn2.btnText}
            </CTAButton>
        </div>
    </div>

  {/* SECTION_2 CODE WINDOW */}
    <div className='w-full md:w-[500px] flex flex-col z-10 
    bg-white dark:bg-[#0d1627]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xl shadow-indigo-900/5 dark:shadow-indigo-900/30'>
        
        {/* IDE Header bar */}
        <div className="h-10 w-full bg-slate-50 dark:bg-[#0a101d] border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <div className="text-xs text-slate-400 mx-auto font-mono opacity-60 flex-1 text-center pr-8">index.js</div>
        </div>

        {/* IDE Content */}
        <div className='flex p-4'>
            {/* Line Numbers */}
            <div className='w-[10%] text-slate-400 dark:text-slate-600 font-mono text-sm leading-7 text-right pr-4 select-none'>
            <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p>
            </div>

            {/* Code Body */}
            <div className='w-[90%] font-medium font-mono text-sm leading-7 text-indigo-700 dark:text-purple-300'>
            <TypeAnimation 
                sequence={[codes, 2000, ""]}
                repeat={Infinity}
                cursor={true}
                style={{ whiteSpace: "pre-line", display:"block" }}
                omitDeletionAnimation={true}
            />
            </div>
        </div>
    </div>

</div>
  )
}

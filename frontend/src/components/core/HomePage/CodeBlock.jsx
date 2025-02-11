import React from 'react'
import CTAButton from './Button'
import {FaArrowRight } from 'react-icons/fa6'
import { TypeAnimation } from 'react-type-animation'
export default function CodeBlock({position, heading, subheading, codes,ctabtn1,ctabtn2}) {
  return (
<div className={` my-20 flex  ${position} gap-8`}>

  {/* SECTION_1 */}
    <div className=' w-[90%] mx-auto md:w-[50%] flex  flex-col gap-10'>
        <div className='text-4xl font-bold' >{heading}</div>
        <div className='text-richblack-300 font-bold lg:w-[70%]'>{subheading}</div>
        <div className='flex gap-8'>
        <CTAButton active= {ctabtn1.active} linkto = {ctabtn1.linkto}> 
                <div className='flex gap-2 items-center'>
                    {ctabtn1.btnText}
                    <FaArrowRight/>
                </div></CTAButton>
        <CTAButton active= {ctabtn2.active} linkto = {ctabtn2.linkto}>{ctabtn2.btnText}</CTAButton>
        </div>
    </div>

  {/* SECTION_2 */}
    {/* <div className='codeblock1'></div> */}
    <div className='flex  border border-richblack-500 p-4 z-10 backdrop-blur-2xl shadow-custom md:w-[500px]'>
        <div className='w-[5%] text-richblack-400 font-bold'>

          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div className='w-[90%] flex flex-col gap-2 font-bold font-mono pr-2 text-yellow-25'>
          <TypeAnimation 
            sequence={[codes, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            style = {
                {
                    whiteSpace: "pre-line",
                    display:"block",
                }
            }
            omitDeletionAnimation={true}
          />
        </div>
    </div>

</div>
  )
}
